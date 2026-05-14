#!/bin/bash
if ! curl -s -o /dev/null http://127.0.0.1:3000/ 2>/dev/null; then
  pkill -f 'next dev' 2>/dev/null
  sleep 2
  cd /home/z/my-project && npx next dev -p 3000 </dev/null >/tmp/zdev.log 2>&1 &
  disown
  echo "$(date): Restarted" >> /tmp/watchdog.log
fi
