const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();
const uri = 'mongodb+srv://admin:nv12345.@atlas.lbelsjf.mongodb.net/test';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    // Do something with the connection
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();


router.post('/', async (req, res) => {
  try {
    await client.connect();

    const cafesCollection = client.db('test').collection('cafes');
    const result = await cafesCollection.insertOne(req.body);
    console.log(`Added cafe with ID: ${result.insertedId}`);

    res.status(201).json({ message: 'cafe registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error cafe user' });
  } finally {
    await client.close();
  }
});

module.exports = router;