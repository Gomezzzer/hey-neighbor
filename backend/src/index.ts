import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import friendRoutes from './routes/friendRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (_req, res) => {
  res.send('Backend is running. Try /api/health');
});

app.get('/api/health', (_req, res) => {
  res.json({ message: 'API is up and running 🚀' });
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/friends', friendRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});

export default app;

