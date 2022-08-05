import express, {json} from 'express';
import routes from "./routes";

const app = express();

app.use(json());
app.use(routes);

app.listen(7474, () => {
   console.log("Server's up on port 7474!");
});
