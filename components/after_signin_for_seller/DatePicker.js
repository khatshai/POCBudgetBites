import React, {useState} from 'react';
import {TouchableOpacity, Text, View, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';

function DatePicker() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const openDatePicker = () => {
    setShow(true);
  };

  const onChange = (e, selecteddate) => {
    const currentDate = selecteddate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getFullYear();
    setSelectedDate(fDate);
  };

  return (
    <View>
      <Text>Expiry Date</Text>
      <View>
        <TouchableOpacity onPress={openDatePicker}>
          <Text>
            {selectedDate === '' ? 'Choose the expiry date' : selectedDate}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openDatePicker}>
          <AntDesign name="calendar" />
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          onChange={onChange}
        />
      )}
    </View>
  );
}

export default DatePicker;
