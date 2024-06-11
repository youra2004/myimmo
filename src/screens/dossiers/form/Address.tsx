import React, { ReactElement } from "react";
import { HelperText } from "react-native-paper";
import SearchBarWithAutocompleteWrapper from "../../../components/searchBarWithAutocomplete/Wrapper";
import { extractFullAddress } from "../../home/utils";
import { AddressFormProps } from "./types";
import { View } from "react-native";

const AddressForm = ({
  mode,
  location,
  setFieldValue,
  touched,
  errors,
}: AddressFormProps): ReactElement => {
  const showHelper = Boolean(
    touched.property?.location?.address.postCode &&
      Object.values(errors.property?.location?.address || []).filter((el) => el)
        .length
  );
  return (
    <React.Fragment>
      <View style={[{ zIndex: 1 }]}>
        <SearchBarWithAutocompleteWrapper
          mode={mode}
          addressText={mode === "create" ? "" : extractFullAddress(location)}
          onSuccess={(location) => {
            setFieldValue("property.location", location);
          }}
        />
      </View>

      {showHelper && (
        <HelperText style={{ marginTop: 10 }} type="error" visible={showHelper}>
          {touched.property?.location?.address.postCode && (
            <>
              Address is not correct (
              {Object.values(errors.property?.location?.address || [])?.map(
                (el, _, arr) => `${el}${el !== arr[arr.length - 1] ? ", " : ""}`
              )}
              )
            </>
          )}
        </HelperText>
      )}
    </React.Fragment>
  );
};

export default AddressForm;
