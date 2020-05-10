# Views and Templating

1. Install express-handlebars

```
npm install express-handlebars
```

2. Update app.js

```javascript
const express = require("express");
var exphbs = require("express-handlebars");

const app = express();
const port = 3000;

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", function (req, res) {
  res.render("home");
});

app.listen(port, () =>
  console.log(`Dwolla App listening at http://localhost:${port}`)
);
```

3. Create a folder in the root of the project called "views"
4. Create a folder within the views folder called "layouts"
5. Within the layouts folder create a file called "main.handlebars" and populate it with the following

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
      integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://bootswatch.com/4/litera/bootstrap.min.css"
    />
    <title>Dwolla Project</title>
  </head>

  <body>
    <div class="container mt-4">
      {{{body}}}
    </div>

    <script
      src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
      integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
```

The main layout is the HTML page wrapper which can be reused for the different views of the app. {{{body}}} is used as a placeholder for where the main content should be rendered.

6. In the view folder create a file called "home.handlebars" and populate it with the following

```html
<h1>Hello World</h1>
```

The content for the app's home view which will be rendered into the layout's {{{body}}}.

7. Install Nodemon

```
npm install --save-dev nodemon
```

8. In package.json replaced the test script with the following

```
"dev": "nodemon app"
```

9. in your terminal run `npm run dev`

## Resources

- https://www.npmjs.com/package/express-handlebars
- https://www.npmjs.com/package/nodemon
- https://expressjs.com/en/starter/static-files.html
