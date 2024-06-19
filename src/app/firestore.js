import {collection, doc, getDoc, getDocs, getFirestore} from 'firebase/firestore';
import { app } from './firebase';
const firestore = getFirestore(app);
export async function retrieveData(collectionName) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
}
export async function retrieveDataById(collectionName, id) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();
    return data;
}