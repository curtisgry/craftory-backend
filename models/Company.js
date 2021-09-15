const mongoose = require("mongoose");
const Item = require("./Item");

const { Schema } = mongoose;

const companySchema = new Schema({
  name: {
    type: String,
    required: [true, "Company must have a name!"],
  },
  location: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email required"],
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

companySchema.post("findOneAndDelete", async function (company) {
  if (company.items.length) {
    const res = await Item.deleteMany({ _id: { $in: company.items } });
    console.log(res);
  }
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
