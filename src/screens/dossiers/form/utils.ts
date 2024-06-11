import {
  AddressComponent,
  GooglePlaceData,
  GooglePlaceDetail,
  PlaceType,
} from "react-native-google-places-autocomplete";
import * as DocumentPicker from "expo-document-picker";
import { DossierTypes } from "../../../utils/constants";
import { Dossier, DossierAttachment, DossierImage } from "../types";
import { conditionRates, dossierTypes, qualityRates } from "../utils";
import omit from "lodash/omit";
import * as ImagePicker from "expo-image-picker";
import { PickImageProps } from "./types";
import { Dispatch, SetStateAction } from "react";
import { REACT_BASE_URL } from "../../../utils/config";
import head from "lodash/head";
import { CarouselCardItem } from "../../../components/carousel/types";
import { Dimensions } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { getToken } from "../../../utils/common";
import {
  FileSystemUploadOptions,
  FileSystemUploadType,
} from "expo-file-system";

export const findAddressDetail = (
  arr: AddressComponent[],
  field: PlaceType,
  shortName = false
): string | undefined =>
  arr.find(({ types }) => types.includes(field))?.[
    shortName ? "short_name" : "long_name"
  ];

export const getQualityRatingIndex = (value?: string): number =>
  qualityRates.findIndex((el) => el.value === value) + 1;

export const getConditionRatingIndex = (value?: string): number =>
  conditionRates.findIndex((el) => el.value === value) + 1;

export const { width, height } = Dimensions.get("window");

export const prepareDossierBeforeForm = (data: Dossier): Dossier => {
  return {
    ...data,
    title: data.title ?? "",
    dealType: data.dealType ?? "",
    property: {
      ...data.property,
      balconyArea: data.property.balconyArea?.toString() ?? "",
      buildingYear: data.property.buildingYear.toString() ?? "",
      floorNumber: data.property.floorNumber?.toString() ?? "",
      gardenArea: data.property.gardenArea?.toString() ?? "",
      garage_spaces: data.property.garage_spaces?.toString() ?? "",
      livingArea: data.property.livingArea?.toString() ?? "",
      numberOfBathrooms: data.property.numberOfBathrooms?.toString() ?? "",
      numberOfFloorsInBuilding:
        data.property.numberOfFloorsInBuilding?.toString() ?? "",
      numberOfIndoorParkingSpaces:
        data.property.numberOfIndoorParkingSpaces?.toString() ?? "",
      numberOfOutdoorParkingSpaces:
        data.property.numberOfOutdoorParkingSpaces?.toString() ?? "",
      numberOfRooms: data.property.numberOfRooms?.toString() ?? "",
      renovationYear: data.property.renovationYear?.toString() ?? "",
      landArea: data.property.landArea?.toString() ?? "",
      numberOfUnits: data.property.numberOfUnits?.toString() ?? "",
      condition: {
        ...data.property.condition,
        bathrooms: data.property.condition?.bathrooms?.toString() ?? "",
        kitchen: data.property.condition?.kitchen?.toString() ?? "",
        flooring: data.property.condition?.flooring?.toString() ?? "",
        windows: data.property.condition?.windows?.toString() ?? "",
        overall: data.property.condition?.overall?.toString() ?? "",
        masonry: data.property.condition?.masonry?.toString() ?? "",
      },
      quality: {
        ...data.property.quality,
        bathrooms: data.property.quality?.bathrooms?.toString() ?? "",
        kitchen: data.property.quality?.kitchen?.toString() ?? "",
        flooring: data.property.quality?.flooring?.toString() ?? "",
        windows: data.property.quality?.windows?.toString() ?? "",
        overall: data.property.quality?.overall?.toString() ?? "",
        masonry: data.property.quality?.masonry?.toString() ?? "",
      },
    },
  };
};

export const removeEmptyString = (object: any) => {
  Object.entries(object).forEach(([key, value]: any[]) => {
    if (value && typeof value === "object") removeEmptyString(value);
    if (
      (value && typeof value === "object" && !Object.keys(value).length) ||
      value === null ||
      value === undefined ||
      value.length === 0
    ) {
      if (Array.isArray(object)) object.splice(key, 1);
      else delete object[key];
    }
  });
  return object;
};

export const pickImage =
  ({
    setImageIsLoading,
    setImageErrors,
    setFieldValue,
    images,
  }: PickImageProps) =>
  async () => {
    try {
      setImageIsLoading(true);
      setImageErrors([]);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      console.log("result", result);
      if (!result.canceled) {
        const imagePromises = result.assets.map<Promise<DossierImage>>(
          ({ uri }) => upload(`${REACT_BASE_URL}/file/upload-image`, uri)
        );
        Promise.all(imagePromises)
          .then((result) => {
            console.log("result", result);
            // const errors = result.filter((el) =>
            //   ["fail", "error"].includes(el.status)
            // );
            // const success = result.filter(
            //   (el) => !["fail", "error"].includes(el.status)
            // );
            // console.log("success", success);
            //setImageErrors([...errors.map(({ message }) => message)]);
            setFieldValue("images", [...images, ...result], false);
            console.log("upload finished");
            return setImageIsLoading(false);
          })
          .catch((error) => {
            console.log("error :", error);
            setImageErrors([error.message]);
            setImageIsLoading(false);
          });
      } else {
        setImageIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setImageIsLoading(false);
    }
  };

export const pickDocument =
  ({
    setDocumentIsLoading,
    setDocumentError,
    setFieldValue,
    attachments,
  }: {
    setDocumentIsLoading: Dispatch<SetStateAction<boolean>>;
    setDocumentError: Dispatch<SetStateAction<string>>;
    setFieldValue: any;
    attachments: DossierAttachment[];
  }) =>
  async (): Promise<void> => {
    try {
      setDocumentIsLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
        copyToCacheDirectory: true,
      });
      if (result.type !== "success") return setDocumentIsLoading(false);
      const { name: originalName, uri } = result;
      const response = await uploadDocument(
        `${REACT_BASE_URL}/file/upload-attachment`,
        uri
      );
      setFieldValue("attachments", [
        ...attachments,
        { ...response, originalName },
      ]);
      setDocumentError("");
      setDocumentIsLoading(false);
    } catch (err) {
      console.log("error: ", err);
      //setDocumentError(response.message);
      setDocumentIsLoading(false);
    }
  };

