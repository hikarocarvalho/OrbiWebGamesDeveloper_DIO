function getAdmins(map){
    let admins = [];
    for ([key,value] of map){
        if(value === 'Admin'){
            admins.push(key);
        }
    }
    return admins;
}
function getUsers(map){
    let users = [];
    for ([key,value] of map){
        if(value === 'User'){
            users.push(key);
        }
    }
    return users;
}

const usuarios = new Map();

usuarios.set('matias', 'Admin');
usuarios.set('stephan','Admin');
usuarios.set('antonia','User');
usuarios.set('antunes','Admin');

console.log(getAdmins(usuarios));
console.log(getUsers(usuarios));