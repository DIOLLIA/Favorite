package config

import "fmt"

type DBConfig struct {
	Url      string
	Port     string
	Username string
	Password string
}

func LoadConfig() DBConfig {
	host := "localhost"
	port := "5432"
	username := "fstck_user"
	pwd := "fstck_secret"
	dbName := "games"
	//return DBConfig{Url: os.Getenv("DB_URL"), Port: os.Getenv("DB_PORT")}
	url := fmt.Sprintf("postgres://%s:%s@%s:%s/%s", username, pwd, host, port, dbName)
	return DBConfig{Url: url}
}
