// REST API over CollegeDB.Students - serves index.html and CRUD routes
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

let students;

app.get('/api/students', async (req, res) => {
    const filter = req.query.department ? { department: req.query.department } : {};
    res.json(await students.find(filter).toArray());
});

app.post('/api/students', async (req, res) => {
    const { name, department, year } = req.body;
    const r = await students.insertOne({ name, department, year: Number(year) });
    res.json({ insertedId: r.insertedId });
});

app.put('/api/students/:id', async (req, res) => {
    const r = await students.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { year: Number(req.body.year) } }
    );
    res.json({ modifiedCount: r.modifiedCount });
});

app.delete('/api/students/:id', async (req, res) => {
    const r = await students.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ deletedCount: r.deletedCount });
});

app.use((err, req, res, next) => res.status(500).json({ error: err.message }));

client.connect()
    .then(() => {
        students = client.db('CollegeDB').collection('Students');
        console.log('Connected to MongoDB successfully');
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log('Server running at http://localhost:' + port));
    })
    .catch(err => console.error('Database error:', err.message));
