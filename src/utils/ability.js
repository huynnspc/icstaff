import { Ability, AbilityBuilder } from '@casl/ability'

import { permission } from '../config/permission'

// update when use dynamic permission

//#region Function to load permission by role and create Ability [can, cannot]
//        this function will change when use dinamic
const getPermissionFor = (role) => {
    const _permission = permission(role)

    if (!_permission) return null

    const { can, rules } = new AbilityBuilder()
        
    Object.keys(_permission).forEach(_ability =>
        can(_ability, _permission[_ability])
    )
    
    return rules
}
//#endregion

export const ability = new Ability()
// update permission base on role
export const update = (role = '') => ability.update(getPermissionFor(role?.toLowerCase()))
