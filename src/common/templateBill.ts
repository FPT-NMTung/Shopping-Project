const TemplateBill = (elements: any) => {
  let tax = 0;
  let total = 0;

  const array = elements.map((element: any) => {

    total += element['price'] * element['quantity']

    return `
    <table>
      <tr class="abc">
        <td class="bill_title">${element['name']}</td>
        <td class="bill_detail">$ ${element['price'].toFixed(2) * element['quantity']}</td>
      </tr>
      <tr class="def">
        <td class="bill_title">Quantity</td>
        <td class="bill_detail">${element['quantity']}</td>
      </tr>
    </table>
    `
  })

  const template = array.join('<hr>')
  tax = total * 0.1

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

        .header,
        .content {
            background-color : white;
            padding          : 20px 30px;
            border-radius    : 20px;
            box-shadow       : 0 0 20px #ececec;

            width            : 450px;
            margin           : 20px 0;
        }

        .header__title__summary {
            width: 70%;
            float: left;
        }

        .header__title > img {
            float: right;
        }

        .header__title__summary > h1 {
            font-size : 17px;
        }

        .header__title__summary__money {
            margin      : 5px 0;

            color       : black;

            font-size   : 28px;
            font-weight : 800;
        }

        .header__title__summary__date {
            padding-bottom : 10px;
        }

        .header__card > table {
            width : 100%;
        }

        .header__card__value,
        .header__card__name {
            padding : 3px 0;
        }

        .header__card__value {
            text-align : right;
        }

        .content h2 {
            margin-bottom : 10px;
        }

        .content table {
            width : 100%;
        }

        .abc > td {
            color       : black;
            font-weight : bolder;
            font-size   : 18px;
        }

        .def > td {
            font-size : 13px;
        }

        .bill_detail {
            text-align : right;
        }
    </style>
</head>
<body>
    <div class="body">
        <div class="header">
            <div class="header__title">
                <div class="header__title__summary">
                    <h1>Receipt from (JUMBO Clothes Store)</h1>
                    <p class="header__title__summary__money">$ ${total + tax}</p>
                    <p class="header__title__summary__date">Paid August 7, 2022</p>
                    <hr>
                </div>
                <img src="https://img.icons8.com/dotty/80/DADADA/paid-bill.png"/>
            </div>
            <div class="header__card">
                <table>
                    <tr>
                        <td class="header__card__name">
                            <p>Card Number:</p>
                        </td>
                        <td class="header__card__value">
                            <p>**** **** **** 3456</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="header__card__name">
                            <p>Card Holder:</p>
                        </td>
                        <td class="header__card__value">
                            <p>Nguyen Manh Tung</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="header__card__name">
                            <p>Expiration Date:</p>
                        </td>
                        <td class="header__card__value">
                            <p>08/22</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="content">
            <h2>Order Summary</h2>
            ${template}
            <br>
            <br>
            <table>
                <tr class="abc">
                    <td class="bill_title">Subtotal</td>
                    <td class="bill_detail">$ ${total}</td>
                </tr>
                <tr class="def">
                    <td class="bill_title">Tax</td>
                    <td class="bill_detail">$ ${tax}</td>
                </tr>
            </table>
            <hr>
            <table>
                <tr class="abc">
                    <td class="bill_title">Total</td>
                    <td class="bill_detail">$ ${total + tax}</td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>`
}

export default TemplateBill