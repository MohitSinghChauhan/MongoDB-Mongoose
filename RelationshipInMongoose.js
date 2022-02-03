// * Content :

const res = require("express/lib/response");
const mongoose = require("mongoose");

// * Connecting mongoose to MongoDB
mongoose
    .connect("mongodb://localhost:27017/MyData", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Successful"))
    .catch((err) => console.log(err));


// * Schema Decalaration

const techStackSchema = new mongoose.Schema({
    name: String,
    exp: Number,
})

const detailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: Number,
    love4Coding: Boolean,
    date: {
        type: Date,
        default: Date.now,
    },
    techStack: techStackSchema, 
    // * To establish relationship we add a new feild in the schema of the Collection in which we want to
    // * establish relationship with other Collection by adding a new feild with the value
    // * of schema of that other collection with which we want to establish relationship.
});



const Details = new mongoose.model("Detail", detailsSchema);
const techStack = new mongoose.model("techstack", techStackSchema);


// * Adding documents in techstack collection
const techStack1 = new techStack({
    name: "MERN",
    exp: 0
})
const techStack2 = new techStack({
    name: "MEAN",
    exp: 1
})
const techStack3 = new techStack({
    name: "MEARN",
    exp: 2
})

// techStack.insertMany([techStack1, techStack2, techStack3], (err) => {
//     if (err) console.log(err)
//     else console.log("Inserted Sucessfully")
// });



// * Estabilishing Relationship
const username = new Details({
    name: "Pushpa",
    age: 40,
    love4Coding: true,
    techStack: techStack1, // * techStack1 is the variable of techstack document
    
});

// username.save();

// * Displaying all data inside techStack collection
Details.find((err, result) => {
    if (err) console.log(err);
    else console.log(result);
})