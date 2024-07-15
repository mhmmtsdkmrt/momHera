import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Modal, TouchableWithoutFeedback, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS, SIZES, icons } from '../constants';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NumberPlease from 'react-native-number-please';

const initialValues = [
  {id: "weightInteger", value: 50},
  {id: "weightDecimal", value: 0},
];


const WeightControl = ({ navigation }) => {
  const { dark, colors } = useTheme();
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [unit, setUnit] = useState('kg/cm');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [data, setData] = useState([]);
  const [isRemind, setIsRemind] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [weightPickerVisible, setWeightPickerVisible] = useState(false);
  const [weightPicker, setWeightPicker] = useState(initialValues);
  const weightShowPicker = [
    {id: "weightInteger" , label: "", min: 45, max: 200},
    {id: "weightDecimal" , label: "", min: 0, max: 9},
  ];

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus2 = () => {
    setIsFocused2(true);
  };

  const handleBlur2 = () => {
    setIsFocused2(false);
  };

  const toggleReminder = () => {
    setIsRemind((prev) => !prev);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('weightData');
      if (savedData) {
        setData(JSON.parse(savedData));
      }
      const savedUnit = await AsyncStorage.getItem('unit');
      if (savedUnit) {
        setUnit(savedUnit);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFirstEntry = async () => {
    try {
      const entry = { date: new Date().toLocaleDateString(), weight, height, unit };
      const newData = [...data, entry];
      setData(newData);
      await AsyncStorage.setItem('weightData', JSON.stringify(newData));
      await AsyncStorage.setItem('unit', unit);
      setModal1Visible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewEntry = async () => {
    try {
      const entry = { date: new Date().toLocaleDateString(), weight, height, unit };
      const newData = [...data, entry];
      setData(newData);
      await AsyncStorage.setItem('weightData', JSON.stringify(newData));
      setModal2Visible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const renderButton = (title, value) => (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: unit === value ? COLORS.primary : 'transparent' }
      ]}
      onPress={() => setUnit(value)}
    >
      <Text style={{ color: unit === value ? 'white' : 'black' }}>{title}</Text>
    </TouchableOpacity>
  );


  const toggleWeightPicker = () => {
    setWeightPickerVisible(!weightPickerVisible);
  };


   // Render modal
   const renderModal = () => {


    return (

        <>
        <View>
           <Modal
        animationType="slide"
        transparent={true}
        visible={weightPickerVisible}
        onRequestClose={toggleWeightPicker} // For Android back button close
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <NumberPlease
              digits={weightShowPicker}
              values={weightPicker}
              onChange={(values) => setWeightPicker(values)}
            />
            <Button title="Done" onPress={toggleWeightPicker} />
          </View>
        </View>
      </Modal>
      </View>
          <Modal
        animationType="slide"
        transparent={true}
        visible={modal1Visible}>
        <TouchableWithoutFeedback>
          {/* onPress={() => setModalVisible(false)} */}
          <View style={styles.modalContainer}>
            <View style={[styles.modalSubContainer, { backgroundColor: dark ? COLORS.dark2 : COLORS.white }]}>
              <Text style={styles.modalTitle}>Kilonuzu ekleyin</Text>

              <Text style={styles.modalNotes}>Sağlıklı kilo alımı sizin ve bebeğiniz için çok önemlidir. bu araç vücut kiltle indeksinize (BMI) ve ağırlık günlüklerinize göre tahmin etmenize yardımcı olacaktır.</Text>

              <Text style={styles.modalSubtitle}>Boyunuzu ve hamilelik öncesi kilonuzu girin</Text>
              <View style={{flexDirection: 'row'}}>
              {renderButton('Kg / cm', 'kg/cm')}
              {renderButton('Lbs / ft', 'lbs/ft')}

              </View>
              <View style={{flexDirection: 'row', marginHorizontal: 85, marginTop: 10}}>
                <View
                  style={[
                    styles.inputContainer,
                  {
                    borderColor: isFocused ? COLORS.primary : dark ? COLORS.dark2 : COLORS.greyscale500,
                    backgroundColor: isFocused ? COLORS.tansparentPrimary : dark ? COLORS.dark2 : COLORS.greyscale500,
                  },
                ]}>
              <TextInput
              style={[styles.textInput, { color: dark ? COLORS.white : COLORS.black }]}
              placeholder="Kilo" 
              onChangeText={setWeight} 
              keyboardType="numeric"
              onFocus={handleFocus}
              onBlur={handleBlur} />
              </View>
              <View
                  style={[
                    styles.inputContainer,
                  {
                    borderColor: isFocused2 ? COLORS.primary : dark ? COLORS.dark2 : COLORS.greyscale500,
                    backgroundColor: isFocused2 ? COLORS.tansparentPrimary : dark ? COLORS.dark2 : COLORS.greyscale500,
                  },
                ]}>
              <TextInput 
              style={[styles.textInput, { color: dark ? COLORS.white : COLORS.black }]}
              placeholder="Boy" 
              onChangeText={setHeight} 
              keyboardType="numeric"
              onFocus={handleFocus2}
              onBlur={handleBlur2}/>
              </View>
              </View>
              <View style={styles.modal1DateContainer}>
              <Text style={styles.modal1DateText}>{new Date().toLocaleDateString()}</Text>
              </View>
              <View style={styles.rightContainer}>
                      <Text style={[styles.settingsName, {
                       color: dark ? COLORS.white : COLORS.greyscale900
                       }]}>Hatırlat</Text>
                  <Switch
                  value={isRemind}
                  onValueChange={toggleReminder}
                  thumbColor={isRemind ? '#fff' : COLORS.white}
                  trackColor={{ false: '#EEEEEE', true: COLORS.primary }}
                  ios_backgroundColor={COLORS.white}
                  style={styles.switch}
                  />

              </View>
              <Text style={styles.modalNotes}>Düzenli günlükler, sağlıklı kilo alımını izlemenize ve konrumanıza yardımcı olur.</Text>   

              <View style={{ flexDirection: 'row-reverse' }}>
                <Button
                  title="Kaydet"
                  filled
                  onPress={() => {
                    toggleWeightPicker();
                    // setModal1Visible(false);
                    // handleFirstEntry();
                    //navigation.navigate('Drugs')
                  } }
                  style={{
                    width: "50%",
                    marginTop: 12,
                    marginLeft: 10
                  }} />
                <Button
                  title="Vazgeç"
                  outlined
                  onPress={() => {
                    setModal1Visible(false);
                    //navigation.goBack()
                  } }
                  style={{
                    width: "50%",
                    marginTop: 12
                  }} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal><Modal
        animationType="slide"
        transparent={true}
        visible={modal2Visible}>
          <TouchableWithoutFeedback>
            {/* onPress={() => setModalVisible(false)} */}
            <View style={styles.modalContainer}>
              <View style={[styles.modalSubContainer, { backgroundColor: dark ? COLORS.dark2 : COLORS.white }]}>
                <Text style={styles.modalTitle}>Yeni kilonuzu ekleyin</Text>

                <Text style={styles.modalSubtitle}>{unit === 'kg/cm' ? 'Kg ve Cm' : 'Lbs ve Ft'} girin:</Text>
                <TextInput placeholder="Kilo" onChangeText={setWeight} keyboardType="numeric" />
                <TextInput placeholder="Boy" onChangeText={setHeight} keyboardType="numeric" />

                <View style={{ flexDirection: 'row-reverse' }}>
                  <Button
                    title="Kaydet"
                    filled
                    onPress={() => {
                      setModal2Visible(false);
                      handleNewEntry();
                      //navigation.navigate('Drugs')
                    } }
                    style={{
                      width: "50%",
                      marginTop: 12,
                      marginLeft: 10
                    }} />
                  <Button
                    title="Vazgeç"
                    outlined
                    onPress={() => {
                      setModal2Visible(false);
                      //navigation.goBack()
                    } }
                    style={{
                      width: "50%",
                      marginTop: 12
                    }} />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal></>
        
    )
}

  /**
 * Render header
 */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              resizeMode='contain'
              style={[styles.backIcon, { 
                tintColor: dark? COLORS.white : COLORS.greyscale900
              }]}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { 
            color: dark? COLORS.white : COLORS.greyscale900
          }]}>
            Weight Control
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={{flexDirection: 'row', margin: 5}} 
          onPress={() => setModal1Visible(true)
            //(unit ? setModal2Visible(true) : setModal1Visible(true))
          }>
            
            <Image
              source={icons.plus}
              resizeMode='contain'
              style={[styles.moreIcon, { 
                tintColor: dark? COLORS.secondaryWhite : COLORS.white
              }]}
            />
            <Text style={{fontSize: 17, color: 'white'}}>  Ekle</Text>
          </TouchableOpacity>
          {renderModal()}
        </View>
      </View>
    )
  }

  return (
      <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
    
    <View style= {[{flex: 1, alignItems: 'center', justifyContent: 'center'} , { backgroundColor: colors.background }]}>
    <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{`${item.date.toLocaleString()} - ${item.weight} ${item.unit === 'kg/cm' ? 'kg' : 'lbs'}, ${item.height} ${item.unit === 'kg/cm' ? 'cm' : 'ft'}`}</Text>
          </View>
        )}
      />
    </View>
