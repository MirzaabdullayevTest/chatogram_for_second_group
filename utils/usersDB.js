const userDB = []  /// "Tom, "

const userJoin = (username, room, id) => {
    const user = { username, room, id }
    userDB.push(user)

    return user
}

const getCurrentUser = (id) => {
    return user = userDB.find((user => user.id === id))
}

const leaveUser = (id) => {
    const index = userDB.findIndex((user => user.id === id)) /// index kalit number, raqam

    return user = userDB.splice(index, 1)[0]  // bazadan o'chiradi
}

const getRoomUsers = (room) => {
    return users = userDB.filter((user => user.room === room))  // yangi massiv
}

module.exports = {
    userJoin,
    getCurrentUser,
    leaveUser,
    getRoomUsers
}