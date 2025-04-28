const mongoose = require('mongoose');

require('dotenv').config();

const app = require('./app');

mongoose
  .connect(
    process.env.MONGODB_URI,
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
} );

