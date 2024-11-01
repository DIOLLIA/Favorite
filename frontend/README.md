## Next.js App Router Course - Starter

Stack:
 Next.js (auth)
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

### Search and pagination. Next.js APIs: useSearchParams, usePathname, and useRouter.

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

[use-debounce](https://www.npmjs.com/package/use-debounce)

### Next.js with Server Actions
Server Actions are also deeply integrated with Next.js caching. When a form is submitted through a Server Action,
not only can you use the action to mutate data, but you can also revalidate the associated cache using APIs like 
revalidatePath and revalidateTag.

['use server'](https://react.dev/reference/react/use-server) marks server-side functions that can be called from client-side code.

#### Type validation
To handle type validation we'll use Zod, a TypeScript-first validation library that can simplify this task.

#### Router Cache

Next.js has a [Client-side Router Cache](https://nextjs.org/docs/app/building-your-application/caching#router-cache)
that stores the route segments in the user's browser for a time.
Along with [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#1-prefetching),
this cache ensures that users can quickly navigate between routes while reducing the number of requests made to the server.

#### Dynamic Route Segments
Next.js allows you to create [Dynamic Route Segments](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
when you don't know the exact segment name and want to create routes based on data. This could be blog post titles,
product pages, etc. You can create dynamic route segments by wrapping a folder's name in square brackets.
For example, [id], [post] or [slug].


## Try\catch and handling all errors with error.tsx 
JavaScript's try/catch statements on Server Actions allows you to handle errors gracefully.
* "use client" - error.tsx needs to be a Client Component.
* reset: This is a function to reset the error boundary. When executed, the function will try to re-render the route segment
* error: This object is an instance of JavaScript's native Error object. \n
See the [file](./app/dashboard/invoices/error.tsx) to check implementation

#### Handling 404 errors with the notFound function
Look how it's done [here](./app/dashboard/invoices/[id]/edit/page.tsx), and import { notFound } from 'next/navigation'

NotFound will take precedence over error.tsx. That way it's possible to handle more specific errors!

## Server-side validation

Next.js includes the [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) plugin in its
ESLint config to help catch accessibility issues early. 

Add `"lint": "next lint"` to the package.json to have a possibility to run linter via `pnpm lint`.

AT - assistive technologies (client (like `required` for input) and server(custom logic for validation))

'use client' (React) lets you mark what code runs on the client.

`aria-describedby="customer-error"` This establishes a relationship between the select element and the error message container.
It indicates that the container with id="customer-error" describes the select element.
Screen readers will read this description when the user interacts with the select box to notify them of errors.

**TODO values drops on create** see the [mark](./app/lib/actions.ts)

## Authorization and Authentication

Use [next-auth](https://nextjs.authjs.dev/) and add it via pnpm

If Vercel is used, it's need to update environment variables in the Vercel project.
[This guide](https://vercel.com/docs/projects/environment-variables) explains how to add environment variables on Vercel.

#### Password hashing
It's good practice to hash passwords before storing them in a database. Hashing converts a password into a 
fixed-length string of characters, which appears random, providing a layer of security even if the user's data is exposed.

In the seed.js file, package called bcrypt is used to hash the user's password before storing it in the database.
It will be used to compare that the password entered by the user matches the one in the database.
However, it's needed to create a separate file for the bcrypt package. 
This is because bcrypt relies on Node.js APIs not available in Next.js Middleware.

#### Adding the Credentials provider
The providers option for NextAuth.js  provides an array where the list different login options such as Google or GitHub.
Here is the [Credentials provider](https://authjs.dev/getting-started/providers/credentials-tutorial) only.

The Credentials provider allows users to log in with a username and a password.

Generally it's recommended to use alternative providers such as 
* [OAuth](https://authjs.dev/getting-started/providers/oauth-tutorial)
* [email](https://authjs.dev/getting-started/providers/email-tutorial) providers.
See the [NextAuth.js docs](https://authjs.dev/getting-started/providers) for a full list of options.

AUTH_SECRET on .env is purposed to enc\dec passwords

## Metadata
Metadata plays a significant role in enhancing a webpage's SEO, making it more accessible and understandable
for search engines and social media platforms. Proper metadata helps search engines effectively index webpages,
improving their ranking in search results. Additionally, metadata like Open Graph improves the appearance
of shared links on social media, making the content more appealing and informative for users.

e.g. 
* `<title>Page Title</title>` -  Responsible for the title of a webpage that is displayed on the browser tab.
* `<meta name="description" content="A brief description of the page content." />` - This metadata provides a brief overview
of the webpage content and is often displayed in search engine results.
* `<meta name="keywords" content="keyword1, keyword2, keyword3" />` -  includes the keywords related to the webpage content,
helping search engines index the page.
* Open Graph Metadata enhances the way a webpage is represented when shared on social media platforms,
* providing information such as the title, description, and preview image.
`<meta property="og:title" content="Title Here" />`
`<meta property="og:description" content="Description Here" />`
`<meta property="og:image" content="image_url_here" />`
* Favicon Metadata links the favicon (a small icon) to the webpage, displayed in the browser's address bar or tab.
`<link rel="icon" href="path/to/favicon.ico" />`

Next.js has a range of special files that are specifically used for metadata purposes:

favicon.ico, apple-icon.jpg, and icon.jpg: Utilized for favicons and icons
opengraph-image.jpg and twitter-image.jpg: Employed for social media images
robots.txt: Provides instructions for search engine crawling
sitemap.xml: Offers information about the website's structure

#### Inheritance meta
By include a metadata object from any layout.js or page.js file it will add additional page information
like title and description. Any metadata in layout.js will be inherited by all pages that use it. (see app/layout.tsx)
