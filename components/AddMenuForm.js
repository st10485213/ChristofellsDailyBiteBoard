import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import theme from "../styles/theme";

export default function AddMenuForm({ addMenuItem, clearMenu }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [course, setCourse] = useState("");

  const handleSubmit = () => {
    if (!name || !price || !course) return;
    addMenuItem({ id: Date.now().toString(), name, price, course });
    setName("");
    setPrice("");
    setCourse("");
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Dish name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Course (e.g. Starter, Main)"
        value={course}
        onChangeText={setCourse}
      />
      <Button title="Add Dish" color={theme.colors.red} onPress={handleSubmit} />
      <View style={{ marginTop: 8 }}>
        <Button title="Clear Menu" color="#aaa" onPress={clearMenu} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 120,
    width: "100%",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
});
