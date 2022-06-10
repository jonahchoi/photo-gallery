import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useState, useEffect } from 'react'
import { appFirestore, appStorage } from '../firebase/config'

const useStorage = (initialValue) => {
  
  const [imgSrc, setImgSrc] = useState();
  const [urlArray, setUrlArray] = useState(initialValue);

  const storeImg = async (imgSrc) => {
    //Create a random name for Ref to store image
    const randomizedFileName = Math.random().toString(36).substring(2);
    const filePath = 'images/'+ randomizedFileName +'.jpg';
    const storageRef = ref(appStorage, filePath);
    
    //Upload image URL to Firebase Storage
    await uploadBytes(storageRef, imgSrc)
      .then((snapshot)=> {
        console.log("Image uploaded to firebase storage!")
      })
      .catch((err)=> console.error(err));

    //Get the storage URL to save in Firebase firestore
    getDownloadURL(storageRef)
      .then((url) => {
        const docInfo = doc(appFirestore, filePath)
        setDoc(docInfo, { url, date: new Date(), filePath })
          .then(()=> {
            console.log('Img Data has been written to database')
          })
          .catch((error) => {
            console.log('Error in writing data: ' + error)
          })
      })
      .catch((err) => console.error(err));
  }

  const imgCollection = collection(appFirestore, 'images');
  const q = query(imgCollection, orderBy('date', 'desc'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const newUrlArray = [];
    querySnapshot.forEach((doc)=> {
      newUrlArray.push({ 
        url: doc.data().url, 
        filePath: doc.data().filePath 
      });
    })
    setUrlArray(newUrlArray);
  })

  useEffect(()=>{
    if(imgSrc === undefined){
      return;
    }
    storeImg(imgSrc);
  }, [imgSrc])

  return [urlArray, setImgSrc];
}

export default useStorage
