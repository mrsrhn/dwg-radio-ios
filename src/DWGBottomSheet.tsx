import BottomSheet from "@gorhom/bottom-sheet";
import { View, Text } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";

export const DWGBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["60%", "90%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      animateOnMount={false}
    >
      <View>
        <Text>BottomSheet</Text>
      </View>
    </BottomSheet>
  );
};
