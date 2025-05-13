import { Request, Response } from 'express';
import { mockUsers } from '../mockData';

const mockFriends = [
  {
    id: '1',
    fullName: 'Alice Johnson',
    pronouns: 'she/her',
    location: 'New York',
    bio: 'Loves hiking and books.',
    interests: ['reading', 'nature'],
  },
  {
    id: '2',
    fullName: 'Bob Smith',
    pronouns: 'he/him',
    location: 'Los Angeles',
    bio: 'Tech enthusiast and coffee lover.',
    interests: ['coding', 'coffee'],
  },
  {
    id: '3',
    fullName: 'Charlie Ray',
    pronouns: 'they/them',
    location: 'Chicago',
    bio: 'Designer and music fan.',
    interests: ['art', 'music'],
  }
];


export const getFriendsByUserId = (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(`Fetching friends for user ${userId}`);
  res.json(mockFriends);
};
