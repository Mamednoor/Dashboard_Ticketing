import { createGlobalStyle } from 'styled-components'

export const lightTheme = {
	bodyBg: 'whitesmoke',
	text: 'black',
	borderColor: '#ededed',
	mutedText: '#b1b1b1',
	transitionTime: '.25s',
	links: '#212121',
	Btn: '#1890ff',
	BtnHov: '#1d39c4',
	Shadow: 'black',
}
export const darkTheme = {
	bodyBg: '#141a2c',
	text: '#c1c1c1',
	borderColor: '#212121',
	mutedText: '#515151',
	transitionTime: '.25s',
	links: '#ededed',
	Btn: '#1890ff',
	BtnHovValidate: '#52c41a',
	Shadow: 'white',
}

export const GlobalStyle = createGlobalStyle`
 * {
  box-sizing:border-box;
  margin: 0;
  padding: 0;
  list-style: none;
	font-family: 'Roboto', sans-serif;
 }
body {
   background-color: ${(props) => props.theme.bodyBg};
   line-height: 1.5;
   font-size: 1.1rem;
   font-family: 'Roboto', sans-serif;
   font-weight:300;
   transition: all ${(props) => props.theme.transitionTime};
 }

 .index-logo {
	position: relative;
	height: 60px;
	padding: 0 12px;
	overflow: hidden;
	line-height: 64px;
	background: #002140;
	transition: all 0.3s;
}

.index-logo img {
	display: inline-block;
	width: 100%;
}
`
