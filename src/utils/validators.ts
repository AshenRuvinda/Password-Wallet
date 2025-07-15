export function validateAuthForm(formData: {
    email: string;
    password: string;
    fullName?: string;
    masterPin?: string;
    securityQuestion?: string;
    securityAnswer?: string;
  }, type: 'login' | 'register'): string | null {
    const { email, password, fullName, masterPin, securityQuestion, securityAnswer } = formData;
  
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address';
    }
  
    if (!password || password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
  
    if (type === 'register') {
      if (!fullName || fullName.length < 2) {
        return 'Full name must be at least 2 characters long';
      }
      if (!masterPin || !/^\d{4}$/.test(masterPin)) {
        return 'Master PIN must be a 4-digit number';
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