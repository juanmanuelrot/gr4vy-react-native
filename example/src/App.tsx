/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import { Colors, Header } from 'react-native/Libraries/NewAppScreen';

import EmbedReactNative, {
  EmbedReactNativeEventEmitter,
  Gr4vyTransactionResult,
  Gr4vyPaymentMethod,
} from '@gr4vy/embed-react-native';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPaymentMethodSelected = (paymentMethod: Gr4vyPaymentMethod) => {
    console.log('onPaymentMethodSelected', paymentMethod);
  };

  const startPayment = () => {
    const gr4vyId = 'spider';
    const env = 'sandbox';
    const token =
      'eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IlRvS2k5VEc1X21QV2VqUVh2ZE9rUzFud2p6dkdTSU9yVEFvb2p6bzY5R28ifQ.eyJzY29wZXMiOlsiZW1iZWQiXSwiZW1iZWQiOnsiYW1vdW50IjowLCJjdXJyZW5jeSI6IlVTRCJ9LCJpYXQiOjE2Nzk5MTgxMTUsIm5iZiI6MTY3OTkxODExNSwiZXhwIjoxNjc5OTIxNzE1LCJpc3MiOiJHcjR2eSBOb2RlIFNESyAwLjQxLjAgLSBOb2RlIHYxNi4xOS4wIiwianRpIjoiYzhhMTUzNDUtOWJlOC00Mjc0LWJmYTEtZDQwZDQyNmI0NTE4In0.ANr0EhreU10REMk2oRY-EO9AMrTkdVbZL7cWIsZfiufi6la16zXfoJhn1cFe0C76UQsZT_JdqCYMUpm5scxLhRDsADMGZAJGNoRJ19ma3p_Pdn5MSNllylm2eLR5G2XV8AxK8qZgj52ZuXUPk5G9VCXUvW-wfRLXUiFPhQCOO_cePg06';
    const amount = 1000;
    const currency = 'USD';
    const country = 'US';

    const onPaymentMethodSelectedSubscription =
      EmbedReactNativeEventEmitter.addListener(
        'onPaymentMethodSelected',
        onPaymentMethodSelected
      );

    EmbedReactNative.showPaymentSheet(
      gr4vyId,
      token,
      amount,
      currency,
      country,
      null,
      env,
      (error: string) => {
        console.error(error);
        onPaymentMethodSelectedSubscription.remove();
      },
      (transactionResult: Gr4vyTransactionResult) => {
        console.log(transactionResult);
        onPaymentMethodSelectedSubscription.remove();
      }
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <Header />
        <View
          style={{
            padding: 10,
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <Button title="Start Payment" onPress={startPayment} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
