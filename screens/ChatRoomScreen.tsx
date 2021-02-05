import React from 'react';
import { Text } from 'react-native';
import { useRoute } from '@react-navigation/native'; // returns the object used from useNavigation on the other screen

const ChatRoomScreen = () => {

    const route = useRoute();

    return (
        <Text>Chat rooooom</Text>
    );
}

export default ChatRoomScreen;