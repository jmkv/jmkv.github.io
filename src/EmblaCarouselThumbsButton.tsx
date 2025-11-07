import React from 'react';

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick } = props;

  return (
    <div
      className={'border rounded p-2 cursor-pointer'.concat(
        selected ? ' border-orange-700' : '',
      )}
      onClick={onClick}
    >
      {index + 1}
    </div>
  );
};
