import { useEffect, useState } from 'react';
import GivePointsButton from './components/GivePointsButton';

function App() {
  const [users, setUsers] = useState([]);

  const get_users = async () => {
    try {
      const res = await fetch(`http://localhost:5000/user/get`);
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    get_users();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Leaderboard</h1>

      <div className="w-full max-w-4xl space-y-4">
        {[...users].sort((a, b) => b.points - a.points).map((user, index) => (
          <div
            key={user._id}
            className="flex items-center justify-between border border-gray-300 bg-white rounded-lg shadow p-5 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-6">
              <span className="text-2xl font-bold text-gray-700 w-10 text-center">{index + 1}</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                <p className="text-md text-gray-500">{user.points} points</p>
              </div>
            </div>
            <GivePointsButton userId={user._id} onClaimed={get_users} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
