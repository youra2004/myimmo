import React, {
  useState,
  ReactElement,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Block, Button, Text } from "galio-framework";
import { RichEditor } from "react-native-pell-rich-editor";
import { conditionRates, dossierTypes, qualityRates } from "../utils";
import { FormikValues } from "formik";
import { CustomEvents, DossierTypes } from "../../../utils/constants";
import { styles } from "../styles";
import AppartmentForm from "./propertyTypes/Appartment";
import {
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  DeviceEventEmitter,
  NativeEventEmitter,
  View,
  Platform,
} from "react-native";
import HouseForm from "./propertyTypes/House";
import MultiFamilyHouseForm from "./propertyTypes/MultiFamilyHouse";
import AttachmentsForm from "./Attachments";
import ImagesForm from "./Images";
import AddressForm from "./Address";
import DescriptionForm from "./Description";
import { deleteDossier } from "../../../api/dossier";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../../../types/navigation";
import ButtonGroup from "../../../components/buttonGroup";
import { Colors } from "../../../components/bottomHeader/styles";
import MainTextInputs from "./MainTextInputs";
import DismissKeyboardHOC from "../../../hoc/DismissKeyboard";
import { DossierConfig, DossierConfigItem } from "../types";
const { width } = Dimensions.get("window");

const CreateDossiersForm = ({
  handleChange,
  handleBlur,
  values,
  submitForm,
  touched,
  status,
  errors,
  setFieldValue,
  isSubmitting,
  dirty,
  submitCount,
  mode = "create",
  setTouched,
  setErrors,
  setRefreshHome,
}: FormikValues): ReactElement => {
  const [emitter, setEmitter] = useState<NativeEventEmitter>();
  const RichText = useRef<RichEditor | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const navigation = useNavigation<Navigation>();

  useEffect(() => {
    console.log("mode", mode);
    removeListeners();
    DeviceEventEmitter.addListener(CustomEvents.SUBMIT_DOSSIER, () =>
      submitForm()
    );
    return () => {
      removeListeners();
    };
  }, [mode]);

  useEffect(() => {
    const auxEmitter = new NativeEventEmitter("start" as any);
    setEmitter(auxEmitter);
    return () => {
      setEmitter(undefined);
    };
  }, []);

  useEffect(() => {
    if (!emitter) return;
    if (isSubmitting) {
      emitter.emit(CustomEvents.IS_SUBMITTING);
    } else {
      emitter.emit(CustomEvents.IS_NOT_SUBMITTING);
    }
  }, [isSubmitting, emitter]);

  useEffect(() => {
    if (!emitter) return;
    if (dirty) {
      emitter.emit(CustomEvents.IS_DIRTY);
    } else {
      emitter.emit(CustomEvents.IS_NOT_DIRTY);
    }
  }, [dirty, emitter]);

  const removeListeners = (): void =>
    DeviceEventEmitter.removeAllListeners(CustomEvents.SUBMIT_DOSSIER);

  const handleQualityRate = useCallback(
    (field: string) =>
      (rating: number): void =>
        setFieldValue(field, qualityRates[rating - 1].value, false),
    [qualityRates, setFieldValue]
  );

  const handleConditionRate = useCallback(
    (field: string) =>
      (rating: number): void => {
        setFieldValue(field, conditionRates[rating - 1].value, false);
      },
    [conditionRates, setFieldValue]
  );

  const hanleButtonTypePress = (code: string) => {
    setFieldValue("property.propertyType.code", code, false);
    setFieldValue("property.propertyType.subcode", undefined, false);
    setTouched({}, false);
    setErrors({}, false);
  };

  const dossierTypeFormProps = {
    handleChange,
    handleBlur,
    values,
    touched,
    status,
    errors,
    setFieldValue,
    handleQualityRate,
    handleConditionRate,
    mode,
  };

  const handleDelete = (_id: string) => async () => {
    setIsDeleteLoading(true);
    const response = await deleteDossier(_id);
    const json = await response.json();
    //console.log("json", json);
    if ([200, 201].includes(response.status)) {
      setIsDeleteLoading(false);
      setRefreshHome && setRefreshHome(true);
      return navigation?.navigate("Home");
    }
    setIsDeleteLoading(false);
  };

  const memoedAttachments = useMemo(
    () => values.attachments || [],
    [values.attachments]
  );

  const memoedImages = useMemo(() => values.images || [], [values.images]);
  console.log("Form rendered!!!!");

  return (
    <DismissKeyboardHOC>
      {/* <ScrollView
        nestedScrollEnabled={true}
        style={{
          //paddingTop: Platform.OS === "ios" ? 30 : 120,
          width,
          marginBottom: 70,
          borderWidth: 2,
        }}
      > */}
      <View
        style={{
          paddingBottom: 80,
          paddingHorizontal: width * 0.05,
          paddingTop: Platform.OS === "ios" ? 30 : 120,
          //borderWidth: 5,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: width * 0.05,
            borderRadius: 5,
            paddingBottom: width * 0.05,
          }}
        >
          <AddressForm
            mode={mode}
            location={values.property.location}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
          />
          <MainTextInputs
            values={values}
            handleChange={handleChange}
            touched={touched}
            status={status}
            errors={errors}
            submitCount={submitCount}
          />
        </View>

        <Block row style={[styles.typesBlock, { marginTop: 20, zIndex: -1 }]}>
          <ButtonGroup
            data={dossierTypes}
            onPress={hanleButtonTypePress}
            selectWith={values.property?.propertyType?.code}
            fullWidth={true}
            style={{ height: 65 }}
          />
        </Block>

        {values.property.propertyType.code === DossierTypes.APARTMENT && (
          <AppartmentForm {...dossierTypeFormProps} />
        )}
        {values.property.propertyType.code === DossierTypes.HOUSE && (
          <HouseForm {...dossierTypeFormProps} />
        )}
        {values.property.propertyType.code ===
          DossierTypes.MULTI_FAMILY_HOUSE && (
          <MultiFamilyHouseForm {...dossierTypeFormProps} />
        )}
        <View
          style={[
            {
              backgroundColor: "#fff",
              padding: width * 0.025,
              paddingTop: width * 0.025,
              borderRadius: 5,
            },
          ]}
        >
          <DescriptionForm
            description={values.description}
            setFieldValue={setFieldValue}
            RichText={RichText}
          />
        </View>

        <ImagesForm
          images={memoedImages}
          setFieldValue={setFieldValue}
          cover={values.cover}
        />
        <AttachmentsForm
          attachments={memoedAttachments}
          setFieldValue={setFieldValue}
        />

        {mode !== "create" && (
          <Block style={{ paddingBottom: 50 }}>
            <Button
              size="large"
              color="transparent"
              shadowless
              onPress={handleDelete(values._id)}
              //loading={isDeleteLoading}
            >
              <Text
                center
                color={Colors.ALERT}
                size={15}
                style={{ marginTop: 20 }}
              >
                Delete dossier
              </Text>
            </Button>
          </Block>
        )}
      </View>
      {/* </ScrollView> */}
    </DismissKeyboardHOC>
  );
};

export default CreateDossiersForm;
