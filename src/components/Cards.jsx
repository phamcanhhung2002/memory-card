import React from 'react'
import Card from './Card'

const style = {
  width: "280px"
}


function Cards({items, handleClickCard}) {
  return (
    <section className="d-flex flex-wrap justify-content-between row-gap-4 column-gap-5">
      {
        items.map(item => (
          <div key={item.id} style={style}>
            <Card item={item} handleClickCard={handleClickCard}/>
          </div>
        ))
      }
    </section>
  )
}

export default Cards