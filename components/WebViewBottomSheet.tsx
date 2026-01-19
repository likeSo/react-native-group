import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { forwardRef, ReactNode, useState } from "react";
import { Platform } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { styled, Text } from "tamagui";
import CustomBackdrop from "./CustomBackdrop";

const LinkButton = styled(Text, {
  color: "$blue8",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: "400",
  hoverStyle: {
    color: "$blue5",
  },
  pressStyle: {
    color: "$blue5",
  },
});

const WebViewBottomSheet = forwardRef<BottomSheetModal, any>((props, ref) => {
  // const theme = useTheme();
  const theme = useTheme();

  return (
    <BottomSheetModal
      snapPoints={["80%"]}
      ref={ref}
      enableDynamicSizing={false}
      enablePanDownToClose
      enableDismissOnClose
      backdropComponent={CustomBackdrop}
      backgroundStyle={{ backgroundColor: theme.colors.card }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
    >
      {({ data }) => <SheetContent {...data} />}
    </BottomSheetModal>
  );
});

export type Props = {
  url: string;
  title?: string;
};

const SheetContent = (props: Props) => {
  const { url, title: presetTitle } = props;
  const [title, setTitle] = useState(presetTitle);

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    if (navState.title && !presetTitle) {
      setTitle(navState.title);
    }
  };

  let webView: ReactNode;
  if (Platform.OS === "web") {
    webView = <iframe style={{ flex: 1, border: "none" }} src={url} />;
  } else {
    webView = (
      <WebView
        style={{ flex: 1 }}
        source={{ uri: url }}
        onNavigationStateChange={onNavigationStateChange}
      />
    );
  }

  return (
    <BottomSheetView style={{ height: "100%" }}>
      <Text fontSize={18} fontWeight={"500"} mb="$3" mx="$3">
        {title}{" "}
        <LinkButton onPress={() => Clipboard.setStringAsync(url)}>
          复制网址
        </LinkButton>
      </Text>
      {webView}
    </BottomSheetView>
  );
};

export default WebViewBottomSheet;
