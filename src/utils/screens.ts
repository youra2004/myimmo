export const getActiveRouteName = (route: any): string => {
  if (route.state) {
    return getActiveRouteName(route.state.routes[route.state.index]);
  }

  return route.name || "";
};
