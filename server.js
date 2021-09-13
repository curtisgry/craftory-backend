const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Company = require('./models/Company');
const Item = require('./models/Item');

mongoose.connect('mongodb://localhost:27017/craftoryDev')
        .then(() => {
                console.log('MONGO CONNECTION OPEN');
        })
        .catch((e) => {
                console.log('MONGO CONNECTION ERROR');
                console.log(e);
        });

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/home', (req, res) => {
        res.send({ title: 'Home page!' });
});
app.get('/about', (req, res) => {
        res.send({ title: 'About page!' });
});
app.get('/dashboard', async (req, res) => {
        const items = await Item.find({});
        res.send({ title: 'Dashboard page!', items });
});

app.post('/items', async (req, res, next) => {
        const item = new Item(req.body);
        await item.save();
        next();
});

app.put('/items/:id', async (req, res, next) => {
        const { id } = req.params;
        console.log(id, req.body);
        const item = await Item.findByIdAndUpdate(id, req.body);
        next();
});

app.delete('/items/:id', async (req, res, next) => {
        const { id } = req.params;
        console.log(id);
        await Item.findByIdAndDelete(id);
        next();
});
