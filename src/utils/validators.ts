export function validateAuthForm(formData: {
    email: string;
    password: string;
    masterPin?: string;
    fullName?: string;
    securityQuestion?: string;
    securityAnswer?: string;
  }, type: 'login' | 'register'): string | null {
    const { email, password, masterPin, fullName, securityQuestion, securityAnswer } = formData;
  
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address';
    }
  
    if (!password || password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
  
    if (!masterPin || !/^\d{4}$/.test(masterPin)) {
      return 'Master PIN must be a 4-digit number';
    }
  
    if (type === 'register') {
      if (!fullName || fullName.length < 2) {
        return 'Full name must be at least 2 characters long';
      }
      if (!securityQuestion || securityQuestion.length < 5) {
        return 'Security question must be at least 5 characters long';
      }
      if (!securityAnswer || securityAnswer.length < 2) {
        return 'Security answer must be at least 2 characters long';
      }
    }
  
    return null;
  }
  
  export function validateSettingsForm(formData: {
    fullName: string;
    masterPin: string;
    securityQuestion: string;
    securityAnswer: string;
  }): string | null {
    const { fullName, masterPin, securityQuestion, securityAnswer } = formData;
  
    if (fullName && fullName.length < 2) {
      return 'Full name must be at least 2 characters long';
    }
    if (masterPin && !/^\d{4}$/.test(masterPin)) {
      return 'Master PIN must be a 4-digit number';
    }
    if (securityQuestion && securityQuestion.length < 5) {
      return 'Security question must be at least 5 characters long';
    }
    if (securityAnswer && securityAnswer.length < 2) {
      return 'Security answer must be at least 2 characters long';
    }
  
    return null;
  }
  
  export function validateCardForm(formData: {
    cardholderName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardType: string;
  }): string | null {
    const { cardholderName, cardNumber, expiryDate, cvv, cardType } = formData;
  
    if (!cardholderName || cardholderName.length < 2) {
      return 'Cardholder name must be at least 2 characters long';
    }
  
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
      return 'Card number must be a 16-digit number';
    }
  
    if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      return 'Expiry date must be in MM/YY format';
    }
  
    if (!cvv || !/^\d{3,4}$/.test(cvv)) {
      return 'CVV must be a 3 or 4-digit number';
    }
  
    if (!cardType || !['Visa', 'MasterCard', 'Amex', 'Discover'].includes(cardType)) {
      return 'Card type must be Visa, MasterCard, Amex, or Discover';
    }
  
    return null;
  }