import { createContext, ReactNode, useEffect, useState } from "react";
import { SongData } from "./utils/interfaces.ts";

/* AppContext prop types */
interface AppContextType {
  currentPreviewSong: SongData | null;
  setCurrentPreviewSong: (song: SongData | null) => void;
}

export const AppContext = createContext<AppContextType>({
  currentPreviewSong: null,
  setCurrentPreviewSong: () => {},
});

interface AppContextProviderProps {
  children: ReactNode;
}

// TODO: Set currentPreviewSong back to initial on log out OR log in
// TODO: Wrap pages accessible to logged in users with AppContextProvider (likely through NavBar)
export function AppContextProvider({ children }: AppContextProviderProps) {
  // For storing the song that the user has selected to preview as a state over the discovery feed and user profile
  const [currentPreviewSong, setCurrentPreviewSong] = useLocalStorage(
    "currentPreviewSong",
    undefined,
  );

  const context = {
    currentPreviewSong,
    setCurrentPreviewSong,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export function useLocalStorage(key: string, initialValue = null) {
  const [value, setValue] = useState(() => {
    try {
      const data = window.localStorage.getItem(key);
      return data ? JSON.parse(data) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue]);

  return [value, setValue];
}
