import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";

const SubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.4:3000/api/v3/booking/user/movies/subCategory/get"
        );
        setSubCategories(response.data.subCategories);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSubCategories();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, []);

  const handleSubCategoryPress = (id) => {
    console.log("Clicked subcategory ID:", id);
    setSelectedSubCategoryId(id); // Update selected button ID
  };

  const renderSubCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.button,
        item._id === selectedSubCategoryId && styles.selectedButton // Apply selected button style
      ]}
      onPress={() => handleSubCategoryPress(item._id)} 
    >
      <Text style={[styles.buttonText, item._id === selectedSubCategoryId && styles.selectedButtonText]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text>Error: {error}</Text>}
      {!loading && !error && subCategories && subCategories.length > 0 && (
        <FlatList
          data={subCategories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderSubCategory}
          keyExtractor={(item) => item._id}
        />
      )}
      {!loading && !error && (!subCategories || subCategories.length === 0) && (
        <Text>No subcategories found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 30,
  },
  button: {
    backgroundColor: "#2161B4",
    padding: 10,
    marginVertical: 5,
    marginRight: 10,
    borderRadius: 8,
    minWidth: 100, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 13,
    color: "white",
    fontStyle: "italic",
    textAlign: "center", 
  },
  selectedButton: {
    backgroundColor: "#091C34", 
  },
  selectedButtonText: {
    color: "#ffff", 
  },
});

export default SubCategories;
