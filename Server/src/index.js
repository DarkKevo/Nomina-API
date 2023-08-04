import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { routes } from './routes/routes.js';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import upload from './middleware/multer.js';

//Dotenv Configuration
dotenv.config({ path: './.env' });

//Swagger Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Swagger API
import SwaggerUI from 'swagger-ui-express';
import SwaggerJsDoc from 'swagger-jsdoc';

//Salt Configuration
export const SaltRounds = process.env.GENSALT;

//Token
export const token = process.env.TOKEN;

//Password
export const Password = process.env.ADMINISTRATOR_AUTORIZATION;

const swagerSpect = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Api-Nomina',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [`${path.join(__dirname, './docs/documentation.js')}`],
};

//Deployment
import './Db/DeployDatabase.js';

const app = Express();

//Many Config
let port = process.env.PORT;

//Use APP
app.use(cors());
app.use(upload.single('imageURL'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);
app.use('/Documentation', SwaggerUI.serve, SwaggerUI.setup(SwaggerJsDoc(swagerSpect)));

//APP set
app.set('port', port);

app.listen(app.get('port'), () => {
  console.log(`[Running] - PORT: ${port}`);
});
