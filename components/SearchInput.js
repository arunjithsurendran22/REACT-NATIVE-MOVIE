import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    // You can perform search logic here
    console.log("Search Text:", text);
    setSearchText(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    paddingHorizontal: 5,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
});

export default SearchInput;
