## CSR vs SSR

**How they differ.** In Client-Side Rendering (CSR), which is what a normal
Vite + React app uses, the server sends an almost empty HTML file and a big
JavaScript bundle. The browser downloads the JavaScript, runs it, and builds the
page itself. So the first load can feel slow because the user sees a blank
screen until the JavaScript is ready. In Server-Side Rendering (SSR), used by
frameworks like Next.js, the server runs React and sends back finished HTML for
each request. The user sees content quickly, and then React "hydrates" the page
to make it interactive. This means SSR needs a server that runs code on every
request, while CSR only needs static files.

**Trade-offs for an e-commerce dashboard.** For performance, SSR gives a faster
first paint and works better on slow phones or networks, but the server has more
work and page changes may need server round trips. CSR has a slower first load
but feels very fast after that because navigation happens in the browser. For
SEO, SSR is better because search engines get full HTML with product details.
CSR can be crawled by Google but it is less reliable and slower to index. For
hosting, CSR is cheap and simple because it can be put on Netlify, Vercel or
GitHub Pages as static files, while SSR needs a Node server or serverless
functions, which costs more and is harder to maintain and scale. For this
Inventory Dashboard, which is a private admin tool behind a login and does not
need SEO, CSR is a good choice. If the public product pages of the store were
being built, SSR would be better.
