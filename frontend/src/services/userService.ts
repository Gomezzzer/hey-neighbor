// src/services/userService.ts
import { db } from '../firebase/firebase'; // Adjust based on your Firebase setup
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

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
