const express = require("express");
const urlRoute = require("./routes/url");
const path = require("path");
const { connectDB } = require("./connection");
const { GenerateShortId } = require("./controllers/url");
const Url = require("./models/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user")
const cookieParser = require("cookie-parser");
const {restrictedToLoggedUserOnly, checkForAuthentication} = require("./middlewares/auth")

const app = express();
const PORT = 8001;

// ✅ Middleware first
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))
app.use(express.json());  
app.use(cookieParser())


app.use(express.urlencoded({ extended: true })); // optional

//Rending home page



// DB connection
connectDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("MongoDB Connected");
});

// Routes
app.use("/", staticRoute)
app.use("/url", checkForAuthentication, urlRoute);
app.use("/user", userRoute);
app.post("/url", GenerateShortId);

app.get("/:shortId", async (req, res) =>{
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate({
        shortId : shortId,
    }, { $push : {
            visitHistory : {
                timestamp : Date.now(),
            }
        }
    }, {new : true});
    res.redirect(entry.redirectUrl);
    })


app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});
