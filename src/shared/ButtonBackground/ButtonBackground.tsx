import React from "react";
import { Text } from "react-native";

import { ButtonView, TitleView } from "./ButtonBackground.style";

enum EButtonType {
	default = "default",
	primary = "primary",
}

interface IButtonBackground {
	type: EButtonType;
	title: string;
	onPress: () => void;
}

export default function ButtonBackground(props: IButtonBackground) {
	return (
		<ButtonView {...props}>
			<TitleView type={props.type}>{props.title}</TitleView>
		</ButtonView>
	);
}

export { EButtonType, IButtonBackground };