import React from "react";
import { Image } from "react-native";

export default function Logo() {
    return (
       <Image source={require("../../../assets/logo.png")} style={{ width: 300, height: 300 }}/>
    );
  }
  