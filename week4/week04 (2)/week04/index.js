// open integrated terminal 
// npm init -y 
// npm i express nodemon
// add type module to package.json 



import epxress from "express";

const app = express();
const logger = (req, res, next) => {
        console.log(res.url)
        console.log(res.method)
        console.log(Date())
        next();
}

const newMiddleware = (req,res, next) => { //
    console.log("hello")
    next();
}

app.use(logger); // throughout thr app

app.get("/", logger, (req,res)=> { // specific routing 
    console.log(res.url)
    console.log(res.method)
    console.log(Date())
    res.send("Welcome to the server") 

});

app.get("/about", (req,res)=>{
    console.log(res.url)
    console.log(res.method)
    console.log(Date())
    res.send("Welcome to the server")
});

app.listen(3000);


/* 

User Table

/user/all -> get all user info
/user/profile/id -> set up Auth function 

*/