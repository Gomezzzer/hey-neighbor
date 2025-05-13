import { Request, Response } from 'express';
import { mockUsers } from '../mockData';
import { faker } from '@faker-js/faker';

const mockFriends = [
  {
    id: '1',
    fullName: 'Alice Johnson',
    pronouns: 'she/her',
    location: 'New York',
    bio: 'Loves hiking and books.',
    interests: ['reading', 'nature'],
    avatar: faker.image.avatar(),
  },
  {
    id: '2',
    fullName: 'Bob Smith',
    pronouns: 'he/him',
    location: 'Los Angeles',
    bio: 'Tech enthusiast and coffee lover.',
    interests: ['coding', 'coffee'],
    avatar: faker.image.avatar(),
  },
  {
    id: '3',
    fullName: 'Charlie Ray',
    pronouns: 'they/them',
    location: 'Chicago',
    bio: 'Designer and music fan.',
    interests: ['art', 'music'],
    avatar: faker.image.avatar(),
  }
];


export const getFriendsByUserId = (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(`Fetching friends for user ${userId}`);
  res.json(mockFriends);
};
