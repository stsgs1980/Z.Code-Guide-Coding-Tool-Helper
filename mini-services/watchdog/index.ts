/**
 * Dev Server Watchdog
 *
 * Monitors the Next.js dev server on port 3000.
 * If the server is down, restarts it automatically.
 * Runs on port 3001 with a health endpoint.
 */

const CHECK_INTERVAL = 30_000; // Check every 30 seconds
const SERVER_PORT = 3000;
const WATCHDOG_PORT = 3001;
const MAX_RESTART_ATTEMPTS = 3;
const RESTART_COOLDOWN = 60_000; // 1 minute between restart attempts

import { execSync, spawn } from "child_process";
import { createWriteStream } from "fs";
import { createServer, type IncomingMessage, type ServerResponse } from "http";

interface HealthStatus {
  serverAlive: boolean;
  lastCheck: string;
  lastRestart: string | null;
  restartCount: number;
  uptime: number;
}

const startTime = Date.now();
let lastRestart: string | null = null;
let restartCount = 0;
let consecutiveFailures = 0;
let lastRestartTime = 0;

function checkServerHealth(): boolean {
  try {
    const result = execSync(
      `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:${SERVER_PORT}/ --max-time 5`,
      { encoding: "utf-8", timeout: 8000 }
    ).trim();
    return result === "200";
  } catch {
    return false;
  }
}

function restartServer(): boolean {
  const now = Date.now();
  if (now - lastRestartTime < RESTART_COOLDOWN) {
    console.log(`[watchdog] Cooldown active, skipping restart`);
    return false;
  }

  try {
    // Kill existing process
    try {
      execSync("pkill -f 'next dev' 2>/dev/null", { timeout: 3000 });
    } catch {
      // No process to kill, fine
    }

    // Wait a moment
    execSync("sleep 1", { timeout: 3000 });

    // Start the server
    const child = spawn(
      "npx",
      ["next", "dev", "-p", String(SERVER_PORT)],
      {
        cwd: "/home/z/my-project",
        detached: true,
        stdio: ["ignore", "pipe", "pipe"],
        env: {
          ...process.env,
          NODE_OPTIONS: "--max-old-space-size=3072",
        },
      }
    );

    child.unref();

    // Redirect output to log
    const logStream = createWriteStream("/tmp/zdev.log", { flags: "a" });
    child.stdout?.pipe(logStream);
    child.stderr?.pipe(logStream);

    lastRestart = new Date().toISOString();
    lastRestartTime = now;
    restartCount++;
    consecutiveFailures = 0;

    console.log(`[watchdog] Server restart initiated (attempt #${restartCount})`);
    return true;
  } catch (err) {
    console.error(`[watchdog] Restart failed:`, err);
    return false;
  }
}

function monitor() {
  const alive = checkServerHealth();

  if (alive) {
    consecutiveFailures = 0;
    console.log(`[watchdog] Server OK`);
  } else {
    consecutiveFailures++;
    console.log(`[watchdog] Server DOWN (failures: ${consecutiveFailures})`);

    if (consecutiveFailures >= 2 && consecutiveFailures <= MAX_RESTART_ATTEMPTS + 1) {
      restartServer();
    }
  }
}

// HTTP health endpoint for the watchdog itself
const watchdogServer = createServer((req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url ?? "/", `http://127.0.0.1:${WATCHDOG_PORT}`);

  if (url.pathname === "/health") {
    const status: HealthStatus = {
      serverAlive: checkServerHealth(),
      lastCheck: new Date().toISOString(),
      lastRestart,
      restartCount,
      uptime: Math.floor((Date.now() - startTime) / 1000),
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(status, null, 2));
  } else if (url.pathname === "/restart" && req.method === "POST") {
    const ok = restartServer();
    res.writeHead(ok ? 200 : 429, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ restarted: ok }));
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

watchdogServer.listen(WATCHDOG_PORT, "127.0.0.1", () => {
  console.log(`[watchdog] Monitoring on port ${WATCHDOG_PORT}`);
  console.log(`[watchdog] Checking server on port ${SERVER_PORT} every ${CHECK_INTERVAL / 1000}s`);
});

// Start monitoring
monitor();
setInterval(monitor, CHECK_INTERVAL);
