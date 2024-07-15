import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { COLORS, SIZES, icons, images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArticlesTabSelection from '../tabs/ArticlesTabSelection';
import { useTheme } from '../theme/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import ArticlesApi from '../apiConnections/ArticlesApi';

const ArticlesShowScreen = () => {
  const { colors, dark } = useTheme();

  const navigation = useNavigation();

  const [data] = ArticlesApi();

  const imagePath = 'https://annesiyimwebprojectv1.azurewebsites.net';

  console.log(data);

  /**
   * render header
   */
  const renderHeader = ()=>{
    return (
      <View style={styles.headerContainer}>
         <View style={styles.headerLeftContainer}>
            <Image
              source={images.logo}
              resizeMode='contain'
              style={styles.logoIcon}
            />
            <Text style={[styles.headerTitle, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>Articles</Text>
         </View>
         {/* <View style={styles.headerRightContainer}>
            <TouchableOpacity>
              <Image
                source={icons.search}
                resizeMode='contain'
                style={[styles.searchIcon, { 
                  tintColor: dark ? COLORS.grayscale100 : COLORS.greyscale900,
                }]}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={icons.moreCircle}
                resizeMode='contain'
                style={[styles.moreIcon, { 
                  tintColor: dark ? COLORS.grayscale100 : COLORS.greyscale900,
                }]}
              />
            </TouchableOpacity>
         </View> */}
      </View>
    )
  }
  return (

    <SafeAreaView style={[styles.area, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
      <View style={[styles.container, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
        {renderHeader()}


        <View style={[styles.container, { 
      backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite
    }]}>
      <FlatList
        data={data} // Use 'bookings' instead of 'upcomingBookings'
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.cardContainer, { 
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
          }]} onPress={()=> navigation.navigate('ArticleShowDetailScreen', {id: item.id})}>
            <View style={styles.dateContainer}>
              {/* <Text style={[styles.date, { 
                color: dark ? COLORS.white : COLORS.greyscale900
              }]}>{item.date}</Text> */}
              {/* <View style={styles.rightContainer}>
                <Text style={[styles.remindMeText, { 
                  color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                }]}>Read</Text>
                <Switch
                  value={item.hasRemindMe}
                  onValueChange={() => toggleRemindMe(item.id)}
                  thumbColor={item.hasRemindMe ? '#fff' : COLORS.white}
                  trackColor={{ false: '#EEEEEE', true: COLORS.primary }}
                  ios_backgroundColor={COLORS.white}
                  style={styles.switch}
                />
              </View> */}
            </View>
            <View style={[styles.separateLine, { 
              backgroundColor: dark? COLORS.greyScale800 : COLORS.grayscale200,
            }]} />
            <View style={styles.detailsContainer}>
              <Image
                source={{uri: `${imagePath}` + item.imagePathUrl}}
                resizeMode='cover'
                style={styles.barberImage}
              />
              <View style={styles.detailsRightContainer}>
                <Text style={[styles.name, { 
                   color: dark ? COLORS.secondaryWhite : COLORS.greyscale900
                }]}>{item.name}</Text>
                <Text style={[styles.address, { 
                  color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                }]}>{item.description}</Text>
                {/* <Text style={[styles.serviceTitle, { 
                  color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                }]}>Services:</Text>
                <Text style={styles.serviceText}>{item.services.join(", ")}</Text> */}
              </View>
            </View>
            <View style={[styles.separateLine, { 
              marginVertical: 10,
              backgroundColor: dark?  COLORS.greyScale800 : COLORS.grayscale200,
              }]} />
            <View style={styles.buttonContainer}>
            <Text style={[styles.serviceTitle, { 
                  color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                }]}>Tags:</Text>
                <Text style={styles.serviceText}>    Month 1, Month2, Feeding </Text>
              {/* <TouchableOpacity
                onPress={() => refRBSheet.current.open()}
                style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>Cancel Booking</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={()=>navigation.navigate("EReceipt")}
                style={styles.receiptBtn}>
                <Text style={styles.receiptBtnText}>View E-Receipt</Text>
              </TouchableOpacity> */}
            </View>
          </TouchableOpacity>
        )}
      />



        {/* <ArticlesTabSelection/> */}
      </View>
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
  headerContainer: {
    width: SIZES.width - 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  logoIcon: {
    height: 32,
    width: 32,
    tintColor: COLORS.primary,
    marginRight: 16
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "bold",
    color: COLORS.greyscale900
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
    container: {
      backgroundColor: COLORS.tertiaryWhite
    },
    cardContainer: {
      width: SIZES.width - 32,
      borderRadius: 18,
      backgroundColor: COLORS.white,
      paddingHorizontal: 8,
      paddingVertical: 8,
      marginBottom: 16
    },
    dateContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    date: {
      fontSize: 16,
      fontFamily: "bold",
      color: COLORS.greyscale900
    },
    statusContainer: {
      width: 64,
      height: 24,
      borderRadius: 6,
      backgroundColor: COLORS.greeen,
      alignItems: "center",
      justifyContent: "center"
    },
    status: {
      fontSize: 10,
      color: COLORS.white,
      fontFamily: "medium",
    },
    separateLine: {
      width: "100%",
      height: 0.7,
      backgroundColor: COLORS.greyScale800,
      marginVertical: 12
    },
    detailsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    barberImage: {
      width: 88,
      height: 88,
      borderRadius: 16,
      marginHorizontal: 12
    },
    detailsRightContainer: {
      flex: 1,
      marginLeft: 12
    },
    name: {
      fontSize: 17,
      fontFamily: "bold",
      color: COLORS.greyscale900
    },
    address: {
      fontSize: 12,
      fontFamily: "regular",
      color: COLORS.grayscale700,
      marginVertical: 4
    },
    serviceTitle: {
      fontSize: 12,
      fontFamily: "regular",
      color: COLORS.grayscale700,
    },
    serviceText: {
      fontSize: 12,
      color: COLORS.primary,
      fontFamily: "medium",
      marginTop: 6
    },
    cancelBtn: {
      width: (SIZES.width - 32) / 2 - 16,
      height: 36,
      borderRadius: 24,
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 6,
      borderColor: COLORS.primary,
      borderWidth: 1.4,
      marginBottom: 12
    },
    cancelBtnText: {
      fontSize: 16,
      fontFamily: "semiBold",
      color: COLORS.primary,
    },
    receiptBtn: {
      width: (SIZES.width - 32) / 2 - 16,
      height: 36,
      borderRadius: 24,
      backgroundColor: COLORS.primary,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 6,
      borderColor: COLORS.primary,
      borderWidth: 1.4,
      marginBottom: 12
    },
    receiptBtnText: {
      fontSize: 16,
      fontFamily: "semiBold",
      color: COLORS.white,
    },
    buttonContainer: {
      flexDirection: "column",
      //alignItems: "center",
      //justifyContent: "space-between"
    },
    rightContainer: {
      flexDirection: "row",
      alignItems: "center"
    },
    remindMeText: {
      fontSize: 12,
      fontFamily: "regular",
      color: COLORS.grayscale700,
      marginVertical: 4
    },
    switch: {
      marginLeft: 8,
      transform: [{ scaleX: .8 }, { scaleY: .8 }], // Adjust the size of the switch
    },
    bottomContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 12,
      paddingHorizontal: 16,
      width: "100%"
    },
    cancelButton: {
      width: (SIZES.width - 32) / 2 - 8,
      backgroundColor: COLORS.tansparentPrimary,
      borderRadius: 32
    },
    removeButton: {
      width: (SIZES.width - 32) / 2 - 8,
      backgroundColor: COLORS.primary,
      borderRadius: 32
    },
    bottomTitle: {
      fontSize: 24,
      fontFamily: "semiBold",
      color: "red",
      textAlign: "center",
    },
    bottomSubtitle: {
      fontSize: 22,
      fontFamily: "bold",
      color: COLORS.greyscale900,
      textAlign: "center",
      marginVertical: 12
    },
    selectedCancelContainer: {
      marginVertical: 24,
      paddingHorizontal: 36,
      width: "100%"
    },
    cancelTitle: {
      fontSize: 18,
      fontFamily: "semiBold",
      color: COLORS.greyscale900,
      textAlign: "center",
    },
    cancelSubtitle: {
      fontSize: 14,
      fontFamily: "regular",
      color: COLORS.grayscale700,
      textAlign: "center",
      marginVertical: 8,
      marginTop: 16
    }
  // searchIcon: {
  //   width: 24,
  //   height: 24,
  //   tintColor: COLORS.greyscale900,
  //   marginRight: 12
  // },
  // moreIcon: {
  //   width: 24,
  //   height: 24,
  //   tintColor: COLORS.greyscale900
  // }
})

export default ArticlesShowScreen