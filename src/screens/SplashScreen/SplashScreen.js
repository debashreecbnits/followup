import React from 'react';
import { Text, View, Image} from 'react-native'

const Spalash = () => {

    return(
        <View style={{
            flex: 1, 
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf:'center'}}> 
            <Image
                source={require("../../assets/images/sign-up-logo.png")}
                // style={styles.AddressStyleLine1}
            />
            {/* <Text style={{fontWeight:'bold', fontSize:18}}>Follow Up</Text> */}
        </View>
    )
}

export default Spalash;