</View>
</SafeAreaView>
  );
}



//   const { dark, colors } = useTheme();
//   const [selectedCategories, setSelectedCategories] = useState(["1"]);
//   const [selectedRating, setSelectedRating] = useState(["1"]);
//   const [selectedDistance, setSelectedDistance] = useState(["All"]);

//   const refRBSheet = useRef();

//   /**
//    * Render header
//    */
//   const renderHeader = () => {
//     return (
//       <View style={styles.headerContainer}>
//         <View style={styles.headerLeft}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}>
//             <Image
//               source={icons.back}
//               resizeMode='contain'
//               style={[styles.backIcon, {
//                 tintColor: dark ? COLORS.white : COLORS.greyscale900
//               }]}
//             />
//           </TouchableOpacity>
//           <Text style={[styles.headerTitle, {
//             color: dark ? COLORS.white : COLORS.greyscale900
//           }]}>
//             Make up
//           </Text>
//         </View>
//         <TouchableOpacity>
//           <Image
//             source={icons.moreCircle}
//             resizeMode='contain'
//             style={[styles.moreIcon, {
//               tintColor: dark ? COLORS.white : COLORS.greyscale900
//             }]}
//           />
//         </TouchableOpacity>
//       </View>
//     )
//   }

//   /**
//    * Render content
//    */

