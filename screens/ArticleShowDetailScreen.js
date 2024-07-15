import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { COLORS, SIZES, icons } from '../constants'
import { useTheme } from '../theme/ThemeProvider'
import Header from '../components/Header';

export default function ArticleShowDetailScreen({ route, navigation }) {

    const {colors, dark} = useTheme();
    const [header, setHeader] = useState(null)
    const [description, setDescription] = useState(null)
    const [image, setImage] = useState(null)
    const imagePath = 'https://annesiyimwebprojectv1.azurewebsites.net'
    const id = route.params.id ;
    
    const getResult = async (id) => {
        const response = await axios.get('https://annesiyimapiprojectv1.azurewebsites.net/api/Categories'+`/${id}`, {
        });
        setHeader(response.data.data.name);
        setDescription(response.data.data.description);
        setImage(response.data.data.imagePathUrl)
        
    };

    console.log(image);


    useEffect(() => {
        getResult(id);
    },[id]);

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
            {header}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
        <View style= {[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <Image style={styles.articlesImage} source={{uri: `${imagePath}`+ image}}/> 


            <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: 10}}>
            <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>{header}</Text>
            <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>{description}</Text>
        </View>        
            </ScrollView>

        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
        area: {
            flex: 1,
            backgroundColor: COLORS.white
        },
        container: {
            flex: 1,
            backgroundColor: COLORS.white,
        },
        articlesImage: {
            width: SIZES.width,
            height: SIZES.height *0.3,
            borderRadius: 16,
        },
        headerContainer: {
            flexDirection: "row",
            width: SIZES.width - 32,
            justifyContent: "space-between",
            marginBottom: 10,
            marginTop: 10
        },
        backIcon: {
            width: 24,
            height: 24,
            tintColor: COLORS.white,
        },
        headerTitle: {
            fontSize: 20,
            fontFamily: 'bold',
            color: COLORS.black,
            marginLeft: 16
        },
        headerLeft: {
            flexDirection: "row",
            alignItems: "center"
        },
        settingsTitle: {
            fontSize: 18,
            fontFamily: "bold",
            color: COLORS.black,
            marginVertical: 26
        },
        body: {
            fontSize: 14,
            fontFamily: "regular",
            color: COLORS.black,
            marginTop: 4
        },
})

