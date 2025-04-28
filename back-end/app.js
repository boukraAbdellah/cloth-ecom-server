const express = require('express');
const cors = require('cors');

const app = express();

// Import routes
const mediaRoutes = require('./routes/media.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const shippingRoutes = require('./routes/shipping.routes');
const orderRoutes = require('./routes/order.routes');
const adminRoutes = require('./routes/admin.routes');

app.use(cors());

app.use(express.json());

app.use("/api/media", mediaRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth/admin", adminRoutes);

module.exports = app;