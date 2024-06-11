import React, { ReactElement, useEffect, useRef, useState } from "react";
import WebView from "react-native-webview";
import * as FileSystem from "expo-file-system";
import { width } from "../screens/dossiers/form/utils";
import { Alert, Text } from "react-native";
import { cacheFile, findFileInCache, getFileExtension } from "../utils/file";

const PdfReader = ({
  uri,
  cacheKey,
}: {
  uri: string;
  cacheKey: string;
}): ReactElement => {
  const [webviewKey, setWebviewKey] = useState(0);
  const isMounted = useRef(true);
  const [imgUri, setUri] = useState("");

  useEffect(() => {
    async function loadImg() {
      let imgXt = getFileExtension(uri);
      if (!imgXt || !imgXt.length) {
        console.log(`Couldn't load Image!`);
        return;
      }
      const cacheFileUri = `${FileSystem.cacheDirectory}${cacheKey}.${imgXt[0]}`;
      let imgXistsInCache = await findFileInCache(cacheFileUri);
      if (imgXistsInCache.exists) {
        //console.log("exist", cacheFileUri);
        //console.log("cached!");
        //setUri(cacheFileUri);
      } else {
        console.log("not exist", cacheFileUri);
        const cached = await cacheFile(uri, cacheFileUri, () => {});
        if (cached.cached) {
          console.log("cached NEw!");

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

  const reload = () => {
    setWebviewKey((prevState) => prevState + 1);
  };
  console.log("uri", uri);
  return (
    <>
      <Text>{uri}</Text>
      <WebView
        style={{
          flex: 1,
          width: width,
        }}
        //key={webviewKey}
        source={{ uri: imgUri }}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccess={true}
        originWhitelist={["file://"]}
        //onContentProcessDidTerminate={reload}
      />
    </>
  );
};

export default PdfReader;
