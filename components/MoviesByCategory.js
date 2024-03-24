import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const MoviesByCategory = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.4:3000/api/v3/booking/user/movies/movie-by-category/get"
        );

        setMovies(response.data.movies);
      } catch (error) {
        console.log("failed to get data");
      }
    };
    fetchAllMovies();
  }, []);

  const navigateToMovieDetails = async (movieId) => {
    try {
      const response = await axios.post(
        'http://192.168.1.4:3000/api/v3/booking/user/movies/movie-details',
        { movieId }
      );
  
      console.log('Movie details:', response.data);
      // Process the movie details as needed (e.g., navigate to another screen)
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
    }
  };

  const renderCategory = ({ item }) => {
    return (
      <View>
        <Text style={styles.category}>{item.category}</Text>
        <FlatList
          data={item.movies}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: movie }) => (
            <TouchableOpacity onPress={()=>navigateToMovieDetails(movie.movieId)}>
              <View style={styles.movieContainer}>
                <Image
                  source={{
                    uri: movie.image,
                  }}
                  style={styles.image}
                />
                <Text style={styles.title}>{movie.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(movie) => movie.title}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderCategory}
        keyExtractor={(category) => category.category}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  category: {
    fontSize: 20,
    fontWeight: "200",
    marginBottom: 10,
    fontStyle: "italic",
    marginTop: 20,
  },
  movieContainer: {
    marginRight: 10,
  },
  image: {
    width: 135,
    height: 160,
    borderRadius: 8,
  },
  title: {
    marginTop: 5,
    fontSize: 9,
    fontWeight: "400",
    fontSize: 10,
  },
});

export default MoviesByCategory;
