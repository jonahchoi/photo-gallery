import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useState, useEffect } from 'react'
import { appFirestore, appStorage } from '../firebase/config'

const useStorage = (initialValue) => {
  
  const [imgSrc, setImgSrc] = useState();
  const [urlArray, setUrlArray] = useState(initialValue);

  const imgCollection = collection(appFirestore, 'images')
  
  const getAllImgUrls = async () => {
    const q = query(imgCollection, orderBy('date', 'desc'));
    
    const querySnapshot = await getDocs(q);

    const newUrlArray = [];
    querySnapshot.forEach((doc)=> {
      newUrlArray.push(doc.data().url);
    })
    setUrlArray(newUrlArray);
  }

  const storeImg = async (imgSrc) => {
    //Create a random name for Ref to store image
    const randomizedFileName = Math.random().toString(36).substring(2);
    
    const storageRef = ref(appStorage, 'images/'+ randomizedFileName +'.jpg');

    //Upload image URL to Firebase Storage
    await uploadBytes(storageRef, imgSrc)
      .then((snapshot)=> {
        console.log("Image uploaded to firebase storage!")
      })
      .catch((err)=> console.error(err));

    //Get the storage URL to save in Firebase firestore
    await getDownloadURL(storageRef)
      .then((url) => {
        addDoc(imgCollection, { url, date: new Date() })
          .then(()=> {
            console.log('Img Data has been written to database')
          })
          .catch((error) => {
            console.log('Error in writing data: ' + error)
          })
      })
      .catch((err) => console.error(err));

    getAllImgUrls()
      .then(()=> console.log('Url Array Set!'))
      .catch((err)=> console.error(err));
  }
  
  useEffect(()=>{
    getAllImgUrls();
  }, [])

  useEffect(()=>{
    if(imgSrc === undefined){
      return;
    }
    storeImg(imgSrc);
  }, [imgSrc])

  return [urlArray, setImgSrc];
}

export default useStorage
