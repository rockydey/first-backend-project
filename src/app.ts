import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/Student/student.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;

// => Module Pattern
/*
  Interface => Schema => Model => DB Query
  .interface.ts => .model.ts (Schema + Model) => .route.ts => .controller.ts => .service.ts

  1. client =>(req) route.ts
  2. route.ts =>(req) controller.ts
  3. controller.ts =>(req) service.ts
  4. service.ts =>(req) DB Query
  5. DB Query =>(res) service.ts  
  6. service.ts =>(res) controller.ts
  7. controller.ts =>(res) client
*/

// => Mongoose Static Methods
/*
  schema => statics => model => call on model
*/

// => Mongoose Instance Methods
/*
  schema => methods => model => instance => call on instance
*/
