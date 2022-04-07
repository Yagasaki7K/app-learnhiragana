import { useState, useEffect } from 'react'

function App() {
	const Hiragana = [
		{ romanji: 'a', Hiragana: 'あ' },
		{ romanji: 'i', Hiragana: 'い' },
		{ romanji: 'u', Hiragana: 'う' },
		{ romanji: 'e', Hiragana: 'え' },
		{ romanji: 'o', Hiragana: 'お' },
		{ romanji: 'ka', Hiragana: 'か' },
		{ romanji: 'ki', Hiragana: 'き' },
		{ romanji: 'ku', Hiragana: 'く' },
		{ romanji: 'ke', Hiragana: 'け' },
		{ romanji: 'ko', Hiragana: 'こ' },
		{ romanji: 'sa', Hiragana: 'さ' },
		{ romanji: 'shi', Hiragana: 'し' },
		{ romanji: 'su', Hiragana: 'す' },
		{ romanji: 'se', Hiragana: 'せ' },
		{ romanji: 'so', Hiragana: 'そ' },
		{ romanji: 'ta', Hiragana: 'た' },
		{ romanji: 'chi', Hiragana: 'ち' },
		{ romanji: 'tsu', Hiragana: 'つ' },
		{ romanji: 'te', Hiragana: 'て' },
		{ romanji: 'to', Hiragana: 'と' },
		{ romanji: 'na', Hiragana: 'な' },
		{ romanji: 'ni', Hiragana: 'に' },
		{ romanji: 'nu', Hiragana: 'ぬ' },
		{ romanji: 'ne', Hiragana: 'ね' },
		{ romanji: 'no', Hiragana: 'の' },
		{ romanji: 'ha', Hiragana: 'は' },
		{ romanji: 'hi', Hiragana: 'ひ' },
		{ romanji: 'fu', Hiragana: 'ふ' },
		{ romanji: 'he', Hiragana: 'へ' },
		{ romanji: 'ho', Hiragana: 'ほ' },
		{ romanji: 'ma', Hiragana: 'ま' },
		{ romanji: 'mi', Hiragana: 'み' },
		{ romanji: 'mu', Hiragana: 'む' },
		{ romanji: 'me', Hiragana: 'め' },
		{ romanji: 'mo', Hiragana: 'も' },
		{ romanji: 'ya', Hiragana: 'や' },
		{ romanji: 'yu', Hiragana: 'ゆ' },
		{ romanji: 'yo', Hiragana: 'よ' },
		{ romanji: 'ra', Hiragana: 'ら' },
		{ romanji: 'ri', Hiragana: 'り' },
		{ romanji: 'ru', Hiragana: 'る' },
		{ romanji: 're', Hiragana: 'れ' },
		{ romanji: 'ro', Hiragana: 'ろ' },
		{ romanji: 'wa', Hiragana: 'わ' },
		{ romanji: 'wo', Hiragana: 'を' },
		{ romanji: 'n', Hiragana: 'ん' }
	]

	const [input, setInput] = useState('')
	const [current, setCurrent] = useState(0)
	
	const [streak, setStreak] = useState(0)
	const [maxStreak, setMaxStreak] = useState(0)

	const [error, setError] = useState(false)

	const setRandomHiragana = () => {
		const randomIndex = Math.floor(Math.random() * Hiragana.length)
		setCurrent(randomIndex)
	}

	const handleChange = (e) => {
		setInput(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		 
		if (input.toLowerCase() === Hiragana[current].romanji) {
			setStreak(streak + 1)
			setMaxStreak(streak + 1 > maxStreak ? streak + 1 : maxStreak)
			setError(false)

			localStorage.setItem('streak', streak + 1)
			localStorage.setItem('maxStreak', streak + 1 > maxStreak ? streak + 1 : maxStreak)
		} else {
			const h = Hiragana[current].Hiragana
			const r = Hiragana[current].romanji
			setError(`Wrong! The correct answer for ${h} is ${r}`)
			setStreak(0)
			localStorage.setItem('streak', 0)
		}

		setInput('')
		setRandomHiragana()
	}

	useEffect(() => {
		setRandomHiragana()
		setStreak(parseInt(localStorage.getItem('streak')) || 0)
		setMaxStreak(parseInt(localStorage.getItem('maxStreak')) || 0)
	}, [])

	return (
		<div className="min-h-screen bg-slate-800 text-white text-center">
			<header className="p-6 mb-8">
				<h1 className="text-2xl font-bold uppercase">Hiragana Quiz</h1>
				<div>
					<p>{streak} / {maxStreak}</p>
				</div>
			</header>

			<div className="text-9xl font-bold mb-8">
				<p>{Hiragana[current].Hiragana}</p>
			</div>

			<div className="mb-8">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						onChange={handleChange}
						value={input}
						className="block w-24 bg-transparent border-b-2 border-b-white mx-auto outline-none text-center text-6xl pb-2" />
				</form>
			</div>
			{error && 
				<div>
					<p>{ error }</p>
				</div>
			}

			<p>Learn too about <a href="https://learnkatakana.vercel.app/" target="_blank" style={{color: "#7159c1", textDecoration: "underline"}}>Katakana</a></p>
			<p style={{fontSize: "14px"}}>Made with 💜 by Anderson "Yagasaki" Marlon</p>
		</div>
	)
}

export default App