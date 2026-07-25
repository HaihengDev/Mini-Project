import userService from '../services/userService.js';

export const register = async(req, res) => {
  try {
    const userCreated = await userService.createUser(req.body);

    res.status(201).json({
      message: 'User is created successfully!',
      userCreated,
    })
  } catch(err) {
    return res.status(500).json({
      message: 'Server Error!',
      result: err.message,
    })
  }
}