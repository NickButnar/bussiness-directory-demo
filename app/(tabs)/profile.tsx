import { View, Text, Button } from 'react-native';
import React from 'react';
import { useAuth } from '@clerk/clerk-react';

const Page = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Text>Profile</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
}

export default Page;
