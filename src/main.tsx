import './index.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'

const sunIcon = document.querySelector('.sun-icon')
const moonIcon = document.querySelector('.moon-icon')

const userTheme = localStorage.getItem('theme')
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

const iconToggle = () => {
	moonIcon?.classList.toggle('hidden')
	sunIcon?.classList.toggle('hidden')
}

const themeSwitch = () => {
	if (document.documentElement.classList.contains('dark')) {
		document.documentElement.classList.remove('dark')
		localStorage.setItem('theme', 'light')
		iconToggle()
		return
	}
	document.documentElement.classList.add('dark')
	localStorage.setItem('theme', 'dark')
	iconToggle()
}

const themeCheck = () => {
	if (userTheme === 'dark' || (!userTheme && systemTheme)) {
		document.documentElement.classList.add('dark')
		moonIcon?.classList.add('hidden')
		return
	}
	sunIcon?.classList.add('hidden')
}

themeCheck()
export { themeSwitch }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
