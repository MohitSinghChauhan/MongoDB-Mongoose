const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/MyData", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Successful"))
    .catch((err) => console.log(err));

// * Schema Decalaration
const detailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    love4Coding: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})

// * Collection Creation
const Details = new mongoose.model('Detail', detailsSchema);

// * Document Creation or insertion

// * One at a time

const createDocument = async () => {
    const user1 = new Details(
        {
            name: "Mohit Chauhan",
            age: 20,
            love4Coding: true
        }
    );

    const result = await user1.save();
    console.log(result);
}

// createDocument();

// * Many at a time

const createManyDocuments = async () => {

    const user2 = new Details(
        {
            name: "Mohit Chauhan",
            age: 20,
            love4Coding: true
        }
    );

    const user3 = new Details(
        {
            name: "Chauhan Sahab",
            age: 20,
            love4Coding: true
        }
    );

    const user4 = new Details(
        {
            name: "Sallu",
            age: 60,
            love4Coding: false
        }
    );

    const result = await Details.insertMany([user2, user3, user4]); // insertMany takes an array of users
    console.log(result);
}

createManyDocuments();