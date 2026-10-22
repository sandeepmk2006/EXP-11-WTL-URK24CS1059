// Ex. No. 11 - Database Integration in Node.js Application Using MongoDB
// URK24CS1059
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

async function main() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB successfully');

        // Select database and collection
        const db = client.db('CollegeDB');
        const students = db.collection('Students');

        // Insert a document
        const insertResult = await students.insertOne({
            name: 'Arun',
            department: 'CSE',
            year: 2
        });
        console.log('Inserted ID:', insertResult.insertedId);

        // Retrieve documents
        const allStudents = await students.find({}).toArray();
        console.log('Student Records:', allStudents);

        // Update a document
        const updateResult = await students.updateOne(
            { name: 'Arun' },
            { $set: { year: 3 } }
        );
        console.log('Updated documents:', updateResult.modifiedCount);

        // Delete a document
        const deleteResult = await students.deleteOne({
            name: 'Arun'
        });
        console.log('Deleted documents:', deleteResult.deletedCount);
    } catch (error) {
        console.error('Database error:', error.message);
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

main();
