import { createGlobalStyle } from 'styled-components'

export const lightTheme = {
	bodyBg: 'white',
	navBg: 'rgba(218, 218, 236, 0.33)',
	headings: 'black',
	text: 'black',
	borderColor: '#ededed',
	toggleIcon: '#212121',
	mutedText: '#b1b1b1',
	transitionTime: '.25s',
	lightAccent: 'rgba(218, 218, 236, 0.23)',
	underLine: '#e2e2e2',
	links: '#212121',
	Btn: '#17a2b8',
	BtnHov: '#1890ff',
	Shadow: 'black',
}
export const darkTheme = {
	bodyBg: '#141a2c',
	navBg: 'rgba(218, 218, 236, 0.08)',
	headings: 'white',
	text: '#c1c1c1',
	borderColor: '#212121',
	toggleIcon: '#b1b1b1 ',
	mutedText: '#515151',
	transitionTime: '.25s',
	lightAccent: 'rgba(218, 218, 236, 0.05)',
	underLine: '#e2e2e2',
	links: '#ededed',
	Btn: '#177887',
	BtnHov: '#1890ff',
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
`
