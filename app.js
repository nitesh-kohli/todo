const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path'); // For CommonJS


const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'hbs'); // or 'hbs' or 'pug'

app.set('views', path.join(__dirname,'/views'));

// Static folder
app.use(express.static('public'));


// Fake database (in-memory array)
let todos = [];

// Routes will go here...

app.get('/', (req, res) => {
    res.render('home', { todos });
});

app.post('/add', (req, res) => {
    const newTodo = {
        id: Date.now(),  // simple unique id
        task: req.body.task
    };
    todos.push(newTodo);
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    todos = todos.filter(todo => todo.id != req.params.id);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const todo = todos.find(t => t.id == req.params.id);
    res.render('edit', { todo });
});

app.post('/update/:id', (req, res) => {
    const todo = todos.find(t => t.id == req.params.id);
    todo.task = req.body.task;
    res.redirect('/');
});





const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



