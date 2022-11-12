const express = require('express');

const cors = require('cors');

const v1PostsRouter = require('./v1/routes/postsRoutes');
const v1UsersRouter = require('./v1/routes/usersRoutes');

const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();



const mongoose = require('mongoose');

const app = express();
// adding Helmet to enhance your API's securitys
app.use(helmet());
// enabling CORS for all requests

app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

const PORT = process.env.PORT || 3000;
mongoose.connect(
    process.env.BD_URI
    ).then(() => console.log('conected to mongoDB')).catch((error) => console.log(error));


//cuando se hace una petición en expres, pasa por todos estos use hasta que llega al correspondiente. Por eso el orden importa.
app.use(express.json({limit: '50mb'}));//bodyparser, en resumen toca un poco la request agregandole x ejemplo req.body entre otros.
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
//el usar la ruta asi me permite que en las routes pueda poner rutas sin depender de la version.

app.use('/api/v1/posts', v1PostsRouter);

app.use('/api/v1/users', v1UsersRouter);


app.listen(PORT, () => {console.log('server listening on port ' + PORT)})