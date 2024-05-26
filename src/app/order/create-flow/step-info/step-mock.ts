export const STEPS_MOCK: Step[] = [
  { id: 1, name: 'Start'},
  { id: 2, name: 'Step' },
  { id: 3, name: 'Conditionelle' },
  { id: 3, name: 'Itération' },
  { id: 4, name: 'Exit' },


  // Ajoutez d'autres étapes si nécessaire
];

export interface Step {
  id: number;
  name: string;
}
