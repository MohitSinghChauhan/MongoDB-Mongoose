const mongoose = require('mongoose');

// * Connecting mongoose to MongoDB
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
            name: "Albert",
            love4Coding: false
        }
    );

    const result = await user1.save(); // * .save method IMP
    console.log(result);
}

// createDocument();

// * Many at a time

// const createManyDocuments = async () => {

//     try {
//         const user2 = new Details(
//             {
//                 name: "Mohit Chauhan",
//                 age: 20,
//                 love4Coding: true
//             }
//         );

//         const user3 = new Details(
//             {
//                 name: "Chauhan Sahab",
//                 age: 20,
//                 love4Coding: true
//             }
//         );

//         const user4 = new Details(
//             {
//                 name: "Sallu",
//                 age: 60,
//                 love4Coding: false
//             }
//         );

//         const result = await Details.insertMany([user2, user3, user4]); // insertMany takes an array of users
//         console.log(result);
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// createManyDocuments();


const getDocument = async () => {

    // * we can use projections in either ways
    // 1. Putting in find method...find(query,projection)
    // const result = await Details.find({"age":"20"},{name:1,_id:0});

    // 2. By using select method
    // const result = await Details.find({ "age": "20" })
    //     .select({ name: 1, _id: 0 })
    //     .limit(1);


    // * Comparison Query Operators in MongoDB 
    // Docs : https://docs.mongodb.com/manual/reference/operator/query-comparison/
    // const result = await Details.find({age:{$lte:20}}); //gte,lte,gt,lt,eq,neq

    // The $in operator selects the documents where the value of a field equals any value in the specified array.
    // const result = await Details.find({age:{$in : [23,69,60]}}); // in,nin
    
    
    // * Logical Query Operators in MongoDB
    // Docs : https://docs.mongodb.com/manual/reference/operator/query-logical/
    // $and performs a logical AND operation on an array of one or more expressions
    // const result = await Details.find({$and: [{age:20},{love4Coding:true}]}); // and,or,nor,not

    // $not performs a logical NOT operation on the specified <operator-expression> and selects the documents that do not match the <operator-expression>. 
    // IMP: This includes documents that do not contain the field.
    // const result = await Details.find({age:{$not: {$gt:25} }}); 



    console.log(result); // here we get array of objects (documents)
}



getDocument();