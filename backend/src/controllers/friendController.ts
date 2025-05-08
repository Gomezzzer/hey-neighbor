import { Request, Response } from 'express';

const mockFriends = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' }
];

export const getFriendsByUserId = (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(`Fetching friends for user ${userId}`);
  res.json(mockFriends); // Replace with DB logic
};
