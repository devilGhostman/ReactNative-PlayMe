import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';

const VideoPlayer = ({backdrop}: any) => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const togglePause = () => {
    setPaused(!paused);
    setShowControls(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.videoContainer}
        activeOpacity={1}
        onPress={() => setShowControls(!showControls)}>
        <Video
          ref={videoRef}
          source={{
            uri: 'https://dl.streamcloud.club/files/yts/720p/6393e826a573603799b4788b.mp4',
          }}
          style={styles.videoPlayer}
          paused={paused}
          poster={backdrop}
          posterResizeMode="cover"
        />
        {showControls && (
          <TouchableOpacity style={styles.pauseButton} onPress={togglePause}>
            <Icon name={paused ? 'play' : 'pause'} size={30} color="white" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  videoContainer: {
    position: 'relative',
    width: '98%',
    height: 200,
  },
  videoPlayer: {
    flex: 1,
  },
  pauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -15}, {translateY: -15}],
  },
});

export default VideoPlayer;
