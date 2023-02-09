import * as React from 'react';
import {View,StatusBar } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
export default Statusbar = (
  {
    backgroundColor,
    barStyle = "dark-content",
  }
) => {
   const insets = useSafeAreaInsets();
   return (
     <View style={{ height: insets.top, backgroundColor }}>
        <StatusBar
          animated={true}
          backgroundColor={backgroundColor}
          barStyle={barStyle} />
     </View>
   );
}
