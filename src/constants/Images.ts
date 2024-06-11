const imagePath = "../assets/images/";

const Welcome = Object.freeze({
  Main: require(`${imagePath}welcome.jpg`),
});

const Home = Object.freeze({
  Default: require(`${imagePath}home_default.jpg`),
  NoData: require(`${imagePath}home_nodata.jpg`),
});

const Navigation = Object.freeze({
  DefaultAvatar: require(`${imagePath}default_avatar.jpg`),
});

const Social = Object.freeze({
  Google: require(`${imagePath}google.png`),
});

export default {
  Welcome,
  Home,
  Navigation,
  Social,
};
