import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { Library, Visits } from "../models/Library";

// Initialize Firebase
const app = initializeApp({
  projectId: "auckland-libraries-452302",
});
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

type DefaultLibrary = Library & { visited: never };

/** use firestore because it's quick (but mostly because it's on Google's free tier and Cloud SQL isn't)
 *
 * Security is handled using Firestore rules.
 */
export class Api {
  constructor(private saveID: string) {}

  async toggleLibrary(library: Library): Promise<void> {
    // for local display
    library.visited = !library.visited;

    const visitRef = doc(db, "visits", this.saveID);
    const visitsDoc = await getDoc(visitRef);
    if (!visitsDoc.exists()) {
      throw new Error(`saveID {${this.saveID}} not found in firestore`);
    }
    const visits: Visits = visitsDoc.data();

    const body = {
      [library.libraryId]: !(visits[library.libraryId] ?? false),
    };
    await updateDoc(visitRef, body);
  }

  async fetchLibraries(): Promise<Library[]> {
    const libraryDocs = await getDocs(collection(db, "libraries"));

    const visitsDoc = await getDoc(doc(db, "visits", this.saveID));
    if (!visitsDoc.exists()) {
      throw new Error(`saveID {${this.saveID}} not found in firestore`);
    }

    const visits = visitsDoc.data() as Visits;

    return Object.values(libraryDocs.docs).map((libraryDoc) => {
      const library = libraryDoc.data() as DefaultLibrary;
      return {
        ...library,
        visited: visits[library.libraryId] ?? false,
      };
    });
  }
}
