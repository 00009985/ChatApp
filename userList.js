const users = [];

//to join user to the chat
function userJoin(id, username, room) {
    const user = { id, username, room };

    users.push(user);

    return user;
}

//getting the current user
function getCurrentUser(id) {
    return users.find(user => user.id === id );
}

//removing the user from the list when he leaves 
function userLeave(id) {
    const index = users.findIndex(user => user.id === id)
    if (index !== -1){
        return users.splice(index, 1)[0];
    }
}

//getting the users from the exact room 
function getRoomUsers(room){
    //using the filter function we can return only the users whose room is equal to the room he has passsed in 
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}

