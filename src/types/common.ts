import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

export interface FlatListRenderParams<T> {
  item: T;
  index: number;
}

export interface NavigationPropsType {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}
