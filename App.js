import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [gamesIsOver, setGamesIsOver] = useState(true);
	const [guessRounds, setGuessRounds] = useState(0);

	const [fontsLoaded] = useFonts({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	function pickerNumberHandler(selectedNumber) {
		setUserNumber(selectedNumber);
		setGamesIsOver(false);
	}

	function gameOverHandler(numberOfRounds) {
		setGamesIsOver(true);
		setGuessRounds(numberOfRounds);
	}

	function startNewGameHandler() {
		setUserNumber(null);
		setGuessRounds(0);
	}

	let screen = <StartGameScreen onPickNumber={pickerNumberHandler} />;

	if (userNumber) {
		screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
	}

	if (gamesIsOver && userNumber) {
		screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />;
	}

	return (
		<>
			<StatusBar style='dark' />
			<LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
				<ImageBackground
					source={require('./assets/images/background.png')}
					resizeMode='cover'
					style={styles.rootScreen}
					imageStyle={styles.backgroundImage}
				>
					<SafeAreaView style={styles.safeArea}>{screen}</SafeAreaView>
				</ImageBackground>
			</LinearGradient>
		</>
	);
}

const styles = StyleSheet.create({
	rootScreen: {
		flex: 1,
	},
	safeArea: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
	},
	backgroundImage: {
		opacity: 0.3,
	},
});
