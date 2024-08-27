import React, { useRef } from 'react';

import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { HydrogenCheckout } from 'hydrogenpay-react-native-webview';

export default function App() {
  const hydrogenPayRef = useRef<any>(null);

  // Ref Actions
  // initPayment ref = hydrogenPayRef?.current?.initPayment();
  // closePayment ref = hydrogenPayRef?.current?.closePayment();

  const startPayment = () => {
    hydrogenPayRef.current.initPayment();
  };

  //@ts-ignore
  const onClose = (response) => {
    console.log(response);
  };

  //@ts-ignore
  const onSuccess = (response) => {
    console.log(response);

    // Perform Some Actions Here
    //...

    //Close Modal after successful payment
    hydrogenPayRef?.current?.closePayment();

    //delay close Payment
    // setTimeout(() => hydrogenPayRef?.current?.closePayment(), 2000);
  };



  return (
    <View style={styles.container}>
      <HydrogenCheckout
        amount={500} // REQUIRED
        email="test@mail.com" // REQUIRED
        customerName="John Doe" // REQUIRED
        meta="ewr34we4w" // OPTIONAL
        apiKey="PK_TEST_cca53e0b3bc7847aff94502b8a585f84" // REQUIRED
        description="Test description" // OPTIONAL
        currency="NGN" // REQUIRED
        frequency={1} // OPTIONAL
        isRecurring={false} // OPTIONAL
        onClose={(e) => onClose(e)} // OPTIONAL
        onSuccess={(e) => onSuccess(e)} // OPTIONAL
        ref={hydrogenPayRef} // REQUIRED
        payButton={true} // OPTIONAL
        buttonText="Hydrogen Pay Button" //OPTIONAL
        buttonStyle={{}} // OPTIONAL
        buttontextStyles={{}} // OPTIONAL
        autoStart={false} // OPTIONAL
      />
      {/* <TouchableOpacity
        onPress={() => startPayment()}
        style={{
          marginLeft: 50,
          marginRight: 50,
          backgroundColor: '#FCE300',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 12,
          marginTop: 10,
          borderRadius: 5,
        }}
      >
        <Text>Use Start Payment Ref</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
