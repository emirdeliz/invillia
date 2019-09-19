import styled from "styled-components/native";

enum EButtonType {
	default = "default",
	primary = "primary",
}

const ButtonView = styled.TouchableOpacity<{ type: EButtonType }>`
	padding: 15px;
	margin: 10px;
	align-items: center;
	border-radius: 3px;
	width: 95%;
	
	${(props) => {
      switch(props.type) {
			case EButtonType.primary:
				return `
					background-color: hsl(220, 46%, 48%);
				`;
			case EButtonType.default:
				return `
					border-width: 1;
					border-color: hsl(0, 0%, 74%);
					background-color: hsl(0, 0%, 98%);
				`;
      }
   }}
`;

const TitleView = styled.Text<{ type: EButtonType }>`
	font-size: 17px;

	${(props) => {
		switch(props.type) {
			case EButtonType.primary:
				return `
					color: hsl(0, 0%, 100%);
				`;
			case EButtonType.default:
				return `
					color: hsl(0, 0%, 0%);
				`;
		}
	}}
`;

export { ButtonView, TitleView };

