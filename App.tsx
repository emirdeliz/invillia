import React from 'react';
import { useState } from "react";
import { View } from 'react-native';

import Main from "./src/screens/Main/Main";
import FacebookButton from "./src/shared/FacebookButton/FacebookButton";
import Logo from "./src/shared/Logo/Logo";
import { ContainerCenterView } from "./src/shared/ContainerCenter/ContainerCenter.style";

export default function App() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [user, setUser] = useState({});

  return showWelcome ? (
    <ContainerCenterView>
      <View style={{ height: 500 }}>
        <Logo />
        <FacebookButton 
          callback={(json: any) => {
            setUser(json);
            setShowWelcome(false)
          }}
        />
      </View>
    </ContainerCenterView>
  ) : <Main screenProps={{ user, onLogout: () => setShowWelcome(true)} } />;
}