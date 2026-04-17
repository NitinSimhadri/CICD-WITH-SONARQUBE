const express = require('express');
const app = express();
 
const userRoutes = require('./routes/user');
 
app.use(express.json());
app.use('/users', userRoutes);
 
// Health check route
app.get('/', (req, res) => {
  res.send("POC-8 Secure API Running");
});
 
const PORT = 3000;
 
// ✅ IMPORTANT FIX: bind to 0.0.0.0
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}
 
module.exports = app;
