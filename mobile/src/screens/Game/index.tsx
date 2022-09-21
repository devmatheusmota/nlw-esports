import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoMatch } from '../../components/DuoMatch';

import { styles } from './styles';
import { THEME } from '../../theme';

import { GameParams } from '../../@types/navigation';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

export function Game() {
	const navigation = useNavigation();
	const route = useRoute();
	const game = route.params as GameParams;

	const [duos, setDuos] = useState<DuoCardProps[]>([]);
	const [discordDuoSelected, setDiscordDuoSelected] = useState('');

	function handleGoBack() {
		navigation.goBack();
	}

	async function getDiscordUser(adsId: string) {
		fetch(`http://192.168.15.12:3000/ads/${adsId}/discord`)
			.then((response) => response.json())
			.then((data) => setDiscordDuoSelected(data.discord));
	}

	useEffect(() => {
		fetch(`http://192.168.15.12:3000/games/${game.id}/ads`)
			.then((response) => response.json())
			.then((data) => setDuos(data));
	}, []);

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleGoBack}>
						<Entypo
							name='chevron-thin-left'
							color={THEME.COLORS.CAPTION_300}
							size={24}
						/>
					</TouchableOpacity>
					<Image source={logoImg} style={styles.logo} />
					<View style={styles.right} />
				</View>
				<Image
					source={{ uri: game.bannerUrl }}
					style={styles.cover}
					resizeMode={'cover'}
				/>
				<Heading title={game.title} subtitle='Conecte-se e comece a jogar!' />

				<FlatList
					data={duos}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<DuoCard
							data={item}
							onConnect={() => {
								getDiscordUser(item.id);
							}}
						/>
					)}
					horizontal
					style={styles.containerList}
					contentContainerStyle={
						duos.length > 0 ? styles.contentList : styles.emptyContentList
					}
					showsHorizontalScrollIndicator={false}
					ListEmptyComponent={() => (
						<Text style={styles.empyListText}>
							Não há anuncios publicados ainda
						</Text>
					)}
				/>
				<DuoMatch
					visible={discordDuoSelected.length > 0}
					discord={discordDuoSelected}
					onClose={() => setDiscordDuoSelected('')}
				/>
			</SafeAreaView>
		</Background>
	);
}
