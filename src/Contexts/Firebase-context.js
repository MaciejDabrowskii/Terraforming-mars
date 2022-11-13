/* eslint-disable max-len */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useContext } from "react";
import {
  collection,
  getDocs,
  addDoc,
  query,
  get,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { GlobalStatesMethods } from "./Global-state-context";
import { app, database } from "../Firebase/Firebase-init";

const FirebaseContext = React.createContext();

export function firebaseMethods()
{
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children })
{
  const { gameState, setGameID } = GlobalStatesMethods();

  const addData = async (object) =>
  {
    const docRef = await addDoc(collection(database, "TerraformingMars"), object);

    setGameID(docRef.id);
    console.log(docRef.id);
  };

  const checkIfDocumentExists = async (id) =>
  {
    const docRef = doc(database, "TerraformingMars", id);

    const docSnap = await getDoc(docRef);

    return !!docSnap.exists();
  };

  //   const fetchCollectionData = async (collectionName) =>
  //   {
  //     const querySnapshot = await getDocs(collection(database, collectionName));

  //     const data = [];

  //     querySnapshot.forEach((document) =>
  //     {
  //       data.push(document.data());
  //     });

  //     return data;
  //   };

  //   const updateHighscore = async (collectionName, documentName, data) =>
  //   {
  //     const levelRef = doc(database, collectionName, documentName);

  //     await updateDoc(levelRef, {
  //       highScore: arrayUnion(data),
  //     });
  //   };

  const fetchDocumentData = async (documentName) =>
  {
    const docRef = doc(database, "TerraformingMars", documentName);

    const docSnap = await getDoc(docRef);

    return docSnap.data();
  };

  //   useEffect(() =>
  //   {
  //     const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
  //     {
  //       if (currentUser !== null && currentUser.displayName === null)
  //       {
  //         return setUser(
  //           { ...currentUser, displayName: "Anonymous" },
  //         );
  //       }

  //       return setUser(currentUser);
  //     });

  //     return () => unsubscribe();
  //   }, []);

  const methods = {
    addData,
    fetchDocumentData,
    checkIfDocumentExists,
  };

  return (
    <FirebaseContext.Provider value={methods}>
      {children}
    </FirebaseContext.Provider>
  );
}
