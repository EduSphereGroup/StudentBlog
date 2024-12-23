import express from 'express';
import routes from './utils/routes/routes';

const app = express();

app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);                                                    
});

