import express from "express";

// Defining our constants
const app = express()
const port = 3000;

// Defining the list of entries as objects with two attributes: title and content
let entries = []; 

// Inlcude static files in the public folder
app.use(express.static("public"));
app.use(express.urlencoded({ extended:true }));

// Home page route
app.get("/", (req, res) => {
    res.render("index.ejs");
});

// Handle post submission
app.post("/", (req, res) => {
    console.log("Subitting")
    // Adding submission to list of entires
    entries.push(req.body);
    res.render("index.ejs", {entries: entries});
});


// Setting up our server
app.listen(port, () => console.log("Server running on port " + port));
