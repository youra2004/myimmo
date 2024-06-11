import * as FileSystem from "expo-file-system";

export const getFileExtension = (uri: string) => {
  const basename = uri.split(/[\\/]/).pop();
  if (!basename) return undefined;
  return /[.]/.exec(basename) ? /[^.]+$/.exec(basename) : undefined;
};

export const findFileInCache = async (uri: string) => {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    return { ...info, err: false };
  } catch (error) {
    return {
      exists: false,
      err: true,
      msg: error,
    };
  }
};

export const cacheFile = async (
  uri: string,
  cacheUri: string,
  callback: () => void
) => {
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

      path: downloaded?.uri,
    };
  } catch (error) {
    return {
      cached: false,
      err: true,
      msg: error,
    };
  }
};
