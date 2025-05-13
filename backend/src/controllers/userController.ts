import { Request, Response } from 'express';
import { mockUsers } from '../mockData';


// In-memory mock DB (now storing interests as a string)
const users: Record<string, any> = {
  'Za69s9xJjadZmzs2dmZ5u7u6MZu2': {
    id: 'Za69s9xJjadZmzs2dmZ5u7u6MZu2',
    fullName: 'Taylor Gomez',
    pronouns: 'they/them',
    location: 'Chicago',
    bio: 'Chef and app builder',
    interests: 'cooking, tech, travel',
  },
};



export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users[id];

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const responseUser = {
    ...user,
    interests: user.interests?.split(',').map((i: string) => i.trim()) || [],
  };

  res.status(200).json(responseUser);
};

export const updateUserById = (req: Request, res: Response) => {
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
      ? data.interests.join(',')
      : data.interests,
  };

  users[id] = updatedUser;

  res.status(200).json({
    ...updatedUser,
    interests: updatedUser.interests?.split(',').map((i: string) => i.trim()) || [],
  });
};






