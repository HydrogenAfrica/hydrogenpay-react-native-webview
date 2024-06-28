<p align="center">
<img width="400" valign="top" src="https://hydrogenpay.com/wp-content/uploads/2023/05/logo.png" data-canonical-src="https://hydrogenpay.com/wp-content/uploads/2023/05/logo.png" style="max-width:100%; ">
</p>

# Hydrogen React Native WebView SDK

Hydrogen React Native SDK allows you to accept payment using Hydrogen Pay

## Installation

Register for a merchant account on [Hydrogen Merchant Dashboard](https://dashboard.hydrogenpay.com) to get started.

```bash
npm install --save  hydrogenpay-react-native-webview
npm install react-native-webview
```

```bash
yarn add hydrogenpay-react-native-webview
yarn add react-native-webview
```

## Support

If you have any problems, questions or suggestions, create an issue here or send your inquiry to support@hydrogenpay.com

## Implementation

You should already have your token, If not, go to [https://dashboard.hydrogenpay.com](https://dashboard.hydrogenpay.com).

### Usage 1 - Auto Start

```jsx
import React, { useRef } from 'react';

import { TouchableOpacity, View, Text } from 'react-native';
import { HydrogenCheckout } from 'hydrogenpay-react-native-webview';

export default function App() {
  const hydrogenPayRef = useRef(null);

  const onClose = (response) => {
    console.log(response);
  };

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
    <View style={{ flex: 1 }}>
      <HydrogenCheckout
        amount={500} // REQUIRED
        email="test@mail.com" // REQUIRED
        customerName="John Doe" // REQUIRED
        meta="ewr34we4w" // OPTIONAL
        token="E2E411B102072296C73F76339497FB8529FF552F0D6817E0F3B46A243961CA21" // REQUIRED
        description="Test description" // OPTIONAL
        currency="NGN" // REQUIRED
        onClose={(e) => onClose(e)} // OPTIONAL
        onSuccess={(e) => onSuccess(e)} // OPTIONAL
        ref={hydrogenPayRef} // REQUIRED
        autoStart={true} // OPTIONAL
        mode="TEST"
      />
    </View>
  );
}
```


### Usage 2 - Using Ref

```jsx
import React, { useRef } from 'react';

import { TouchableOpacity, View, Text } from 'react-native';
import { HydrogenCheckout } from 'hydrogenpay-react-native-webview';

export default function App() {
  const hydrogenPayRef = useRef(null);

  const startPayment = () => {
    hydrogenPayRef.current.initPayment();
  };

  const onClose = (response) => {
    console.log(response);
  };

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
    <View style={{ flex: 1 }}>
      <HydrogenCheckout
        amount={500} // REQUIRED
        email="test@mail.com" // REQUIRED
        customerName="John Doe" // REQUIRED
        meta="ewr34we4w" // OPTIONAL
        token="E2E411B102072296C73F76339497FB8529FF552F0D6817E0F3B46A243961CA21" // REQUIRED
        description="Test description" // OPTIONAL
        currency="NGN" // REQUIRED
        onClose={(e) => onClose(e)} // OPTIONAL
        onSuccess={(e) => onSuccess(e)} // OPTIONAL
        ref={hydrogenPayRef} // REQUIRED
        mode="TEST"
      />
      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
}
```


### Usage 3 - Using Payment Button

```jsx
import React, { useRef } from 'react';

import { TouchableOpacity, View, Text } from 'react-native';
import { HydrogenCheckout } from 'hydrogenpay-react-native-webview';

export default function App() {
  const hydrogenPayRef = useRef(null);

  const onClose = (response) => {
    console.log(response);
  };

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
    <View style={{ flex: 1 }}>
      <HydrogenCheckout
        amount={500} // REQUIRED
        email="test@mail.com" // REQUIRED
        customerName="John Doe" // REQUIRED
        meta="ewr34we4w" // OPTIONAL
        token="E2E411B102072296C73F76339497FB8529FF552F0D6817E0F3B46A243961CA21" // REQUIRED
        description="Test description" // OPTIONAL
        currency="NGN" // REQUIRED
        onClose={(e) => onClose(e)} // OPTIONAL
        onSuccess={(e) => onSuccess(e)} // OPTIONAL
        ref={hydrogenPayRef} // REQUIRED
        payButton={true} // OPTIONAL
        buttonText="Hydrogen Pay Button" //OPTIONAL
        buttonStyle={{}} // OPTIONAL
        buttontextStyles={{}} // OPTIONAL
        mode="TEST"
      />
    </View>
  );
}
```



## API's
| Name                   | Type                | Required | Desc                                                      |
| ---------------------- | ------------------- | -------- | --------------------------------------------------------- |
| currency               | `String`            | Required | The currency for the transaction e.g NGN, USD             |
| email                  | `String`            | Required | The email of the user to be charged                       |
| description            | `String`            | Optional | The transaction description                               |
| customerName           | `String`            | Required | The fullname of the user to be charged                    |
| amount                 | `Number`            | Required | The transaction amount                                    |
| token                  | `String`            | Required | Your token or see above step to get yours                 |
| onSuccess              | `Function`          | Optional | Callback when transaction is successful                   |
| onClose                | `Function`          | Optional | Callback when transaction is closed of cancel             |
| ref                    | `Object`            | Required | SDK payment Ref                                           |
| payButton              | `Boolean`           | Optional | Show Payment Button                                       |
| buttonText             | `String`            | Optional | Button Text. Default: Hydrogen Pay                        |
| buttonStyle            | `Object`            | Optional | Button style                                              |
| buttontextStyles       | `Object`            | Optional | Button text style                                         |
| isRecurring            | `boolean`           | Optional | Recurring Payment                                         |
| frequency              | `String`            | Optional | Recurring Payment frequency                               |
| autoStart              | `Boolean`           | Optional | Automatically start the sdk                               |
| mode                   | `String`            | Required | Payment Mode  e.g LIVE, TEST                              |
