import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

export default function (props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );
}
