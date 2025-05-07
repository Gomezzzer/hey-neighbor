import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (_req, res) => {
    res.send('Backend is running. Try /api/health');
  });
  

// TEMP: Mock data — replace with database/Firebase calls later
const mockUser = {
  fullName: 'John Doe',
  pronouns: 'he/him',
  location: 'Chicago',
  bio: 'Love my neighborhood!',
  interests: ['cooking', 'gardening', 'tech']
};

const mockFriends = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' }
];

// GET user info
app.get('/api/user/:userId', (req, res) => {
  const { userId } = req.params;
  console.log(`Fetching data for user: ${userId}`);
  res.json(mockUser); // replace with actual DB query
});

// GET user's friends
app.get('/api/friends/:userId', (req, res) => {
  const { userId } = req.params;
  console.log(`Fetching friends for user: ${userId}`);
  res.json(mockFriends); // replace with actual DB query
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
