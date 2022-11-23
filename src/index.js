const express = require('express');

const cors = require('cors');

const zonesRouter = require('./routes/zonesRoutes');
const chatsRouter = require('./routes/chatsRoutes');
const messagesRouter = require('./routes/messagesRoutes');
const departmentsRouter = require('./routes/departmentsRoutes');
const breedsRouter = require('./routes/breedsRoutes');
const postsRouter = require('./routes/postsRoutes');
const usersRouter = require('./routes/usersRoutes');
const imagesRouter = require('./routes/imagesRoutes');
const authRouter = require('./routes/authRoutes');

const helmet = require('helmet');
const morgan = require('morgan');
const fileUpload = require ('express-fileupload');
require('dotenv').config();


const mongoose = require('mongoose');

const app = express();
// adding Helmet to enhance your API's securitys
app.use(helmet());
// enabling CORS for all requests

app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmpImages/'
}));

const PORT = process.env.PORT || 3000;
mongoose.connect(
    process.env.BD_URI
    ).then(() => console.log('conected to mongoDB')).catch((error) => console.log(error));


//cuando se hace una petición en expres, pasa por todos estos use hasta que llega al correspondiente. Por eso el orden importa.
app.use(express.json({limit: '50mb'}));//bodyparser, en resumen toca un poco la request agregandole x ejemplo req.body entre otros.
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
//el usar la ruta asi me permite que en las routes pueda poner rutas sin depender de la version.

const apiVersion = '/api/v1';
const {authValidate} = require('./middlewares/auth');

app.use(apiVersion+'/zones', authValidate, zonesRouter);
app.use(apiVersion+'/chats', authValidate,chatsRouter);
app.use(apiVersion+'/messages', authValidate, messagesRouter);
app.use(apiVersion+'/departments', departmentsRouter);
app.use(apiVersion+'/breeds', authValidate, breedsRouter);
app.use(apiVersion+'/posts', authValidate, postsRouter);
app.use(apiVersion+'/users', authValidate, usersRouter);
app.use(apiVersion+'/login', authRouter);
app.use(apiVersion+'/images', authValidate, imagesRouter);

app.listen(PORT, () => {console.log('server listening on port ' + PORT)})