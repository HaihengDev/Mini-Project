import userService from '../services/userService.js';

export const register = async (req, res) => {
  try {
    const id = await userService.register(req.body);

    res.status(201).json({
      success: true,
      userId: id,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
