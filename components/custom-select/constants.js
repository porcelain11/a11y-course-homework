import { v4 as uuidv4 } from 'uuid';

export const idBase = 'combo1';

const sortOptions = [
  'По возрастанию цены',
  'По убыванию цены',
  'По популярности',
  'Нет сортировки'
];

export const options = sortOptions.map((opt) => ({
  id: uuidv4(),
  value: opt
}));

export const SelectActions = {
  Close: 0,
  CloseSelect: 1,
  First: 2,
  Last: 3,
  Next: 4,
  Open: 5,
  PageDown: 6,
  PageUp: 7,
  Previous: 8,
  Select: 9,
  Type: 10
};
