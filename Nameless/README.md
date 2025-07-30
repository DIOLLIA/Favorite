## Games (TBD)

This is the project in Go that will use also:
postgresql with pgx
mocked responses for test

MongoDB
REST \GpaphQL ?


1. What in Go is equivalent to Hibernate/JPA + SQL?
   Go traditionally uses database/sql as the base standard for database interaction. On top of that, you can use tools that improve type safety and code maintainability.

🔹 B) sqlc — A modern way to generate Go code from SQL
You write raw SQL manually, and sqlc generates type-safe Go code (models + methods).


-- file: queries.sql
-- name: GetUser :one
SELECT id, name, email FROM users WHERE id = $1;
After generation:

`user, err := q.GetUser(ctx, 123)
fmt.Println(user.Email)`

Benefits:

*Full control over SQL
*High performance
*Readable in large teams
*Compatible with any SQL engine
*No hidden magic (compared to traditional ORMs)

C) pgx — Advanced PostgreSQL driver
* Faster than database/sql
* Fully compatible with pgconn, pgxpool


```
import "github.com/jackc/pgx/v5/pgxpool"

pool, _ := pgxpool.New(context.Background(), "postgres://...")
row := pool.QueryRow(context.Background(), "SELECT name FROM users WHERE id=$1", 1)

var name string
row.Scan(&name) 
```

In modern large-scale Go projects, a common stack is:
sqlc for generating readable, type-safe code pgx as the PostgreSQL driver

This combination gives a great balance:
* Type safety
* Easy debugging (raw SQL is visible and understandable)
* No performance overhead of heavy ORMs