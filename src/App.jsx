import usePokemons from './hooks/usePokemons'
import Cards from './components/Cards'
import { useEffect, useState } from 'react';
import suffle from './utils/suffle';
import Loading from './components/Loading';
import Error from './components/Error';

function App() {
  const [pokemons, error, loading] = usePokemons();
  const [items, setItems] = useState([])
  const [checkedIds, setCheckedIds] = useState({});
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const reset = () => {
    setScore(0)
    setCheckedIds({})
  }

  useEffect(() => {
    if (pokemons) {
      setItems(pokemons)
    }
  }, [pokemons])

  const handleClickCard = (id) => {
    if (checkedIds[id]) {
      if (score > bestScore) {
        setBestScore(score)
      }
      reset()
    } else if (score == 11) {
      setBestScore(12)
      reset()
    } else {
      setCheckedIds({...checkedIds, [id]: true })
      setScore(s => s + 1);
    }
    setItems(suffle(items))
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="pb-3">
            <div className="d-flex justify-content-between">
              <div className="introdution mb-3">
                <h1 className='mb-4'>Pokemon Memory Game</h1>
                <p>Get points by clicking on an image but don't click on any more than once!</p>
              </div>
              <div className="scores">
                <div>
                  <strong>Score: {score}</strong>
                </div>
                <div>
                  <strong>Best score: {bestScore}</strong>
                </div>
              </div>
            </div>
            {loading ? <Loading/> : (
              error ? <Error/> : <Cards items={items} handleClickCard={handleClickCard}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
