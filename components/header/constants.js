import { v4 as uuidv4 } from 'uuid';

const animals = ['котов', 'собак', 'лошадей', 'черепах', 'рыб'];

export const navItems = animals.map((animal) => ({
  id: uuidv4(),
  value: animal
}));
