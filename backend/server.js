const express = require('express');
const app = express();

app.use(express.json()); // middleware - parse json bodies 

// Test route 
app.get('/api/health', (req, res) => {
    res.json({message: 'Server is running'});
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
    
})