import Amplify, { API, Auth, graphqlOperation } from "aws-amplify";
import React, { useEffect } from "react";

import Navigation from "./navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import config from "./src/aws-exports.js";
import { createUser } from "./src/graphql/mutations";
import { getUser } from "./src/graphql/queries";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { withAuthenticator } from "aws-amplify-react-native";

Amplify.configure(config);

const randomImages = [
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg',
  'https://www.pngitem.com/pimgs/m/372-3721347_roastedchicken-rolled-a-random-image-posted-in-comment.png',
  'https://s26552.pcdn.co/wp-content/uploads/2020/08/dc_neighborhood_news-1.jpg',
  'https://pbs.twimg.com/profile_images/1342768807891378178/8le-DzgC.jpg',
  'https://www.generatorslist.com/public/img/random/random-animal-generator.jpg',
  'https://www.funcage.com/blog/wp-content/uploads/2013/11/Random-Photoshopped-Pictures-006.jpg'
]

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  }

  // run snippet only when App is first mounted
  useEffect(() => {
    const fetchUser = async () => {
      // get Authenticated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      if (userInfo) {
        // get the user from Backend with the user ID from Auth
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );

        //  If there is no user in DB with the ID, then create one
        if (!userData.data.getUser) {
          console.log(
            "User has not been registered in the DB. Creating new user now..."
          );
          const newUser = {
            id: userInfo.attributes.sub,
            name: userInfo.username,
            imageUri: getRandomImage(),
            status: 'Hey, I am using WhatsAppClone!'
          };

          await API.graphql(
            graphqlOperation(createUser, { input: newUser })
          )
        }
      }
    };
    fetchUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
};

export default withAuthenticator(App);
