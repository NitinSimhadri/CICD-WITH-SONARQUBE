let users = [];

 

function getUsers() {

  return users;

}

 

function addUser(name) {

  const user = {

    id: users.length + 1,

    name: name

  };

  users.push(user);

  return user;

}

 

module.exports = {

  getUsers,

  addUser

};

 
