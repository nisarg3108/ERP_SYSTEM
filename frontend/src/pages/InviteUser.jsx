import { useState } from 'react';
import Navbar from '../components/Navbar';
import { inviteUserApi } from '../api/invites.api';

const InviteUser = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('USER');
  const [inviteLink, setInviteLink] = useState('');
  const [error, setError] = useState('');

  const handleInvite = async (e) => {
    e.preventDefault();
    setError('');
    setInviteLink('');

    try {
      const result = await inviteUserApi({ email, role });
      setInviteLink(result.inviteLink);
      setEmail('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: '40px' }}>
        <h1>Invite User</h1>

        <form onSubmit={handleInvite}>
          <input
            placeholder="User Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button type="submit">Send Invite</button>
        </form>

        {inviteLink && (
          <p>
            Invite Link:<br />
            <a href={inviteLink} target="_blank" rel="noreferrer">
              {inviteLink}
            </a>
          </p>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </>
  );
};

export default InviteUser;
