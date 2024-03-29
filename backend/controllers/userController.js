const User = require("../models/userModel.js");
const Post = require("../models/postModel.js");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const generateTokenAndSetCookies = require("../utils/helpers/generateTokenAndSetCookies.js");
const { default: mongoose } = require("mongoose");
const signUpUser = async (req, res) => {
  try {
    const { userName, name, email, profilePic, password } = req.body.inputs;
    //    userName = userName.replace(/\s/g, "");
    // email = email.replace(/\s/g, "");
    const user = await User.findOne({ $or: [{ email }, { userName }] });
    if (user) {
      return res.status(400).json({ error: "user Already Exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      userName,
      profilePic,
      password: hashPassword,
    });
    await newUser.save();
    if (newUser) {
      generateTokenAndSetCookies(newUser._id, res);
      res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userName: newUser.userName,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
        message: "Account Created Successfully",
      });
    } else {
      res.status(400).json({ error: "Invalid Data" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body.inputs;
    // userName = userName.replace(/\s/g, "");
    // email = email.replace(/\s/g, "");
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    if (user.isFrozen) {
      user.isFrozen = false;
      await user.save();
    }

    generateTokenAndSetCookies(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userName: user.userName,
      bio: user.bio,
      profilePic: user.profilePic,
      message: "User Login Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ error: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in signupUser: ", err.message);
  }
};
const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById({ _id: id });
    const currentUser = await User.findById({ _id: req.user._id });

    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ error: "You cannot follow/unfollow yourself" });
    if (!userToModify || !currentUser)
      return res.status(400).json({ error: "User not found" });
    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      // Unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};
const updateUser = async (req, res) => {
  try {
    const { name, email, password, userName, bio } = req.body.inputs;
    const userId = req.user._id;
    let { profilePic } = req.body.inputs;
    let user = await User.findById({ _id: userId });
    if (!user) return res.status(400).json({ error: "User not found" });
    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ error: "You cannot update other user's profile" });
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      return res
        .status(200)
        .json({ message: "User profile Update Successfully" });
    }
    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.userName = userName || user.userName;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;
    user = await user.save();
    await Post.updateMany(
      { "replies.userId": userId },
      {
        $set: {
          "replies.$[reply].userName": user.userName,
          "replies.$[reply].userProfilePic": user.profilePic,
        },
      },
      { arrayFilters: [{ "reply.userId": userId }] }
    );
    user.password = null;

    return res
      .status(200)
      .json({ message: "User profile Update Successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};
const getUserProfile = async (req, res) => {
  try {
    const { query } = req.params;
    console.log(query);
    let user;
    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query })
        .select("-password")
        .select("-updatedAt");
    } else {
      user = await User.findOne({ userName: query })
        .select("-password")
        .select("-updatedAt");
    }
    if (!user) return res.status(400).json({ error: "User not Found", user });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const usersFollowedByYou = await User.findById(userId).select("following");

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      {
        $sample: { size: 10 },
      },
    ]);
    const filteredUsers = users.filter(
      (user) => !usersFollowedByYou.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 4);

    suggestedUsers.forEach((user) => (user.password = null));

    res.status(200).json(suggestedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const freezeAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.isFrozen = true;
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUpUser,
  loginUser,
  logoutUser,
  followUnFollowUser,
  updateUser,
  getSuggestedUsers,
  getUserProfile,
  freezeAccount,
};
