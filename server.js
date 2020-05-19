const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 3001;

// const routes = require("./routes");
const users = require("./routes/api/users");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
// app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3");

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});