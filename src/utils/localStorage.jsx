export const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
}

export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem('user');
    if (result) {
      try {
        const user = JSON.parse(result);
        return user;
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
        return null;
      }
    }
    return null;
  };
