import React, { useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Article from "./src/components/Article";
import PostBar, { Post } from "./src/components/PostBar";
import { AntDesign } from "@expo/vector-icons";

export default function App() {
  // Define variables for scrollToTheTop button
  const listRef: any = useRef(null);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 100;
  // Initialize posts list
  const [postsList, setPostsList] = useState<Post[]>([
    {
      title: "Time to relax",
      img: "https://coffee.alexflipnote.dev/V_ETmT9ZknI_coffee.jpg",
    },
    {
      title: "Un temps pour soi",
      img: "https://coffee.alexflipnote.dev/_rA3v9eQioE_coffee.jpg",
    },
    {
      title: "Pause café !",
      img: "https://coffee.alexflipnote.dev/1oA2b6GKWxE_coffee.jpg",
    },
    {
      title: "Chill Moment",
      img: "https://coffee.alexflipnote.dev/0X95ISIHGd4_coffee.jpg",
    },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <PostBar setPostsList={setPostsList} postsList={postsList} />
      <FlatList
        data={postsList}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <Article title={item.title} img={item.img} />}
        showsVerticalScrollIndicator={true}
        ref={listRef}
        onScroll={(event) => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
      />

      {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
        <TouchableOpacity
          style={styles.scrollBtn}
          onPress={() => {
            listRef.current.scrollToOffset({ offset: 0, animated: true });
          }}
        >
          <AntDesign name="up" size={34} color="#fff" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollBtn: {
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 40,
    right: 40,
    backgroundColor: "rgba(231, 231, 231, 0.42)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
