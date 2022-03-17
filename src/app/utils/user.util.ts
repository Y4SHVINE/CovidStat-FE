export const getUser = ()=> {
  return JSON.parse(localStorage.getItem('user'));
}

export const getUserNIC = ()=> {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.nic : null;
}
