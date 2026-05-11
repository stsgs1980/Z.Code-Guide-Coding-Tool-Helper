/**
 * Dev Server Watchdog v2
 *
 * Aggressively monitors and restarts the Next.js dev server on port 3000.
 * Checks every 10 seconds. Restarts after 2 consecutive failures.
 * Runs on port 3001 with health/restart endpoints.
 */

const CHECK_INTERVAL = 10_000; // Check every 10 seconds
const SERVER_PORT = 3000;
const WATCHDOG_PORT = 3001;
const MAX_CONSECUTIVE_RESTARTS = 10;

import { execSync, spawn } from "child_process";
import { createWriteStream, openSync, closeSync, writeSync } from "fs";
import { createServer, type IncomingMessage, type ServerResponse } from "http";

interface HealthStatus {
  serverAlive: boolean;
  lastCheck: string;
  lastRestart: string | null;
  restartCount: number;
  uptime: number;
  serverPid: number | null;
}

const startTime = Date.now();
let lastRestart: string | null = null;
let restartCount = 0;
let consecutiveFailures = 0;
let serverPid: number | null = null;

function log(msg: string) {
  const ts = new Date().toISOString();
  const line = `[${ts}] ${msg}\n`;
  try {
    const fd = openSync("/home/z/my-project/watchdog.log", "a");
    writeSync(fd, line);
    closeSync(fd);
  } catch {}
  console.log(line.trimEnd());
}

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

function killExistingServer() {
  try {
    execSync("pkill -9 -f 'next-server' 2>/dev/null", { timeout: 3000 });
  } catch {}
  try {
    execSync("pkill -9 -f 'next dev' 2>/dev/null", { timeout: 3000 });
  } catch {}
  try {
    if (serverPid) {
      process.kill(serverPid, 0); // check if alive
      process.kill(serverPid, 9);
    }
  } catch {}
  serverPid = null;
}

function restartServer(): boolean {
  log(`[watchdog] Restarting server...`);

  killExistingServer();

  try {
    execSync("sleep 1", { timeout: 3000 });
  } catch {}

  try {
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
    serverPid = child.pid ?? null;

    const logStream = createWriteStream("/home/z/my-project/dev.log", { flags: "w" });
    child.stdout?.pipe(logStream);
    child.stderr?.pipe(logStream);

    child.on("exit", (code, signal) => {
      log(`[watchdog] Server process exited with code=${code} signal=${signal}`);
      serverPid = null;
    });

    lastRestart = new Date().toISOString();
    restartCount++;
    consecutiveFailures = 0;

    log(`[watchdog] Server restart initiated (attempt #${restartCount}, PID=${serverPid})`);
    return true;
  } catch (err) {
    log(`[watchdog] Restart failed: ${err}`);
    return false;
  }
}

function monitor() {
  const alive = checkServerHealth();

  if (alive) {
    consecutiveFailures = 0;
    log(`[watchdog] Server OK`);
  } else {
    consecutiveFailures++;
    log(`[watchdog] Server DOWN (failures: ${consecutiveFailures})`);

    if (consecutiveFailures >= 2 && consecutiveFailures <= MAX_CONSECUTIVE_RESTARTS + 1) {
      restartServer();
    } else if (consecutiveFailures > MAX_CONSECUTIVE_RESTARTS + 1) {
      // Reset after too many failures, try again next cycle
      log(`[watchdog] Too many failures, resetting counter`);
      consecutiveFailures = 1;
    }
  }
}

// HTTP health endpoint
const watchdogServer = createServer((req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url ?? "/", `http://127.0.0.1:${WATCHDOG_PORT}`);

  if (url.pathname === "/health") {
    const status: HealthStatus = {
      serverAlive: checkServerHealth(),
      lastCheck: new Date().toISOString(),
      lastRestart,
      restartCount,
      uptime: Math.floor((Date.now() - startTime) / 1000),
      serverPid,
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
  log(`[watchdog] v2 Monitoring on port ${WATCHDOG_PORT}`);
  log(`[watchdog] Checking server on port ${SERVER_PORT} every ${CHECK_INTERVAL / 1000}s`);
});

// Initial check and start if needed
monitor();
setInterval(monitor, CHECK_INTERVAL);
