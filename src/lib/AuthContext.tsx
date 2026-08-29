"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          let userSnap = await getDoc(userDocRef);

          // Auto-create document if it doesn't exist yet
          if (!userSnap.exists()) {
            try {
              await setDoc(userDocRef, {
                email: currentUser.email || "",
                displayName: currentUser.displayName || "",
                photoURL: currentUser.photoURL || "",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                role: "student",
              });
              userSnap = await getDoc(userDocRef);
            } catch (createErr) {
              console.warn("Could not auto-create user document:", createErr);
            }
          } else {
            // Document exists, check if email, displayName, role, or photoURL are missing
            const data = userSnap.data() || {};
            const updatePayload: any = {};
            let needsUpdate = false;

            if (!data.email && currentUser.email) {
              updatePayload.email = currentUser.email;
              needsUpdate = true;
            }
            if (!data.displayName && currentUser.displayName) {
              updatePayload.displayName = currentUser.displayName;
              needsUpdate = true;
            }
            if (!data.photoURL && currentUser.photoURL) {
              updatePayload.photoURL = currentUser.photoURL;
              needsUpdate = true;
            }
            if (!data.role) {
              updatePayload.role = "student";
              needsUpdate = true;
            }

            if (needsUpdate) {
              try {
                await setDoc(userDocRef, updatePayload, { merge: true });
                userSnap = await getDoc(userDocRef);
              } catch (updateErr) {
                console.warn("Could not update missing user fields:", updateErr);
              }
            }
          }

          if (userSnap.exists()) {
            const data = userSnap.data();
            setIsAdmin(data.role === "admin");
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [trigger]);

  const refreshUser = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setUser(auth.currentUser);
      setTrigger((prev) => prev + 1);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
