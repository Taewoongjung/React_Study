const React = require('react');
const {useState} = require('react');

const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        if (parseInt(value) === first * second) {
            setResult('정답: ' + value);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            inputRef.current.focus();
        } else {
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    };

    const onChangeInput =(e) => {
        setValue(e.target.value);
    };

    console.log('렌더링');
    return (
        <React.Fragment>
            <div>
                <div>{first}곱하기{second}는?</div>
                <form onSubmit={onSubmit}>
                    <input type="number" value={value} onChange={onChangeInput}/>
                </form>
            </div>
            <div>{result}</div>
        </React.Fragment>
    );
};

module.exports.GuGuDan;