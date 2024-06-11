import React, { memo, useEffect, useRef, useState } from "react";
import { Alert, Image, View, ActivityIndicator, Text } from "react-native";
import * as FileSystem from "expo-file-system";

import WebView from "react-native-webview";
import { width } from "../../../../form/utils";
import { materialTheme } from "../../../../../../constants";
import { Colors } from "../../../../../../components/bottomHeader/styles";
// @ts-ignore
export function getImgXtension(uri) {
  var basename = uri.split(/[\\/]/).pop();
  return /[.]/.exec(basename) ? /[^.]+$/.exec(basename) : undefined;
}
// @ts-ignore
export async function findImageInCache(uri) {
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
// @ts-ignore
export async function cacheImage(uri, cacheUri, callback) {
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
      // @ts-ignore
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
// @ts-ignore
const PdfReader = (props) => {
  const {
    uri,
    cacheKey,
    style,
    height = materialTheme.HEIGHT.SHOW.IMAGE,
    ...rest
  } = props;
  const isMounted = useRef(true);
  const [imgUri, setUri] = useState("");

  useEffect(() => {
    async function loadImg() {
      let imgXt = getImgXtension(uri);
      if (!imgXt || !imgXt.length) {
        return;
      }
      const cacheFileUri = `${FileSystem.cacheDirectory}${cacheKey}.${imgXt[0]}`;
      let imgXistsInCache = await findImageInCache(cacheFileUri);
      if (imgXistsInCache.exists) {
        setUri(cacheFileUri);
      } else {
        console.log("not exist", cacheFileUri);
        let cached = await cacheImage(uri, cacheFileUri, () => {});
        if (cached.cached) {
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
  //console.log("imgUri", imgUri);
  return (
    <WebView
      style={{
        flex: 1,
        width: width,
      }}
      //startInLoadingState={true}

      //key={webviewKey}
      source={{ uri: uri }}
      // allowUniversalAccessFromFileURLs={true}
      // allowFileAccess={true}
      //originWhitelist={["file://"]}
      //onContentProcessDidTerminate={reload}
    />
  );
};
export default PdfReader;
