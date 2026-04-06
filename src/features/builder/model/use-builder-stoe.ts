import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { BuilderElement, ElementType } from '../types/builder-types';

type ViewMode = 'desktop' | 'mobile';

type BuilderState = {
  elements: BuilderElement[];
  activeElementId: string | null;
  viewMode: ViewMode;
  history: BuilderElement[][];
  historyIndex: number;
  
  setElements: (elements: BuilderElement[]) => void;
  setViewMode: (mode: ViewMode) => void;
  selectElement: (id: string | null) => void;
  
  saveHistory: () => void;
  undo: () => void;
  redo: () => void;

  addElement: (type: ElementType) => void;
  updateElementProps: (id: string, props: any) => void;
  updateElementStyle: (id: string, style: React.CSSProperties) => void;
  removeElement: (id: string) => void;
};

const findElementById = (elements: BuilderElement[], id: string): BuilderElement | undefined => {
  for (const el of elements) {
    if (el.id === id) return el;
    if ('children' in el && el.children) {
      const found = findElementById(el.children, id);
      if (found) return found;
    }
  }
  return undefined;
};

export const useBuilderStore = create<BuilderState>()(
  immer((set, get) => ({
    elements: [],
    activeElementId: null,
    viewMode: 'desktop',
    history: [[]],
    historyIndex: 0,

    setViewMode: (mode) => set({ viewMode: mode }),

    selectElement: (id) => set({ activeElementId: id }),

    setElements: (elements) => set((state) => {
      state.elements = elements;
      state.history = [JSON.parse(JSON.stringify(elements))];
      state.historyIndex = 0;
    }),

    saveHistory: () => set((state) => {
      const cleanHistory = state.history.slice(0, state.historyIndex + 1);
      cleanHistory.push(JSON.parse(JSON.stringify(state.elements)));
      state.history = cleanHistory;
      state.historyIndex = cleanHistory.length - 1;
    }),

    undo: () => set((state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
        state.elements = state.history[state.historyIndex];
      }
    }),

    redo: () => set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex += 1;
        state.elements = state.history[state.historyIndex];
      }
    }),

    addElement: (type) => {
      set((state) => {
        const defaultProps: any = {
          text: { content: 'Новый текст' },
          button: { label: 'Кнопка', variant: 'filled' },
          image: { src: 'https://placehold.co/400x300?text=Image', alt: 'Alt' },
          form: { placeholder: 'Введите данные...' },
          section: {},
          box: {}
        };

        const newElement: any = {
          id: crypto.randomUUID(),
          type,
          props: defaultProps[type] || {},
          style: {
            padding: '10px',
            border: '1px dashed #ced4da',
            minHeight: type === 'section' ? '100px' : 'auto',
          },
          children: (type === 'section' || type === 'box') ? [] : undefined
        };
        state.elements.push(newElement);
      });
      get().saveHistory();
    },

    updateElementProps: (id, newProps) => {
      set((state) => {
        const el = findElementById(state.elements, id);
        if (el) el.props = { ...el.props, ...newProps };
      });
      get().saveHistory();
    },

    updateElementStyle: (id, newStyle) => {
      set((state) => {
        const el = findElementById(state.elements, id);
        if (el) el.style = { ...el.style, ...newStyle };
      });
      get().saveHistory();
    },

    removeElement: (id) => {
      set((state) => {
        const removeRec = (items: any[]) => items.filter(i => i.id !== id).map(i => {
          if (i.children) i.children = removeRec(i.children);
          return i;
        });
        state.elements = removeRec(state.elements);
      });
      get().saveHistory();
    },
  }))
);