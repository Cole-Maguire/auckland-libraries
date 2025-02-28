import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Library, Visits } from "../models/Library";
import { wordList } from "../resources/wordList";

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

  public get readyToRender(): boolean {
    return !!this.saveID;
  }

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

    if (!this.saveID) {
      return Object.values(libraryDocs.docs).map((libraryDoc) => {
        const library = libraryDoc.data() as DefaultLibrary;
        return {
          ...library,
          visited: false,
        };
      });
    }

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
  async newSaveID(): Promise<string> {
    let flag = true;
    let visitRef: DocumentReference<DocumentData, DocumentData>;
    let newSaveID: string;
    do {
      newSaveID = generateRandomPassword(3);
      visitRef = doc(db, "visits", newSaveID);
      if (!(await getDoc(visitRef)).exists()) {
        flag = false;
      }
    } while (flag);
    await setDoc(visitRef, {});

    this.saveID = newSaveID;
    return newSaveID;
  }
}

export function generateRandomPassword(length: number): string {
  return Array(length)
    .fill(0)
    .map(() => wordList[Math.ceil(Math.random() * 1000)])
    .join("-");
}
