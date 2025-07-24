package router

import (
	"github.com/gin-gonic/gin"
	"not/even/citizen/internal/controllers"
	"not/even/citizen/internal/database"
)

func SetupRouter(pool *database.DBPool) *gin.Engine {
	defaultEngine := gin.Default()
	svc := controllers.NewGameController(pool)

	defaultEngine.GET("/games", svc.HandleGetGames)

	return defaultEngine
}
