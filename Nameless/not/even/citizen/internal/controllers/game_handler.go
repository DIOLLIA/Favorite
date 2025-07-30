package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"not/even/citizen/internal/database"
)

type GameController struct {
	GameService database.GameService
}

func NewGameController(service database.GameService) *GameController {
	return &GameController{GameService: service}
}

func (gc *GameController) HandleGetGames(ctx *gin.Context) {
	games, err := gc.GameService.GetGames(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.IndentedJSON(http.StatusOK, games)
}
