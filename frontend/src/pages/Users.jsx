import { useEffect, useState } from 'react';
import { fetchUsers, createUserApi } from '../api/users.api';
import Navbar from '../components/Navbar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [error, setError] = useState('');

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createUserApi({ email, password, role });
      setEmail('');
      setPassword('');
      setRole('USER');
      loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };
return (
  <>
    <Navbar />
    <div style={{ padding: '40px' }}>

  return (
    <div style={{ padding: '40px' }}>
      <h1>User Management</h1>

      <h3>Create User</h3>
      <form onSubmit={handleCreateUser}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Users List</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.email} — <strong>{u.role}</strong>
          </li>
        ))}
      </ul>
    </div>
  );  </div>
  </>
);
};

export default Users;
