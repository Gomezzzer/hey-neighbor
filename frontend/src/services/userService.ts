// src/services/userService.ts
import { db } from '../firebase/firebase'; // Adjust based on your Firebase setup
import { doc, getDoc, collection, query, where, getDocs, setDoc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
 // Add to the top if not already there

 export const ensureUserDocumentExists = async (user: any) => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      fullName: '',
      pronouns: '',
      location: '',
      bio: '',
      interests: [],
    });
  }
};

interface UserUpdateData {
  fullName?: string;
  pronouns?: string;
  location?: string;
  bio?: string;
  interests?: string[];
}

export const updateUserDetails = async (userId: string, data: UserUpdateData): Promise<void> => {
  try {
    console.log('Updating user with ID:', userId); 
    
    const res = await fetch(`http://localhost:4000/api/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text(); // get backend error message
      console.error('Backend error:', errorText);
      throw new Error('Failed to update user');
    }
  } catch (error) {
    console.error('Error updating user details:', error);
    throw new Error('Failed to update user details');
  }
};





export const getUserDetails = async (userId: string) => {
  try {
    const userDoc = doc(db, 'users', userId);
    const userSnap = await getDoc(userDoc);
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};



export const getUserFriends = async (userId: string) => {
  try {
    const friendsRef = collection(db, 'friends');
    const q = query(friendsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const friends = querySnapshot.docs.map((doc) => doc.data());
    return friends;
  } catch (error) {
    console.error('Error fetching friends list:', error);
    throw error;
  }
};
