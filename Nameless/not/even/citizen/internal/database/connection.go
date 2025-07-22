package database

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"log"
	"not/even/citizen/games"
	"not/even/citizen/internal/config"
)

type Games []games.Game

type DBPool struct {
	*pgxpool.Pool
}

func NewDbConnect(config config.DBConfig) *DBPool {

	connPool, err := pgxpool.New(context.Background(), config.Url)
	if err != nil {
		log.Fatal(err)
	}
	return &DBPool{connPool}
}

// todo app failing on switched off db connection. Handle!
func (p *DBPool) GetAllGames(ctx *gin.Context) (Games, error) {
	sql := `SELECT * FROM games ORDER BY title`
	rows, err := p.Query(ctx.Request.Context(), sql)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var resultGames Games

	for rows.Next() {
		var game games.Game
		if err := rows.Scan(nil, &game.Name, &game.Description, nil, nil); err != nil {
			return nil, err
		}
		resultGames = append(resultGames, game)
	}

	return resultGames, nil
}

func (p *DBPool) GetMockedGames() Games {
	return games.Games
}

type GameStr struct {
}
