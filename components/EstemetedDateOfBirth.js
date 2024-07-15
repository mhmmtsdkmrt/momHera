import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import Header from './Header';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS, SIZES } from '../constants';


export default function EstimatedDateOfBirth({ navigation }) {

    const {colors, dark} = useTheme();



  return (
    <View style={[styles.container , { backgroundColor: dark ? COLORS.dark2 : COLORS.white } ]}>
        <View style={styles.tableContainer}>
        <Text style={styles.header}>Kaç Hafta Kaldı yazılacak.</Text>
        <Text style={styles.trimister}>Trimister</Text> 
        {/* https://www.unibaby.com.tr/faydali-bilgiler/trimester-nedir-trimester-donemleri-nasil-belirlenir/
        1. trimester, ilk üç aylık süreci kapsar. 0-13 haftalık süreç de diyebiliriz. 
        2. trimester gebeliğinizin 14. haftası itibariyle başlar ve 27. haftasına kadar devam eder.
        28. haftadan itibaren başlayan 3. trimester 40. haftaya kadar uzanır.
        */}
        <View style={styles.row}>
        <Text style={styles.text}>Tahmini doğum tarihi yazılacak</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("PregnancyInfo")}>
          <Text style={[styles.link]}>Düzenle</Text>
        </TouchableOpacity>

        </View>

        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: SIZES.width - 32,
        height: 110,
        borderWidth: 1.3,
        borderColor: COLORS.greyscale300,
        borderRadius: 32,
        marginTop: 30,
        marginRight: 12,
        padding: 7,
        backgroundColor: COLORS.primary,

    },
    tableContainer: {
        flex: 1,
        marginHorizontal: 8,
    },
    link: {
        // fontWeight: 'bold',
        // color: COLORS.primary,
        fontSize: 16,
        fontFamily: "medium",
        marginLeft: 12,
        color: COLORS.primary,
    },
    row: {
        marginVertical: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 18,
        fontFamily: "semiBold",
        color: COLORS.text,
    },
    trimister: {
        color: COLORS.text,
    },
    text: {
        color: COLORS.text,
    },
})