import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { ScrollView } from 'react-native-virtualized-view';
import DatePickerView from '../components/DatePickerView';
import { getFormatedDate } from "react-native-modern-datepicker";
import { hoursData, specialists } from '../data';
import Button from '../components/Button';
import SpecialistCard from '../components/SpecialistCard';
import { useTheme } from '../theme/ThemeProvider';

const BookAppointment = ({ navigation }) => {
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const {colors, dark } = useTheme();
  const [selectedHour, setSelectedHour] = useState(null);
  const today = new Date();
  const startDate = getFormatedDate(
    new Date(today.setDate(today.getDate() + 1)),
    "YYYY/MM/DD"
  );
  const [startedDate, setStartedDate] = useState("12/12/2023");
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);

  const [count, setCount] = useState(2);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Function to handle hour selection
  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
  };

  const handleSelectSpecialist = (id) => {
    setSelectedSpecialist(id);
  };


  // Render each hour as a selectable button
  const renderHourItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.hourButton,
          selectedHour === item.id && styles.selectedHourButton,
        ]}
        onPress={() => handleHourSelect(item.id)}
      >
        <Text style={[styles.hourText,
        selectedHour === item.id && styles.selectedHourText]}>{item.hour}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <SafeAreaView style={[styles.area, { 
      backgroundColor: dark ? COLORS.dark1 : COLORS.white
    }]}>
      <View style={[styles.container, { 
        backgroundColor: dark ? COLORS.dark1 : COLORS.white
      }]}>
        <Header title="Booking Details" />
        <ScrollView contentContainerStyle={{ marginVertical: 16 }} showsVerticalScrollIndicator={false}>
          <Text style={[styles.title, { 
            color: dark ? COLORS.white : COLORS.black
          }]}>Select Date</Text>
          <DatePickerView
            open={openStartDatePicker}
            startDate={startDate}
            selectedDate={startedDate}
            onClose={() => setOpenStartDatePicker(false)}
            onChangeStartDate={(date) => setStartedDate(date)}
          />
          <Text style={[styles.title, { 
             color: dark ? COLORS.white : COLORS.black
          }]}>Select Hours</Text>
          <View style={{ marginVertical: 12 }}>
            <FlatList
              data={hoursData}
              renderItem={renderHourItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <Text style={[styles.title, { 
             color: dark ? COLORS.white : COLORS.black
          }]}>Select Specialist</Text>
          <View style={{ marginTop: 22, marginBottom: 72 }}>
            <FlatList
              data={specialists}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item }) => (
                <SpecialistCard
                  id={item.id}
                  name={item.name}
                  avatar={item.avatar}
                  position={item.position}
                  onPress={handleSelectSpecialist}
                  isSelected={selectedSpecialist === item.id}
                />
              )}
            />
          </View>
        </ScrollView>
      </View>
      <View style={[styles.bottomContainer, { 
        backgroundColor: dark? COLORS.dark1 : COLORS.white
      }]}>
        <Button
          title="Continue"
          filled
          style={styles.button}
          onPress={() => navigation.navigate("PaymentMethods")}
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
    backgroundColor: COLORS.white,
    padding: 16
  },
  title: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.black
  },
  ourContainer: {
    width: SIZES.width - 32,
    height: 72,
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hourTitle: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.black,
    marginBottom: 4
  },
  hourSubtitle: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.black,
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 120,
    justifyContent: "space-between"
  },
  iconContainer: {
    height: 38,
    width: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: COLORS.tansparentPrimary
  },
  count: {
    fontSize: 16,
    fontFamily: "regular",
    color: COLORS.black
  },
  hourButton: {
    padding: 10,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
    backgroundColor: "transparent",
    borderColor: COLORS.primary,
    borderWidth: 1.4
  },
  selectedHourButton: {
    backgroundColor: COLORS.primary,
  },
  selectedHourText: {
    fontSize: 12,
    fontFamily: 'medium',
    color: COLORS.white
  },
  hourText: {
    fontSize: 12,
    fontFamily: 'medium',
    color: COLORS.primary
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 72,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    alignItems: "center",
    backgroundColor: COLORS.white,
    justifyContent: "center"
  },
  button: {
    width: SIZES.width - 32,
    height: 54,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary
  }
})

export default BookAppointment