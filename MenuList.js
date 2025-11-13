import React, { useMemo } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";

// Define the primary color for the red and white theme
const PRIMARY_RED = '#B30000'; // A deep, strong red
const LIGHT_RED = '#FFCCCC';
const DARK_GRAY = '#333';

// Define the standard course order for consistent display
const COURSE_ORDER = ["Main", "Dessert", "Drink"];

/**
 * Utility to process the flat menu array into a grouped array suitable for FlatList,
 * inserting header objects for each course.
 */
const getGroupedData = (menu) => {
  const grouped = menu.reduce((acc, item) => {
    // Note: Assuming 'course' field exists on menu items, if not defaults to 'Other'
    const course = item.course || "Other";
    if (!acc[course]) acc[course] = [];
    acc[course].push(item);
    return acc;
  }, {});

  const flatListWithHeaders = [];
  
  // Add courses in the specified order
  COURSE_ORDER.forEach(course => {
    if (grouped[course] && grouped[course].length > 0) {
      // Add the header object
      flatListWithHeaders.push({ type: 'header', title: course, id: `header-${course}` });
      // Add the item objects, marking them as 'item' type
      flatListWithHeaders.push(...grouped[course].map(item => ({ ...item, type: 'item' })));
    }
  });

  return flatListWithHeaders;
};

export default function MenuList({ menu, onSelectDish }) {
  // Process the menu data into a grouped structure whenever the menu changes
  const groupedMenuData = useMemo(() => getGroupedData(menu), [menu]);

  const renderItem = ({ item }) => {
    // 1. Render a Course Header
    if (item.type === 'header') {
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{item.title}</Text>
        </View>
      );
    }
    
    // 2. Render a Menu Item
    return (
      <Pressable 
        onPress={() => onSelectDish && onSelectDish(item)}
        // Use a very light red background when pressed for touch feedback
        style={({ pressed }) => [
          styles.item,
          { backgroundColor: pressed ? LIGHT_RED : '#fff' }, 
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.details}>
            {}
            {item.course} — R{parseFloat(item.price).toFixed(2)}
          </Text>
          {/* Display Description */}
          {item.description && <Text style={styles.description}>{item.description}</Text>}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={groupedMenuData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        // Optional: Remove scroll indicator for cleaner look
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { 
    width: "100%", 
    flex: 1, 
    paddingHorizontal: 15,
    backgroundColor: '#fff', // Ensure a white background for the list
  },
  // --- Header Styles ---
  headerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop: 20, // More space above category headers
    borderBottomWidth: 3,
    borderBottomColor: PRIMARY_RED, // Red accent border
    backgroundColor: '#fafafa', // Very light off-white background
  },
  headerText: {
    fontWeight: "900", 
    fontSize: 18,
    color: DARK_GRAY,
  },
  // --- Item Styles ---
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15, // Increased padding
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  textContainer: {
    flex: 1, 
  },
  name: { 
    fontWeight: "bold", 
    fontSize: 16, 
    color: PRIMARY_RED, // Primary Red accent for dish name
  },
  details: { 
    color: "#888", 
    fontSize: 13,
    marginBottom: 2,
  },
  description: {
    color: "#555",
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  }
});