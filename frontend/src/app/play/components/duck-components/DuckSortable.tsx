import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DuckSortableProps {
  letter: string;
  id: string;
  index: number;
  center: boolean;
  animation: string;
}

const DuckSortable: React.FC<DuckSortableProps> = ({ letter, id, index, center, animation }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    width: '7.6svh',
    height: '8.3svh',
    zIndex: 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`duck-container cursor-grab transition-transform duration-200 ease-out active:cursor-grabbing active:bg-duck-fly ${animation}`}
      {...listeners}
      {...attributes}
    >
      <span className={`duck-letter relative z-5 text-[4svh] flex justify-center items-end pl-[2svh] ${center ? 'center' : ''}`}>
        {letter}
      </span>
    </div>
  );
};

export default DuckSortable;
