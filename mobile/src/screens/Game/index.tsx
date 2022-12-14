import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { Duo, DuoCard } from '../../components/DuoCard';

import logoImg from '../../assets/logo-nlw-esports.png';
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme';
import { styles } from './styles';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');
  const [duos, setDuos] = useState<Duo[]>([]);
  const route = useRoute();
  const navigation = useNavigation();

  const game = route.params as GameParams;

  useEffect(() => {
    fetch(`http://192.168.0.110:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data));
  }, []);

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adId: string) {
    fetch(`http://192.168.0.110:3333/ads/${adId}/discord`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.discord);
        setDiscordDuoSelected(data.discord);
      });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Header title={game.title} subtitle="Conecte-se e comece a jogar" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            styles.contentList,
            duos.length === 0 && styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              N??o h?? an??ncios publicados ainda.
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
