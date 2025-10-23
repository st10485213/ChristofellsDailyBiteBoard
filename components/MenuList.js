import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import theme from "../styles/theme";

export default function MenuList({ menu }) {
  return (
    <View style={styles.list}>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}>
              {item.course} — R{item.price}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { width: "100%", marginTop: 10, marginBottom: 10 },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 10,
  },
  name: { fontWeight: "bold", fontSize: 16, color: theme.colors.red },
  details: { color: "#555" },
});
