export function validateAuthForm(formData: { email: string; password: string; fullName?: string; masterPin?: string; securityQuestion?: string; securityAnswer?: string }, type: 'login' | 'register') {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Invalid email address';
    }
    if (!formData.password || formData.password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (type === 'register') {
      if (!formData.fullName || formData.fullName.trim() === '') {
        return 'Full name is required';
      }
      if (!formData.masterPin || formData.masterPin.length !== 4) {
        return 'Master PIN must be exactly 4 digits';
      }
      if (!formData.securityQuestion || formData.securityQuestion.trim() === '') {
        return 'Security question is required';
      }
      if (!formData.securityAnswer || formData.securityAnswer.trim() === '') {
        return 'Security answer is required';
      }
    }
    return '';
  }
  
  export function validateSettingsForm(formData: { fullName: string; masterPin: string; securityQuestion: string; securityAnswer: string }) {
    if (formData.fullName && formData.fullName.trim() === '') {
      return 'Full name cannot be empty';
    }
    if (formData.masterPin && formData.masterPin.length !== 4) {
      return 'Master PIN must be exactly 4 digits';
    }
    if (formData.securityQuestion && formData.securityQuestion.trim() === '') {
      return 'Security question cannot be empty';
    }
    if (formData.securityAnswer && formData.securityAnswer.trim() === '') {
      return 'Security answer cannot be empty';
    }
    return '';
  }