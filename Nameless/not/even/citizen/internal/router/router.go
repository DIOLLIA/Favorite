package router

import (
	"github.com/gin-gonic/gin"
	"not/even/citizen/internal/cotrollers"
	"not/even/citizen/internal/database"
)

// todo use Strategy pattern
func SetupRouter(pool *database.DBPool) *gin.Engine {
	var isMocked = true // todo read from cfg file
	defaultEngine := gin.Default()
	var svc *cotrollers.Service
	if isMocked {
		svc = cotrollers.MockedService()
	} else {
		svc = cotrollers.DbService(pool)
	}

	defaultEngine.GET("/games", svc.HandleGetGames)

	return defaultEngine
}
