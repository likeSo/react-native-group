import { Stack } from 'expo-router';
import { ScrollView } from 'tamagui';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ScrollView flex={1}>

      </ScrollView>
    </>
  );
}