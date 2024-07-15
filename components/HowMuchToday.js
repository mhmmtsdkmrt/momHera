import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES, images } from '../constants';

export default function HowMuchToday () {
  return (
    <View style={styles.container}>
        <Image 
        style={styles.image}
        source={images.adaptiveicon}/>
        <Text style={styles.text}>Bebeğinizin boyutu ..meyve ismi gelecek.. kadar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: SIZES.width - 32,
        height: 150,
        borderRadius: 20,
        borderTopWidth: 1,
        marginTop: 20,
        borderColor: COLORS.greyscale300,
        borderWidth: 1,
    },
    image: {
        width: 120,
        height: 120,
        marginLeft: 130,
    },
    text: {
        fontSize: 17,
        textAlign: 'center',
        color: COLORS.primary,
        fontWeight: 'bold',
    },

})