import React, { useState, useEffect, useContext } from 'react'

import { useFirebase } from '../firebase'
import UserContext, { initState } from './context'

export const UserProvider = ({ children }) => {
  const firebase = useFirebase()
  const [user, setUser] = useState(initState)
  console.log({ user, firebase })
  useEffect(() => {
    //
    let unsubscribe
    return firebase.auth.onAuthStateChanged(authUser => {
      console.log({ authUser })
      if (authUser) {
        setUser({
          ...initState,
          status: {
            loading: true
          }
        })
        authUser.getIdToken(true).then((/* token for later use */) => {
          unsubscribe = firebase.userData(authUser.uid).onSnapshot(snapshot => {
            if (snapshot.exists) {
              const data = snapshot.data()
              setUser({
                status: 'loggedIn',
                fullName: data.fullName,
                email: data.email,
                phone: data.phone
              })
            }
          })
        })
      } else {
        // Logout
        setUser(initState)
        if (unsubscribe) {
          unsubscribe()
        }
      }
    })
  }, [firebase])

  const actions = usersActions(firebase)

  return (
    <UserContext.Provider value={[user, actions]}>
      {children}
    </UserContext.Provider>
  )
}

const usersActions = firebase => ({
  login: user => firebase.login(user),
  logout: () => firebase.logout(),
  register: user => {
    //
    return firebase.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(authUser => {
        return firebase.userData(authUser.user.uid).set(
          {
            fullName: user.fullName,
            phone: user.phone,
            email: user.email,
            uid: authUser.user.uid
            // dateCreated: firebase.firestore.Timestamp.now(),
          },
          { merge: true }
        )
      })
  },
  updateData: user => {
    const { uid } = firebase.auth.currentUser
    return firebase.userData(uid).update({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone
    })
  }
})

export const withUserProvider = Component => {
  return function UserProviderHOC(props) {
    return (
      <UserProvider>
        <Component {...props} />
      </UserProvider>
    )
  }
}
