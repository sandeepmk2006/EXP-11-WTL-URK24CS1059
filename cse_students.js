// Sample Question 5: insert three student records and display all CSE students
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017');

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully');
        const students = client.db('CollegeDB').collection('Students');

        const result = await students.insertMany([
            { name: 'Priya', department: 'CSE', year: 3 },
            { name: 'Kumar', department: 'IT', year: 2 },
            { name: 'Divya', department: 'CSE', year: 1 }
        ]);
        console.log('Inserted documents:', result.insertedCount);

        const cse = await students.find({ department: 'CSE' }).toArray();
        console.log('CSE Students:', cse);
    } catch (error) {
        console.error('Database error:', error.message);
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

main();
