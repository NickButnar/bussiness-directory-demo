import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {

  useFonts({
    'montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-semibold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'montserrat-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  })

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
