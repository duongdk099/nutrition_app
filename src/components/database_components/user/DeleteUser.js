import { useState } from 'react';
import { deleteUser } from '@/services/users'; // Import the function to delete the user

const DeleteUser = () => {
  const [userId, setUserId] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const deletedUser = await deleteUser(userId);
      console.log(`User ${userId} deleted`, deletedUser);
      setUserId(''); // Clear form input
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button type="submit">Delete User</button>
    </form>
  );
};

export default DeleteUser;