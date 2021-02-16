import { API, graphqlOperation } from "aws-amplify";
import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import ContactListItem from "../components/ContactListItem";
import { View } from "react-native";
import { listUsers } from "../src/graphql/queries";

export default function ContactsScreen() {

  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(graphqlOperation(listUsers));
        setUsers(usersData.data.listUsers.items);
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
