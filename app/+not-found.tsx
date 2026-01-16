import { Stack } from "expo-router";
import { Text, YStack } from "tamagui";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <YStack flex={1} items={"center"} justify={"center"}>
        <Text>404 Not Found</Text>
      </YStack>
    </>
  );
}
