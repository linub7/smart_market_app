import { StyleSheet, View } from 'react-native';

interface Props<T> {
  items: T[];
  column?: number;
  renderItem(el: T): JSX.Element;
}

const GridView = <T extends unknown>(props: Props<T>) => {
  const { column = 2, items, renderItem } = props;
  return (
    <View style={styles.container}>
      {items?.map((el, index) => (
        <View style={{ width: `${100 / column}%` }} key={index}>
          {renderItem(el)}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default GridView;
