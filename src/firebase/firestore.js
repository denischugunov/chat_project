import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";

const test = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data(), null, 2)}`);
  });
};
test();