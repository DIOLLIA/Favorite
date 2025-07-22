## Games (TBD)

This is the project in Go that will use also:

MongoDB
REST \ gRPC \GpaphQL ?


1. Что в Go соответствует Hibernate/JPA + SQL?
   Go традиционно использует database/sql как базовый стандарт для работы с базами данных, а поверх него можно использовать:

🔹 A) gorm — самый популярный ORM (аналог Hibernate)
Поддерживает миграции, ассоциации, preload, CRUD и т.д.

Очень популярен, особенно для PostgreSQL, MySQL, SQLite и др.

Пример:

import (
"gorm.io/driver/postgres"
"gorm.io/gorm"
)

type User struct {
ID    uint   `gorm:"primaryKey"`
Name  string
Email string
Orders []Order // связь один-ко-многим
}

type Order struct {
ID     uint
UserID uint
Item   string
}

func main() {
dsn := "host=localhost user=postgres password=123 dbname=test port=5432 sslmode=disable"
db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

    db.AutoMigrate(&User{}, &Order{})

    db.Create(&User{Name: "Alice", Email: "alice@example.com"})
}
Ассоциации:
GORM поддерживает связи: has one, has many, belongs to, many2many, preload.

🔹 B) sqlc — современный способ генерации Go-кода по SQL-запросам
Ты пишешь SQL сам → sqlc генерирует type-safe Go-код (модели + методы).

Нет скрытой магии, высокое качество кода.

-- file: queries.sql
-- name: GetUser :one
SELECT id, name, email FROM users WHERE id = $1;

После генерации ты получаешь в Go:

user, err := q.GetUser(ctx, 123)
fmt.Println(user.Email)
Плюсы:

Явный контроль

Высокая производительность

Лучше читается в больших командах

Совместим с любым SQL-движком

🔹 C) pgx — продвинутый PostgreSQL-драйвер
Быстрее, чем database/sql

Полностью совместим с pgconn, pgxpool

Используется в high-load Go-проектах

import "github.com/jackc/pgx/v5/pgxpool"

pool, _ := pgxpool.New(context.Background(), "postgres://...")
row := pool.QueryRow(context.Background(), "SELECT name FROM users WHERE id=$1", 1)

var name string
row.Scan(&name)
🚀 2. Современный подход в Go: sqlc + pgx
В крупных продакшн-проектах сейчас часто используют sqlc + pgx:

sqlc — для генерации безопасного, читабельного кода

pgx — как драйвер к PostgreSQL

Это даёт баланс:

Безопасность типов

Простота в отладке (SQL — виден и ясен)

Нет overhead как у "тяжёлых" ORM