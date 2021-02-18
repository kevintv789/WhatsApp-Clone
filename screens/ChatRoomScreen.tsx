import { API, Auth, graphqlOperation } from "aws-amplify";
import { FlatList, ImageBackground } from "react-native";
import { KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState } from "react";

import BG from "../assets/images/BG.png";
import ChatMessage from "../components/ChatMessage";
import InputBox from "../components/InputBox";
import { messagesByChatRoom } from "../src/graphql/queries";
import { useRoute } from "@react-navigation/native"; // returns the object used from useNavigation on the other screen

const ChatRoomScreen = () => {
  const route = useRoute();
  const [myUserId, setMyUserId] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesData = await API.graphql(
        graphqlOperation(messagesByChatRoom, {
          chatRoomID: route.params?.id,
          sortDirection: "ASC",
        })
      );
      setMessages(messagesData.data.messagesByChatRoom.items);
    };
    fetchMessages();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({
        ios: () => -100,
        android: () => 200,
      })()}
    >
      <ImageBackground source={BG} style={{ width: "100%", height: "100%" }}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <ChatMessage message={item} />}
        />

        <InputBox chatRoomID={route.params?.id}></InputBox>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatRoomScreen;
