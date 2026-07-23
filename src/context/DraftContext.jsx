import { useNavigate } from "react-router-dom";
import { usePost } from "../context/PostContext";
import { createContext, useContext, useEffect, useState } from "react";

const DraftContext = createContext();

export function DraftProvider({ children }) {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("drafts");

    if (saved) {
      setDrafts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  const saveDraft = (draft) => {
    const newDraft = {
      id: Date.now(),
      createdAt: new Date().toLocaleString(),
      ...draft,
    };

    setDrafts((prev) => [newDraft, ...prev]);
  };

  const deleteDraft = (id) => {
    setDrafts((prev) => prev.filter((draft) => draft.id !== id));
  };

  const updateDraft = (updatedDraft) => {
    setDrafts((prev) =>
      prev.map((draft) =>
        draft.id === updatedDraft.id ? updatedDraft : draft
      )
    );
  };

  return (
    <DraftContext.Provider
      value={{
        drafts,
        saveDraft,
        deleteDraft,
        updateDraft,
      }}
    >
      {children}
    </DraftContext.Provider>
  );
}

export function useDrafts() {
  return useContext(DraftContext);
}