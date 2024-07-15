import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useRef, useState } from 'react';
import { COLORS, SIZES, icons, images, socials } from "../constants";
import AutoSlider from '../components/AutoSlider';
import { StatusBar } from 'expo-status-bar';
import LinkItem from '../components/LinkItem';
import SubHeaderItem from '../components/SubHeaderItem';
import { specialists } from '../data';
import SpecialistCard from '../components/SpecialistCard';
import { TabSelection } from '../tabs';
import { ScrollView } from 'react-native-virtualized-view';
import RBSheet from "react-native-raw-bottom-sheet";
import { useTheme } from '../theme/ThemeProvider';
import SocialIcon from '../components/SocialIcon';

const SalonDetails = ({ navigation }) => {
  const refRBSheet = useRef();
  const { dark, colors } = useTheme();

  // Slider images
  const sliderImages = [
    images.salon1,
    images.salon2,
    images.salon3,
    images.salon4,
    images.salon5,
  ]

  // render header
  const renderHeader = ()=>{
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
      <View style={styles.headerContainer}>
          <TouchableOpacity
           onPress={()=>navigation.goBack()}
          >
            <Image
              source={icons.back}
              resizeMode='contain'
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=>setIsBookmarked(!isBookmarked)}>
            <Image
              source={isBookmarked ? icons.bookmark2 : icons.bookmark2Outline}
              resizeMode='contain'
              style={styles.bookmarkIcon}
            />
          </TouchableOpacity>
      </View>
    )
  }

  // render content
  const renderContent = ()=>{
    const [isOpen, setIsOpen] = useState(true);

    return (
      <View style={styles.contentContainer}>
         <View style={styles.salonHeaderContainer}>
             <Text style={[styles.salonName, { 
              color: colors.text
             }]}>Barbalerra Inova</Text>
           <TouchableOpacity 
              onPress={() => setIsOpen(!isOpen)}
              style={[styles.salonBtn, { 
                  backgroundColor: isOpen ? COLORS.primary : "red"
              }]}>
              <Text style={styles.salonBtnText}>{isOpen ? "Open" : "Closed"}</Text>
          </TouchableOpacity>

         </View>
         <View style={styles.salonItemContainer}>
            <Image
              source={icons.location2}
              resizeMode='contain'
              style={styles.locationIcon}
            />
            <Text style={[styles.locationText, { 
              color: dark ? COLORS.grayscale200 : COLORS.grayscale700,
            }]}>6993 Meadow Valley Terrace, New York</Text>
         </View>
         <View style={styles.salonItemContainer}>
            <Image
              source={icons.starMiddle}
              resizeMode='contain'
              style={styles.starMiddleIcon}
            />
            <Text style={[styles.starMiddleText, {
               marginVertical: 6 ,
               color: dark ? COLORS.grayscale200 : COLORS.grayscale700,
               }]}>4.8 (3,279 reviews)</Text>
         </View>

         {/* More information links */}
         <View style={styles.linkContainer}>
            <LinkItem
              name="Website"
              icon={icons.explore}
              onPress={()=>console.log("Website")}
            />
            <LinkItem
              name="Message"
              icon={icons.chat}
              onPress={()=>navigation.navigate("Inbox")}
            />
            <LinkItem
              name="Call"
              icon={icons.phoneCall}
              onPress={()=>navigation.navigate("Call")}
            />
            <LinkItem
              name="Direction"
              icon={icons.location2}
              onPress={()=>console.log("Direction")}
            />
            <LinkItem
             name="Share"
             icon={icons.send2}
             onPress={()=>refRBSheet.current.open()}
            />
         </View>

         <View style={[styles.separateLine, { 
          backgroundColor: dark ? COLORS.greyscale900 : COLORS.grayscale200
         }]} />

         {/* Specialists information */}
         <View>
            <SubHeaderItem
              title="Our Specialists" 
              navTitle="See All"
              onPress={()=>navigation.navigate("OurSpecialists")}
            />
            <FlatList
              data={specialists}
              keyExtractor={item=>item.id}
              showsHorizontalScrollIndicator={false}  
              horizontal
              renderItem={({ item, index }) =>(
                <SpecialistCard
                  name={item.name} 
                  avatar={item.avatar} 
                  position={item.position}
                  onPress={()=>{console.log("Pressed")}}
                />
              )}
            />
         </View>
        
        <TabSelection/>
      </View>
    )
  }
  return (
    <View style={[styles.area, 
     { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
         <StatusBar hidden />
         <AutoSlider images={sliderImages} />
         {renderHeader()}
         <ScrollView showsVerticalScrollIndicator={false}>
         {renderContent()}
         </ScrollView>
         <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={360}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.5)",
            },
            draggableIcon: {
              backgroundColor: dark ? COLORS.dark3 : COLORS.grayscale200,
            },
            container: {
              borderTopRightRadius: 32,
              borderTopLeftRadius: 32,
              height: 360,
              backgroundColor: dark ? COLORS.dark2 : COLORS.white,
              alignItems: "center",
            }
          }}
        >
          <Text style={[styles.bottomTitle, {
            color: dark ? COLORS.white : COLORS.greyscale900
          }]}>Share</Text>
          <View style={[styles.separateLine, { 
             backgroundColor: dark ? COLORS.grayscale700 : COLORS.grayscale200,
             marginVertical: 12
          }]} />
          <View style={styles.socialContainer}>
             <SocialIcon
               icon={socials.whatsapp}
               name="WhatsApp"
               onPress={()=>console.log("WhatsApp")}
             />
             <SocialIcon
               icon={socials.twitter}
               name="X"
               onPress={()=>console.log("Twitter")}
             />
             <SocialIcon
               icon={socials.facebook}
               name="Facebook"
               onPress={()=>console.log("Facebook")}
             />
             <SocialIcon
               icon={socials.instagram}
               name="Instagram"
               onPress={()=>console.log("Instagram")}
             />
          </View>
          <View style={styles.socialContainer}>
              <SocialIcon
                icon={socials.yahoo}
                name="Yahoo"
                onPress={()=>console.log("Yahoo")}
              />
              <SocialIcon
                icon={socials.titktok}
                name="Tiktok"
                onPress={()=>console.log("Tiktok")}
              />
              <SocialIcon
                icon={socials.messenger}
                name="Chat"
                onPress={()=>console.log("Chat")}
              />
              <SocialIcon
                icon={socials.wechat}
                name="Wechat"
                onPress={()=>console.log("Wechat")}
              />
          </View>
        </RBSheet>
    </View>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  headerContainer: {
    width: SIZES.width - 32,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 32,
    zIndex: 999,
    left: 16,
    right: 16
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.white
  },
  bookmarkIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.white
  },
  contentContainer: {
    marginHorizontal: 16
  },
  salonHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12
  },
  salonName: {
    fontSize: 24,
    fontFamily: "bold",
    color: COLORS.black,
  },
  salonBtn: {
    width: 72,
    height: 30,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  salonBtnText: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.white,
  },
  salonItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    width: 14,
    height: 14,
    tintColor: COLORS.primary,
    marginRight: 8
  },
  locationText: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.grayscale700,
  },
  starMiddleIcon: {
    width: 14,
    height: 14,
    tintColor: COLORS.primary,
    marginRight: 8
  },
  starMiddleText: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.grayscale700,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12
  },
  separateLine: {
    width: SIZES.width - 32,
    height: 1,
    backgroundColor: COLORS.grayscale200
  },
   bottomTitle: {
    fontSize: 24,
    fontFamily: "semiBold",
    color: COLORS.black,
    textAlign: "center",
    marginTop: 12
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    width: SIZES.width - 32
  }
})

export default SalonDetails