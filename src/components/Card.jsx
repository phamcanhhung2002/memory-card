
function Card({item, handleClickCard}) {
  const {name, image, id } = item;

  const handleClick = () => {
    handleClickCard(id);
  }

  return (
    <div className={`card p-2 rounded-4`} onClick={handleClick}>
      <img alt={name} src={image} className='card-img-top border rounded-4' width={260} height={260}/>
      <div className="card-body">
        <h2 className='fs-4 text-center text-capitalize'>{name}</h2>
      </div>
    </div>
  )
}

export default Card