import { Library } from "../models/Library";
import defaultLibraries from "../resources/defaultLibraries";

const API_URL = "https://api.npoint.io/";

export async function fetchLibraries(saveID?: string): Promise<Library[]> {
  if (!saveID) {
    return defaultLibraries;
  } else {
    const res = await fetch(`${API_URL}${saveID}`);
    return res.json();
  }
}

export async function toggleLibrary(
  saveID: string,
  library: Library,
  libraries: Library[],
): Promise<void> {
  library.visited = !library.visited;
  await fetch(`${API_URL}${saveID}`, {
    method: "POST",
    body: JSON.stringify(libraries),
  });
}
