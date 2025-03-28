let express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
let app = express();

// console.log("Hello World");

// app.get("/", (req, res) => {
//     res.send("Hello Express")
// })

app.use("/public", express.static(__dirname + "/public"))

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next()
})


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

// app.get("/json", (req, res) => {
//     res.json({"message": "Hello json"})
// })

//#7
app.get("/json" , (req, res) => {
    if (process.env["MESSAGE_STYLE"] == "uppercase") {
        res.json({"message": "HELLO JSON"})
    } else 
    res.json({"message": "Hello json"})
})

//#8
app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({"time": req.time});

});

//#9
app.get("/:word/echo", (req, res) => {
    res.json({ echo: req.params.word })
})


//#10
app.get("/name", (req, res) => {
    res.json({ name: req.query.first + " " + req.query.last })
});


 module.exports = app;
