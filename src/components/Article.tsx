import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Post } from "./PostBar";

const Article: React.FC<Post> = ({ title, img }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: img }} style={styles.img} />
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    marginBottom: 15,
  },
  title: {
    fontSize: 15,
    paddingVertical: 12,
  },
  img: {
    width: "100%",
    height: 250,
  },
});

export default Article;
