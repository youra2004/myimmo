import { Props } from "react-native-paper/lib/typescript/components/TextInput/TextInput";
import { ScrollIntoView } from "react-native-scroll-into-view";
import { HelperText, TextInput } from "react-native-paper";
import { useField, useFormikContext } from "formik";

const TextField = ({
  children,
  name,
  showHelperText = true,
  ...props
}: Props & { name: string; showHelperText?: boolean }) => {
  const [_, meta] = useField(name);
  const { submitCount } = useFormikContext();
  const { error, touched } = meta;

  const showError = Boolean(touched && error);

  return (
    <ScrollIntoView enabled={!!error} scrollIntoViewKey={submitCount}>
      <TextInput {...props} />
      {showHelperText && !!showError && (
        <HelperText type="error" visible={!!showError}>
          {error}
        </HelperText>
      )}
    </ScrollIntoView>
  );
};

export default TextField;
