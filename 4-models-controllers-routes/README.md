# Models, Controllers, and Routes

1. In your terminal install `bcryptjs`, `express-session`, and `connect-flash`
```
npm install bcryptjs express-session connect-flash
```

2. In the `views` folder create a folder called `partials` and add a file called `messages.handlebars`:

```javascript
{{#if errors}} {{#each errors}}
<div class="alert alert-warning alert-dismissible fade show" role="alert">
	{{msg}}
	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	</button>
</div>
{{/each}}{{/if}}
{{#if success_msg}}
<div class="alert alert-success alert-dismissible fade show" role="alert">
	{{success_msg}}
	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	</button>
</div>
{{/if}}
{{#if error_msg}}
<div class="alert alert-danger alert-dismissible fade show" role="alert">
	{{error_msg}}
	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	</button>
</div>
{{/if}}
{{#if error}}
<div class="alert alert-danger alert-dismissible fade show" role="alert">
	{{error}}
	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	</button>
</div>
{{/if}}
```

3. In the `views` folder create a file called `register.handlebars`:
```javascript
<div class="row mt-5">
	<div class="col-md-6 m-auto">
		<div class="card card-body">
			<h1 class="text-center mb-3">
				<i class="fas fa-user-plus"></i> Register
            </h1>
            {{> messages }}
			<form action="/register" method="POST">
				<div class="form-group">
					<label for="firstName">First Name</label>
					<input type="text" id="firstName" name="firstName" class="form-control" placeholder="Enter First Name"
						value="{{#if email}}{{email}}{{/if}}" />
				</div>
                <div class="form-group">
					<label for="email">Email</label>
					<input type="email" id="email" name="email" class="form-control" placeholder="Enter Email"
						value="{{#if email}}{{email}}{{/if}}" />
				</div>
				<div class="form-group">
					<label for="password">Password</label>
					<input type="password" id="password" name="password" class="form-control" placeholder="Create Password"
						value="{{#if password}}{{password}}{{/if}}" />
				</div>
				<div class="form-group">
					<label for="password2">Confirm Password</label>
					<input type="password" id="password2" name="password2" class="form-control" placeholder="Confirm Password"
						value="{{#if password2}}{{password2}}{{/if}}" />
				</div>
				<button type="submit" class="btn btn-primary btn-block">
					Register
				</button>
			</form>
			<p class="lead mt-4">Have An Account? <a href="/login">Login</a></p>
		</div>
	</div>
</div>
```

4. Create a `controllers` folder in your `server` folder. Then creat a file within it called `views.js`:

```javascript
const viewHome = (req, res) => {
    res.render("home");
}

const viewRegister = (req, res) => {
    res.render("register");
}

module.exports = {
    viewHome,
    viewRegister,
};
```

5. In the `server` folder create a file called `routes.js`:

```javascript
const express = require("express");
const router = express.Router();

const viewsController = require("./controllers/views");

// Views
router.get("/", viewsController.viewHome);
router.get("/register", viewsController.viewRegister);

module.exports = router;
```

6. In your `app.js` file, replace the following code:
```javascript
app.get("/", (req, res) => {
  res.render("home");
});
```

with this:

```javascript
const routes = require("./server/routes");
app.use("/", routes);
```

and add the following before you require the routes:

```javascript
app.use(express.urlencoded({ extended: false }));

const session = require("express-session");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

const flash = require("connect-flash");
app.use(flash());

// Global variables - passing message through session
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
```

then in your `.env` file add a session secret.

7. In your terminal run `npm run dev` and check both `http://localhost:3000/` and `http://localhost:3000/register`

8. Now let's create the login view and add the related controller and route. In the `views` folder, create `login.handlebars`:

```javascript
<div class="row mt-5">
	<div class="col-md-6 m-auto">
		<div class="card card-body">
            <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i> Login</h1>
            {{> messages }}
			<form action="/login" method="POST">
				<div class="form-group">
					<label for="email">Email</label>
					<input type="email" id="email" name="email" class="form-control" placeholder="Enter Email" />
				</div>
				<div class="form-group">
					<label for="password">Password</label>
					<input type="password" id="password" name="password" class="form-control" placeholder="Enter Password" />
				</div>
				<button type="submit" class="btn btn-primary btn-block">Login</button>
			</form>
			<p class="lead mt-4">
				No Account? <a href="/register">Register</a>
			</p>
		</div>
	</div>
</div>
```

9. Now in the `server/controllers/views.js` let's add the login function:

```javascript
const viewLogin = (req, res) => {
    res.render("login");
}
```

and don't forget to add `viewLogin` to the module export.

10. Finally in the `server/routes.js` file add the following code:
```javascript
router.get("/login", viewsController.viewLogin);
```

11. Now let's add functionality to the register page. In the `models` folder create a file called `users.js`:

```javascript
const users = (db, DataTypes) => {
    const User = db.define("users", {
      id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });  
    return User;
  };
  
  module.exports = users;
```

12. Update the `db.sequelize.sync();` line in app.js to:

```javascript
db.sequelize.sync({ force: true, logging: false }); // force: true isn't ideal for prod
```

13. In the `controllers` folder create a `register.js` file:

```javascript
const bcrypt = require("bcryptjs");

const User = require("../models").users;

const register = (req, res)  => {
    const { firstName, email, password, password2 } = req.body;
    let errors = [];
    
    if (!firstName || !email || !password || !password2) {
        errors.push({ msg: "Please enter all fields" });
    }

    if (password != password2) {
        errors.push({ msg: "Passwords do not match" });
    }

    try {
        if (password.length < 8) {
            errors.push({ msg: "Password must be at least 8 characters" });
        }
    } catch(err) {}

    if (errors.length > 0) {
        res.render("register", {
            errors,
            firstName,
            email,
            password,
            password2
        });
    } else {
        User.findOne({where: { email: email }}).then(user => {
            if (user) {
                errors.push({ msg: "Email already exists" });
                res.render("register", {
                errors,
                firstName,
                email,
                password,
                password2
                });
            } else {
                const newUser = new User({
                    firstName,
                    email,
                    password
                });
                bcrypt.genSalt(11, (_err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                        .save()
                        .then(() => {
                            req.flash(
                            "success_msg",
                            "You are now registered and can log in"
                            );
                            res.redirect("/login");
                        })
                        .catch(err => console.log(err));
                    });
                });
            }
        });
    }
}
module.exports = register;
```

14. In the routes.js file add the require the register controller:

```javascript
const registerController = require("./controllers/register");
```

and add the post to the router

```javascript
// Register
router.post("/register", registerController);
```
