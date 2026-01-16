import { api } from "@/convex/_generated/api";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { usePaginatedQuery } from "convex/react";

const MessageBoardBottomSheet = () => {
  return (
    <BottomSheetModal
      enableDynamicSizing={false}
      enableDismissOnClose
      enablePanDownToClose
    >
      <BoardContent />
    </BottomSheetModal>
  );
};

const BoardContent = () => {
  const { results, loadMore, } = usePaginatedQuery(api.posts.page, 'skip', { initialNumItems: 20 });
  return <BottomSheetFlatList />;
};
