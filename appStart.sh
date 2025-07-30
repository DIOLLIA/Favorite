#!/usr/bin/env bash

FE_MEMS_PORT=3000
IMG_SRV_PORT=8089
GO_GAMES_PORT=8082
KOTLIN_MUSIC_PORT=8083

error_exit() {
    echo "❌ Error: $1 (code $?)" >&2
    read -n 1 -s -r -p "Press any key to exit..."
    exit 1
}

is_port_in_use() {
    local port=$1
    netstat -an | grep -q ":$port .*LISTEN"
}

start_frontend() {
    echo "▶️ Checking if frontend is already running on port $FE_MEMS_PORT..."
    if is_port_in_use $FE_MEMS_PORT; then
        echo "✅ Frontend already running on port $FE_MEMS_PORT, skipping startup."
    else
        echo "▶️ Starting frontend (mems-and-front)"
        pnpm --prefix ./mems-and-front dev &
        FE_PID=$!
        sleep 3
        if ! kill -0 $FE_PID 2>/dev/null; then
            error_exit "Frontend failed to start."
        fi
    fi
}

start_imageserver() {
    echo "▶️ Checking if ImageServer is already running on port $FE_MEMS_PORT..."
    if is_port_in_use $FE_MEMS_PORT; then
        echo "✅ ImageServer already running on port $FE_MEMS_PORT, skipping startup."
    else
        echo "▶️ Starting ImageServer"
        npm --prefix ./ImageServer run start-server &
        IMG_PID=$!
        sleep 3
        if ! kill -0 $IMG_PID 2>/dev/null; then
            error_exit "ImageServer failed to start."
        fi
    fi
}

start_go_backend() {
    echo "▶️ Checking if Go backend is already running on port $GO_GAMES_PORT..."
    if is_port_in_use $GO_GAMES_PORT; then
        echo "✅ Go backend already running on port $GO_GAMES_PORT, skipping startup."
    else
        echo "▶️ Starting Go backend (Games app)"
        go run ./Nameless/not/even/citizen/cmd &
        GO_PID=$!
        sleep 3
        if ! kill -0 $GO_PID 2>/dev/null; then
            error_exit "Go backend failed to start."
        fi
    fi
}

#start_kotlin_backend() {
#    echo "▶️ Checking if Kotlin backend is already running on port $KOTLIN_MUSIC_PORT..."
#    if is_port_in_use $KOTLIN_MUSIC_PORT; then
#        echo "✅ Kotlin backend already running on port $KOTLIN_MUSIC_PORT, skipping startup."
#    else
#        echo "▶️ Starting Kotlin backend (Music app)"
#        <TODO COMMAND TO RUN SRV> &
#        KOTLIN_PID=$!
#        sleep 3
#        if ! kill -0 $KOTLIN_PID 2>/dev/null; then
#            error_exit "Kotlin backend failed to start."
#        fi
#    fi
#}
#
#start_java_backend() {
#    echo "▶️ Checking if Java backend is already running on port $JAVA_CINEMA_PORT..."
#    if is_port_in_use $JAVA_CINEMA_PORT; then
#        echo "✅ Java backend already running on port $JAVA_CINEMA_PORT, skipping startup."
#    else
#        echo "▶️ Starting Java backend (Music app)"
#        <TODO COMMAND TO RUN SRV> &
#        $JAVA_PID=$!
#        sleep 3
#        if ! kill -0 $JAVA_PID 2>/dev/null; then
#            error_exit "Java backend failed to start."
#        fi
#    fi
#}

start_frontend
start_imageserver
start_go_backend
#start_kotlin_backend
#start_java_backend
#TODO add java kotlin
echo "✅ All services are running."
echo "🌐 Frontend: http://localhost:$FE_MEMS_PORT"
read -n 1 -s -r -p "Press any key to exit..."