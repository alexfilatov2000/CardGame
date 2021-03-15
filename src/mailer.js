const resetPasswordTemplate = (user, newPsw) => {
    const from = 'tanyaarni@gmail.com';
    const to = user.email;
    const subject = '🥵Password Reset 🥵';
    const html = `
      <p>Hey ${user.login},</p>
      <p>We heard that you lost your password. Sorry about that!</p>
      <p>But don’t worry! We can remind your password:</p>
      <p>Your new password is: ${newPsw}</p>
  `
    return { from, to, subject, html };
};

module.exports.resetPasswordTemplate = resetPasswordTemplate;