import { createContext, useContext, useState } from "react";

const PostContext = createContext();

export function PostProvider({ children }) {

  const [platform, setPlatform] = useState("Instagram");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const loadDraft = (draft) => {
    setPlatform(draft.platform);
    setText(draft.text);
    setImage(draft.image);
  };

  const clearPost = () => {
    setPlatform("Instagram");
    setText("");
    setImage(null);
  };

  return (
    <PostContext.Provider
      value={{
        platform,
        setPlatform,
        text,
        setText,
        image,
        setImage,
        loadDraft,
        clearPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  return useContext(PostContext);
}