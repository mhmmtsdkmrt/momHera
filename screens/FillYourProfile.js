import { View, Text, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList, TextInput } from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { COLORS, SIZES, FONTS, icons  } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { reducer } from '../utils/reducers/formReducers';
import { validateInput } from '../utils/actions/formActions';
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { launchImagePicker } from '../utils/ImagePickerHelper';
import Input from '../components/Input';
import Button from '../components/Button';
import { useTheme } from '../theme/ThemeProvider';
import RNPickerSelect from 'react-native-picker-select';

const isTestMode = true

const initialState = {
  inputValues: {
    fullName: isTestMode ? 'John Doe' : '',
    email: isTestMode ? 'example@gmail.com' : '',
    nickname: isTestMode ? "" : "",
    phoneNumber: ''
  },
  inputValidities: {
    fullName: false,
    email: false,
    nickname: false,
  },
  formIsValid: false,
}


  const FillYourProfile = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const { colors, dark } = useTheme();
  const [selectedPregnant, setSelectedPregnant] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedRelative, setSelectedRelative] = useState('');



  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue)
      dispatchFormState({ inputId, validationResult: result, inputValue })
    },
    [dispatchFormState]
  )

  const pregnantOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'Not Yet', value: 'Not Yet' },
  ];

    const handlePregnantChange = (value) => {
    setSelectedPregnant(value);
  };

  const ageOptions = [
    { label: '16-20', value: '16-20' },
    { label: '21', value: '21' },
    { label: '22', value: '22' },
    { label: '23', value: '23' },
    { label: '24', value: '24' },
    { label: '25', value: '25' },
    { label: '26', value: '26' },
    { label: '27', value: '27' },
    { label: '28', value: '28' },
    { label: '29', value: '29' },
    { label: '30', value: '30' },
    { label: '31', value: '31' },
    { label: '32', value: '32' },
    { label: '33', value: '33' },
    { label: '34', value: '34' },
    { label: '35', value: '35' },
    { label: '36', value: '36' },
    { label: '37', value: '37' },
    { label: '38', value: '38' },
    { label: '39', value: '39' },
    { label: '40', value: '40' },
    { label: '41', value: '41' },
    { label: '42', value: '42' },
    { label: '43', value: '43' },
    { label: '44', value: '44' },
    { label: '45', value: '45' },
    { label: '46', value: '46' },
    { label: '47', value: '47' },
    { label: '48', value: '48' },
    { label: '49', value: '49' },
    { label: '50+', value: '50+' },
  ];

  const handleAgeChange = (value) => {
    setSelectedAge(value);
  };

  const relativeOptions = [
    { label: 'Mother', value: 'Mother' },
    { label: 'Father', value: 'Father' },
    { label: 'Parent', value: 'Parent' },
    { label: 'Single Mother', value: 'Single Mother' },
    { label: 'Grandma', value: 'Grandma' },
    { label: 'Grandfather', value: 'Grandfather' },
    { label: 'Uncle or Aunt', value: 'Uncle or Aunt' },
    { label: 'Friend', value: 'Friend' },
    { label: 'Other', value: 'Other' },
  ];

  const handleRelativeChange = (value) => {
    setSelectedRelative(value);
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error)
    }
  }, [error])

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker()

      if (!tempUri) return

      // set the image
      setImage({ uri: tempUri })
    } catch (error) { }
  };


  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Fill Your Profile" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center", marginVertical: 12 }}>
            <View style={styles.avatarContainer}>
              <Image
                source={image === null ? icons.userDefault2 : image}
                resizeMode="cover"
                style={styles.avatar} />
              <TouchableOpacity
                onPress={pickImage}
                style={styles.pickImage}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={24}
                  color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Input
              id="fullName"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['fullName']}
              placeholder="Full Name"
              placeholderTextColor={COLORS.gray} />
            <Input
              id="nickname"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['nickname']}
              placeholder="Nickname"
              placeholderTextColor={COLORS.gray} />
            <Input
              id="email"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['email']}
              placeholder="Email"
              placeholderTextColor={COLORS.gray}
              keyboardType="email-address" />

            <View style={styles.pickerContainer}>
              {/* yaş seçimi */}
            <RNPickerSelect
                placeholder={{ label: "You're age?", value: '' }}
                items={ageOptions}
                onValueChange={(value) => handleAgeChange(value)}
                value={selectedAge}
                style={{
                  inputIOS: {
                    marginTop: 8,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    borderRadius: 4,
                    color: COLORS.greyscale600,
                    paddingRight: 30,
                    height: 52,
                    width: SIZES.width - 32,
                    alignItems: 'center',
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderRadius: 16
                  },
                  inputAndroid: {
                    marginTop: 8,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    color: COLORS.greyscale600,
                    paddingRight: 30,
                    height: 52,
                    width: SIZES.width - 32,
                    alignItems: 'center',
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderRadius: 16
                  },
                }}
              />
              {/* Hamilelik seçimi */}
              <RNPickerSelect
                placeholder={{ label: "You're pregnant?" , value: '' }}
                items={pregnantOptions}
                onValueChange={(value) => handlePregnantChange(value)}
                value={selectedPregnant}
                style={{
                  inputIOS: {
                    marginTop: 12,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    borderRadius: 4,
                    color: COLORS.greyscale600,
                    paddingRight: 30,
                    height: 52,
                    width: SIZES.width - 32,
                    alignItems: 'center',
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderRadius: 16
                  },
                  inputAndroid: {
                    marginTop: 12,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    color: COLORS.greyscale600,
                    paddingRight: 30,
                    height: 52,
                    width: SIZES.width - 32,
                    alignItems: 'center',
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderRadius: 16
                  },
                }}
              />
              {/* ilişki seçimi */}
            <RNPickerSelect
                placeholder={{ label: "You're relative?", value: '' }}
                items={relativeOptions}
                onValueChange={(value) => handleRelativeChange(value)}
                value={selectedRelative}
                style={{
                  inputIOS: {
                    marginTop: 12,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    borderRadius: 4,
                    color: COLORS.greyscale600,
                    paddingRight: 30,
                    height: 52,
                    width: SIZES.width - 32,
                    alignItems: 'center',
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderRadius: 16
                  },
                  inputAndroid: {
                    marginTop: 12,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    color: COLORS.greyscale600,
                    paddingRight: 30,
                    height: 52,
                    width: SIZES.width - 32,
                    alignItems: 'center',
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderRadius: 16
                  },
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          title="Skip"
          style={{
            width: (SIZES.width - 32) / 2 - 8,
            borderRadius: 32,
            backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
            borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary
          }}
          textColor={dark ? COLORS.white : COLORS.primary}
          onPress={() => navigation.navigate("PregnancyInfo")}
        />
        <Button
          title="Continue"
          filled
          style={styles.continueButton}
          onPress={() => navigation.navigate("PregnancyInfo")}
        />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white
  },
  avatarContainer: {
    marginVertical: 12,
    alignItems: "center",
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  pickImage: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: COLORS.greyscale500,
    borderWidth: .4,
    borderRadius: 12,
    height: 52,
    width: SIZES.width - 32,
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: COLORS.greyscale500,
  },
  downIcon: {
    width: 10,
    height: 10,
    tintColor: "#111"
  },
  selectFlagContainer: {
    width: 90,
    height: 50,
    marginHorizontal: 5,
    flexDirection: "row",
  },
  flagIcon: {
    width: 30,
    height: 30
  },
  input: {
    flex: 1,
    marginVertical: 10,
    height: 40,
    fontSize: 14,
    color: "#111"
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.greyscale500,
    height: 52,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "space-between",
    marginTop: 4,
    backgroundColor: COLORS.greyscale500,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bottomContainer: {
    position: "absolute",
    bottom: 32,
    right: 16,
    left: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    width: SIZES.width - 32,
    alignItems: "center"
  },
  continueButton: {
    width: (SIZES.width - 32) / 2 - 8,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary
  },
  closeBtn: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    position: "absolute",
    right: 16,
    top: 32,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },
  pickerContainer: {
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    marginTop: 5,
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: COLORS.greyscale600,
    paddingRight: 30,
    height: 58,
    width: SIZES.width - 32,
    alignItems: 'center',
    backgroundColor: COLORS.greyscale500,
    borderRadius: 16
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: COLORS.greyscale600,
    paddingRight: 30,
    height: 58,
    width: SIZES.width - 32,
    alignItems: 'center',
    backgroundColor: COLORS.greyscale500,
    borderRadius: 16
  },
});

export default FillYourProfile