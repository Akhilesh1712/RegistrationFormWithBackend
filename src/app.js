const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/register");
const { log } = require("console");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
hbs.registerPartials(partials_path);

app.set("view engine", "hbs");
app.set("views" , templates_path); //ab vo views walla folder ye ho chuka hai

app.get("/", (req,res) => {
    res.render("index");
})

app.get("/register", (req,res) => {
    res.render("register");
})

app.post("/register", async (req,res) => {
    try {
        
       const  password = req.body.password;
       const  cpassword = req.body.confirmpassword;

       if(password === cpassword){
           const registeremp = new Register({
              firstname : req.body.firstname,
              email : req.body.email,
              password : req.body.password,
              confirmpassword : req.body.confirmpassword
           })
           
            const registered = await registeremp.save();
            res.status(201).render("index");
       }else{
          res.send("not matching");
       }

    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen(port, () => {
    console.log(`server is running at ${port}`);
})

