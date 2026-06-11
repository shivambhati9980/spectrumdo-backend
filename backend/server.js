// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const taskRoutes = require('./routes/tasks');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('✅ MongoDB connected successfully!'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));

// const PORT = process.env.PORT || 5000;
// const path = require('path');

// // ... (tumhare saare API routes yahan hain: app.use('/api/auth', ...), etc.)

// // -------------------------
// // YEH NAYI LINES ADD KARO:
// // -------------------------
// // Serve frontend static files
// app.use(express.static(path.join(__dirname, '../frontend')));

// // For any other request, send index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
// });
// // -------------------------

// // ... (Phir tumhara MongoDB connection aur app.listen)
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');  // ← YEH LINE ADD KARO
require('dotenv').config();

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// -------------------------
// YEH NAYI LINES ADD KARO (SERVE FRONTEND):
// -------------------------
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});
// -------------------------

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});