import express, { json } from "express" 
import mysql from "mysql"
import cors from 'cors'

import bcrypt from 'bcrypt' ;

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

app.post("/myReview", (req, res) => {
    const { customerID } = req.body;
    const q = "SELECT customers.*, reviews.* FROM customers INNER JOIN reviews ON customers.customerID = reviews.customerID WHERE customers.customerID = ? ;";
    db.query(q, [customerID], (error, data) => {
      if (error) {
        return res.json({ code: 500, message: "An error occurred." });
      }
      return res.json(data);
    });
});

app.listen(8800, () => {
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const q = "SELECT * FROM customers WHERE email = ?;";

    console.log(q);
    db.query(q, [email], async (error, data) => {
        if (error) {
            return res.json({ code: 500, message: "An error occurred." });
        }

        if (data.length === 0) {
            return res.json({ code: 409, message: 'No customer found with the provided credentials' });
        }

        const user = data[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            return res.json({ code: 200, customer: user });
        } else {
            return res.json({code: 408, message: 'Wrong password' });
        }
    });
});

app.post("/signup", (req, res) => {
    const { email, password, name } = req.body;
    const checkQuery = "SELECT COUNT(*) AS count FROM customers WHERE email = ?;";

    db.query(checkQuery, [email], async (error, results) => {
        
        if (error) {
            return res.json({ code: 500, message: "An error occurred." });
        }
      
        const count = results[0].count;
    
        if (count > 0) {
            return res.json({ code: 409, message: "Email already exists." });
        } else {
            const insertQuery = "INSERT INTO customers (email, password, name) VALUES (?, ?, ?);";
            const hash = await bcrypt.hash(password, 13);
            db.query(insertQuery, [email, hash, name], (error, results) => {
                
            if (error) {
                return res.json({ code: 500, message: "An error occurred." });
            }
    
            return res.json({ code: 200, message: "User created successfully." });
        });
        }
    });
});
  
app.post("/postReview", (req, res) => {
    const { customerID, review, reviewTitle, stars } = req.body;
    const insertionQuery = "INSERT INTO reviews (customerID, review, reviewTitle, stars) VALUES (?, ?, ?, ?);";
    const countQuery = "SELECT COUNT (*) AS count FROM reviews WHERE customerID = ?;";
    
    db.query(countQuery, [customerID], (error, result) => {
        if (error) {
            return res.json({ code: 500, message: "An error occured" });
        }

        const count = result[0].count;
        if (count > 0) {
            return res.json({ code: 409, message: "You already wrote a review!" });
        }
        else {
            db.query(insertionQuery, [customerID, review, reviewTitle, stars], (error, results) => {
                if (error) {
                    return res.json({ code: 500, message: "An error occurred." });
                }
        
                return res.json({ code: 200, message: "Review successfully added!" });
            });
        }
    })
});

app.post("/editReview", (req, res) => {
    const { customerID, reviewTitle, review, stars } = req.body;
    const q = "UPDATE reviews SET review = ?, reviewTitle= ?, stars = ? WHERE customerID = ?;"

    db.query(q, [review, reviewTitle, stars, customerID], (error, result) => {
        if (error) {
            return res.json({ code: 500, message: "An error occured" });
        }

        return res.json({ code: 200, message: "Review successfully added!" });
    });
});