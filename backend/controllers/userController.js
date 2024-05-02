const crypto = require('crypto');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const con = require("../config/db")
const dotenv = require("dotenv");
dotenv.config();

const userRegisterController = async (req, res) => {
    const { email, username, password, phone } = req.body;
    if (!req.files || !req.files['profile_pic_url']) {
        return res.status(400).json({ error: "No files uploaded" });
    }

    const profile_pic_url = req.files['profile_pic_url'][0].filename;


    con.query(
        `SELECT * FROM users WHERE email = '${email}' OR username = '${username}'`,
        (error, results, fields) => {
            if (error) {
                console.error("Error checking existing user:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }


            if (results.length > 0) {
                return res.status(400).json({ error: "Email or username already in use" });
            }


            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error("Error hashing password:", err);
                    return res.status(500).json({ error: "Internal Server Error" });
                }



                console.log("Hashed Password:", hashedPassword);

                con.query(
                    `INSERT INTO users(  username,email,   phone, password, profile_pic)
            VALUES ('${username}', '${email}', ${phone}, '${hashedPassword}', '${profile_pic_url}')`,
                    (error, results, fields) => {
                        if (error) {
                            console.error("Error inserting user:", error);
                            return res.status(500).json({ error: "Internal Server Error" });
                        }


                        const userData = {
                            username: username,
                            email: email,
                            phone: phone,
                            profile_pic: profile_pic_url
                        };

                        res.status(200).json({ "msg": "Account created successfully", "user": userData });
                    }
                );
            });
        }
    );
};


const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;


        con.query(
            `SELECT * FROM users WHERE email = "${email}"`,
            (error, results) => {
                if (error) {
                    console.error("Error querying user:", error);
                    return res.status(500).json({ error: "Internal Server Error" });
                }

                if (results.length === 0) {

                    return res.status(401).json({ error: "Invalid credentials" });
                }

                const user = results[0];
                const hashedPasswordFromDatabase = user.password;


                bcrypt.compare(password, hashedPasswordFromDatabase, (err, result) => {
                    if (err) {
                        console.error("Error comparing passwords:", err);
                        return res.status(500).json({ error: "Internal Server Error" });
                    }

                    if (result) {
                        const expiresIn = 60 * 60;
                        
                        const token = jwt.sign(
                            { userId: user.id, email: user.email },
                            process.env.JWT_SECRET,
                            { expiresIn }
                        );
                        return res.status(200).json({ message: "Login successful", token });
                    } else {

                        return res.status(401).json({ error: "Invalid credentials" });
                    }
                });
            }
        );
    } catch (error) {
        console.log("error is " + error);

    }


}



module.exports = { userRegisterController, userLoginController };