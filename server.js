const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cors = require('cors');
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors(), function (req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
});

app.get('/home', (req, res) => {
        res.send({ title: 'Home page!' });
});
app.get('/about', (req, res) => {
        res.send({ title: 'About page!' });
});
app.get('/nav', async (req, res) => {
        const companies = await Company.find();
        res.send({ companies });
});
app.get('/dashboard/:id', async (req, res) => {
        const { id } = req.params;
        const company = await Company.findById(id);
        const items = await Item.find().populate('company');
        const filtered = items.filter((item) => item.company.name === company.name);
        res.send({ filtered, company });
});

app.post('/company', async (req, res) => {
        const newCompany = new Company(req.body);
        await newCompany.save();
});

app.post('/search/:id', async (req, res, next) => {
        const { id } = req.params;
        const { search } = req.body;
        const key = new RegExp(search, 'i');
        try {
                const items = await Item.find({
                        name: key,
                        company: id,
                });
                res.send(items);
        } catch (e) {
                next(e);
        }
});

app.post('/items', async (req, res, next) => {
        const item = new Item(req.body);
        const company = await Company.findById(req.body.company);
        company.items.push(item);
        await item.save();
        await company.save();
        next();
});

app.put('/items/:id', async (req, res, next) => {
        const { id } = req.params;
        await Item.findByIdAndUpdate(id, req.body);
        next();
});
app.put('/company/:id', async (req, res, next) => {
        const { id } = req.params;
        await Company.findByIdAndUpdate(id, req.body);
        next();
});

app.delete('/items/:id', async (req, res, next) => {
        const { id } = req.params;
        await Item.findByIdAndDelete(id);
        next();
});
app.delete('/company/:id', async (req, res, next) => {
        const { id } = req.params;
        await Company.findByIdAndDelete(id);
        next();
});
