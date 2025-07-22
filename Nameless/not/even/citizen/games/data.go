package games

import (
	"fmt"
	"strconv"
)

type Game struct {
	Name        string   `json:"title"`
	Description string   `json:"description"`
	Tags        []string `json:"tags"`
}

var Games []Game = nil

func init() {
	Games = initGameData()
}

func initGameData() []Game {
	gamesNum := 100
	games := make([]Game, gamesNum)
	for i := 0; i < gamesNum; i++ {
		games[i] = Game{Name: fmt.Sprintf("%s%d", "gname", i),
			Description: fmt.Sprintf("%s%d%d%d", "gdesc", i, i, i),
			Tags:        []string{fmt.Sprint("tag of Game", i), fmt.Sprint("tag #2 of Game", i+1)}}
	}

	return games
}

func initGameData2() []Game {
	gamesNum := 100_000
	games := make([]Game, gamesNum)
	for i := 0; i < gamesNum; i++ {
		games[i] = Game{Name: fmt.Sprint("gname", i),
			Description: fmt.Sprint("gdesc", i, i, i),
			Tags:        []string{fmt.Sprint("tag of Game", i), fmt.Sprint("tag #2 of Game", i+1)}}
	}

	return games
}

func initGameData3() []Game {
	gamesNum := 100_000
	games := make([]Game, gamesNum)
	for i := 0; i < gamesNum; i++ {
		games[i] = Game{Name: "gname" + strconv.Itoa(i),
			Description: fmt.Sprint("gdesc" + strconv.Itoa(i) + strconv.Itoa(i) + strconv.Itoa(i)),
			Tags:        []string{"tag of Game " + strconv.Itoa(i), fmt.Sprint("tag #2 of Game ", strconv.Itoa(i+1))}}
	}

	return games
}
