import React, { memo, useEffect, useRef, useState } from "react";
import { Alert, Image, View, ActivityIndicator } from "react-native";
import * as FileSystem from "expo-file-system";
import { materialTheme } from "../constants";

function getImgXtension(uri) {
  var basename = uri.split(/[\\/]/).pop();
  return /[.]/.exec(basename) ? /[^.]+$/.exec(basename) : undefined;
}

async function findImageInCache(uri) {
  try {
    let info = await FileSystem.getInfoAsync(uri);
    return { ...info, err: false };
  } catch (error) {
    return {
      exists: false,
      err: true,
      msg: error,
    };
  }
}

async function cacheImage(uri, cacheUri, callback) {
  try {
    const downloadImage = FileSystem.createDownloadResumable(
      uri,
      cacheUri,
      {},
      callback
    );
    const downloaded = await downloadImage.downloadAsync();
    return {
      cached: true,
      err: false,

      path: downloaded.uri,
    };
  } catch (error) {
    return {
      cached: false,
      err: true,
      msg: error,
    };
  }
}

const CustomFastImage = (props) => {
  const {
    source: { uri },
    cacheKey,
    style,
    height = materialTheme.HEIGHT.SHOW.IMAGE,
    ...rest
  } = props;
  const isMounted = useRef(true);
  const [imgUri, setUri] = useState(uri);

  useEffect(() => {
    async function loadImg() {
      let imgXt = getImgXtension(uri);
      if (!imgXt || !imgXt.length) {
        console.log(`Couldn't load Image!`);
        return;
      }
      const cacheFileUri = `${FileSystem.cacheDirectory}${cacheKey}.${imgXt[0]}`;
      let imgXistsInCache = await findImageInCache(cacheFileUri);
      if (imgXistsInCache.exists) {
        //console.log("cached!");
        setUri(cacheFileUri);
      } else {
        let cached = await cacheImage(uri, cacheFileUri, () => {});
        if (cached.cached) {
          //console.log("cached NEw!");

          setUri(cached.path || "");
        } else {
          Alert.alert(`Couldn't load Image!`);
        }
      }
    }
    loadImg();
    return () => {
      isMounted.current = false;
    };
  }, []);
  //console.log("imgUri1111", imgUri);
  return (
    <>
      {imgUri ? (
        <Image
          source={{ uri: imgUri }}
          style={[...style, { height }]}
          {...rest}
        />
      ) : (
        <View
          style={{
            ...style,
            alignItems: "center",
            justifyContent: "center",
            height,
            borderWidth: 2,
          }}
        >
          <ActivityIndicator size={33} />
        </View>
      )}
    </>
  );
};
export default CustomFastImage;
