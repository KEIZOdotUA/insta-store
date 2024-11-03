## Disclaimer

This project is created for learning purposes and may not follow best practices. It is intended to help understand and experiment with various technologies and concepts. Use it at your own risk and discretion. Contributions and suggestions for improvement are welcome.

## Project Idea

This project was developed as a sample website for small stores that primarily operate on Instagram. The goal is to provide these stores with a simple and functional website to showcase their products and expand their online presence.

## Tools and Libraries

- React
- Vite
- ESLint
- Axios
- Prop-Types
- Vitest
- ReactRouter

# Running the sample locally

For the cost optimizations and avoiding cold starts instead of `products` and `categories` API calls are used json files which stored in Azure Blob container, but for running sample locally by default is used `/public/blob-stub` files.

Run:
```
    npm run dev
```
Now you should be able to browse to http://localhost:5173/
