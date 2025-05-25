const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASSWORD;
const mongoUri = process.env.MONGO_URI || `mongodb://${mongoUser}:${mongoPass}@mongodb-service:27017`;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number
});
const Item = mongoose.model('Item', itemSchema);

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

app.put('/items/:id', async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.listen(3000, () => console.log('App running on port 3000'));