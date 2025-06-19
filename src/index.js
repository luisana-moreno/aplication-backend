import express from 'express';
import 'dotenv/config';
import { PORT } from './config.js';
import usersRoutes from './routes/users.routes.js';
import employeeRoutes from './routes/employees.routes.js'; 
import loginRoutes from './routes/login.routes.js';
import bovineRoutes from './routes/bovine.routes.js';


const app = express();


app.use(express.json()); 

// Montar las rutas

app.use(usersRoutes);
app.use(employeeRoutes); 
app.use(loginRoutes);
app.use(bovineRoutes);

app.listen(PORT, () => {
console.log('server on port', PORT);
});
