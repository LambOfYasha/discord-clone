"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface UserProfile {
  id: string;
  name: string;
  imageUrl: string;
  email: string;
}

export const useUserProfile = () => {
  const { user } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          // Fallback to Clerk user data if API fails
          setProfile({
            id: user.id,
            name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",
            imageUrl: user.imageUrl || "",
            email: user.emailAddresses[0]?.emailAddress || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Fallback to Clerk user data
        setProfile({
          id: user.id,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",
          imageUrl: user.imageUrl || "",
          email: user.emailAddresses[0]?.emailAddress || "",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return;

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        return updatedProfile;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return {
    profile,
    loading,
    updateProfile,
  };
}; 