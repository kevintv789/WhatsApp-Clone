import Colors from "../../constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // display everything into one single row
    margin: 10,
    alignItems: 'flex-end',
  },

  mainContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    flex: 1, // takes the entire space horizontally
    alignItems: 'flex-end'
  },

  textInput: {
    flex: 1,
    marginHorizontal: 10,
    maxHeight: 60,
    marginBottom: 5,
  },

  inputIcon: {
    marginHorizontal: 5,
  },

  buttonContainer: {
    backgroundColor: Colors.light.tint,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
