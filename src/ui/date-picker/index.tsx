import { FC, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { colors } from '@utils/colors';
import dateFormatter from '@utils/date';

interface Props {
  title: string;
  value: Date;
  onChange: (date: Date) => void;
}

const isIOS = Platform.OS === 'ios';

const DatePicker: FC<Props> = (props) => {
  const { title, value, onChange } = props;
  const [showPicker, setShowPicker] = useState(false);

  const visible = isIOS ? true : showPicker;

  const handleShowPicker = () => {
    if (isIOS) return;
    setShowPicker(true);
  };
  return (
    <Pressable style={styles.container} onPress={handleShowPicker}>
      <Text style={styles.title}>{title}</Text>
      {!isIOS && (
        <Text style={styles.value}>
          {dateFormatter(value?.toISOString(), 'dd LLL yyyy')}
        </Text>
      )}
      {visible && (
        <DateTimePicker
          value={value}
          testID="dateTimePicker"
          onChange={(_, date) => {
            if (date) onChange(date);
            if (!isIOS) setShowPicker(false);
          }}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    padding: isIOS ? 0 : 8,
    borderWidth: isIOS ? 0 : 1,
    borderColor: colors.DEACTIVE,
    borderRadius: 5,
  },
  title: { color: colors.PRIMARY },
  value: { paddingLeft: 15, color: colors.PRIMARY },
});

export default DatePicker;