export const upload = async (url: string, pathToImage: string) => {
  console.log("\n***** Upload Image *****");

  if (pathToImage) {
    const token = await getToken();
    console.log("***** get other fields section *****");
    const dataToSend: Record<string, string> = {};
    dataToSend["action"] = "Image Upload";

    console.log("***** Options section *****");
    const options: FileSystemUploadOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "image/jpeg, image/png",
        Authorization: `Bearer ${token}`,
      },
      httpMethod: "POST",
      uploadType: FileSystemUploadType.MULTIPART,
      fieldName: "file",
      parameters: dataToSend,
    };

    console.log("***** 'Fetch' section *****");
    const response = await FileSystem.uploadAsync(url, pathToImage, options);
    console.log("response in upload", response);
    if (response.status >= 200 && response.status < 300) {
      return JSON.parse(response.body);
    } else {
      return Promise.reject(response.body);

      //throw JSON.parse(response.body);
    }
    console.log("response", response);
  }
};

export const uploadDocument = async (url: string, pathToDocument: string) => {
  console.log("\n***** Upload Document *****");

  if (pathToDocument) {
    const token = await getToken();
    console.log("token in uploadDocument", token);
    console.log("***** get other fields section *****");
    const dataToSend: Record<string, string> = {};
    dataToSend["action"] = "Document Upload";

    console.log("***** Options section *****");
    const options: FileSystemUploadOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept:
          "image/jpeg, image/png, application/pdf, image/heic, image/heif, image/tiff, image/tif ",
        Authorization: `Bearer ${token}`,
      },
      httpMethod: "POST",
      uploadType: FileSystemUploadType.MULTIPART,
      fieldName: "file",
      parameters: dataToSend,
    };

    console.log("***** 'Fetch' section *****");
    const response = await FileSystem.uploadAsync(url, pathToDocument, options);

    if (response.status >= 200 && response.status < 300) {
      return JSON.parse(response.body);
    } else {
      return Promise.reject(response.body);
      //return JSON.parse(response.body);
    }
  }
};

// export const downloadDocument =
//   ({ url, caption }: Pick<DossierAttachment, "url" | "caption">) =>
//   async (): Promise<void> => {
//     const outputDir = `${FileSystem.documentDirectory}${caption}`;
//     const downloadResumable = FileSystem.createDownloadResumable(
//       url,
//       outputDir,
//       {}
//     );
//     try {
//       const directoryInfo = await FileSystem.getInfoAsync(outputDir);
//       if (!directoryInfo.exists) {
//         await FileSystem.makeDirectoryAsync(outputDir, {
//           intermediates: true,
//         });
//       }
//       const response = await downloadResumable.downloadAsync();
//       if (!response) return;
//       const { status, uri } = response;
//       if ([200, 201].includes(status)) {
//         console.log("Finished downloading to ", response);
//         shareDocument(uri);
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

export const shareDocument = async (fileUri: string): Promise<void> => {
  Sharing.shareAsync(fileUri);
};

export const onGoogleAutocompleteChange =
  ({
    setFieldValue,
    setTouched,
    touched,
  }: {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void;
    setTouched: any;
    touched: any;
  }) =>
  (_: GooglePlaceData, details = null as GooglePlaceDetail | null) => {
    if (!details) return;
    setTouched({
      ...touched,
      property: { location: { address: { postCode: true } } },
    });
    const { geometry, address_components } = details;
    const latitude = geometry.location.lat;
    const longitude = geometry.location.lng;
    //console.log("address_components", address_components);

    const postCode = findAddressDetail(address_components, "postal_code");
    const city = findAddressDetail(
      address_components,
      "administrative_area_level_1"
    );
    const street = findAddressDetail(address_components, "route");
    const houseNumber = findAddressDetail(address_components, "street_number");
    const location = {
      address: {
        postCode,
        city,
        street,
        houseNumber,
      },
      coordinates: {
        latitude,
        longitude,
      },
    };
    setFieldValue("property.location", location);
  };

// export const prepareAttachmentForCarousel = (
//   attachements?: DossierAttachment[]
// ): CarouselCardItem[] =>
//   (attachements || []).map((el) => ({
//     url: head(el.images) || "",
//   }));

export const getPropertyTypeLabel = (value: DossierTypes): string | undefined =>
  dossierTypes.find((el) => el.value === value)?.label;

export const RATE_THE_QUALITY_TEXT = "Rate the quality";

export const RATE_THE_CONDITION_TEXT = "Rate the condition";
