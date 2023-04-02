import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  databaseURL: import.meta.env.VITE_databaseURL,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
});
const db = getFirestore(firebaseApp);

//forestoreよりjson文字列取得
export const getFsJson = async () => {
  const ref = collection(db, "line_station");
  const querySnapshot = await getDocs(ref);

  let json: { id: string; json: string }[] = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id);
    json.push({ id: doc.id, json: doc.data().json });
  });
  return json;
};
