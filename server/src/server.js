const http = require('http');
const mongoose = require('mongoose');


const app = require('./app');

const {loadPlanetsData}= require('./models/planets.model')



const PORT = process.env.PORT || 8000;



const server = http.createServer(app);


const MONGO_URL = 'mongodb://localhost:27017/NASA-PROJECT'
mongoose.connection.once('open', () => {
    console.log('MongoDb connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function startServer() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await loadPlanetsData();

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT} ...`);
});
}

startServer();
