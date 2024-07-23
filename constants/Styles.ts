import { Colors } from './Colors';
import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ABABAB',
    marginVertical: 4
  },
  btn: {
    backgroundColor: 'green',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'montserrat-semibold',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'montserrat-semibold',
  },
  btnIcon: {
    position: 'absolute',
    left: 16,
    fontFamily: 'montserrat-semibold',
  },
})
