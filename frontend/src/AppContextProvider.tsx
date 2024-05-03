import { createContext, ReactNode, useEffect, useState } from "react";

export const AppContext = createContext({});

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  // For storing the song that the user has selected to preview as a state over the discovery feed and user profile
  const [currentPreviewSong, setCurrentPreviewSong] = useLocalStorage(
    "currentPreviewSong",
    undefined,
  );

  function handlePreviewSong(song: {
    songTitle: string;
    artists: string;
    album: string;
    albumArtSrc: string;
    songAudioSrc: string | undefined;
    openInSpotifyUrl: string | undefined;
  }) {
    setCurrentPreviewSong(song);
  }

  const context = {
    currentPreviewSong,
    handlePreviewSong,
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
