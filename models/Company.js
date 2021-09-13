const mongoose = require('mongoose');
const Item = require('./Item');

const { Schema } = mongoose;

const companySchema = new Schema({
        name: {
                type: String,
                required: [true, 'Company must have a name!'],
        },
        city: {
                type: String,
        },
        email: {
                type: String,
                required: [true, 'Email required'],
        },
        items: [
                {
                        type: Schema.Types.ObjectId,
                        ref: 'Item',
                },
        ],
});

// farmSchema.post('findOneAndDelete', async function (farm) {
//         if (farm.products.length) {
//                 const res = await Product.deleteMany({ _id: { $in: farm.products } });
//                 console.log(res);
//         }
// });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
