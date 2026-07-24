import crypto from 'crypto';

export const generatePassword = async() => {
  const generatedPassword = crypto.randomBytes(8).toString('hex');

  return generatedPassword;
}