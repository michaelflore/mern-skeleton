export default ({markup, css, js}) => {
    return `<!doctype html>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
                    ${css}
                    <title>MERN APP</title>
                </head>
                <body>
                    <div id="root">${markup}</div>
                    <script type="text/javascript" src="/dist/bundle.js"></script>
                    ${js}
                </body>
            </html>
            `
}