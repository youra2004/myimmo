import React, { useState, ReactElement, useContext, useEffect } from "react";
import { View, ActivityIndicator, SafeAreaView, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "../styles";
import { Dossier, DossierSocket } from "../types";
import { fetchDossier } from "../edit/utils";
import Overview from "./overview";
import { Colors } from "../../../components/bottomHeader/styles";
import { GeneralContext } from "../../../context/General";
import useShowDimensions from "../../../hooks/useShowDimensions";
import CarouselBlock from "./carouselBlock";
import ViewMore from "./ViewMore";
import { omit } from "lodash";
import { SocketsContext } from "../../../context/Sockets";

const ShowDossier = ({ navigation, route }: any): ReactElement => {
  const id = route?.params?.id;
  const [dossier, setDossier] = useState<Dossier>();
  const [isLoading, setIsLoading] = useState(false);
  const { refreshShow, setRefreshShow } = useContext<{
    refreshShow: boolean;
    setRefreshShow: any;
  }>(GeneralContext);

  const { socket } = useContext(SocketsContext);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        await fetchDossier({ setDossier, setIsLoading, id });
        setRefreshShow(false);
      };
      fetchUser();
    }, [])
  );

  useEffect(() => {
    if (!socket || !dossier) return;

    socket.on("dossier.socket.update", (data: DossierSocket) => {
      const { dossierId } = data;
      if (dossierId !== dossier._id) return;
      const auxDossier = { ...dossier, ...omit(data, ["_id"]) };
      setDossier(auxDossier);
    });
    return () => {
      socket?.removeAllListeners();
    };
  }, [socket, dossier]);

  if (isLoading && refreshShow) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color={Colors.BLACK} />
      </View>
    );
  }

  const { firstBlockHeight } = useShowDimensions();

  return (
    <SafeAreaView>
      {dossier && (
        <View style={[]}>
          <View
            style={{
              height: firstBlockHeight,
            }}
          >
            <CarouselBlock dossier={dossier} navigation={navigation} />
            <Overview dossier={dossier} />
          </View>
          <ViewMore dossier={dossier} navigation={navigation} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ShowDossier;
