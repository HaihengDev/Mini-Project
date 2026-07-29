const apiKey = 'http://localhost:8888/api';

export const forgotPassword = async(email) => {
  const response = await fetch(`${apiKey}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email}),
  });

  return await response.json();
}

export const verifyOtp = async(email, otp) => {
  const response = await fetch(`${apiKey}/auth/verify-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      otp
    }),
  });

  return await response.json();
}

export const resetPassword = async(email, otp, newPassword) => {
  const response = await fetch(`${apiKey}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      otp,
      newPassword
    }),
  });

  return await response.json();
}