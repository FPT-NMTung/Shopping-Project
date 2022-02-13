<div style="text-align: center">
<img src="https://res.cloudinary.com/dvuqazqqs/image/upload/v1644473486/ICON11_pzxxoj.png" height="140">

<h3>JUMBO Clothes Store</h3>

![GitHub repo size](https://img.shields.io/github/repo-size/FPT-NMTung/Shopping-Project) ![GitHub repo size](https://img.shields.io/tokei/lines/github/FPT-NMTung/Shopping-Project) ![Vercel](https://img.shields.io/github/deployments/FPT-NMTung/Shopping-Project/production?label=vercel&logo=vercel&logoColor=vercel)


</div>


## Setup

Your computer need Nodejs for run, you can install from hear: [Node.js (nodejs.org)](https://nodejs.org/en/)

Next, install TypeScript:

```
npm install -g typescript
```

Project need some connect to sendgrid, database, image cloud (cloudinary). create file `.env` with structure like:

```
CLOUDINARY_CLOUD_NAME=*********
CLOUDINARY_API_KEY=*********
CLOUDINARY_API_SECRET=*********

DB_HOST=*********
DB_USER=*********
DB_DATABASE=*********
DB_PASSWORD=*********
DB_PORT=*********

SENDGRID_API_KEY=*********

SECRET_KEY=*********
```

Done environment!

## Database

Go to this link for download [Schema](https://nmtung-my.sharepoint.com/:f:/g/personal/admin_nmtung_onmicrosoft_com/EuEsA37s1fxDhaS0A9myg7YBtK7qipJB3WpkN6teJaJOMg?e=gsP9bl).

If you got error when connect to database: `--require_secure_transport:ON`.
use this command: `SET PERSIST require_secure_transport=OFF;`

## How to start

Open terminal and run this code for install node_modules folder `npm install`

Next, start build project `tsc -w`

OK, let start server by this code `npx nodemon dist/app.js`
