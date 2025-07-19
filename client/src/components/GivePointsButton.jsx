import { useState } from "react";

const GivePointsButton = ({ userId, onClaimed }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [awardedPoints, setAwardedPoints] = useState(null);

  const handleClick = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user/claim-points`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();

      if (data.success) {
        const points = data.pointsGiven || 5; // fallback if backend doesn't send points
        setAwardedPoints(points);
        onClaimed();
        setTimeout(() => setAwardedPoints(null), 1500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative flex items-center">
      <button
        onClick={handleClick}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md font-medium transition"
      >
        + Give Points
      </button>
      {awardedPoints && (
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-indigo-600 font-bold text-xs animate-bounce">
          +{awardedPoints}
        </span>
      )}
    </div>
  );
};

export default GivePointsButton;
