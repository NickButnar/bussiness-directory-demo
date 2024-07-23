import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable, Text, Alert, Touchable } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { defaultStyles } from "../../constants/Styles.ts";
import Colors from '../../constants/Colors.ts';
import { TouchableOpacity } from 'react-native-gesture-handler';

const login = () => {
	const { signIn, setActive, isLoaded } = useSignIn();

	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const onSignInPress = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);
		try {
			const completeSignIn = await signIn.create({
				identifier: emailAddress,
				password
			});

			// This indicates the user is signed in
			await setActive({ session: completeSignIn.createdSessionId });
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Spinner visible={loading} />

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

			<Button onPress={onSignInPress} title="Login"></Button>

			<Link href="/reset" asChild>
				<Pressable style={styles.button}>
					<Text>Forgot password?</Text>
				</Pressable>
			</Link>
			<Link href="/register" asChild>
				<Pressable style={styles.button}>
					<Text>Create Account</Text>
				</Pressable>
			</Link>
		</View>
	);
};

export default login;

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
