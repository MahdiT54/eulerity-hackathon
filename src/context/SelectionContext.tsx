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
  selectedIds: Set<string>;
}

type SelectionAction =
  | { type: 'toggle'; id: string }
  | { type: 'selectAll'; ids: string[] }
  | { type: 'clear' };

function selectionReducer(state: SelectionState, action: SelectionAction): SelectionState {
  switch (action.type) {
    case 'toggle': {
      const next = new Set(state.selectedIds);
      if (next.has(action.id)) next.delete(action.id);
      else next.add(action.id);
      return { selectedIds: next };
    }
    case 'selectAll':
      return { selectedIds: new Set<string>(action.ids) };
    case 'clear':
      return { selectedIds: new Set<string>() };
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
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(selectionReducer, { selectedIds: new Set<string>() });

  const toggleSelection = useCallback((id: string) => {
    dispatch({ type: 'toggle', id });
  }, []);

  const selectAll = useCallback((pets: Pet[]) => {
    dispatch({ type: 'selectAll', ids: pets.map((pet) => pet.id) });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: 'clear' });
  }, []);

  const value = useMemo<SelectionContextValue>(() => ({
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
  }), [state.selectedIds, toggleSelection, selectAll, clearSelection]);

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within SelectionProvider');
  }
  return context;
}
