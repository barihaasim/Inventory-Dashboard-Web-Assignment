// reusable box that shows whatever is put inside it (props.children)
function CardWrapper(props) {
  return (
    <div className="card">
      {props.title && <h3>{props.title}</h3>}
      {props.children}
    </div>
  );
}

export default CardWrapper;
