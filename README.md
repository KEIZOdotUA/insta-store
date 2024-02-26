# instaShop
Sample React + Vite application created for learning purposes.

# Prerequisites
Running the application requires blob storage with files:
- `logo.png`
- products images in format `m-{id}.png` for medium size
- products images in format `l-{id}.png` for large size
- `products.json`
```
[
    {
        "id": 0,
        "name": "",
        "price": 0,
        "description": ""
    }
    ...
}
```

# Running the sample locally
Add basic project settings to the `whitelabel.json` file in `public` folder:
```
{
    "shop": {
        "name": "",
        "description": ""
    },
    "blobStorageUrl": "",
    "instagramProfile": {
        "name": "",
        "url": ""
    }   
}
```

Run:
```
    npm run dev
```
Now you should be able to browse to http://localhost:5173/