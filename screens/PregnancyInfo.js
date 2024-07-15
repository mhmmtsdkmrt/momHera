import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { ScrollView } from "react-native-virtualized-view";
import Button from "../components/Button";
import { useTheme } from '../theme/ThemeProvider';
import RNPickerSelect from 'react-native-picker-select';
import { COLORS, SIZES, FONTS, icons  } from '../constants';
import DatePickerModal from '../components/DatePickerModal';
import { getFormatedDate } from "react-native-modern-datepicker";
import { Feather } from "@expo/vector-icons";


const PregnancyInfo = ({ navigation }) => {
    const { colors, dark } = useTheme();

    const [selectedBasedOn, setSelectedBasedOn] = useState('');
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);

    const basedOnDateOptions = [
        { label: 'Estimated Pregnancy Date', value: 'Estimated Pregnancy Date' },
        { label: 'Estimated Date of Birth', value: 'Estimated Date of Birth' },
        { label: 'First Day of Last Period', value: 'First Day of Last Period' },
      ];


    const handleBasedOnChange = (value) => {
        setSelectedBasedOn(value);
      };

      const today = new Date();
      const startDate = getFormatedDate(
      new Date(today.setDate(today.getDate() + 1)),
      "YYYY/MM/DD"
      );

      const [startedDate, setStartedDate] = useState("Select Date");

      const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
      };




    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="Select Pregnancy Date" />
                <ScrollView contentContainerStyle={styles.center}>
                    <Text style={[styles.title, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>Establish your estimated date of birth.            You can change this selection at any time. </Text>


                        <RNPickerSelect
                            placeholder={{ label: "Based On?", value: '' }}
                            items={basedOnDateOptions}
                            onValueChange={(value) => handleBasedOnChange(value)}
                            value={selectedBasedOn}
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

                        {selectedBasedOn === '' ? null : 
                                                <TouchableOpacity
                                                style={[styles.inputBtn, { 
                                                backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                                                borderColor: dark? COLORS.dark2 : COLORS.greyscale500,
                                                }]}
                                                onPress={handleOnPressStartDate}
                                                >
                                                <Text style={{ ...FONTS.body4, color: COLORS.grayscale400}}>{startedDate}</Text>
                                                <Feather name="calendar" size={24} color={COLORS.grayscale400} />
                                            </TouchableOpacity> }   
                
                                               
                         <DatePickerModal
                            open={openStartDatePicker}
                            startDate={startDate}
                            selectedDate={startedDate}
                            onClose={() => setOpenStartDatePicker(false)}
                            onChangeStartDate={(date) => setStartedDate(date)}
                        />

                        {selectedBasedOn === 'First Day of Last Period' && <Text style={[styles.subtitle, { color: dark? COLORS.secondaryWhite : COLORS.greyscale900 }]}>We calculate the estimated date of birth using a 28-day menstrual cycle.</Text>}
                        {selectedBasedOn === 'Estimated Pregnancy Date' && <Text style={[styles.subtitle, { color: dark? COLORS.secondaryWhite : COLORS.greyscale900 }]}>Pregnancy starts two weeks before conception. The estimated date of birth is calculated from today.</Text>}
            


                </ScrollView>
            </View>
            <View style={styles.bottomContainer}>      
                     <Button
                    title="Continue"
                    filled
                    style={styles.button}
                    onPress={() => { navigation.navigate("Login") }}
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
    title: {
        fontSize: 18,
        fontFamily: "medium",
        color: COLORS.greyscale900,
        textAlign: "center",
        marginVertical: 64
    },
    codeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
        justifyContent: "center"
    },
    code: {
        fontSize: 18,
        fontFamily: "medium",
        color: COLORS.greyscale900,
        textAlign: "center"
    },
    time: {
        fontFamily: "medium",
        fontSize: 18,
        color: COLORS.primary
    },
    button: {
        borderRadius: 32,
        marginVertical: 32,
        width: 200,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 144
    },
    inputBtn: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: COLORS.greyscale500,
        height: 50,
        paddingLeft: 8,
        fontSize: 18,
        justifyContent: "space-between",
        marginTop: 12,
        backgroundColor: COLORS.greyscale500,
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 8
      },
      subtitle: {
        fontSize: 14,
        color: COLORS.greyscale900,
        fontFamily: "medium",
        marginTop: 4
      },
      bottomContainer: {
        alignItems: "flex-end",
        marginRight: 20,
      }
})

export default PregnancyInfo