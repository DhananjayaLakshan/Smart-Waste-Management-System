const express = require('express');
const app = express();
require('dotenv').config();
const User = require('./models/userSchema');
const dbconfig = require('./config/dbConfig');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const User_routes = require('./routes/UserRouts');
const QR_routes = require('./routes/qrScanner.routes');
const Waste_router = require('./routes/wasteSchedule.routes')

app.use('/api/user', User_routes);
app.use('/api/qr', QR_routes);
app.use('/api/waste', Waste_router);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Nodemon Server started at port ${port} 🌍`));
