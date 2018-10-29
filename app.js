const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const wineRoutes = require('./routes/wines');
const authRoutes = require('./routes/auths');
const errorHandler = require('./handlers/errors');
const { getAllWines, getOneWine } = require('./handlers/wines');

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());

//routes
app.use('/api/auth', authRoutes); 

app.get('/api/wines', getAllWines);

app.get('/api/wines/:id', getOneWine);

app.use('/api/users/:id/wines', wineRoutes); 

//error handler
app.use((req, res, next) => {
  let err = new Error('NOT FOUND');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend server running on PORT ${PORT}`);
});
