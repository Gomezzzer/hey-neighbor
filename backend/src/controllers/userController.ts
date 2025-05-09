import { RequestHandler } from 'express';

// In-memory mock DB (now storing interests as a string)
const users: Record<string, any> = {
  '123': {
    id: '123',
    fullName: 'Taylor Gomez',
    pronouns: 'they/them',
    location: 'Chicago',
    bio: 'Chef and app builder',
    interests: 'cooking, tech, travel', // now a string
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

  // Convert interests string to array for the frontend
  const responseUser = {
    ...user,
    interests: user.interests?.split(',').map((i: string) => i.trim()) || [],
  };

  res.status(200).json(responseUser);
};

// PUT /api/user/:id
export const updateUserById: RequestHandler = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const user = users[id];
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const updatedUser = {
    ...user,
    ...data,
    interests: Array.isArray(data.interests)
      ? data.interests.join(',') // store as comma-separated string
      : data.interests,
  };

  users[id] = updatedUser;

  res.status(200).json({
    ...updatedUser,
    interests: updatedUser.interests?.split(',').map((i: string) => i.trim()) || [],
  });
};


