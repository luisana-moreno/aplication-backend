import express from 'express';
import 'dotenv/config';
import { PORT } from './config.js';
import usersRoutes from './routes/users.routes.js';
import employeeRoutes from './routes/employees.routes.js'; 
import loginRoutes from './routes/login.routes.js';
import bovineRoutes from './routes/bovine.routes.js';
import clientRoutes from './routes/client.routes.js';
import registerRoutes from './routes/register.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import cors from "cors";


const app = express();


app.use(express.json()); 
app.use(cors());
// Montar las rutas

app.use(usersRoutes);
app.use(employeeRoutes); 
app.use(loginRoutes);
app.use(bovineRoutes);
app.use(clientRoutes);
app.use(registerRoutes);
app.use("/dashboard", dashboardRoutes);


app.listen(PORT, () => {
console.log('server on port', PORT);
});
