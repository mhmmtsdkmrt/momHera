import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import Button from './Button';
import { COLORS, SIZES } from '../constants';

export default function WeightComp({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.weightText}>0 KG</Text>
            <View>
                <Entypo name="ruler" size={30} color={COLORS.primary} style={styles.icon}/>
                <Text style={styles.text}>Annenin Kilosu</Text>
                <Button style={styles.button} filled onPress={()=> navigation.navigate('WeightTrackingScreen')} title= 'Kilo Ekleyin' />
            </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
        container: {
            width: SIZES.width - 32,
            height: 260,
            borderRadius: 20,
            borderTopWidth: 1,
            marginTop: 20,
            borderColor: COLORS.greyscale300,
            borderWidth: 1,
        },
        weightText: {
            fontSize: 90,
            textAlign: 'center',
            color: COLORS.primary,
            fontWeight: 'bold',
            borderBottomColor: COLORS.greyscale300,
            borderBottomWidth: 1,
        },
        text: {
            fontSize: 18,
            color: COLORS.primary,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        icon: {
            marginLeft: 10,
            marginTop: 10,
        },
        button: {
            width: SIZES.width - 32,
            borderRadius: 30,
            marginVertical: 6,
        }

    })