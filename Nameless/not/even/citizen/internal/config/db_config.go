package config

import (
	"fmt"
	"log/slog"
	"os"
	"strconv"
)

type DBConfig struct {
	IsMocked bool
	Url      string
	Port     string
	Username string
	Password string
}

func LoadDbConfig() DBConfig {
	isMocked, err := strconv.ParseBool(os.Getenv("IS_DB_MOCKED")) // 2) handle crash on db connect error
	if err != nil {
		slog.Error("can not parse `IS_DB_MOCKED` env var. Reason: %s \n", err.Error())
		slog.Info("Try to connect to the DB")
	}
	if isMocked {
		return DBConfig{IsMocked: isMocked}
	}
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	username := os.Getenv("DB_USER")
	pwd := os.Getenv("DB_PWD")
	dbName := os.Getenv("DB_NAME")
	url := fmt.Sprintf("postgres://%s:%s@%s:%s/%s", username, pwd, host, port, dbName)
	return DBConfig{Url: url}
}
