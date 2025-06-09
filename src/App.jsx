import './App.css'
import MovieList from './MovieList'

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Flixster Movie App</h1>
      </header>
      <body>
        <main>
          <MovieList />
        </main>
      </body>
      <footer>© 2025 Flixster by Nancy F.</footer>
    </div>
  )
}

export default App
