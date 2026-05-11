#!/bin/bash
# Keep-alive script for Next.js dev server
while true; do
  if ! curl -s -o /dev/null http://127.0.0.1:3000/ 2>/dev/null; then
    echo "$(date): Restarting dev server..." >> /home/z/my-project/dev-keeper.log
    pkill -f 'next dev' 2>/dev/null
    sleep 2
    cd /home/z/my-project && npx next dev -p 3000 >> /home/z/my-project/dev.log 2>&1 &
    sleep 15
  else
    echo "$(date): Server OK" >> /home/z/my-project/dev-keeper.log
  fi
  sleep 30
done
