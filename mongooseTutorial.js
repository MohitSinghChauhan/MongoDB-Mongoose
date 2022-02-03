    // * Content :
    // * Schema Decalaration
    // * Collection Creation
    // * Document Creation or insertion
    // * Read All Data of DB 
    // * MongoDB Querying Methods
    // * Sorting in MongoDB
    // * Updation of field inside the Documents in MongoDB
    // * Deletion of Documents inside collection




    const express = require('express');
    const mongoose = require('mongoose');

    // * Connecting mongoose to MongoDB
    mongoose.connect("mongodb://localhost:27017/MyData", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log("Successful"))
        .catch((err) => console.log(err));


    // 1    ***************************************************************************   //

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


    // 2    ***************************************************************************   //

    // * Collection Creation  + Model Decalaration

    const Details = new mongoose.model('Detail', detailsSchema);


    // 3    ***************************************************************************   //

    // * Document Creation or insertion

    // ** One at a time
    const createDocument = async () => {
        const user1 = new Details({
            name: "Albert",
            age: 20,
            love4Coding: false
        });

        const result = await user1.save(); // * .save method IMP
        console.log(result);
    }
    // createDocument();

    // ** Many at a time
    const createManyDocuments = async () => {
        try {
            const user2 = new Details({
                name: "Mohit Chauhan",
                age: 20,
                love4Coding: true
            });

            const user3 = new Details({
                name: "Chauhan Sahab",
                age: 20,
                love4Coding: true
            });

            const user4 = new Details({
                name: "Sallu",
                age: 60,
                love4Coding: false
            });

            const result = await Details.insertMany([user2, user3, user4]); // insertMany takes an array of users
            console.log(result);

            // * 2nd Method of InsertMany Without Async Await
            // Details.insertMany([user2, user3, user4], (err)=>{
            //     if(err) console.log(err);
            //     else console.log("Success");
            // })
        } catch (err) {
            console.log(err);
        }
    }
    // createManyDocuments();


    // 4    ***************************************************************************   //

    // * MongoDB Querying Methods

    // * Read All Data of DB 
    // * 1st Method (Without Async Await)
    Details.find((err, result) => {
        if (err) console.log(err); // TODO : we can also run forEach loop for performing action on every element.
        else console.log(result);
    });

    const getDocument = async () => {

        let result; // Just for convinence

        // * 2nd Method (With Async Await)
        result = await Details.find();




        // * we can use projections in either ways
        // 1. Putting in find method...find(query,projection)
        // result = await Details.find({"age":"20"},{name:1,_id:0});

        // 2. By using select method
        // result = await Details.find({ "age": "20" })
        //     .select({ name: 1, _id: 0 })
        // .limit(1); // also a method .countDocuments()


        // * Comparison Query Operators in MongoDB 
        // Docs : https://docs.mongodb.com/manual/reference/operator/query-comparison/
        // result = await Details.find({age:{$lte:20}}); //gte,lte,gt,lt,eq,neq

        // The $in operator selects the documents where the value of a field equals any value in the specified array.
        // result = await Details.find({age:{$in : [23,69,60]}}); // in,nin


        // * Logical Query Operators in MongoDB
        // Docs : https://docs.mongodb.com/manual/reference/operator/query-logical/
        // $and performs a logical AND operation on an array of one or more expressions
        // result = await Details.find({$and: [{age:20},{love4Coding:true}]}); // and,or,nor,not

        // $not performs a logical NOT operation on the specified <operator-expression> and selects the documents that do not match the <operator-expression>. 
        // IMP: This includes documents that do not contain the field.
        // result = await Details.find({age:{$not: {$gt:25} }}); 


        console.log(result); // here we get array of objects (documents)
    }
    // getDocument();


    // 5    ***************************************************************************   //

    // * Sorting in MongoDB
    // Docs : https://www.tutorialspoint.com/mongodb/mongodb_sort_record.htm

    const getSortedData = async () => {
        const result = await Details.find().sort({
            age: 1
        }); //
        console.log(result);
    }

    // getSortedData();


    // 6    ***************************************************************************   //

    //* Updation of field inside the Documents in MongoDB

    // Details.updateOne({name:"Mohit Chauhan"},{age:21}, (err)=>console.log(err));
    // ( {item to update},{what to update in it}, Callback function(err) )


    // 7    ***************************************************************************   //
    // * Deletion of Documents inside collection

    // * Delete One Document at a time
    // Details.deleteOne({name:"Mohit Chauhan"}, (err)=>{
    //     if(err) console.log(err);
    //     else console.log("Sucessfully Deleted");
    // })


    // * Delete Many Documents at a time
    Details.deleteMany({
        age: 20,
        love4Coding: false
    }, (err) => {
        if (err) console.log(err);
        else console.log("Sucessfully Deleted");
    });


    Details.find((err, result) => {
        if (err) console.log(err); // TODO : we can also run forEach loop for performing action on every element.
        else console.log(result);
    });