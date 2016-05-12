export default (content, url) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { 
            background: #fff;
            padding-bottom: 30px;
          }
          img { width: 100%; }
          pre {
            background: #eee;
            padding: 10px;
            border-radius: 3px;
            overflow-x: scroll;
          }
          blockquote {
            position: relative;
          }
          blockquote:before {
            content: '';
            position: absolute;
            left: -40px;
            width: 5px;
            height: 100%;
            background: #649F0C;
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${content}
        </div>
      </body>
    </html>

  `
}