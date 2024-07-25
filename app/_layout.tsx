import { useFonts } from "expo-font";
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Cache the Clerk JWT
const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key);
		} catch (err) {
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch (err) {
			return;
		}
	}
};

const InitialLayout = () => {
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	// If the user is signed in, redirect them to the home page
	// If the user is not signed in, redirect them to the login page
	useEffect(() => {
		if (!isLoaded) return;

		const inTabsGroup = segments[0] === '(auth)';

		if (isSignedIn && !inTabsGroup) {
			router.replace('/home');
		} else if (!isSignedIn) {
			router.replace('/login');
		}
	}, [isSignedIn]);

	return <Slot />;
};

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY');
}

export default function RootLayout() {
  useFonts({
    'montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-semibold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'montserrat-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  })

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  );
}
