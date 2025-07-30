Start-Process powershell -ArgumentList "-NoExit", "-Command", "pnpm --prefix ./mems-and-front dev" -WindowStyle Normal -WorkingDirectory "$PWD"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm --prefix ./ImageServer run start-server" -WindowStyle Normal -WorkingDirectory "$PWD"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "go run ./Nameless/not/even/citizen/cmd" -WindowStyle Normal -WorkingDirectory "$PWD"
#todo add java and kotlin