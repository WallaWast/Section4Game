import { View, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/colors';

const Card = ({ children }) => {
	return <View style={styles.card}>{children}</View>;
};
export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	card: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
		marginHorizontal: 24,
		marginTop: deviceWidth < 380 ? 18 : 36,
		borderRadius: 8,
		backgroundColor: Colors.primary800,
		elevation: 4,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.25,
	},
});