//   const renderContent = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredSalons, setFilteredSalons] = useState(makeup);
//     const [resultsCount, setResultsCount] = useState(0);

//     useEffect(() => {
//       handleSearch();
//     }, [searchQuery]);


//     const handleSearch = () => {
//       const salons = makeup.filter((salon) =>
//         salon.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredSalons(salons);
//       setResultsCount(salons.length);

//     };
//     return (
//       <View>
//         <View>
//           {/* Search Bar */}
//           <View
//             onPress={() => console.log("Search")}
//             style={[styles.searchBarContainer, {
//               backgroundColor: dark ? COLORS.dark2 : COLORS.secondaryWhite
//             }]}>
//             <TouchableOpacity
//               onPress={handleSearch}
//             >
//               <Image
//                 source={icons.search2}
//                 resizeMode='contain'
//                 style={styles.searchIcon}
//               />
//             </TouchableOpacity>
//             <TextInput
//               placeholder='Search'
//               placeholderTextColor={COLORS.gray}
//               style={[styles.searchInput, {
//                 color: dark ? COLORS.white : COLORS.greyscale900
//               }]}
//               value={searchQuery}
//               onChangeText={(text) => setSearchQuery(text)}
//             />
//             <TouchableOpacity
//               onPress={() => refRBSheet.current.open()}>
//               <Image
//                 source={icons.filter}
//                 resizeMode='contain'
//                 style={styles.filterIcon}
//               />
//             </TouchableOpacity>
//           </View>


//           {/* Results container  */}
//           <View>
//             {
//               searchQuery && (
//                 <View style={styles.resultContainer}>
//                   <View style={styles.resultLeftView}>
//                     <Text style={[styles.subtitle, {
//                       color: dark ? COLORS.white : COLORS.greyscale900
//                     }]}>Results for "</Text>
//                     <Text style={[styles.subtitle, { color: COLORS.primary }]}>{searchQuery}</Text>
//                     <Text style={styles.subtitle}>"</Text>
//                   </View>
//                   <Text style={styles.subResult}>{resultsCount} found</Text>
//                 </View>
//               )
//             }

//             {/* Courses result list */}
//             <View style={{ marginVertical: 16, backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite }}>
//               {resultsCount && resultsCount > 0 ? (
//                 <FlatList
//                   data={filteredSalons}
//                   keyExtractor={(item) => item.id}
//                   renderItem={({ item }) => {
//                     return (
//                       <SalonCard
//                         name={item.name}
//                         image={item.image}
//                         category={item.category}
//                         rating={item.rating}
//                         location={item.location}
//                         distance={item.distance}
//                         onPress={()=>navigation.navigate("SalonDetails")}
//                         categoryId={item.categoryId}
//                       />
//                     )
//                   }}
//                 />
//               ) : (
//                 <NotFoundCard />
//               )}
//             </View>
//           </View>
//         </View>
//       </View>
//     )
//   }


