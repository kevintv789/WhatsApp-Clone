import {
  Entypo,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";

const InputBox = () => {
  const [message, setMessage] = useState("");

  const onMicrophonePress = () => {
    console.warn("Microphone");
  };

  const onSendPress = () => {
    console.warn(`Sending: ${message}`);

    // Send message to the backend
    setMessage("");
  };

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="grey" />
        <TextInput
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={(value) => setMessage(value)}
          placeholder="Type a message"
        />
        <Entypo
          name="attachment"
          size={24}
          color="grey"
          style={styles.inputIcon}
        />
        {!message && (
          <Fontisto
            name="camera"
            size={24}
            color="grey"
            style={styles.inputIcon}
          />
        )}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {!message ? (
            <MaterialCommunityIcons name="microphone" size={28} color="white" />
          ) : (
            <MaterialIcons name="send" size={28} color="white" />
          )}
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default InputBox;
