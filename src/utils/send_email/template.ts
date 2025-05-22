export const emailTemplateGeneric = (verificationCode: number, reason: string) => {
  return `<h2>Hi there,</h2>
      ${reason === "registration"
      ? `<h4>Thank you for registering with us. Please use the following code to verify your account.</h4>`
      : `<h4>Thank you for using our service. Please use the following code to reset your password.</h4>`
    }
      <h1>${verificationCode}</h1>
      <p>If you did not request this, please ignore this email. This Code will expire in 10 minutes</p>
      `;
};

export const sendNonRegisteredBookingInvitation = (fullName: string, appUrl: string, splitPayment: boolean) => {
  return `Hi ${fullName},<br><br>
          🎉 You've been invited to a booking! ${
            splitPayment 
              ? "You'll need to complete your payment to secure your spot. Sign up now to proceed! 💰"
              : "Good news—your booking is already covered! Just sign up to check the details." 
          }<br><br>
          <a href="${appUrl}">Sign Up</a>`;
};
