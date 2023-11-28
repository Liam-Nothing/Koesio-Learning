const app = require('./app');
const config = require('./utils/config');
const mongoose = require('mongoose');

mongoose.connect(config.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});
