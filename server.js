// Science Fair REST API over ScienceFairDB.projects - serves index.html and CRUD routes
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

let projects;

app.get('/api/projects', async (req, res) => {
    const filter = req.query.category ? { category: req.query.category } : {};
    res.json(await projects.find(filter).toArray());
});

app.post('/api/projects', async (req, res) => {
    const { title, student, category, grade, score } = req.body;
    const r = await projects.insertOne({ title, student, category, grade: Number(grade), score: Number(score) });
    res.json({ insertedId: r.insertedId });
});

app.put('/api/projects/:id', async (req, res) => {
    const r = await projects.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { score: Number(req.body.score) } }
    );
    res.json({ modifiedCount: r.modifiedCount });
});

app.delete('/api/projects/:id', async (req, res) => {
    const r = await projects.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ deletedCount: r.deletedCount });
});

app.use((err, req, res, next) => res.status(500).json({ error: err.message }));

client.connect()
    .then(() => {
        projects = client.db('ScienceFairDB').collection('projects');
        console.log('Connected to MongoDB successfully');
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log('Server running at http://localhost:' + port));
    })
    .catch(err => console.error('Database error:', err.message));
