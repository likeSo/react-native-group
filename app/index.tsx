import WebViewBottomSheet from "@/components/WebViewBottomSheet";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { usePaginatedQuery } from "convex/react";
import { useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import Animated, { CSSAnimationKeyframes } from "react-native-reanimated";
import {
  Separator,
  Spinner,
  Stack,
  Text,
  useTheme,
  XStack,
  YStack,
} from "tamagui";

const pulse: CSSAnimationKeyframes = {
  from: {
    transform: [{ scale: 0.9 }, { rotateZ: "-5deg" }],
  },
  to: {
    transform: [{ scale: 1.1 }, { rotateZ: "5deg" }],
  },
};

export default function Index() {
  const { results, loadMore, isLoading } = usePaginatedQuery(
    api.news.page,
    "skip",
    { initialNumItems: 20 },
  );
  const theme = useTheme();
  const webViewBottomSheetRef = useRef<BottomSheetModal>(null);

  const renderItem = ({
    item,
    index,
  }: {
    item: Doc<"news">;
    index: number;
  }) => {
    return (
      <XStack
        bg={"$background"}
        hoverStyle={{ opacity: 0.5 }}
        cursor="pointer"
        px={12}
        py={8}
        items={"center"}
        onPress={() =>
          webViewBottomSheetRef.current?.present({
            url: item.link,
            title: item.title,
          })
        }
      >
        <YStack flex={1} gap={4}>
          <Text fontSize={16} fontWeight={"500"}>
            {item.title}
          </Text>
          <Text fontSize={14}>{item.description}</Text>
          <Text fontSize={12} color={"$accent10"} fontWeight={"400"}>
            {item.category}，{new Date(item._creationTime).toString()}
          </Text>
        </YStack>
        <Ionicons name="chevron-forward" size={18} color="gray" />
      </XStack>
    );
  };

  if (!results || results.length === 0) {
    return (
      <YStack flex={1} items={"center"} justify={"center"} gap={12}>
        <Spinner size={"large"} />
      </YStack>
    );
  }

  return (
    <Stack flex={1}>
      <FlatList
        style={{ flex: 1 }}
        data={results}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => item._id}
        windowSize={5}
        removeClippedSubviews
      />
      <Animated.View
        style={[
          styles.fab,
          {
            animationName: pulse,
            animationDuration: 700,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
            animationDirection: "alternate",
            backgroundColor: theme.background.val,
          },
        ]}
      >
        <Pressable
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, flex: 1 })}
        >
          <Text>留言板 Todo...</Text>
        </Pressable>
      </Animated.View>
      <WebViewBottomSheet ref={webViewBottomSheetRef} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    boxShadow: "2px 2px 4px rgba(255, 255, 255, 0.1)",
    borderRadius: 100,
    cursor: "pointer",
  },
});
