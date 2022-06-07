import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

let timerValue = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [timer, setTimer] = useState(0);
  const [playPause, setPlayPause] = useState('Play');
  const [timerList, setTimerList] = useState(null);

  function handlePlay() {
    if (timerValue !== null) {
      clearInterval(timerValue);
      timerValue = null;

      setPlayPause('Play');
    } else {
      timerValue = setInterval(() => {
        ss++;

        if (ss === 60) {
          ss = 0;
          mm++;

          if (mm === 60) {
            mm = 0;
            hh++;
          }
        }

        let format =
          (hh < 10 ? '0' + hh : hh) +
          ':' +
          (mm < 10 ? '0' + mm : mm) +
          ':' +
          (ss < 10 ? '0' + ss : ss);

        setTimer(format);
      }, 100);

      setPlayPause('Pause');
    }
  }

  function handleClear() {
    if (timerValue !== null) {
      clearInterval(timerValue);
      timerValue = null;
    }

    setTimerList(timer);

    setTimer(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setPlayPause('Play');
  }

  return (
    <View style={styles.container}>
      <Image source={require('./src/crono.png')} />

      <Text style={styles.timer}> {timer === 0 ? '00:00:00' : timer} </Text>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={handlePlay}>
          <Text style={styles.btnText}>{playPause}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={handleClear}>
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timerList}>
        <Text style={styles.timerListText}>
          {timerList ? 'Último tempo ' + timerList : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a77396',
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 18,
    borderRadius: 8,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#a77396',
  },
  timerList: {
    marginTop: 40,
  },
  timerListText: {
    fontSize: 22,
    color: '#fff',
    fontStyle: 'italic',
  },
});
