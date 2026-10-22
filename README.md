# Ex. No. 11 – Database Integration in Node.js Application Using MongoDB

**URK24CS1059 · 23CS2049 Web Technology Lab**

Live page: https://sandeepmk2006.github.io/EXP-11-WTL-URK24CS1059/

| File | Purpose |
|------|---------|
| `app.js` | Connects to MongoDB and performs insertOne, find, updateOne, deleteOne on `CollegeDB.Students` |
| `cse_students.js` | Sample Question 5 – inserts three students and lists the CSE students |
| `server.js` | Express REST API (CRUD) that also serves the portal page |
| `index.html` | CollegeDB Student Portal (uses the live API when served by `server.js`, an in-browser collection on GitHub Pages) |

## Run

```
npm install
node app.js
node cse_students.js
node server.js   # open http://localhost:3000
```

MongoDB must be running at `mongodb://127.0.0.1:27017`.
