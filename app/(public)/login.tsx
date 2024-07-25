import { useOAuth, useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { defaultStyles } from "../../constants/Styles.ts";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser.ts";
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

enum Strategy {
	Google = 'oauth_google',
}

const login = () => {
	useWarmUpBrowser()

	const router = useRouter();
	const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

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
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
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


				<View style={{gap: 16, marginTop: 20}}>
					<TouchableOpacity onPress={onSignInPress} style={defaultStyles.btnPrimary}>
						<Text style={defaultStyles.textBtnPrimary}>Sign in</Text>
					</TouchableOpacity>

					<View style={{flexDirection: "row", alignItems: "center", gap: 6}}>
						<View style={{ borderTopWidth: 1, borderTopColor: "#ABABAB", borderRadius:4, flex: 1}}></View>
						<Text style={{color: "#ABABAB", fontFamily: 'montserrat'}}>or</Text>
						<View style={{borderTopWidth: 1, borderColor: "#ABABAB", borderRadius:4, flex: 1}}></View>
					</View>

					<TouchableOpacity onPress={() => onSelectAuth(Strategy.Google)} style={defaultStyles.btnSecondary}>
						<FontAwesome5 name="google" size={24} color={"#3355ff"} />
						<Text style={defaultStyles.textBtnSecondary}>Continue with Google</Text>
					</TouchableOpacity>
				</View>

				<View style={{marginTop: 12}}>
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
			</View>
		</TouchableWithoutFeedback>
	);
};

export default login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
	button: {
		margin: 6,
		alignItems: 'center'
	},
});
