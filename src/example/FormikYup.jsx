import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import {Input, Button, Toggle} from '@ui-kitten/components';
import * as Yup from 'yup';

const FormikYup = () => {
  // validation şema
  const registerSchema = Yup.object().shape({
    name: Yup.string().required('Zorunlu Alan'),
    surname: Yup.string().required('Zorunlu Alan'),
    email: Yup.string()
      .email('Geçerli bir e-mail adresi giriniz')
      .required('Zorunlu Alan'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Geçerli bir telefon numarası giriniz')
      .required('Zorunlu Alan'),
    password: Yup.string()
      .min(6, 'Şifre en az 6 karakter olmalıdır')
      .required('Zorunlu Alan'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Şifreler uyuşmuyor')
      .required('Zorunlu Alan'),
    agrementConfirm: Yup.bool()
      .oneOf([true], 'Kayıt için sözleşmeyi onaylamanız gerekmektedir')
      .required('Zorunlu Alan'),
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View
          style={{
            padding: 20,
            backgroundColor: '#00e096',
            minHeight: 110,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
            KAYIT ALANI
          </Text>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{padding: 10, paddingBottom: 40}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{
              email: '',
              name: '',
              surname: '',
              phone: '',
              password: '',
              passwordConfirmation: '',
              agrementConfirm: false,
            }}
            validationSchema={registerSchema}
            onSubmit={values =>
              Alert.alert('Form Değerleri', JSON.stringify(values, null, 2))
            }>
            {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
              <View>
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.name}
                  label={'Ad'}
                  placeholder="İsim giriniz..."
                  onChangeText={handleChange('name')}
                  status={errors.name ? 'danger' : 'basic'}
                  caption={errors.name}
                  returnKeyType="next"
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.surname}
                  label={'Soyad'}
                  placeholder="Soyad giriniz..."
                  onChangeText={handleChange('surname')}
                  status={errors.surname ? 'danger' : 'basic'}
                  caption={errors.surname}
                  returnKeyType="next"
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.email}
                  label={'Mail'}
                  placeholder="E-mail giriniz..."
                  onChangeText={handleChange('email')}
                  status={errors.email ? 'danger' : 'basic'}
                  caption={errors.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.phone}
                  label={'Telefon'}
                  placeholder="Telefon numarası giriniz..."
                  onChangeText={handleChange('phone')}
                  status={errors.phone ? 'danger' : 'basic'}
                  caption={errors.phone}
                  keyboardType="number-pad"
                  returnKeyType="next"
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.password}
                  label={'Şifre'}
                  placeholder="Şifre giriniz..."
                  onChangeText={handleChange('password')}
                  status={errors.password ? 'danger' : 'basic'}
                  caption={errors.password}
                  secureTextEntry
                  returnKeyType="next"
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.passwordConfirmation}
                  label={'Şifre (Tekrar)'}
                  placeholder="Şifre tekrarını giriniz..."
                  onChangeText={handleChange('passwordConfirmation')}
                  status={errors.passwordConfirmation ? 'danger' : 'basic'}
                  caption={errors.passwordConfirmation}
                  secureTextEntry
                  returnKeyType="done"
                />

                <Toggle
                  style={{marginHorizontal: 5, marginTop: 10}}
                  checked={values.agrementConfirm}
                  onChange={value => setFieldValue('agrementConfirm', value)}>
                  Kullanıcı sözleşmesini ve gizliliğini kabul ediyorum.
                </Toggle>
                {errors.agrementConfirm && (
                  <Text style={{color: 'red'}}>{errors.agrementConfirm}</Text>
                )}

                <Button
                  style={{marginTop: 30, marginBottom: 10}}
                  onPress={handleSubmit}
                  status="success">
                  KAYDET
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default FormikYup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
