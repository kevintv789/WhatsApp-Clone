import { API, Auth, graphqlOperation } from "aws-amplify";
import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import ContactListItem from "../components/ContactListItem";
import { View } from "react-native";
import { filter } from 'lodash';
import { listUsers } from "../src/graphql/queries";

export default function ContactsScreen() {

  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Only add users that are not the authenticated user to the contact list screen
        const authUser = await Auth.currentAuthenticatedUser();
        const authUserId = authUser.attributes.sub;

        const usersData = await API.graphql(graphqlOperation(listUsers));
        const filteredUsersData = filter(usersData.data.listUsers.items, o => o.id !== authUserId);
        setUsers(filteredUsersData);
      } catch (e) {
        console.log(e);
      }
    }
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={users}
        renderItem={({ item }) => (
          <ContactListItem user={item}></ContactListItem>
        )}
        keyExtractor={(item) => item.id}
      ></FlatList>
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
