import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 50,
  },
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
  },
  midContainer: {
    justifyContent: "space-around",
  },
  leftContainer: {
    flexDirection: "row",
    flex: 1
  },
  userName: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#000"
  },
  status: {
    fontSize: 16,
    color: "grey",
  },
});

export default styles;
