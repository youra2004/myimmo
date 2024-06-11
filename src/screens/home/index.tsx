import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Dimensions,
  View,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ListRenderItem,
  Text,
  Image,
  NativeEventEmitter,
} from "react-native";
import { Button } from "galio-framework";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Dossier, DossierSocket } from "../dossiers/types";
import { STARTING_PAGE } from "./utils";
import { styles } from "../dossiers/styles";
import { Images } from "../../constants";
import { deleteDossier, getDossiers } from "../../api/dossier";
import Card from "./swipeable/Card";
import Swipeable from "./swipeable";
import { Navigation } from "../../types/navigation";
import { AuthContext } from "../../context/Auth";
import { GeneralContext } from "../../context/General";
import { HTTPStatusCodes, Screens } from "../../utils/constants";
import { Colors } from "../../components/bottomHeader/styles";
import FastImage from "react-native-fast-image";
import { isRunningInExpoGo } from "../../utils/common";
import { ThemeContext } from "../../context/Theme";
import { Socket } from "socket.io-client";
import { omit } from "lodash";
import { SocketsContext } from "../../context/Sockets";

const { width } = Dimensions.get("screen");

const Home = () => {
  const [dossiers, setDossiers] = useState<Dossier[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<Navigation>();
  const [currentPage, setCurrentPage] = useState(STARTING_PAGE);
  const [refreshing, setRefreshing] = React.useState(false);
  const { refreshHome, setRefreshHome } = useContext<{
    refreshHome: boolean;
    setRefreshHome: any;
  }>(GeneralContext);
  const { socket } = useContext(SocketsContext);
  const [mode, setMode] = useState("refresh");
  const { signOut } = useContext(AuthContext);
  const showNoData = !isLoading && !dossiers.length;
  const { dispatch } = useContext(ThemeContext);

  const onRefresh = React.useCallback(() => {
    setMode("refresh");
    setCurrentPage(STARTING_PAGE);
    fetchDossiers("refresh");
  }, []);

  const fetchDossiers = useCallback(
    async (mode = "scrolled") => {
      console.log(
        "params",
        `?perPage=5&page=${
          mode === "firstRender" ? STARTING_PAGE : currentPage
        }`
      );

      setIsLoading(true);
      mode === "refresh" && setRefreshing(true);
      const response = await getDossiers(
        `?perPage=5&page=${
          mode === "firstRender" ? STARTING_PAGE : currentPage
        }`
      );
      const json = await response.json();
      if ([200, 201].includes(response.status)) {
        setDossiers((prevState: Dossier[]) => {
          const auxDossiers =
            mode === "scrolled" ? [...prevState, ...json] : json;
          return auxDossiers;
        });
      } else if (response.status === HTTPStatusCodes.UNAUTHORIZED) {
        signOut();
      }
      setIsLoading(false);
      mode === "refresh" && setRefreshing(false);
    },
    [currentPage]
  );

  useEffect(() => {
    if (!socket) return;
    socket.on("dossier.socket.update", onDossierSocketUpdate);
    return () => {
      socket?.removeAllListeners();
    };
  }, [socket, dossiers]);

  const onDossierSocketUpdate = (data: DossierSocket) => {
    const { dossierId } = data;

    const auxDossiers = dossiers.map((el) => {
      const { _id } = el;
      if (_id !== dossierId) return el;
      return { ...el, ...omit(data, ["_id"]) };
    });

    setDossiers(auxDossiers);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!refreshHome) return;
      setMode("firstRender");
      fetchDossiers("firstRender");
      setCurrentPage(STARTING_PAGE);
      setRefreshHome(false);
    }, [refreshHome])
  );

  useEffect(() => {
    setMode("firstRender");
    fetchDossiers("firstRender");
  }, []);

  useEffect(() => {
    if (currentPage === STARTING_PAGE) return;
    setMode("scrolled");
    fetchDossiers("scrolled");
  }, [currentPage]);

  useEffect(() => {
    dispatch({
      type: "SET_STATUS_BAR_BACKGROUND",
      payload: {
        statusBarBackground: showNoData ? "#fff" : "transparent",
      },
    });
  }, [showNoData]);

  const memoedDossiers = useMemo(() => {
    return dossiers;
  }, [dossiers]);

  const handleDelete = (_id: string) => async () => {
    const response = await deleteDossier(_id);
    const json = await response.json();
    if ([200, 201].includes(response.status)) {
      setDossiers((prevState) => {
        const auxDossiers = prevState.filter((el) => el._id !== _id);
        return auxDossiers;
      });
    }
  };

  const handleEdit = (_id: string) => async () => {
    navigation?.navigate("EditDossier", { id: _id });
  };

  const renderLoader = useCallback(
    (): ReactElement => (
      <View style={[styles.flatListLoader, { height: 40 }]}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.BLACK} />
        ) : null}
      </View>
    ),
    [isLoading]
  );

  const loadMoreItem = useCallback((): void => {
    setCurrentPage((page: number) => page + 1);
  }, [setCurrentPage]);

  const renderItem = useCallback<ListRenderItem<Dossier>>(
    ({ item }) => (
      <Swipeable>
        <Card
          {...item}
          navigation={navigation}
          defaultImageSrc={Images.Home.Default}
          handleDelete={handleDelete(item._id!)}
          handleEdit={handleEdit(item._id!)}
        />
      </Swipeable>
    ),
    []
  );

  if (mode === "firstRender" && isLoading) {
    console.log("my loader is loading");
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color={Colors.BLACK} />
      </View>
    );
  }

  return (
    <View style={[styles.container, showNoData && styles.homeContainer]}>
      {showNoData && <NoDataBlock navigation={navigation} />}

      <SafeAreaView>
        {dossiers.length ? (
          <FlatList
            refreshControl={
              <RefreshControl
                tintColor={Colors.BLACK}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            data={memoedDossiers}
            keyExtractor={(item: any, index: any) =>
              item._id + " " + Math.random() + index
            }
            onEndReached={loadMoreItem}
            onEndReachedThreshold={0}
            ListFooterComponent={renderLoader}
            renderItem={renderItem}
            style={{
              width: width,
            }}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        ) : (
          isLoading && (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="large" color={Colors.BLACK} />
            </View>
          )
        )}
      </SafeAreaView>
    </View>
  );
};

export const NoDataBlock = ({
  navigation,
}: {
  navigation: Navigation;
}): ReactElement => {
  return (
    <React.Fragment>
      <View style={{ flex: 0.5 }}>
        {isRunningInExpoGo() ? (
          <Image
            source={Images.Home.NoData}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <FastImage
            source={Images.Home.NoData}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 24,
            //fontWeight: "300",
            fontFamily: "poppinsLight",
            color: "#555",
          }}
        >
          You haven't added {"\n"}any Properties yet.
        </Text>
      </View>
      <View style={{ paddingTop: 60, alignItems: "center" }}>
        <Button
          shadowless
          onPress={() => {
            navigation?.navigate(Screens.MAIN, {
              screen: "CreateDossier",
            });
          }}
          icon={"plus"}
          iconFamily="AntDesign"
          iconSize={19}
          style={styles.pickerButton}
          color={Colors.SECONDARY}
        >
          Add property
        </Button>
      </View>
    </React.Fragment>
  );
};

export default Home;
