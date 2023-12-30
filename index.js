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
    // This path resets all our jounrals everytime
    entries = [];
    res.render("index.ejs", {entries: entries});
});

// Handle post editing post request
// TODO: implement checking if blog index is valid arugment
app.post("/edit-entry/*", (req, res) => {
    const blogIndex = req.originalUrl.slice(12, req.originalUrl.length);
    res.render("index.ejs", {entries: entries, edit: entries[blogIndex], editIndex: blogIndex});
    entries.splice(blogIndex, 1);  
})

// Handle post editing post request
app.post("/delete-entry/*", (req, res) => {
    const blogIndex = req.originalUrl.slice(14, req.originalUrl.length);
    entries.splice(blogIndex, 1);
    res.render("index.ejs", {entries: entries});  
})

// Handle post submission
app.post("/submit", (req, res) => {
    // Adding submission to list of entires
    entries.push(req.body);
    res.render("index.ejs", {entries: entries});
});

// Setting up our server
app.listen(port, () => console.log("Server running on port " + port));
