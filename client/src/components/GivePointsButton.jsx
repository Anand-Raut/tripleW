const GivePointsButton = ({ userId, onClaimed }) => {
  const handleClick = async () => {
    try {
      const res = await fetch(`http://localhost:5000/user/claim-points`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.success){
         onClaimed?.();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md font-medium transition"
    >
      + Points
    </button>
  );
};

export default GivePointsButton;
