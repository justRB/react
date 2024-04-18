import  { todoType } from '../App';

export default function(props) {

    const { color, name, type, displayByTaskCategory } = props;

    const displayByCategory = () => {
        displayByTaskCategory(type);
    }

    return (
        <div className="category" onClick={displayByCategory}>
            <div className="round" style={{backgroundColor: color}}></div>
            <p className="name">{name}</p>
        </div>
    );
}