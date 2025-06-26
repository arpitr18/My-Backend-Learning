import { userModel } from "../models/user.model.js";

export const userCreate = async (req, res) => {
  try {
    const { name, age, weight } = req.body;
    const newUser = new userModel({ name, age, weight });
    await newUser.save();

    res.status(201).json({
      success: true,
      data: newUser,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `ERROR: ${err.message}`,
    });
  }
};

export const userRead = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      success: true,
      data: users,
      message: "Users fetched successfully ",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `ERROR: ${err.message}`,
    });
  }
};

export const userUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...rest } = req.body;
    const updated = await userModel.findByIdAndUpdate(
      id,
      { ...rest },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated)
      return res
        .status(401)
        .send({ success: false, message: "User not found" });

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `ERROR: ${err.message}`,
    });
  }
};

export const userDelet = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, data: deletedUser, message: "User deleted" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `ERROR: ${err.message}`,
    });
  }
};
