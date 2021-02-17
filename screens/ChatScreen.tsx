import { API, Auth, graphqlOperation } from "aws-amplify";
import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import ChatListItem from "../components/ChatListItem";
import NewMessageButton from "../components/NewMessageButton";
import chatRooms from "../data/ChatRooms";
import { getChatRoom } from "../src/graphql/queries";
import { getUser } from './queries';

export default function ChatScreen() {
  
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );
        setChatRooms(userData.data.getUser.chatRoomUsers.items)
      } catch (e) {
        console.log(e);
      }
    };
    fetchChatRooms();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item}></ChatListItem>}
        keyExtractor={(item) => item.id}
      ></FlatList>
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
