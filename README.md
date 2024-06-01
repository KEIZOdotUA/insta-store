# instaShop
Sample React + Vite application created for learning purposes.

# Prerequisites
Running the application requires storage with file `products.json`:
```
[
    {
        "id": number,
        "name": string,
        "price": number,
        "description": string,
        "available": bool
    }
    ...
]
```
or you can create a local file in `public` folder.

# Running the sample locally
Add basic project settings to the `whitelabel.json` file in `public` folder:
```
{
  "shop": {
    "name": string,
    "description": string,
    "bulletPoints": string[],
    "logo": string
  },
  "storageUrl": string,
  "instagramProfile": {
    "name": string,
    "url": string
  },
  "productsSrc": string
}

```

Run:
```
    npm run dev
```
Now you should be able to browse to http://localhost:5173/
