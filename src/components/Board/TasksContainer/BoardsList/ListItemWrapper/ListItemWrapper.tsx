import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { type List } from '../../../../../store/lists.api';
import { boardListContainer } from '../BoardList.css';

interface ListItemProps {
  list: List;
  index: number;
  moveList: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}

export const ListItemWrapper = ({
  list,
  index,
  moveList,
  children,
}: ListItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'LIST',
    drop(item: { index: number }) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveList(dragIndex, hoverIndex);
      //   item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'LIST',
    item: { id: list.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={boardListContainer}
    >
      {children}
    </div>
  );
};
