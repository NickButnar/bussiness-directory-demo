import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { Stack } from 'expo-router';
import { defaultStyles } from '../../constants/Styles';

const register = () => {
	const { isLoaded, signUp, setActive } = useSignUp();

	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);

	const onSignUpPress = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);

		try {
			// Create the user on Clerk
			await signUp.create({
				emailAddress,
				password
			});

			// Send verification Email
			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

			// change the UI to verify the email address
			setPendingVerification(true);
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	const onPressVerify = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code
			});

			await setActive({ session: completeSignUp.createdSessionId });
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
			<Spinner visible={loading} />

			{!pendingVerification && (
				<>
					<TextInput
						autoCapitalize="none"
						placeholder="Email"
						value={emailAddress}
						onChangeText={setEmailAddress}
						style={defaultStyles.inputField}
					/>
					<TextInput
						placeholder="Password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
						style={defaultStyles.inputField}
					/>

					<TouchableOpacity onPress={onSignUpPress} style={[defaultStyles.btnPrimary, {marginTop: 20}]}>
						<Text style={defaultStyles.textBtnPrimary}>Sign up</Text>
					</TouchableOpacity>
				</>
			)}

			{pendingVerification && (
				<>
					<View>
						<TextInput
							value={code}
							placeholder="Code..."
							style={defaultStyles.inputField}
							onChangeText={setCode}
						/>
					</View>

					<TouchableOpacity onPress={onPressVerify} style={[defaultStyles.btnPrimary, {marginTop: 20}]}>
						<Text style={defaultStyles.textBtnPrimary}>Verify Email</Text>
					</TouchableOpacity>
				</>
			)}
		</View>
	);
};

export default register;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20
	},
});
