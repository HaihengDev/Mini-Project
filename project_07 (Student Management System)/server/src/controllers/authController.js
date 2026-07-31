import authService from '../services/authService.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required!',
      });
    }

    const result = await authService.login(email, password);

    return res.status(200).json({
      message: 'Login successful',
      ...result,
    });
  } catch (err) {
    return res.status(401).json({
      message: err.message,
    });
  }
};

export const forgotPassword = async(req, res) => {
  try {
    const {email} = req.body;

    if(!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required.'
      });
    }

    const result = await authService.forgotPassword(email);

    return res.status(200).json(result);
  } catch(err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: 'Server Error',
      result: err.message,
    })
  }
}

export const verifyOtp = async(req, res) => {
  try {
    const {email, otp} = req.body;

    if(!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required.',
      });
    }

    const result = await authService.verifyOtp(email, otp);

    return res.status(200).json(result);
  } catch(err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

export const resetPassword = async(req, res) => {
  try {
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP and new password are required.',
      });
    }

    const result = await authService.resetPassword(email, otp, newPassword);

    return res.status(200).json(result);
  } catch(err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
