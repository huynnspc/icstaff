import { combineReducers } from "redux"
import authReducer from "./authReducer"
import errorsReducer from "./errorReducer"
import userReducer from "./userReducer"
import profileReducer from "./profileReducer"
import certificateReducer from "./certificateReducer"
import experienceReducer from "./experienceReducer"
import timelineReducer from "./timelineReducer"
import roleReducer from "./roleReducer"
import storeReducer from "./storeReducer"
import regionReducer from "./regionReducer"
import systemReducer from "./notification/systemReducer"
import hrReducer from "./notification/hrReducer"
import prReducer from "./notification/prReducer"
import notificationReducer from "./notification/notificationReducer"
import workReducer from "./workReducer"

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  user: userReducer,
  profile: profileReducer,
  certificates: certificateReducer,
  experiences: experienceReducer,
  work: workReducer,
  timelines: timelineReducer,
  role: roleReducer,
  store: storeReducer,
  region: regionReducer,
  system: systemReducer,
  hr: hrReducer,
  pr: prReducer,
  notification: notificationReducer,
})
