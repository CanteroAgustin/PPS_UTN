import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import es from 'dayjs/locale/es'

export default function ChatA() {
  const { user } = useContext(AuthenticatedUserContext);
  const [messages, setMessages] = useState([]);
  const db = Firebase.firestore();

  useLayoutEffect(() => {
    console.log(user);
    const unsubscribe = db.collection('chatsa').orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
      snapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      }))
    ))
    return unsubscribe;
  }, [])

  const onSend = useCallback(async (messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {
      _id,
      createdAt,
      text,
      user
    } = messages[0]
    db.collection('chatsa').add({
      _id,
      createdAt,
      text,
      user
    });
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <GiftedChat
        locale={es}
        timeFormat='LLL LTS'
        placeholder='Escriba un mensaje'
        maxInputLength={21}
        textInputStyle={styles.textInputStyle}
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        renderUsernameOnMessage={true}
        user={{
          _id: user.email,
          name: user.email,
          avatar: user.photoURL
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    backgroundColor: '#74c4c3'
  },
  row: {
    padding: 20,
    alignItems: 'flex-end',
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    paddingBottom: 20
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000'
  },
  textBottom: {
    marginTop: 250,
    fontSize: 12,
    fontWeight: 'normal',
    color: 'gray',
    marginBottom: 0
  },
  textContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 5,
    marginBottom: 20
  },
});