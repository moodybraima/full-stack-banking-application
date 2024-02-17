var mongoose = require('mongoose');
var express = require("express");
var usermodel = require("./model/user.js");
var cors = require("cors");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

var app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://mahmoudbraima:Koumra01@cluster0.fsysrmp.mongodb.net/badbank?retryWrites=true&w=majority")
    .then(() => console.log("Database connected....."))
    .catch(() => console.log("error deducted...."))

app.post("/createAccount",
    body('name').isLength({ min: 3 }),
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password', "Incorrect password").isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);
        try {
            const { name, email, password } = req.body;
            let exist = await usermodel.findOne({ email });
            if (exist) {
                return res.status(400).json({ message: 'Username already exists', success: false });
            }
            let newUser = new usermodel({
                name, email, password: secPassword
            })
            await newUser.save();
            return res.status(201).json({ message: 'User registered successfully', success: true });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false })
        }
    })

app.post("/login",
    // username must be an email 
    body('email').isEmail(),
    // password must be at least 5 chars long 
    body('password', "Incorrect password").isLength({ min: 5 }), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, password } = req.body;
            if (!email) {
                setStatus('Error: enter' + label);
                setTimeout(() => setStatus(''), 3000);
                return false;
            }
            let exist = await usermodel.findOne({ email });
            if (!exist) {
                return res.status(400).json({ errors: "Sorry, the email is not registered. Please try again or create an account." })
            }
            bcrypt.compare(password, exist.password, (err, result) => {
                if(err){
                    return res.json(404).json({ msg: "something is wrong" })
                }
                if (result) {
                    const payload = { user: { id: exist.id } }
                    const authToken = jwt.sign(payload, "jwtSecretKey")
                    return res.json({ success: true, authToken: authToken });
                }
                else {
                    return res.status(400).json({ errors: "Try logging with correct credentials"})
            } 
        })}
    catch (err) {
    console.log(err)
    return res.status(400).json({ success: false })
} 
}
)

app.post("/deposit",
    // username must be an email
    body('email').isEmail(), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, amount } = req.body;
            if (!email) {
                setStatus('Error: enter' + label);
                setTimeout(() => setStatus(''), 3000);
                return false;
            }

            var balanceamount = Number(amount);

            await usermodel.findOneAndUpdate({ email }, { $inc: { balance: balanceamount } }, { returnOriginal: false });

            let updateduser = await usermodel.findOne({email});

            return res.status(200).json({ success: true, userbalance : updateduser.balance});
        }
        catch (err) {
            console.log(err)
            return res.status(400).json({ success: false })
        }
    })

app.post("/withdraw",
    // username must be an email
    body('email').isEmail(), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, amount } = req.body;
            if (!email) {
                setStatus('Error: enter' + label);
                setTimeout(() => setStatus(''), 3000);
                return false;
            }

            let user = await usermodel.findOne({email})

            var balanceamount = Number(amount);
            if (balanceamount > user.balance ){
                return res.json({success:false})
            }
            else{

            await usermodel.findOneAndUpdate({ email }, { $inc: { balance: -balanceamount } }, { returnOriginal: false });
            let updateduser = await usermodel.findOne({email});
            return res.status(200).json({ success: true, userbalance: updateduser.balance });

        }}
        catch (err) {
            console.log(err)
            return res.status(400).json({ success: false })
        }
    })

app.listen(3010, () => console.log("server strted nd running....."));
