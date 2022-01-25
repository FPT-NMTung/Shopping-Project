![GitHub repo size](https://img.shields.io/github/repo-size/FPT-NMTung/Shopping-Project) ![GitHub repo size](https://img.shields.io/tokei/lines/github/FPT-NMTung/Shopping-Project) ![Vercel](https://img.shields.io/github/deployments/FPT-NMTung/Shopping-Project/production?label=vercel&logo=vercel&logoColor=vercel)

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
```

Done environment!

## How to start

Open terminal and run this code for install node_modules folder `npm install`

Next, start build project `tsc -w`

OK, let start server by this code `npx nodemon dist/app.js`
