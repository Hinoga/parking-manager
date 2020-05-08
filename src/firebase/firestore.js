import firebase from '@firebase/app'

const firebaseFirestore = (firestore, auth) => ({
  userData: uid => {
    return firestore.doc('users/' + uid)
  },
  clientsData: _ => {
    return firestore
      .collection('users')
      .doc(auth.currentUser.uid)
      .collection('clients')
  },
  clientData: clientId => {
    return firestore
      .collection('users')
      .doc(auth.currentUser.uid)
      .collection('clients')
      .doc(clientId)
  },
  vehiclesData: _ => {
    return firestore
      .collection('users')
      .doc(auth.currentUser.uid)
      .collection('vehicles')
  },
  vehicleData: vehicleId => {
    return firestore
      .collection('users')
      .doc(auth.currentUser.uid)
      .collection('vehicles')
      .doc(vehicleId)
  },
  receiptData: _ => {
    return firestore
      .collection('users')
      .doc(auth.currentUser.uid)
      .collection('receipts')
  }
})

export default firebaseFirestore
