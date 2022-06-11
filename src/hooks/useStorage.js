import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useState, useEffect } from 'react'
import { appFirestore, appStorage } from '../firebase/config'

const useStorage = ( initialValue, setLoadSpinnerStatus ) => {
  
  const [imgSrc, setImgSrc] = useState();
  const [urlArray, setUrlArray] = useState(initialValue);

  const storeImg = async (imgSrc) => {

    setLoadSpinnerStatus('loading');

    //Create a random name for Ref to store image
    const randomizedFileName = Math.random().toString(36).substring(2);
    const filePath = 'images/'+ randomizedFileName +'.jpg';
    const storageRef = ref(appStorage, filePath);
    
    //Upload image URL to Firebase Storage
    uploadBytes(storageRef, imgSrc)
      .then(()=> {
        console.log("Image uploaded to firebase storage!");
        getDownloadURL(storageRef)
          .then((url) => {
            const docInfo = doc(appFirestore, filePath)
            setDoc(docInfo, { url, date: new Date(), filePath })
              .then(()=> {
                console.log('Img Data has been written to database')
                setLoadSpinnerStatus('');
              })
              .catch((error) => {
                console.log('Error in writing data: ' + error)
                setLoadSpinnerStatus('');
              })
          })
          .catch((err) => {
            console.error(err);
            setLoadSpinnerStatus('');  
          });
      })
      .catch((err)=> console.error(err));    
  }

  useEffect(()=> {
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
  }, [])

  useEffect(() => {
    if(imgSrc === undefined){
      return;
    }
    storeImg(imgSrc);
    setImgSrc(undefined);
  }, [imgSrc])

  return [urlArray, setImgSrc];
}

export default useStorage
