const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.create({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(userData);
    const plainUser = userData.get({ plain: true });
    console.log(plainUser);

    req.session.save(() => {
      req.session.loggedIn = true;

      return res.status(200).json(plainUser);
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!userData) {
      return res.status(400).json({
        message: 'Incorrect email or password. Please try again',
      });
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).json({
        message: 'Incorrect email or password. Please try again',
      });
    }
    req.session.save(() => {
      req.session.loggedIn = true;

      return res.json({
        user: userData,
        message: 'You are now logged in',
      });
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(404).end();
    });
  }
});

module.exports = router;
