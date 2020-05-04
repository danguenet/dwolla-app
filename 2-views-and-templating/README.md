# Views and Templating

1. Install express-handlebars

```
npm install express-handlebars
```

2. Update app.js

```
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

```
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Dwolla App</title>
</head>

<body>

    {{{body}}}

</body>

</html>
```

The main layout is the HTML page wrapper which can be reused for the different views of the app. {{{body}}} is used as a placeholder for where the main content should be rendered.

6. In the view folder create a file called "home.handlebars" and populate it with the following

```
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
