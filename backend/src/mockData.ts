import { faker } from '@faker-js/faker';

const generateUsers = (count: number) => {
  const users: Record<string, any> = {};

  for (let i = 0; i < count; i++) {
    const id = faker.string.uuid();
    users[id] = {
      id,
      fullName: faker.person.fullName(),
      pronouns: faker.person.sexType(),
      location: faker.location.city(),
      bio: faker.person.bio(),
      interests: faker.helpers.shuffle([
        'cooking', 'tech', 'travel', 'reading', 'hiking', 'music', 'gaming'
      ]).slice(0, 3).join(','),
      photoURL: faker.image.avatar(),
    };
  }

  return users;
};

export const mockUsers = generateUsers(10);
