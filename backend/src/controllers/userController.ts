import { RequestHandler } from 'express';

// In-memory mock DB
const users: Record<string, any> = {
  '123': {
    id: '123',
    fullName: 'Taylor Gomez',
    pronouns: 'they/them',
    location: 'Chicago',
    bio: 'Chef and app builder',
    interests: ['cooking', 'tech', 'travel'],
  },
};

// GET /api/user/:id
export const getUserById: RequestHandler = (req, res) => {
  const { id } = req.params;
  const user = users[id];

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json(user);
};

// PUT /api/user/:id
export const updateUserById: RequestHandler = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const user = users[id];
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  }

  const updatedUser = {
    ...user,
    ...data,
    interests: Array.isArray(data.interests)
      ? data.interests
      : (data.interests || '').split(',').map((i: string) => i.trim()),
  };

  users[id] = updatedUser;

  res.status(200).json(updatedUser);
};

