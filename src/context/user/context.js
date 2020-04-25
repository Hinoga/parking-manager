import { createContext } from 'react'

export const initState = {
  status: {
    loggedIn: false,
    loading: true
  },
  fullname: '',
  email: '',
  phone: '',
  uid: ''
}

const UserContext = createContext([initState, {}])

export default UserContext
