import userModel from "../models/userModel.js";

export const get_users = async (req, res) => {
  const users = await userModel.find()
  if (users.length === 0) {
    return res.json({success: true, message: "No User"})
  }
  return res.json({
    success:true,
    users: users
  })
}

export const give_points = async (req, res) => {
  try {
    const { userId } = req.body;

    const random_points = Math.floor(Math.random() * 10) + 1;

    const user = await userModel.findByIdAndUpdate(
      userId,
      { $inc: { points: random_points } },
      { new: true }  // Return updated user
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    return res.json({
      success: true,
      message: `${random_points} points allotted to ${user.name}`,
      user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error encountered in give_points(): ${error.message}`
    });
  }
};

export const create_user = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Name missing' });
    }

    const user = new userModel({ name });
    await user.save();

    return res.status(201).json({
      success: true,
      message: `User ${user.name} created successfully.`,
      user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error encountered in create_user(): ${error.message}`
    });
  }
};

