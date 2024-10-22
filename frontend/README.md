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

By streaming, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.
There are two ways you implement streaming in Next.js:
- At the page level, with the loading.tsx file.
- For specific components, with [Suspense](https://react.dev/reference/react/Suspense).
* <Suspense> lets you display a fallback until its children have finished loading.
  loading.tsx is a special Next.js file built on top of Suspense, it allows you to create fallback UI to show as a replacement while page content loads.
  Since <SideNav> is static, it's shown immediately. The user can interact with <SideNav> while the dynamic content is loading.
  The user doesn't have to wait for the page to finish loading before navigating away (this is called interruptable navigation).


We can change this with [Route Groups]https://nextjs.org/docs/app/building-your-application/routing/route-groups). Create a new folder called /(overview) inside the dashboard folder. Then, move your loading.tsx and page.tsx files inside the folder:
Route groups allow you to organize files into logical groups without affecting the URL path structure. When you create a new folder using parentheses (), the name won't be included in the URL path. So /dashboard/(overview)/page.tsx becomes /dashboard.

If you remember the slow data request, fetchRevenue(), this is the request that is slowing down the whole page. Instead 
of blocking your whole page, you can use Suspense to stream only this component and immediately show the rest of the page's UI.

### Partial Prerendering

in Next.js, if you call a [dynamic function](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-functions) 
in a route (like querying your database), the entire route becomes dynamic.
Enable PPR for your Next.js app by adding the ppr option to your next.config.mjs file
The great thing about Partial Prerendering is that you don't need to change your code to use it. As long as you're using Suspense 
to wrap the dynamic parts of your route, Next.js will know which parts of your route are static and which are dynamic.

### Search and pagination

These are the Next.js client hooks that you'll use to implement the search functionality:

useSearchParams - Allows you to access the parameters of the current URL. For example, the search params for this URL
/dashboard/invoices?page=1&query=pending would look like this: {page: '1', query: 'pending'}.
URLSearchParams is a Web API that provides utility methods for manipulating the URL query parameters.

usePathname - Lets you read the current URL's pathname. For example, for the route 
/dashboard/invoices, usePathname would return '/dashboard/invoices'.

useRouter - Enables navigation between routes within client components programmatically. There are
[multiple methods](https://nextjs.org/docs/app/api-reference/functions/use-router#userouter) you can use.

#### defaultValue vs. value / Controlled vs. Uncontrolled

If you're using state to manage the value of an input, you'd use the value attribute to make it a controlled component.
This means React would manage the input's state.

However, since you're not using state, you can use defaultValue. This means the native input will manage its own state.
This is okay since you're saving the search query to the URL instead of state.

#### When to use the useSearchParams() hook vs. the searchParams prop?

You might have noticed you used two different ways to extract search params. Whether you use one or the other depends on whether you're working on the client or the server.

<Search> is a Client Component, so you used the useSearchParams() hook to access the params from the client.
<Table> is a Server Component that fetches its own data, so you can pass the searchParams prop from the page to the component.
As a general rule, if you want to read the params from the client, use the useSearchParams() hook as this avoids having to go back to the server.

#### Debouncing
is a programming practice that limits the rate at which a function can fire. In our case,we need to query the database when the user has stopped typing.

(use-debounce)[https://www.npmjs.com/package/use-debounce]











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