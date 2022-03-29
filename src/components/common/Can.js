import { createCanBoundTo, createContextualCan } from '@casl/react'
import { createContext } from 'react'
import { ability } from '../../utils/ability'

export const AbilityContext = createContext()

// use @casl/react + @casl/ability to create check permission component
// export default createCanBoundTo(ability)
export default createContextualCan(AbilityContext.Consumer)