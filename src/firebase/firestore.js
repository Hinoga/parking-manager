import firebase from '@firebase/app'

const firebaseFirestore = (firestore, auth) => ({
  //ACA METE LAS CONSULTAS
  userData: uid => {
    return firestore.doc('users/' + uid)
  },

  clientsData: uid => {
    return firestore
      .collection('users')
      .doc(auth.currentUser.uid)
      .collection('clients')
  },

  clientData: (uid, clientId) => {
    return firestore
      .collection('users')
      .doc(auth.currentUser.uid)
      .collection('clients')
      .doc(clientId)
  },

  tarifaData: uid => {
    return firestore.doc('Tarifa/' + uid)
  },

  balanceData: uid => {
    return firestore.doc('Balance/' + uid)
  },

  vehiculoData: uid => {
    return firestore.doc('Vehiculo/' + uid)
  },

  usuarioData: uid => {
    return firestore.doc('usuario/' + uid)
  }
})

export default firebaseFirestore
