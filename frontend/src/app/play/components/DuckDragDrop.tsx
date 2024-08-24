import React, { useState, useCallback, useEffect } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import Droppable from './duck-components/Droppable';
import Duck from './duck-components/Duck';
import DuckSortable from './duck-components/DuckSortable';

interface LetterItem {
  id: string;
  letter: string;
}

interface DuckDragDropProps {
  letterArray: string[];
  centerLetter: string;
  handleSubmit: (word: string) => any;
  statusMessage: string;
}

const createDucks = (letter: string): LetterItem[] => {
  return Array.from({ length: 12 }, (_, index) => ({
    id: `${letter}-${index}`,
    letter,
  }));
};

const DuckDragDrop: React.FC<DuckDragDropProps> = ({ letterArray, centerLetter, handleSubmit, statusMessage }) => {
  const [letters, setLetters] = useState<LetterItem[]>([]);
  const [droppedLetters, setDroppedLetters] = useState<LetterItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [word, setWord] = useState<string>('');
  const [animationClass, setAnimationClass] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log('Received letterArray:', letterArray);
    if (Array.isArray(letterArray) && letterArray.length > 0) {
      console.log('Initializing letters:', letterArray);
      const filteredLetters = letterArray.filter(letter => letter !== centerLetter);
      const arrangedLetters = [centerLetter, ...filteredLetters];

      setLetters(arrangedLetters.flatMap(createDucks));
    } else {
      console.error('letterArray is not a valid array:', letterArray);
    }
  }, [letterArray, centerLetter]);

  const shuffleArray = (array: any[]) => {
    const centerItem = array[0];
    const shuffled = array.filter((_, index) => index !== 0);
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    shuffled.splice(0, 0, centerItem);
    return shuffled;
  };

  const handleShuffle = () => {
    setLetters((prevLetters) => shuffleArray([...prevLetters]));
  };

  const handleEnter = useCallback(() => {
    const currentWord = droppedLetters.map((item) => item.letter).join('');
    const result = handleSubmit(currentWord);
    if (result) {
      if (result.reset) {
        if (result.sink) {
          setAnimationClass('duck-sink');
        } else {
          setAnimationClass('duck-fly');
        }
        setTimeout(() => {
          setDroppedLetters([]);
          setAnimationClass('');
        }, 400);
      }
    }
    setWord(currentWord);
  }, [droppedLetters, handleSubmit]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (over.id === 'droppable') {
      setDroppedLetters((items) => {
        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);

        if (activeIndex !== -1) {
          return arrayMove(items, activeIndex, overIndex);
        }

        const activeItem = letters.find((item) => item.id === active.id);
        if (activeItem && !items.some((item) => item.id === activeItem.id)) {
          const newItems = [...items];
          newItems.splice(overIndex, 0, activeItem);
          return newItems;
        }

        return items;
      });
    }
  }, [letters]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) {
        setDroppedLetters((items) => items.filter((item) => item.id !== active.id));
        setActiveId(null);
        return;
      }

      if (over.id !== 'droppable') {
        setDroppedLetters((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }

      setActiveId(null);
    },
    []
  );

  const handleAddDuck = useCallback((letter: string) => {
    if (droppedLetters.length > 10) {
      return;
    }
    const duckStack = letters.filter((item) => item.letter === letter && !droppedLetters.some((dropped) => dropped.id === item.id));
    if (duckStack.length > 0) {
      const nextDuck = duckStack[0];
      setDroppedLetters((prev) => [...prev, nextDuck]);
    }
  }, [letters, droppedLetters]);

  const handleDeleteDuck = useCallback(() => {
    setDroppedLetters((prev) => prev.slice(0, -1));
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 5 } })
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleEnter();
      } else if (event.key === 'Backspace') {
        handleDeleteDuck();
      } else if (letters.some((letter) => letter.letter === event.key.toLowerCase())) {
        handleAddDuck(event.key.toLowerCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [letters, handleAddDuck, handleDeleteDuck, handleEnter]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className={`flex h-[4svh] w-fit justify-center items-center self-center px-[1.5svh] ${statusMessage ? 'bg-white bg-opacity-50 rounded-lg' : ''}`}>
        {statusMessage}
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <Droppable id="droppable">
          <SortableContext items={droppedLetters.map((item) => item.id)} strategy={rectSortingStrategy}>
            <div className="relative h-[15svh] w-full flex flex-row justify-center items-center pt-[6svh] border-b-[0.3svh] border-dotted border-white">
              {droppedLetters.map((item, index) => (
                <DuckSortable
                  key={item.id}
                  id={item.id}
                  letter={item.letter}
                  index={index}
                  center={item.letter === letters[0].letter}
                  animation={animationClass}
                />
              ))}
            </div>
          </SortableContext>
        </Droppable>
        <div className="relative h-[40svh] w-full mt-[7svh] flex justify-center items-center relative pond">
          {letters.filter((item, index, self) => self.findIndex(t => t.letter === item.letter) === index).map((letter, index) => (
            <div key={index} onClick={() => handleAddDuck(letter.letter)} className={`absolute duck-${index} ${index === Math.floor(letters.length / 2) ? 'center' : ''}`}>
              {letters.filter((item) => item.letter === letter.letter && !droppedLetters.some((dropped) => dropped.id === item.id)).map((item, subIndex) => (
                <Duck
                  key={item.id}
                  id={item.id}
                  letter={item.letter}
                  index={subIndex}
                  isActive={activeId === item.id && droppedLetters.some((droppedItem) => droppedItem.id === item.id)}
                  stackIndex={subIndex}
                  center={item.letter === letters[0].letter}
                />
              ))}
            </div>
          ))}
        </div>
        <div className='h-[9svh] pb-[9svh] flex flex-row justify-center items-center'>
          <button onClick={handleDeleteDuck}>Delete</button>
          <button onClick={handleShuffle} className='w-[6svh] h-[6svh] m-[1svh] rounded-[5svh]'>
            <img src='/game-assets/shuffle.svg'/>
          </button>
          <button onClick={handleEnter}>Enter</button>
        </div>
      </DndContext>
    </>
  );
};

export default DuckDragDrop;
