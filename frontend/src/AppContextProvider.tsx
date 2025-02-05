import { createContext, ReactNode, useEffect, useState } from "react";
import { SongData } from "./utils/interfaces.ts";

/* AppContext prop types */
interface AppContextType {
  currentPreviewSong: SongData | null;
  setCurrentPreviewSong: (song: SongData | null) => void;
  currentUserId: string | null;
  setCurrentUserId: (userId: string | null) => void;
  promptOfTheDay: string | undefined;
  setPromptOfTheDay: (prompt: string | undefined) => void;
  promptIdOfTheDay: string | undefined;
  setPromptIdOfTheDay: (promptId: string | undefined) => void;
}

export const AppContext = createContext<AppContextType>({
  currentPreviewSong: null,
  setCurrentPreviewSong: () => {},
  currentUserId: null,
  setCurrentUserId: () => {},
  promptOfTheDay: undefined,
  setPromptOfTheDay: () => {},
  promptIdOfTheDay: undefined,
  setPromptIdOfTheDay: () => {},
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
    null
  );

  const [currentUserId, setCurrentUserId] = useLocalStorage(
    "currentUserId",
    null
  );

  const [promptOfTheDay, setPromptOfTheDay] = useState<string | undefined>(
    undefined
  );

  const [promptIdOfTheDay, setPromptIdOfTheDay] = useState<string | undefined>(
    undefined
  );

  const context = {
    currentPreviewSong,
    setCurrentPreviewSong,
    currentUserId,
    setCurrentUserId,
    promptOfTheDay,
    setPromptOfTheDay,
    promptIdOfTheDay,
    setPromptIdOfTheDay,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export function useLocalStorage(key: string, initialValue: null = null) {
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
