import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { acceptInviteApi } from '../api/invites.api';
import { setToken } from '../store/auth.store';

const AcceptInvite = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAccept = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await acceptInviteApi({ token, password });
      setToken(result.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto' }}>
      <h2>Accept Invite</h2>

      <form onSubmit={handleAccept}>
        <input
          type="password"
          placeholder="Set Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Accept Invite</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AcceptInvite;

