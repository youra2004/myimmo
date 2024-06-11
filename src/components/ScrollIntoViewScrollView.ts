import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { wrapScrollViewConfigured } from "react-native-scroll-into-view";

const ScrollIntoViewScrollView = wrapScrollViewConfigured({
  refPropName: "innerRef",
})(KeyboardAwareScrollView);

export default ScrollIntoViewScrollView;
