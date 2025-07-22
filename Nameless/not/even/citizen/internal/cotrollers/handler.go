package cotrollers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"not/even/citizen/internal/database"
)

type Service struct {
	isMocked bool
	Pool     *database.DBPool
}

func MockedService() *Service {
	return &Service{true, &database.DBPool{}}
}

func DbService(pool *database.DBPool) *Service {
	return &Service{false, pool}
}

func (s *Service) HandleGetGames(ctx *gin.Context) {
	if s.isMocked {
		ctx.IndentedJSON(http.StatusOK, s.Pool.GetMockedGames())
	} else {
		games, _ := s.Pool.GetAllGames(ctx)
		ctx.IndentedJSON(http.StatusOK, games)
	}
}
