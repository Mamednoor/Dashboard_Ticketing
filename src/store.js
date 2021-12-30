import { configureStore } from '@reduxjs/toolkit'

import ticketsReducer from './Pages/Ticketing/Tickets/ticketsSlice'
import loginReducer from './Components/Auth/Login/loginSlice'
import userReducer from './Pages/Dashboard/userSlice'
import newTicketReducer from './Pages/Ticketing/AddTicket/addTicketSlice'
import registrationReducer from './Components/Auth/Registration/registrationSlice'
import resetPasswordReducer from './Components/Auth/ResetPassword/passwordSlice'
import usersListReducer from './Pages/UsersList/usersListSlice'
import addNewUserReducer from './Pages/UsersList/AddUser/adduserSlice'
import profilReducer from './Pages/Profil/profilSlice'
import profilUpdateReducer from './Pages/UsersList/UserDetails/updateUserSlice'

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    login: loginReducer,
    user: userReducer,
    addTicket: newTicketReducer,
    registration: registrationReducer,
    resetPassword: resetPasswordReducer,
    userList: usersListReducer,
    addNewUser: addNewUserReducer,
    profil: profilReducer,
    profilUpdate: profilUpdateReducer,
  },
})

export default store
