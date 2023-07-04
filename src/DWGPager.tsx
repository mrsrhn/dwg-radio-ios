import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

export const DWGPager = () => {
  return (
    <View style={{ flex: 1 }}>
      <PagerView style={styles.viewPager} initialPage={1}>
        <View style={styles.page} key="1">
          <Text>Pur</Text>
        </View>
        <View style={styles.page} key="2">
          <Text>Radio</Text>
        </View>
        <View style={styles.page} key="3">
          <Text>Lyra</Text>
        </View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
});
