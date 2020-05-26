# Authentication

1. In your terminal install `passport` and `passport-local`.

```
npm install passport passport-local
```

2. In your `config` folder create a file called `passport.js`:

```javascript
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models").users;

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: "That email is not registered" });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
  });
};
```

3. Then in the same `config` folder create a file called `auth.js`:

```javascript
module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/login");
  },
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }
};
```

4. Right before the routes in the `app.js` file put the following code:

```javascript 
const passport = require("passport");
require("./server/config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());
```

5. In the `routes.js` file within the `server` folder add the following code:

```javascript
const { ensureAuthenticated, forwardAuthenticated } = require("./config/auth");
```

And update the view for the home page to:

```javascript
router.get("/", ensureAuthenticated, viewsController.viewHome);
```

6. Now in your terminal `npm run dev` and try to navigate to `http://localhost:3000/` and it should redirect you to the login page.

7. Now let's make logging in possible. In the `controllers` folder, create a file called login.js:
```javascript
const passport = require("passport");

const login = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);
}

module.exports = login;
```

8. In the `routes.js` within the `server` folder remember to add these pieces of code:
```javascript
const loginController = require("./controllers/login");
```

and

```javascript
router.post("/login", loginController);
```

9. Now try to register a user and then login with them. Each time you restart your local environment you have to recreate the users as the database is dropped.