import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text, Image } from "react-native";
import axios from "axios";

const MovieCard = ({ title, image }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const NowPlayingMoviesScreen = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  const fetchNowPlayingMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing",
        {
          params: {
            api_key: "63bd137e5954c07fafae38c48f8e9934",
          },
        }
      );
    
      setNowPlayingMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  };

  return (
    <View style={styles.container}>
     
      <ScrollView
        contentContainerStyle={styles.movieContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {nowPlayingMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            image={{
              uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            }}
            overview={movie.overview}
            releaseDate={movie.release_date}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
    marginRight: 10,
  },
  movieContainer: {
    alignItems: "center",
    marginRight: 10,
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 10,
  },
});

export default NowPlayingMoviesScreen;
