import { Library } from "../models/Library";
import defaultLibraries from "../resources/defaultLibraries";

const API_URL = "https://api.npoint.io/";

export function fetchLibraries(saveID?: string): () => Promise<Library[]> {
  return async () => {
    if (!saveID) {
      return defaultLibraries;
    } else {
      const res = await fetch(`${API_URL}${saveID}`);
      return res.json();
    }
  };
}

export function toggleLibrary(
  saveID: string,
): (library: Library, libraries: Library[]) => Promise<void> {
  return async (library, libraries) => {
    library.visited = !library.visited;
    await fetch(`${API_URL}${saveID}`, {
      method: "POST",
      body: JSON.stringify(libraries),
    });
  };
}

export function generateApi(saveID: string) {
  return {
    toggleLibrary: toggleLibrary(saveID),
    fetchLibraries: fetchLibraries(saveID),
  };
}
export type Api = ReturnType<typeof generateApi>;
