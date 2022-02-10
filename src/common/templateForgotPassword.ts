const TemplateForgotPassword = (email: string, code: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet">
    <style>
        .body {
            background-color : #EFF2F7;
            font-family      : "Sarabun", Helvetica, Arial, sans-serif;
            color            : #333333;
            padding          : 20px 40px;

            align-items      : center;
            width            : fit-content;
            margin           : 0 auto;
        }

        h1, h2, h3, h4, h5, h6, p, td {
            margin  : 0;
            padding : 0;

            color   : #7a7a7a;
        }

        .content {
            background-color : white;
            padding          : 20px 30px;
            border-radius    : 20px;
            box-shadow       : 0 0 20px #ececec;

            width            : 450px;
            margin           : 20px 0;
        }

        .copyright {
            width  : 500px;
            margin : 20px 0;
        }

        .copyright > p {
            text-align: center;
            font-size : 10px;
        }

        .title__welcome {
            text-align : center;
        }

        .header__title > img {
            float : right;
        }

        .header__title__summary > h1 {
            font-size : 17px;
        }

        .img__logo {
            text-align     : center;
            padding-bottom : 20px;
        }

        .img__logo > img {
            width : 100px;
        }

        .title {
            font-size: 26px;
            margin-bottom: 10px;
        }

        .param {
            font-size: 14px;
            margin: 10px 0;
        }

        .code {
            background-color : #e7e7e7;
            color: black;
            font-weight: bolder;
            text-align: center;
            padding: 30px;
            font-size: 24px;
        }
    </style>
</head>
<body>
    <div class="body">
        <h2 class="title__welcome">Welcome!</h2>
        <div class="content">
            <div class="img__logo">
                <img
                        src="https://res.cloudinary.com/dvuqazqqs/image/upload/v1644473486/ICON11_pzxxoj.png" alt="">
                <h4>JUMBO Clothes Store</h4>
            </div>
            <hr>
            <div class="content__body">
                <h1 class="title">Complete forgot password</h1>
                <p class="param">Please enter this confirmation code in the window where you forgot your password:</p>
                <p class="code">${code}</p>
                <p class="param">If you didn't forget password an account in JUMBO Clothes Store, please ignore this email.</p></p>
            </div>
        </div>
        <div class="copyright">
            <p>This message was sent to ${email} by JUMBO Clothes Store. To make sure you receive our
                updates, add JUMBO Clothes Store to your address book or safe list.</p>
            <br>
            <p>JUMBO Clothes Store, Hoa Lac High Tech Park, Hanoi, Vietnam.</p>
        </div>
    </div>
</body>
</html>`
}

export default TemplateForgotPassword