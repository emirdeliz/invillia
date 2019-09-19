import React from "react";
import { Alert } from "react-native";
import * as Facebook from 'expo-facebook';
import { ContainerCenterView } from "../ContainerCenter/ContainerCenter.style";
import Button, { EButtonType } from "../ButtonBackground/ButtonBackground";

async function logIn(callback: (object: any) => void) {
  try {
    const { type, token, } = await Facebook.logInWithReadPermissionsAsync("2438683723082480", {
      permissions: ["public_profile"],
    });
    if (type === "success") {
      // Get the user"s name using Facebook"s Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      const json = await response.json();
      Alert.alert("Sucesso!", `Olá ${json.name}!`);
      callback(json);
    } else {
      // type === "cancel"
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}

interface FacebookButton {
  callback: (json: any) => void;
}

export default function FacebookButton(props: FacebookButton) {
    return (
      <ContainerCenterView>
        <Button
          type={EButtonType.primary}
          onPress={() => {
            logIn(props.callback);
          }}
          title="Logar com Facebook"
        />
      </ContainerCenterView>
    );
  }
  