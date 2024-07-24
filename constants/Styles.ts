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
  btnPrimary: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
		borderWidth: 2,
		borderRadius: 8,
		backgroundColor: '#3355ff',
		borderColor: '#3355ff',
		height: 44,
		paddingHorizontal: 10
	},
  textBtnPrimary: {
		textAlign: 'center',
		color: "#fff",
		fontSize: 14,
		fontFamily: 'montserrat-semibold',
	},
  btnSecondary: {
    flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
		borderWidth: 2,
		borderRadius: 8,
		backgroundColor: '#fff',
		borderColor: '#3355ff',
		height: 44,
  },
  textBtnSecondary: {
    color: "#3355ff",
		fontSize: 14,
		fontFamily: 'montserrat-semibold',
  },
	card: {
		backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
	}
})
