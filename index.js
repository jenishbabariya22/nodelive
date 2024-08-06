const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));  // Serve static files

// Dummy data for CRUD operations
let items = [];

// Home route - Read all items
app.get('/', (req, res) => {
  res.render('index', { items });
});

// Create item
app.post('/add', (req, res) => {
  items.push(req.body.item);
  res.redirect('/');
});

// Edit item - Show form to edit
app.get('/edit/:index', (req, res) => {
  const index = req.params.index;
  res.render('edit', { item: items[index], index });
});

// Update item - Handle form submission
app.post('/update', (req, res) => {
  const { index, newItem } = req.body;
  items[index] = newItem;
  res.redirect('/');
});

// Delete item
app.post('/delete', (req, res) => {
  const { index } = req.body;
  items.splice(index, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
