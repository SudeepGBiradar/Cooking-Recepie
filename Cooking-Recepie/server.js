// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();
// const port = 3000;

// // MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Nischith@1234',
//     database: 'RecipeDB'
// });

// db.connect(err => {
//     if (err) {
//         throw err;
//     }
//     console.log('MySQL connected...');
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'DBMS')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname,'index.html'));
// });


// app.get('/ingredients.html', (req, res) => {
//     res.sendFile(path.join(__dirname,'ingredients.html'));
// });

// app.get('/instructions.html', (req, res) => {
//     res.sendFile(path.join(__dirname,'instructions.html'));
// });

// // Get all recipes
// app.get('/api/recipes', (req, res) => {
//     let sql = 'SELECT * FROM Recipes';
//     db.query(sql, (err, results) => {
//         if (err) throw err;
//         res.json(results);  
//     });
// });

// // Get a single recipe with ingredients and instructions
// app.get('/api/recipes/:id', (req, res) => {
//     const recipeId = req.params.id;
//     let sql = `
//         SELECT      
//             R.RecipeName, 
//             R.Description, 
//             R.PrepTime, 
//             R.CookTime, 
//             I.IngredientName, 
//             RI.Quantity, 
//             INSTR.StepNumber, 
//             INSTR.InstructionText
//         FROM 
//             Recipes R
//         JOIN 
//             RecipeIngredients RI ON R.RecipeID = RI.RecipeID
//         JOIN 
//             Ingredients I ON RI.IngredientID = I.IngredientID
//         JOIN 
//             Instructions INSTR ON R.RecipeID = INSTR.RecipeID
//         WHERE 
//             R.RecipeID = ?
//         ORDER BY 
//             INSTR.StepNumber;
//     `;
//     db.query(sql, [recipeId], (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });

// app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// });


const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3009;

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nischith@1234',
    database: 'RecipeDB'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Ensure your HTML files are in a 'public' folder

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/recipe.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'recipe.html'));
});

app.get('/instructions.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'i.html'));
});

// Get all recipes
app.get('/api/recipes', (req, res) => {
    let sql = 'SELECT * FROM Recipes';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a single recipe with ingredients and instructions
app.get('/api/recipes/:id', (req, res) => {
    const recipeId = req.params.id;
    let sql = `
        SELECT
            R.RecipeName,
            R.Description,
            R.PrepTime,
            R.CookTime,
            I.IngredientName,
            RI.Quantity,
            INSTR.StepNumber,
            INSTR.InstructionText
        FROM
            Recipes R
        JOIN
            RecipeIngredients RI ON R.RecipeID = RI.RecipeID
        JOIN
            Ingredients I ON RI.IngredientID = I.IngredientID
        JOIN
            Instructions INSTR ON R.RecipeID = INSTR.RecipeID
        WHERE
            R.RecipeID = ?
         ORDER BY
             INSTR.StepNumber;
    `;
    db.query(sql, [recipeId], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get YouTube link for a recipe
app.get('/api/youtube/:id', (req, res) => {
    const recipeId = req.params.id;
    let sql = 'SELECT YouTube_link FROM youtube WHERE RecipeId = ?';
    db.query(sql, [recipeId], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'YouTube link not found' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});