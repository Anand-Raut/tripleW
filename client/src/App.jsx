import { useEffect, useState } from 'react';
import GivePointsButton from './components/GivePointsButton';

function App() {
  const [users, setUsers] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const get_users = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user/get`);
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    get_users();
  }, []);

  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  const top3 = sortedUsers.slice(0, 3);
  const others = sortedUsers.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 py-12 px-4 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-10 tracking-tight">
        Leaderboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-3xl w-full">
        {top3.map((user, index) => (
          <div
            key={user._id}
            className={`flex flex-col items-center justify-between p-5 rounded-xl shadow-md border border-gray-200 bg-white hover:shadow-lg transition transform hover:-translate-y-1 ${
              index === 0 ? 'scale-105' : ''
            } h-56`}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                index === 0
                  ? 'bg-yellow-400'
                  : index === 1
                  ? 'bg-gray-400'
                  : 'bg-amber-700'
              }`}
            >
              {index + 1}
            </div>
            <div className="text-center">
              <h3 className="mt-2 text-lg font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-500 text-sm">{user.points} points</p>
            </div>
            <GivePointsButton userId={user._id} onClaimed={get_users} />
          </div>
        ))}
      </div>

      <div className="w-full max-w-3xl space-y-5">
        {others.map((user, index) => (
          <div
            key={user._id}
            className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition hover:-translate-y-0.5 transform"
          >
            <div className="flex items-center gap-5">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                {index + 4}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.points} points</p>
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
