import moment from 'moment';

export function parseUsers(inputUsers) {
  let outputUsers = inputUsers.map(parseUser);
  return outputUsers;
}

export function parseUser(inputUser) {
  let User = inputUser.toObject();
    return User;
}