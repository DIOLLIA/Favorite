package main

import (
	"log"
	"not/even/citizen/internal/config"
	"not/even/citizen/internal/database"
	"not/even/citizen/internal/router"
)

func main() {

	cfg := config.LoadConfig()
	dbconf := database.NewDbConnect(cfg)

	rout := router.SetupRouter(dbconf)

	log.Fatal(rout.Run("localhost:8082"))

}
