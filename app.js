const express = require('express');
const app = express();

const userRoutes = require('./routes/user');

app.use(express.json());
app.use('/users', userRoutes);

// ❌ SECURITY ISSUE: Hardcoded secret key (should be stored in env variables)
const API_KEY = "12345-secret-key";

// ❌ CODE SMELL: Duplicate logic (violates DRY principle)
function calculate() {
    let a = 10;
    let b = 20;
    return a + b;
}

// ❌ CODE SMELL: Duplicate function again
function calculateAgain() {
    let a = 10;
    let b = 20;
    return a + b;
}

// ❌ CODE SMELL: Unnecessary console log in production
console.log("Application started");

// Health check route
app.get('/', (req, res) => {

    // ❌ CODE SMELL: Unused variable (waste of memory)
    let unused = "not needed";

    // ❌ BUG / BAD PRACTICE: Division by zero + empty catch block
    try {
        let x = 10 / 0;
    } catch (e) {
        // ❌ BAD PRACTICE: Error is silently ignored
    }

    res.send("POC-8 Insecure API Running");
});

const PORT = 3000;

// ✅ GOOD PRACTICE: Binding to 0.0.0.0 for external access
if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
