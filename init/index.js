const dns = require("dns");
const path = require("path");
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// 1. Force Google DNS to bypass college network blocks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// 2. Use a safer path for .env so it works from any folder
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const MONGO_URL = process.env.ATLASDB_URL;

async function main() {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj) => ({
            ...obj,
            owner: "6a06498353cc9ac9f3655e57",
            category: "Other",
            amenities: [],
            maxGuests: 2,
            contactEmail: "",
        }));
        await Listing.insertMany(initData.data);
        console.log("Data was initialized successfully!");
    } catch (err) {
        console.error("Error while seeding data:", err);
    }
};

// 3. Properly await the seeding before closing the connection
main()
    .then(async () => {
        console.log("Connected to DB");
        await initDB(); 
        mongoose.connection.close();
        console.log("Connection closed.");
    })
    .catch(err => console.log("Main Error:", err));