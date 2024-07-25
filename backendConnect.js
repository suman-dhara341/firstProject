const mongoose = require('mongoose');

const DB = async (URL) => {
    try {
        await mongoose.connect(URL)
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error("Database connection problem:", error.message);
    }
};

module.exports = DB;
