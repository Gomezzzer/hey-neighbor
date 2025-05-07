import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { getUserDetails, getUserFriends, updateUserDetails } from '../../services/userService'; 
import './profile.css';

const Profile = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [friends, setFriends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    pronouns: '',
    location: '',
    bio: '',
    interests: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const backendPing = await fetch('http://localhost:4000/api/health');
          const backendData = await backendPing.json();
          console.log('Backend says:', backendData);

          const userInfoRes = await fetch(`http://localhost:4000/api/user/${user.uid}`);
          const userInfo = await userInfoRes.json();

          const userFriendsRes = await fetch(`http://localhost:4000/api/friends/${user.uid}`);
          const userFriends = await userFriendsRes.json();

          setUserDetails(userInfo);
          setFriends(userFriends);
          setFormData({
            fullName: userInfo.fullName || '',
            pronouns: userInfo.pronouns || '',
            location: userInfo.location || '',
            bio: userInfo.bio || '',
            interests: (userInfo.interests || []).join(', '),
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const updatedData = {
          ...formData,
          interests: formData.interests.split(',').map((i) => i.trim()),
        };
        await updateUserDetails(user.uid, updatedData);
        setUserDetails(updatedData);
        setEditing(false);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile">
      <div className="profile-header">
        <img 
          src={userDetails?.photoURL || "/default-avatar.png"} 
          alt="Profile" 
          className="profile-img" 
        />
        <div className="profile-info">
          {editing ? (
            <>
              <input name="fullName" value={formData.fullName} onChange={handleChange} />
              <input name="pronouns" value={formData.pronouns} onChange={handleChange} />
              <input name="location" value={formData.location} onChange={handleChange} />
              <textarea name="bio" value={formData.bio} onChange={handleChange} />
              <input name="interests" value={formData.interests} onChange={handleChange} />
              <div className="profile-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </>
          ) : ( 
            <>
              <h2>{userDetails?.fullName || 'Full Name not provided'}</h2>
              <p>Pronouns: {userDetails?.pronouns || 'Not specified'}</p>
              <p>Location: {userDetails?.location || 'Unknown'}</p>
              <p>Bio: {userDetails?.bio || 'No bio available'}</p>
              <p><strong>Interests:</strong> {userDetails?.interests?.join(', ') || 'None listed'}</p>
              <div className="profile-buttons">
                <button onClick={() => setEditing(true)}>Edit Profile</button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="friends-section">
        <h3>Friends List</h3>
        <ul className="friends-list">
          {friends.length > 0 ? (
            friends.map((friend) => (
              <li key={friend.id}>{friend.name}</li>
            ))
          ) : (
            <p>No friends yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;


