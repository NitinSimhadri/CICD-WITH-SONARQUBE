const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
 
// GET users
router.get('/', (req, res) => {
  res.json(userService.getUsers());
});
 
// POST user with validation
router.post('/', (req, res) => {
  const { name } = req.body;
 
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
 
  const user = userService.addUser(name);
  res.status(201).json(user);
});
 
module.exports = router;
 
