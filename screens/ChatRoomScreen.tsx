import { FlatList, ImageBackground } from "react-native";
import { KeyboardAvoidingView, Platform } from "react-native";

import BG from "../assets/images/BG.png";
import ChatMessage from "../components/ChatMessage";
import InputBox from "../components/InputBox";
import React from "react";
import chatRoomData from "../data/Chats";
import { useRoute } from "@react-navigation/native"; // returns the object used from useNavigation on the other screen

const ChatRoomScreen = () => {
  const route = useRoute();

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
          data={chatRoomData.messages}
          renderItem={({ item }) => <ChatMessage message={item} />}
        />

        <InputBox></InputBox>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatRoomScreen;
