import { API, Auth, graphqlOperation } from "aws-amplify";
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
import React, { useEffect, useState } from "react";

import { TouchableOpacity } from "react-native-gesture-handler";
import { createMessage } from '../../src/graphql/mutations'
import styles from "./styles";

const InputBox = (props: any) => {

  const { chatRoomID } = props;
  const [message, setMessage] = useState("");
  const [myUserId, setMyUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyUserId(userInfo.attributes.sub);
    };
    fetchUser();
  }, []);

  const onMicrophonePress = () => {
    console.warn("Microphone");
  };

  const onSendPress = async () => {
    try {
      await API.graphql(graphqlOperation(createMessage, {
        input: {
          content: message,
          userID: myUserId,
          chatRoomID
        }
      }));
    } catch (e) {
      console.log(e);
    }
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
