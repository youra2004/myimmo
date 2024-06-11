import React, { ReactElement } from "react";
import { Text } from "galio-framework";
import { materialTheme } from "../constants";

const TextInputLabel = ({
  title,
  required = false,
}: {
  title: string;
  required?: boolean;
}): ReactElement => {
  return (
    <React.Fragment>
      {required ? (
        <React.Fragment>
          <Text style={{ color: materialTheme.COLORS.PLACEHOLDER }}>
            {title}
          </Text>
          <Text color="red">*</Text>
        </React.Fragment>
      ) : (
        <Text style={{ color: materialTheme.COLORS.PLACEHOLDER }}>{title}</Text>
      )}
    </React.Fragment>
  );
};

export default TextInputLabel;
