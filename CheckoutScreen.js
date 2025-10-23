import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import theme from "../styles/theme";

export default function CheckoutScreen({ route, navigation }) {
  const { menu } = route.params;
  const total = menu.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topCircle}>
        <Text style={styles.title}>Checkout</Text>
      </View>

      <Text style={styles.subtitle}>Here’s your current menu order:</Text>

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>
              {item.name} - R{item.price}
            </Text>
            <Text style={styles.itemCourse}>{item.course}</Text>
          </View>
        )}
      />

      <Text style={styles.totalText}>Total: R{total.toFixed(2)}</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back to Menu</Text>
      </TouchableOpacity>

      <View style={styles.bottomCircle}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  topCircle: {
    width: "160%",
    height: 180,
    backgroundColor: theme.colors.red,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    position: "absolute",
    top: -90,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 30,
    zIndex: -1,
  },
  bottomCircle: {
    width: "160%",
    height: 180,
    backgroundColor: theme.colors.red,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    position: "absolute",
    bottom: -90,
    alignSelf: "center",
    zIndex: -1,
  },
  title: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 140,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 10,
    width: "100%",
  },
  itemTitle: { fontWeight: "bold", color: theme.colors.red, fontSize: 16 },
  itemCourse: { color: "#666", fontStyle: "italic" },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.red,
    marginVertical: 15,
  },
  backButton: {
    backgroundColor: theme.colors.red,
    padding: 12,
    borderRadius: 8,
    marginBottom: 60,
  },
  backText: { color: "#fff", fontWeight: "bold" },
});
