//import liraries
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

export interface Post {
  title: string;
  img: string;
}
interface Props {
  postsList: Post[];
  setPostsList: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostBar: React.FC<Props> = ({ postsList, setPostsList }) => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");

  // Function call on pressed "publish" button
  const addPost = () => {
    if (!title) {
      // Security if input is empty
      Alert.alert("Veuillez entrer un titre à votre article");
    } else {
      // Add post to the current posts list array - last post goes to be the first index
      setPostsList([
        {
          title,
          img: img,
        },
        ...postsList,
      ]);
      // Reset values
      setTitle("");
      setImg("");
    }
  };

  useEffect(() => {
    // Get an img for the next post
    const getImg = async () => {
      const response = await fetch(
        "https://coffee.alexflipnote.dev/random.json"
      );
      const responseJson = await response.json();
      await setImg(responseJson.file);
    };

    // Functions call
    getImg();
  }, [postsList]);

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Quoi de neuf ?"
        placeholderTextColor="#e2e2e2"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TouchableOpacity style={styles.addItemButton} onPress={addPost}>
        <Text style={styles.buttonText}>Publier</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  form: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginVertical: 30,
  },
  input: {
    backgroundColor: "#fafafa",
    color: "rgba(107, 107, 107, 1)",
    width: "80%",
    marginVertical: 15,
    padding: 15,
    borderRadius: 5,
  },
  addItemButton: {
    backgroundColor: "#ffed4e",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginRight: "10%",
  },
  buttonText: {
    color: "#fff",
  },
});

export default PostBar;
