import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: "AIzaSyA5C6E1AKeVlvlxkbtcjxPQdAhHcZsVemg",
  authDomain: "crwn-db-5af36.firebaseapp.com",
  projectId: "crwn-db-5af36",
  storageBucket: "crwn-db-5af36.appspot.com",
  messagingSenderId: "587138061426",
  appId: "1:587138061426:web:43cb3ce9e4f15227651eeb"
};

firebase.initializeApp(config)

// creating a user in our db
export const createUserProfileDocument = async (userAuth, addtionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapshot = await userRef.get()
  console.log(snapshot)

  // if the snapshot does not exist, we create data in that place
  if(!snapshot.exists){
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addtionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef
}
// importing our JSON data into firebase
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // create collections using the collectionKey
  const collectionRef = firestore.collection(collectionKey)

  const batch = firestore.batch()
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })

  return await batch.commit()
}

// converting the doc data and adding routeName and ID to each doc
export const convertCollectionsSnapshotToMap =  (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  } , {})
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

// setting up Google authentication utility
const provider = new firebase.auth.GoogleAuthProvider()
// always trigger the Google popup when using Google auth & sign in within our app
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase