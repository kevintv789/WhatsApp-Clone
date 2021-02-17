import * as utils from "../../shared/utils";

import { API, Auth } from "aws-amplify";
import { Image, TouchableWithoutFeedback, View } from "react-native";
import React, { useEffect, useState } from "react";

import { ChatRoom } from "../../types";
import { Text } from "../Themed";
import _ from "lodash";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {
  const { chatRoom } = props;
  const [authUserId, setAuthUserId] = useState(null);

  // We want to get users that aren't the authenticated user
  // So get the authenticated user's ID and filter it out from the user list
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      setAuthUserId(authUser.attributes.sub);
    };
    fetchCurrentUser();
  }, []);

  const chatRoomUsers = chatRoom.chatRoom.chatRoomUsers.items;
  const filteredUsers = _.filter(chatRoomUsers, o => o.user.id !== authUserId);

  const user = _.head(filteredUsers).user;

  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate("ChatRoom", { id: chatRoom.id, name: user.name });
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text numberOfLines={1} style={styles.lastMessage}>
              {chatRoom.lastMessage?.content}
            </Text>
          </View>
        </View>

        <Text style={styles.time}>
          {utils.formatDate(chatRoom.lastMessage?.createdAt)}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatListItem;
