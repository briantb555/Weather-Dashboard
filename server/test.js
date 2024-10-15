
import express from 'express';


// Import the routes
// import routes from './routes/index.ts';
// import path from 'path';

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
// app.use(path.join(__dirname,'../client/dist'))
// TODO: Implement middleware for parsing JSON and urlencoded form data
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
// TODO: Implement middleware to connect the routes
// app.use(routes);
app.get('*',(req,res)=>{
    res.json('welcome');
})

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));