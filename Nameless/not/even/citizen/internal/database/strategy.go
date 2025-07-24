package database

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"log"
	"not/even/citizen/games"
	"not/even/citizen/internal/config"
)

type GameService interface {
	GetGames(ctx *gin.Context) ([]games.Game, error)
}

type DBPool struct {
	service GameService
}

func NewDbConnect(config config.DBConfig) *DBPool {
	if config.IsMocked {
		return &DBPool{
			service: &MockDBService{},
		}
	}

	connPool, err := pgxpool.New(context.Background(), config.Url)
	if err != nil {
		log.Fatal(err)
	}
	return &DBPool{service: &DBService{connPool}}
}

type DBService struct {
	pool *pgxpool.Pool
}

type MockDBService struct {
}

// GetGames facade
func (p DBPool) GetGames(ctx *gin.Context) ([]games.Game, error) {
	return p.service.GetGames(ctx)
}

func (p *MockDBService) GetGames(_ *gin.Context) ([]games.Game, error) {
	return games.Games, nil
}

func (p *DBService) GetGames(ctx *gin.Context) ([]games.Game, error) {
	sql := `SELECT * FROM games ORDER BY title`
	rows, err := p.pool.Query(ctx.Request.Context(), sql)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var resultGames []games.Game

	for rows.Next() {
		var game games.Game
		if err := rows.Scan(nil, &game.Name, &game.Description, nil, nil); err != nil {
			return nil, err
		}
		resultGames = append(resultGames, game)
	}

	return resultGames, nil
}