//   // Toggle category selection
//   const toggleCategory = (categoryId) => {
//     const updatedCategories = [...selectedCategories];
//     const index = updatedCategories.indexOf(categoryId);

//     if (index === -1) {
//       updatedCategories.push(categoryId);
//     } else {
//       updatedCategories.splice(index, 1);
//     }

//     setSelectedCategories(updatedCategories);
//   };

//   // toggle rating selection
//   const toggleRating = (ratingId) => {
//     const updatedRatings = [...selectedRating];
//     const index = updatedRatings.indexOf(ratingId);

//     if (index === -1) {
//       updatedRatings.push(ratingId);
//     } else {
//       updatedRatings.splice(index, 1);
//     }

//     setSelectedRating(updatedRatings);
//   };

//   // toggle distance selection
//   const toggleDistance = (distanceId) => {
//     const updatedDistances = [...selectedDistance];
//     const index = updatedDistances.indexOf(distanceId);

//     if (index === -1) {
//       updatedDistances.push(distanceId);
//     } else {
//       updatedDistances.splice(index, 1);
//     }

//     setSelectedDistance(updatedDistances);
//   };

//   // Category item
//   const renderCategoryItem = ({ item }) => (
//     <TouchableOpacity
//       style={{
//         backgroundColor: selectedCategories.includes(item.id) ? COLORS.primary : "transparent",
//         padding: 10,
//         marginVertical: 5,
//         borderColor: COLORS.primary,
//         borderWidth: 1.3,
//         borderRadius: 24,
//         marginRight: 12,
//       }}
//       onPress={() => toggleCategory(item.id)}>

//       <Text style={{
//         color: selectedCategories.includes(item.id) ? COLORS.white : COLORS.primary
//       }}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   const renderRatingItem = ({ item }) => (
//     <TouchableOpacity
//       style={{
//         backgroundColor: selectedRating.includes(item.id) ? COLORS.primary : "transparent",
//         paddingHorizontal: 16,
//         paddingVertical: 6,
//         marginVertical: 5,
//         borderColor: COLORS.primary,
//         borderWidth: 1.3,
//         borderRadius: 24,
//         marginRight: 12,
//         flexDirection: "row",
//         alignItems: "center",
//       }}
//       onPress={() => toggleRating(item.id)}>
//       <View style={{ marginRight: 6 }}>
//         <FontAwesome name="star" size={14} color={selectedRating.includes(item.id) ? COLORS.white : COLORS.primary} />
//       </View>
//       <Text style={{
//         color: selectedRating.includes(item.id) ? COLORS.white : COLORS.primary
//       }}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   const renderDistanceItem = ({ item }) => (
//     <TouchableOpacity
//       style={{
//         backgroundColor: selectedDistance.includes(item.id) ? COLORS.primary : "transparent",
//         paddingHorizontal: 16,
//         paddingVertical: 6,
//         marginVertical: 5,
//         borderColor: COLORS.primary,
//         borderWidth: 1.3,
//         borderRadius: 24,
//         marginRight: 12,
//         flexDirection: "row",
//         alignItems: "center",
//       }}
//       onPress={() => toggleDistance(item.id)}>
//       <Text style={{
//         color: selectedDistance.includes(item.id) ? COLORS.white : COLORS.primary
//       }}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
//       <View style={[styles.container, { backgroundColor: colors.background }]}>
//         {renderHeader()}
//         <ScrollView showsVerticalScrollIndicator={false}>
//           {renderContent()}
//         </ScrollView>
//         <RBSheet
//           ref={refRBSheet}
//           closeOnDragDown={true}
//           closeOnPressMask={false}
//           height={480}
//           customStyles={{
//             wrapper: {
//               backgroundColor: "rgba(0,0,0,0.5)",
//             },
//             draggableIcon: {
//               backgroundColor: dark ? COLORS.dark3 : "#000",
//             },
//             container: {
//               borderTopRightRadius: 32,
//               borderTopLeftRadius: 32,
//               height: 480,
//               backgroundColor: dark ? COLORS.dark2 : COLORS.white,
//               alignItems: "center",
//             }
//           }}
//         >
//           <Text style={[styles.bottomTitle, {
//             color: dark ? COLORS.white : COLORS.greyscale900
//           }]}>Filter</Text>
//           <View style={styles.separateLine} />
//           <View style={{ width: SIZES.width - 32 }}>
//             <Text style={[styles.sheetTitle, {
//               color: dark ? COLORS.white : COLORS.greyscale900
//             }]}>Category</Text>
//             <FlatList
//               data={category}
//               keyExtractor={item => item.id}
//               showsHorizontalScrollIndicator={false}
//               horizontal
//               renderItem={renderCategoryItem}
//             />
//             <Text style={[styles.sheetTitle, {
//               color: dark ? COLORS.white : COLORS.greyscale900
//             }]}>Rating</Text>
//             <FlatList
//               data={ratings}
//               keyExtractor={item => item.id}
//               showsHorizontalScrollIndicator={false}
//               horizontal
//               renderItem={renderRatingItem}
//             />

