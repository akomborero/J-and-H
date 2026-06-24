import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Profile, UserRole } from "../types";
import { profiles } from "../mock/data/seed";

interface AuthContextValue {
  user: Profile | null;
  loading: boolean;
  login: (email: string, role?: UserRole) => void;
  loginAs: (profileId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "jh_mock_session";

function restoreSession(): Profile | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  return profiles.find((p) => p.id === stored) ?? null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(() => restoreSession());
  const [loading] = useState(false);

  const login = (email: string, role?: UserRole) => {
    // Simulated auth: match by email, otherwise fall back to the first
    // profile of the requested role so the demo always succeeds.
    const found =
      profiles.find((p) => p.email.toLowerCase() === email.toLowerCase()) ??
      profiles.find((p) => p.role === (role ?? "client")) ??
      profiles[0];
    setUser(found);
    localStorage.setItem(STORAGE_KEY, found.id);
  };

  const loginAs = (profileId: string) => {
    const found = profiles.find((p) => p.id === profileId);
    if (found) {
      setUser(found);
      localStorage.setItem(STORAGE_KEY, found.id);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({ user, loading, login, loginAs, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
