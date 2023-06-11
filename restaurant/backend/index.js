import express, { json } from "express" 
import mysql from "mysql"
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Michali66!",
    database: "test"
})

app.get("/", (req, res) => {
    res.json("Hello from backend"); 
})

app.use(express.json());
app.use(cors());

app.get("/sandwiches", (req, res) => {
    const q = "SELECT * FROM sandwiches";
    db.query(q, (error, data) => {
        if (error)
            return res.json(error);
        return res.json(data);
    });
})

app.post("/sandwiches", (req, res) => {
    const q = "INSERT INTO sandwiches (`title`, `desc`, `price`, `image`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.image,
    ];

    db.query(q, [values], (err, data) => {
        if (err)
            return res.json(err);
        return res.json(data);
    })
})

app.get("/reviews", (req, res) => {
    const q = "SELECT * FROM customers INNER JOIN reviews ON customers.customerID = reviews.customerID;";
    db.query(q, (error, data) => {
        if (error)
            return res.json(error);
        return res.json(data);
    });
});
app.listen(8800, () => {
})