//             <Text style={[styles.sheetTitle, {
//               color: dark ? COLORS.white : COLORS.greyscale900
//             }]}>Distance</Text>
//             <FlatList
//               data={distances}
//               keyExtractor={item => item.id}
//               showsHorizontalScrollIndicator={false}
//               horizontal
//               renderItem={renderDistanceItem}
//             />
//           </View>


//           <View style={styles.separateLine} />

//           <View style={styles.bottomContainer}>
//             <Button
//               title="Reset"
//               style={{
//                 width: (SIZES.width - 32) / 2 - 8,
//                 backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
//                 borderRadius: 32,
//                 borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary
//               }}
//               textColor={dark ? COLORS.white : COLORS.primary}
//               onPress={() => refRBSheet.current.close()}
//             />
//             <Button
//               title="Filter"
//               filled
//               style={styles.logoutButton}
//               onPress={() => refRBSheet.current.close()}
//             />
//           </View>
//         </RBSheet>
//       </View>
//     </SafeAreaView>
//   )
// };

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
  headerContainer: {
    flexDirection: "row",
    width: SIZES.width - 32,
    justifyContent: "space-between",
    marginBottom: 16
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'bold',
    color: COLORS.black,
    marginLeft: 16
  },
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black
  },
  searchBarContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.secondaryWhite,
    padding: 16,
    borderRadius: 12,
    height: 52,
    flexDirection: "row",
    alignItems: "center"
  },
  searchIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.gray
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "regular",
    marginHorizontal: 8
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SIZES.width - 32,
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "bold",
    color: COLORS.black,
  },
  subResult: {
    fontSize: 14,
    fontFamily: "semiBold",
    color: COLORS.primary
  },
  resultLeftView: {
    flexDirection: "row"
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 16,
    width: SIZES.width
  },
  cancelButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32
  },
  logoutButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: "semiBold",
    color: COLORS.black,
    textAlign: "center",
    marginTop: 12
  },
  separateLine: {
    height: .4,
    width: SIZES.width - 32,
    backgroundColor: COLORS.greyscale300,
    marginVertical: 12
  },
  sheetTitle: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.black,
    marginVertical: 12
  },
  headerRight: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    borderColor: 'white'
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: 12
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    textAlign: "center",
    marginVertical: 12
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)"
},
  modalSubContainer: {
    height: 580,
    width: SIZES.width * 0.9,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  modalIllustration: {
    height: 180,
    width: 180,
    marginVertical: 22
  },
  button: {
    paddingHorizontal: 14,
    marginHorizontal: 5,
    borderRadius: 21,
    height: 39,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  modal1DateContainer: {
    width: '100%',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding2,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: 'row',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.greyscale500,
    borderColor: COLORS.greyscale500,
  },
  modal1DateText: {
    color: COLORS.greyscale600,
    fontFamily: 'regular',
    fontSize: 18,
    paddingTop: 0,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  switch: {
    //marginRight: 2,
    transform: [{ scaleX: .8 }, { scaleY: .8 }],
  },
  settingsName: {
    fontSize: 15,
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    marginLeft: 250
  },
  modalNotes: {
    fontSize: 16,
    fontFamily: "regular",
    color: COLORS.greyscale600,
    marginVertical: 12
  },
  textInput: {
    color: COLORS.black,
    flex: 1,
    fontFamily: 'regular',
    fontSize: 14,
    paddingTop: 0,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding2,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: 'row',
    height: 52,
    alignItems: 'center',
  }
})

export default WeightControl