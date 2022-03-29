// permission list => can use json file
const rolesAndPermission = require('../permission.json')

//#region  Correct data: can create / update / delete => can read
Object.keys(rolesAndPermission).forEach(role => {
    let _permission = rolesAndPermission[role],
        _read = []

    Object.keys(_permission).forEach(ability => 
        _permission[ability].forEach(access =>
            (_read.indexOf(access.name || access) === -1) && _read.push(access)
    ))

    if (_read.length) _permission['read'] = _read
})
//#endregion

// check accessRoles 
export const roleExist = (role = null) => rolesAndPermission.hasOwnProperty(role?.toLowerCase())
// if role / permission is exist => can assess
export const permission = (role = null) => rolesAndPermission[role] || {}