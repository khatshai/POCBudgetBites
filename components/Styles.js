import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../responsiveness/Metrics';

const CssStyles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor:'#F8F9FC',
      },
      selectionButton:{
        borderColor:'#009E83',
        borderWidth:moderateScale(2),
        height:moderateScale(36),
        borderRadius:moderateScale(20),
        alignItems:'center',
        justifyContent:'center',
      },
      selectionButtonBG:{
        backgroundColor:'#EBF6F3',
      },
      addProductsButton:{
        backgroundColor:'#009E83',
        width:'90%',
        height:moderateScale(34),
        justifyContent:'center',
        borderRadius:moderateScale(20),
        marginVertical:verticalScale(20),
      },
      addProductsButtonText:{
        color:'#FFFFFF',
        textAlign:'center',
        fontSize:moderateScale(14),
        fontFamily:'Ubuntu-Medium',
      },
      topTabcontainer: {
        backgroundColor: '#FFFFFF',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottomLeftRadius: moderateScale(20),
        borderBottomRightRadius: moderateScale(20),
        shadowColor: '#000',
        shadowOffset: {width: 0, height: moderateScale(8)},
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        marginBottom:moderateScale(10),
      },
      topTabCenterContainer:{
        display:'flex',
        flexDirection:'row',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      centeredViewOpacity:{ opacity: 1 },
      absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
      horizontalLine: {
        borderBottomColor: '#EAEFF8',
        borderBottomWidth: 1,
      },
      BlurContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(15),
        margin: moderateScale(30),
        maxWidth: moderateScale(400),
        padding: moderateScale(5),
        shadowColor: '#000',
        shadowOffset: {width: 0, height: moderateScale(8)},
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
      },
      blurTitle: {
        color: '#002058',
        fontSize: moderateScale(20),
        textAlign: 'center',
        margin: moderateScale(2),
        fontFamily:'Ubuntu-Bold',
      },
      blurPassage: {
        color: '#002058',
        fontSize: moderateScale(14),
        textAlign: 'center',
        margin: moderateScale(2),
        fontFamily:'Ubuntu-Regular',
      },
});

export default CssStyles;
