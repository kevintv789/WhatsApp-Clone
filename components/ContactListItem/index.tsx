import { API, Auth, graphqlOperation } from "aws-amplify";
import { Image, TouchableWithoutFeedback, View } from "react-native";
import {
  createChatRoom,
  createChatRoomUser,
} from "../../src/graphql/mutations";

import React from "react";
import { Text } from "../Themed";
import { User } from "../../types";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";

export type ContactListItemProps = {
  user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;

  const navigation = useNavigation();

  const onClick = async () => {
    try {
      // 1. Create new chat room
      const newChatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, { input: {} })
      ); // no inputs needed b/c chatRoom only needs ID and ID is auto generated
      if (!newChatRoomData.data) {
        console.log("Failed to create a chat room!");
        return;
      }

      const newChatRoom = newChatRoomData.data.createChatRoom;
      // 2. Add 'user' to the ChatRoom
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: user.id,
            chatRoomID: newChatRoom.id,
          },
        })
      );

      // 3. Add authenticated user to the ChatRoom
      const userInfo = await Auth.currentAuthenticatedUser();
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: userInfo.attributes.sub,
            chatRoomID: newChatRoom.id,
          },
        })
      );

      // 4. Navigate to chat room
      navigation.navigate("ChatRoom", {
        id: newChatRoom.id,
        name: "Hardc0ded name"
      })
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text numberOfLines={2} style={styles.status}>
              {user.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactListItem;
