require('dotenv').config();

module.exports = {
    MONGO_URL: process.env.MONGODB_URI,
    PORT: process.env.PORT || 3003
};
