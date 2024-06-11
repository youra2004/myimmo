import React, { useState, useEffect, useCallback } from "react";
import { Platform, StatusBar, Image } from "react-native";
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Screens from "./navigation/Screens";
import { materialTheme } from "./constants";
import AuthProvider from "./context/Auth";
import SocketsProvider from "./context/Sockets";
import { GeneralContext } from "./context/General";
import io from "socket.io-client";
import { getToken } from "./utils/common";

enableScreens();
SplashScreen.preventAutoHideAsync();

const socketEndpoint = "http://3.76.72.157/dossier";

const assetImages = [
  // Images.Profile,
  // Images.Avatar,
  // Images.Onboarding,
  // Images.Products.Auto,
  // Images.Products.Motocycle,
  // Images.Products.Watches,
  // Images.Products.Makeup,
  // Images.Products.Accessories,
  // Images.Products.Fragrance,
  // Images.Products.BMW,
  // Images.Products.Mustang,
  // Images.Products["Harley-Davidson"],
];

// cache product images
// products.map(product => assetImages.push(product.image));

// cache categories images
// Object.keys(categories).map(key => {
//   categories[key].map(category => assetImages.push(category.image));
// });

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [refreshHome, setRefreshHome] = useState(false);
  const [refreshShow, setRefreshShow] = useState(false);
  //const [socket, setSocket] = useState();

  useEffect(() => {
    async function prepare() {
      try {
        await _loadResourcesAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        await Font.loadAsync({
          poppinsThin: require("./assets/fonts/poppinsThin.ttf"),
          poppinsLight: require("./assets/fonts/poppinsLight.ttf"),
          poppinsBold: require("./assets/fonts/poppinsBold.ttf"),
          poppinsMedium: require("./assets/fonts/poppinsMedium.ttf"),
        });

        //await initSockets();

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    // const initSockets = async () => {
    //   const token = await getToken();
    //   const Authorization = `Bearer ${token}`;
    //   const socket = io(socketEndpoint, {
    //     extraHeaders: { Authorization },
    //   });
    //   setSocket(socket);
    // };

    prepare();
  }, []);

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.io.on("open", () => {
  //     console.log("socket opened in App");
  //   });
  //   socket.io.on("close", () => {
  //     console.log("socekt closed in App");
  //   });
  // }, [socket]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <GalioProvider theme={materialTheme}>
          <AuthProvider>
            <SocketsProvider>
              <GeneralContext.Provider
                value={{
                  refreshHome,
                  refreshShow,
                  setRefreshHome,
                  setRefreshShow,
                }}
              >
                <Block flex>
                  {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                  <Screens />
                </Block>
              </GeneralContext.Provider>
            </SocketsProvider>
          </AuthProvider>
        </GalioProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
