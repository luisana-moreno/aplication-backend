import express from 'express';
import { PORT } from './config.js';
import usersRoutes from './routes/users.routes.js';
import employeeRoutes from './routes/employees.routes.js'; 
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(express.json()); 

// Montar las rutas
app.use(usersRoutes);
app.use(employeeRoutes); 

app.listen(PORT, () => {
console.log('server on port', PORT);
});
