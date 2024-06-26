//@ts-ignore
import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from 'react';
import WebView from 'react-native-webview';
import {
  SafeAreaView,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

interface PaymentPayload {
  amount: Number;
  customerName: string;
  reference?: string;
  email: string;
  currency?: string;
  description?: string;
  redirectUrl?: string;
  meta?: string;
  token: string;
  isRecurring?: boolean;
  frequency?: number;
  endDate?: string;
  onClose?: (event: Event) => void;
  onSuccess?: (event: Event) => void;
  payButton?: boolean;
  buttonStyle?: { [key: string]: string };
  buttontextStyles?: { [key: string]: string };
  buttonText?: string;
  autoStart?: boolean;
}

export const HydrogenCheckout = forwardRef(
  (payload: PaymentPayload, hydrogenPayRef: any) => {
    const [startPayment, setStartPayment] = useState(false);

    //checkout html script
    const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hydrogen Pay</title>
  </head>
  <body>
  <script src="https://hydrogenshared.blob.core.windows.net/paymentgateway/paymentGatewayIntegration_v1PROD.js" module>
  </script>
  <script>
    let paymentResponse;
    let paymentObject = {
      "amount": "${payload.amount}",
      "email": "${payload.email}",
      "currency": "${payload.currency}",
      "description": "${payload.description}",
      "meta": "${payload.meta}",
      "isAPI": false,
      "isRecurring":${payload.isRecurring},
      "frequency":${payload.frequency},
      "CustomerName":"${payload.customerName}",
    }

    function onClose(e) {
      var response = {event:'close', e};
      window.ReactNativeWebView.postMessage(JSON.stringify(response))
    }

    function onSuccess(e) {
      var response = {event:'success', e};
      window.ReactNativeWebView.postMessage(JSON.stringify(response))
    }

    async function openDialogModal(token) {
      paymentResponse =  handlePgData(paymentObject, token, onClose);
      paymentResponse = await paymentResponse
    }

    openDialogModal("${payload.token}")

    let checkStatus = setInterval(async function() {
      const checkPaymentStatus = await handlePaymentStatus(paymentResponse, "${payload.token}");
        if(checkPaymentStatus.status === "Paid"){
            onSuccess(checkPaymentStatus)
            clearInterval(checkStatus)
         }
      }, 2000)

  </script>
  </body>
  </html>
`;

    // log webview error
    const OnError = (e: any) => {
      console.error(e);
    };

    //handle callback events
    const messageEvent = (e: any) => {
      var messageResponse = JSON.parse(e);
      switch (messageResponse.event) {
        case 'success':
          if (payload.onSuccess) {
            payload.onSuccess(messageResponse.e);
          }
          break;
        case 'close':
          if (payload.onClose) {
            payload.onClose(messageResponse.e);
          }
          hydrogenPayRef?.current?.closePayment();
          break;
        default:
          hydrogenPayRef?.current?.closePayment();
          break;
      }
    };

    useImperativeHandle(hydrogenPayRef, () => {
      return {
        initPayment() {
          setStartPayment(true);
        },
        closePayment() {
          setStartPayment(false);
        },
      };
    });

    useEffect(() => {
      if (payload?.autoStart) {
        setStartPayment(true);
      }
    }, [payload?.autoStart]);

    return (
      <KeyboardAvoidingView enabled behavior="position">
        {payload.payButton && (
          <TouchableOpacity
            onPress={() => hydrogenPayRef?.current?.initPayment()}
            style={[styles.buttonStyle, payload.buttonStyle]}
          >
            <Text style={[styles.buttontextStyles, payload.buttontextStyles]}>
              {payload.buttonText || 'Hydrogen Pay'}
            </Text>
          </TouchableOpacity>
        )}
        <Modal transparent={true} visible={startPayment}>
          <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
            <WebView
              javaScriptEnabled={true}
              startInLoadingState={true}
              mixedContentMode="always"
              domStorageEnabled={true}
              allowFileAccess={true}
              originWhitelist={['*']}
              cacheEnabled={false}
              source={{ html }}
              allowUniversalAccessFromFileURLs={true}
              onMessage={(e) => {
                messageEvent(e.nativeEvent.data);
              }}
              onError={OnError}
              onHttpError={OnError}
            />
          </SafeAreaView>
        </Modal>
      </KeyboardAvoidingView>
    );
  }
);

const styles = StyleSheet.create({
  buttonStyle: {
    marginLeft: 50,
    marginRight: 50,
    backgroundColor: '#FCE300',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginTop: 400,
    borderRadius: 5,
  },
  buttontextStyles: {},
});
