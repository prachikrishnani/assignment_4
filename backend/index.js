const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const mysql = require('mysql2')
require("dotenv").config();
dotenv.config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json())
app.use(cors())

let conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});



app.get("/customers", (req, res) => {
    conn.query(`select * from customer_data`, (err, result) => {
        if (!err) {
            res.send(result).status(200);
        } else {
            console.log(err.message);
        }
    });
});

app.get('/customers/:email', (req, res) => {
    let email = req.params.email
    conn.query(`select * from customer_data where email='${email}'`, (err, result) => {
        if (err) console.log(err);
        else res.send(result).status(200)
    })
})


app.delete('/customers/remove/:email', (req, res) => {
    let email = req.params.email
    conn.query(`delete from customer_data where email='${email}'`, (err, result) => {
        if (err) console.log(err);
        else {
            res.send(result).status(200)
            console.log('item deleted')
        }
    })
})


app.post('/customers/customer', (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.send("please fill all details")
    }
    

    conn.query(`insert into customer_data (name,email,phone) values ('${name}','${email}',${phone}) `, (error, result) => {
        if (error) {
            console.log(error.message);
            return res.send(error.message)
        }
        else {
            console.log(result);
            return res.send(result).status(200)
        }
    })
})



app.listen(port, () => {
    console.log(`connected to ${port}`);
})
