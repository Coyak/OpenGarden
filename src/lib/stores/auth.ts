import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface UserSessionProfile {
  email: string;
  username: string;
  avatarUrl?: string;
}

const STORAGE_KEY = 'opengarden_user_session';

function getInitialUser(): UserSessionProfile | null {
  if (!browser) return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    return null;
  }
}

export const currentUserStore = writable<UserSessionProfile | null>(getInitialUser());

export function setUserSession(profile: UserSessionProfile) {
  currentUserStore.set(profile);
  if (browser) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {}
  }
}

export function clearUserSession() {
  currentUserStore.set(null);
  if (browser) {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }
}
