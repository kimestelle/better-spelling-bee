import PropTypes from 'prop-types';
import '../../styles/Duck.css';

const Duck = ({ letter, center, duckAnimate, sink }) => {
  const animationClass = duckAnimate === 1 ? 'flap' : (duckAnimate === 2 ? 'shake' : (duckAnimate === 3 ? 'vanilla-flap' : ''));
  const sinkStyle = sink !== 0 ? {
    transform: sink === 1 ? 'translateY(20%)' : 'translateY(-20%)',
    opacity: '0%',
    transition: 'transform 0.4s ease, opacity 0.4s ease'
  } : {};

  return (
    <div className={`duck ${animationClass} ${center ? 'centered' : ''}`} style={sink ? sinkStyle : {}}>
        <div className='duck-letter'>
        {letter}
        </div>
    </div>
  );
};

Duck.propTypes = {
  letter: PropTypes.string,
  duckAnimate: PropTypes.number,
  center: PropTypes.bool,
  sink: PropTypes.number,
  className: PropTypes.string,
};

export default Duck;
