import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import SearchInput from '../components/SearchInput';
import SubCategories from '../components/SubCategories';
import MoviesByCategory from '../components/MoviesByCategory';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <SearchInput />
        <SubCategories />
        <MoviesByCategory />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    marginTop: 30
  }
});

export default HomeScreen;
