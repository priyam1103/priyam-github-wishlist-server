const User = require("../model/user");
const bcrypt = require("bcrypt");
const axios = require("axios");
const config = require("../service/config");
const SavedUser = require("../model/savedusers");

exports.me = async function (req, res) {
  try {
    const id = res.locals._id;
    const user_ = await User.findOne({ _id: id });
    if (!user_) {
      res.status(401).json({ message: "Invalid session " });
    } else {
      res.status(200).json({ user_ });
    }
  } catch (err) {}
};
exports.signUp = async function (req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      $or: [{ login: username.trim() }],
    });
    if (user)
      res.status(401).json({
        message: "User already registered.",
      });
    else {
      await axios
        .get(
          `https://api.github.com/users/${username}?client_id=${config.GIT_CLIENT_ID}&client_secret=${config.GIT_SECRET_KEY}`
        )
        .then(async (response) => {
          if (response.status === 200) {
            let hashedpass = await bcrypt.hash(password, 10);
            const user_ = new User({
              login: username.trim(),
              password: hashedpass,
              avatar_url: response.data.avatar_url,
              bio: response.data.bio,
              name: response.data.name,
              email: response.data.email,
              followers: response.data.followers,
              following: response.data.following,
              public_repos: response.data.public_repos,
              repos_url: response.data.repos_url,
            });
            await user_.save();
            const token = await user_.generateAuthToken();
            res
              .status(200)
              .json({ token, user_, message: "Sign Up Successfull" });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(401).json({ message: "Github user not found." });
        });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Please try again later" });
  }
};

exports.SignIn = async function (req, res) {
  try {
    const { username, password } = req.body;
    const user_ = await User.findOne({ login: username.trim() });
    if (user_) {
      let valid = await bcrypt.compare(password, user_.password);
      if (valid) {
        const token = await user_.generateAuthToken();
        res.status(200).json({ token, user_, message: "User logged in" });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(401).json({ message: "username does not exists" });
    }
  } catch (err) {
    res.status(400).json({ message: "Please try again later" });
  }
};

exports.addToList = async function (req, res) {
  try {
    const { response } = req.body;
    console.log(response)
    const id = res.locals._id;
    const user_ = await User.findOne({ _id: id });
    if (!user_) {
      res.status(401).json({ message: "Invalid session " });
    } else {
      const data = {
        username: response.login,
        id: response.id,
        avatar_url: response.avatar_url,
        bio: response.bio,
        name: response.name,
        email: response.email,
        followers: response.followers,
        following: response.following,
        public_repos: response.public_repos,
        repos_url: response.repos_url,
      };
      const saveduser_ = await SavedUser.findOne({ id: response.id });
      if (saveduser_) {
        user_.mylist = user_.mylist.concat(response.id);
      } else {
        const saveduser = new SavedUser({ ...data });
        user_.mylist = user_.mylist.concat(response.id);
        await saveduser.save();
      }
      await user_.save();
      res.status(200).json({ user_ ,message:`${data.username} added to list.`});
    }
  } catch (err) {
    res.status(400).json({ message: "Please try again later" });
  }
};
exports.removeFromList = async function (req, res) {
  try {
    const { remove_id } = req.params;

    const id = res.locals._id;
    const user_ = await User.findOne({ _id: id });
    if (!user_) {
      res.status(401).json({ message: "Invalid session " });
    } else {
      user_.mylist.splice(user_.mylist.indexOf(remove_id), 1);

      await user_.save();
      res.status(200).json({ user_,message:`User removed from list.` });
    }
  } catch (err) {
    res.status(400).json({ message: "Please try again later" });
  }
};

exports.mylist = async function (req, res) {
  try {
    const id = res.locals._id;
    const user_ = await User.findOne({ _id: id });
    if (!user_) {
      res.status(401).json({ message: "Invalid session " });
    } else {
      const list = user_.mylist;
      let data_list = [];
      new Promise((resolve, reject) => {
        list.map(async (item, index) => {
          console.log(item);
          const list_data = await SavedUser.findOne({ id: item });

          data_list[index] = list_data;
          console.log(data_list);
          if (index === list.length - 1) {
            resolve();
          }
        });
      }).then(() => {
        res.status(200).json({ data_list });
      });
    }
  } catch (err) {
    res.status(400).json({ message: "Please try again later" });
  }
};
