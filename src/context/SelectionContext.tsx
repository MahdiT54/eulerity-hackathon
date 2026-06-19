import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type { Pet } from '../types/pet';

interface SelectionState {
  selectedIds: Set<string>; // space time complexity advantage
}

type SelectionAction =
  | { type: 'toggle'; id: string }
  | { type: 'selectAll'; ids: string[] }
  | { type: 'clear' };

function selectionReducer(state: SelectionState, action: SelectionAction): SelectionState {
  switch (action.type) {
    case 'toggle': {
      const next = new Set(state.selectedIds); // create a new set from the current selectedIds
      if (next.has(action.id)) next.delete(action.id); // if the id is already in the set, remove it
      else next.add(action.id); // if the id is not in the set, add it (easy removing and adding!)
      return { selectedIds: next };
    }
    case 'selectAll':
      return { selectedIds: new Set<string>(action.ids) }; // create a new set from all the ids
    case 'clear':
      return { selectedIds: new Set<string>() }; // create a new set with no ids
    default:
      return state;
  }
}

interface SelectionContextValue {
  selectedIds: Set<string>;
  selectedCount: number;
  isSelected: (id: string) => boolean;
  toggleSelection: (id: string) => void;
  selectAll: (pets: Pet[]) => void;
  clearSelection: () => void;
  getSelectedPets: (pets: Pet[]) => Pet[];
  getEstimatedSize: (pets: Pet[]) => number;
} // all the context values we want to expose to the app // no need to export the reducer or the state!!

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(selectionReducer, { selectedIds: new Set<string>() });

  const toggleSelection = useCallback((id: string) => { // useCallback keeps these functions stable for renders!!
    dispatch({ type: 'toggle', id });
  }, []);

  const selectAll = useCallback((pets: Pet[]) => {
    dispatch({ type: 'selectAll', ids: pets.map((pet) => pet.id) });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: 'clear' });
  }, []); // dispatch keeps public API functions stable for useMemo dependency array

  const value = useMemo<SelectionContextValue>(() => ({ // rebuild context only if dependencies change
    selectedIds: state.selectedIds,
    selectedCount: state.selectedIds.size,
    isSelected: (id) => state.selectedIds.has(id),
    toggleSelection,
    selectAll,
    clearSelection,
    getSelectedPets: (pets) => pets.filter((pet) => state.selectedIds.has(pet.id)),
    getEstimatedSize: (pets) =>
      pets
        .filter((pet) => state.selectedIds.has(pet.id))
        .reduce((total, pet) => total + pet.fileSizeBytes, 0),
  }), [state.selectedIds, toggleSelection, selectAll, clearSelection]); // only if these change, we re-compute the value

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>; // don't have to worry about prop drilling!!
} // value={value} is the same as value={selectedIds: state.selectedIds, selectedCount: state.selectedIds.size, isSelected: (id) => state.selectedIds.has(id), toggleSelection, selectAll, clearSelection, getSelectedPets: (pets) => pets.filter((pet) => state.selectedIds.has(pet.id)), getEstimatedSize: (pets) => pets.filter((pet) => state.selectedIds.has(pet.id)).reduce((total, pet) => total + pet.fileSizeBytes, 0)}

export function useSelection() {
  const context = useContext(SelectionContext); // useContext is a hook that returns the context value
  if (!context) {
    throw new Error('useSelection must be used within SelectionProvider');
  }
  return context;
} // useSelection is a hook that returns the context value // no need to export the context value!!
