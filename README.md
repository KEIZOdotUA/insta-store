# instaShop
Sample React + Vite application created for learning purposes.

# Prerequisites
Running the application requires blob storage with file `products.json`:
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
  "blobStorageUrl": string,
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
