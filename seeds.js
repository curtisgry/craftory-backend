const mongoose = require('mongoose');
const Item = require('./models/Item');

mongoose.connect('mongodb://localhost:27017/craftoryDev')
        .then(() => {
                console.log('MONGO CONNECTION OPEN');
        })
        .catch((e) => {
                console.log('MONGO CONNECTION ERROR');
                console.log(e);
        });

// const p = new Product({
//         name: 'Ruby Grapefruit',
//         price: 1.99,
//         category: 'fruit',
// });

// p.save()
//         .then((p) => {
//                 console.log(p);
//         })
//         .catch((e) => {
//                 console.log(e);
//         });

// name: {
//         type: String,
//         required: [true, 'Name cannot be blank'],
// },
// upc: String,
// link: String,
// qty: {
//         type: Number,
//         required: true,
//         min: 0,
// },
// category: String,
// company: {
//         type: Schema.Types.ObjectId,
//         ref: 'Company',
// },
Item.deleteMany();

const seedItems = [
        {
                name: 'Wooden Wicks',
                upc: '20054332304',
                qty: 50,
                category: 'wicks',
        },
        {
                name: 'Cotton Wicks Small',
                upc: '200543234304',
                qty: 100,
                category: 'wicks',
        },
        {
                name: 'Small Jars',
                upc: '20057932304',
                qty: 30,
                category: 'containers',
        },
        {
                name: 'Wax',
                upc: '20054332304',
                qty: 23,
                category: 'wax',
        },
];

Item.insertMany(seedItems)
        .then((res) => {
                console.log(res);
        })
        .catch((e) => {
                console.log(e);
        });
