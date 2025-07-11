require("dotenv").config();
let mongoose = require("mongoose")
let express = require("express")
let cors = require("cors")
const rt = require("./routee/rte")
let bodyParser = require("body-parser")

let app=express()
app.use(express.json())
app.use(bodyParser.urlencoded({"extended":true}))
const corsOptions = {
  origin: ["https://shop-cycle.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "uid"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use("/simgs",express.static("./shopimgs"))
app.use("/",rt)
app.get("/health", (req, res) => {
  res.send("Backend is healthy");
});


mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.log("MongoDB error:", err.message);
});

// ✅ Use PORT from .env or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});