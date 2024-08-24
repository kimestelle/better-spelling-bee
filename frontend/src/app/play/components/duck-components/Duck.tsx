import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface DuckProps {
  id: string;
  letter: string;
  index: number;
  isActive: boolean;
  stackIndex: number;
  center: boolean;
}

const Duck: React.FC<DuckProps> = React.memo(({ id, letter, index, isActive, stackIndex, center }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    width: '7.6svh',
    height: '8.3svh',
    visibility: isActive ? 'hidden' : 'visible',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`duck-container cursor-grab transition-transform duration-200 ease-out active:cursor-grabbing active:bg-duck-fly`}
      {...listeners}
      {...attributes}
    >
      <div className='relative z-5'>
      <span className={`duck-letter z-5 text-[4svh] flex justify-center items-end pl-[2svh] ${center ? 'center' : ''}`}>
        {letter.toUpperCase()}
      </span>
      </div>
    </div>
  );
});

Duck.displayName = 'Duck';

export default Duck;
