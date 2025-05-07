// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase'; // Adjust based on your Firebase setup
import { getUserFriends, getUserDetails } from '../../services/userService'; 
import './profile.css';// We'll create this service

const Profile = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [friends, setFriends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user details and friends list
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userInfo = await getUserDetails(user.uid); // Fetch user details
          const userFriends = await getUserFriends(user.uid); // Fetch user friends
          setUserDetails(userInfo);
          setFriends(userFriends);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h2>Your Profile</h2>
      <div className="profile-info">
        <p>Email: {userDetails?.email}</p>
        <p>Full Name: {userDetails?.fullName}</p>
        {/* Add more user details as needed */}
      </div>

      <h3>Friends List</h3>
      <ul className="friends-list">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <li key={friend.id}>
              {friend.name}
              {/* Add more details about the friend */}
            </li>
          ))
        ) : (
          <p>No friends yet.</p>
        )}
      </ul>
    </div>
  );
};

export default Profile;
