import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';

const PwReset = () => {
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');
	const [successfulCreation, setSuccessfulCreation] = useState(false);
	const { signIn, setActive } = useSignIn();

	// Request a passowrd reset code by email
	const onRequestReset = async () => {
		try {
			await signIn!.create({
				strategy: 'reset_password_email_code',
				identifier: emailAddress
			});
			setSuccessfulCreation(true);
		} catch (err: any) {
			alert(err.errors[0].message);
		}
	};

	// Reset the password with the code and the new password
	const onReset = async () => {
		try {
			const result = await signIn!.attemptFirstFactor({
				strategy: 'reset_password_email_code',
				code,
				password
			});
			console.log(result);
			alert('Password reset successfully');

			// Set the user session active, which will log in the user automatically
			await setActive!({ session: result.createdSessionId });
		} catch (err: any) {
			alert(err.errors[0].message);
		}
	};

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

			{!successfulCreation && (
				<>
					<TextInput
						autoCapitalize="none"
						placeholder="Email"
						value={emailAddress}
						onChangeText={setEmailAddress}
						style={defaultStyles.inputField}
					/>

					<TouchableOpacity onPress={onRequestReset} style={[defaultStyles.btnPrimary, { marginTop: 20 }]}>
						<Text style={defaultStyles.textBtnPrimary}>Reset password</Text>
					</TouchableOpacity>
				</>
			)}

			{successfulCreation && (
				<>
					<View>
						<TextInput
							value={code}
							placeholder="Code..."
							style={defaultStyles.inputField}
							onChangeText={setCode}
						/>
						<TextInput
							placeholder="New password"
							value={password}
							onChangeText={setPassword}
							secureTextEntry
							style={defaultStyles.inputField}
						/>
					</View>

					<TouchableOpacity onPress={onReset} style={[defaultStyles.btnPrimary, { marginTop: 20 }]}>
						<Text style={defaultStyles.textBtnPrimary}>Set new Password</Text>
					</TouchableOpacity>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20
	},
	button: {
		margin: 8,
		alignItems: 'center'
	}
});

export default PwReset;
