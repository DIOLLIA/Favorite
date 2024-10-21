## Next.js App Router Course - Starter

Stack:
 Next.js
 React
 TypeScript
 Tailwind
 postgres (volume, docker)


This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

tips:

<Link>
In Next.js, you can use the <Link /> Component to link between pages in your application. <Link> allows
you to do client-side navigation with JavaScript. <a> will reload all the page

Whenever <Link> components appear in the browser's viewport, Next.js automatically prefetches
the code for the linked route in the background. By the time the user clicks the link, the code for the
destination page will already be loaded in the background
https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works


By default, Next.js applications use React Server Components.
Fetching data with Server Components is a relatively new approach and there are
a few benefits of using them:
Server Components support promises, providing a simpler solution for asynchronous tasks like data fetching. You can use async/await syntax without reaching out for useEffect, useState or data fetching libraries.
Server Components execute on the server, so you can keep expensive data fetches and logic on the server and only send the result to the client.
As mentioned before, since Server Components execute on the server, you can query the database directly without an additional API layer.
It’s time to take a quiz!

Parallel data fetching
A common way to avoid waterfalls is to initiate all data requests at the same time - in parallel.
In JavaScript, you can use the Promise.all() or Promise.allSettled() functions to initiate all promises at the same time. For example, in data.ts, we're using Promise.all() in the fetchCardData() function:


Шаги для создания бэкапа volume:
1. Создание бэкапа данных
   Используй следующую команду для создания дампа (бэкапа) данных из PostgreSQL контейнера:

bash
Copy code
docker exec -t <container_name> pg_dumpall -c -U <db_user> > /path/to/dump.sql
Пример:

bash
Copy code
docker exec -t postgres-db pg_dumpall -c -U fstck_user > ./backup/dump.sql
Это создаст SQL файл, содержащий все данные твоей базы данных. Ты сможешь передать этот файл на другой ПК, и затем восстановить данные на другом PostgreSQL инстансе.

2. Перенос данных на другой ПК
   Для восстановления данных на другой машине:

Запусти новый контейнер PostgreSQL на другой машине.

Скопируй файл dump.sql на новый ПК.

Используй команду для восстановления:

bash
Copy code
cat /path/to/dump.sql | docker exec -i <container_name> psql -U <db_user>
Пример:

bash
Copy code
cat ./backup/dump.sql | docker exec -i postgres-db psql -U fstck_user
3. Копирование всего volume (для переноса файлов)
   Если тебе нужно перенести все файлы базы данных, а не только SQL дамп, ты можешь использовать команды для копирования volume:

Создать временный контейнер для копирования данных:

Чтобы экспортировать volume, ты можешь запустить временный контейнер, который смонтирует твой volume и скопирует данные:

bash
Copy code
docker run --rm -v <volume_name>:/volume -v $(pwd):/backup busybox tar czf /backup/volume_backup.tar.gz -C /volume .
Пример:

bash
Copy code
docker run --rm -v fstck-vol:/volume -v $(pwd):/backup busybox tar czf /backup/volume_backup.tar.gz -C /volume .
Это создаст файл архива с содержимым volume.

Перенести архив на другой компьютер.

Восстановить volume на другом ПК:

На другом ПК ты можешь создать новый volume и распаковать данные в него:

bash
Copy code
docker run --rm -v <volume_name>:/volume -v $(pwd):/backup busybox sh -c "cd /volume && tar xzf /backup/volume_backup.tar.gz"
Пример:

bash
Copy code
docker run --rm -v fstck-vol:/volume -v $(pwd):/backup busybox sh -c "cd /volume && tar xzf /backup/volume_backup.tar.gz"
Шаги для использования локального volume с возможностью копирования:
Объяви volume в Docker Compose:

yaml
Copy code
version: '2'
services:
postgres-db:
image: postgres:17.0
volumes:
- ./fstck-vol:/var/lib/postgresql/data
ports:
- "5432:5432"
environment:
POSTGRES_USER: fstck_user
POSTGRES_PASSWORD: fstck_secret
POSTGRES_DB: fstck-db
Это создаст директорию fstck-vol рядом с проектом, которую можно просто скопировать на другой компьютер или заархивировать.

Передача и восстановление:

Просто скопируй содержимое директории fstck-vol на другой компьютер, и когда ты запустишь там контейнер с тем же Docker Compose файлом, PostgreSQL будет использовать те же данные.