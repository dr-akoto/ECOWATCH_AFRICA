const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const { MongoClient } = require('mongodb');  // Import MongoDB client

const app = express();
const port = 3000;

// Middleware to parse incoming data
app.use(bodyParser.json());

// Store real-time temperature and humidity data (initial placeholder values)
let sensorData = {
  temperature: 25,
  humidity: 50,
};

// WebSocket server setup
const wss = new WebSocket.Server({ noServer: true });

// MongoDB connection setup
const uri = 'mongodb+srv:drakotoosei:HmYPENmnF2utGDkC@ecowatch.p24qk.mongodb.net/?retryWrites=true&w=majority&appName=Ecowatch'; // Connection string (modify based on your setup)
const client = new MongoClient(uri);
let db;

// Function to broadcast data to all connected WebSocket clients
function broadcastData() {
  const data = JSON.stringify(sensorData);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// MongoDB insert function for sensor data
async function insertSensorData(temperature, humidity) {
  try {
    const collection = db.collection('sensorData'); // Specify the collection
    const result = await collection.insertOne({ temperature, humidity, timestamp: new Date() });
    console.log('Data inserted successfully:', result.insertedId);
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
  }
}

// Handle incoming POST requests from Arduino for sensor data updates
app.post('/update-sensor-data', (req, res) => {
  const { temperature, humidity } = req.body;

  if (temperature && humidity) {
    sensorData.temperature = temperature;
    sensorData.humidity = humidity;

    // Broadcast updated sensor data to clients
    broadcastData();

    // Insert sensor data into MongoDB
    insertSensorData(temperature, humidity);

    return res.status(200).send({ message: 'Data updated successfully' });
  } else {
    return res.status(400).send({ message: 'Invalid data format' });
  }
});

// Connect to MongoDB and start the server
async function startServer() {
  try {
    await client.connect();
    db = client.db('sensorDatabase'); // Specify the database name
    console.log('Connected to MongoDB');

    // Start the server
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    // Upgrade HTTP server to handle WebSocket connections
    server.on('upgrade', (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

startServer();




// var http = require('http');
// var fs = require('fs');
// var index = fs.readFileSync( 'index.html');

// var SerialPort = require('serialport');
// const parsers = SerialPort.parsers;

// const parser = new parsers.Readline({
//     delimiter: '\r\n'
// });

// var port = new SerialPort('COM3 = \Device\SmSrl',{ 
//     baudRate: 9600,
//     dataBits: 8,
//     parity: 'none',
//     stopBits: 1,
//     flowControl: false
// });

// port.pipe(parser);
// parser.on("data",function (data){
// console.log(data);

// })


// var app = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end(index);
// });

// var io = require('socket.io').listen(app);

// io.on('connection', function(socket) {
    
//     console.log('Node is listening to port');
    
// });

// parser.on('data', function(data) {
    
//     console.log('Received data from port: ' + data);
    
//     io.emit('data', data);
    
// });

// app.listen(3000);