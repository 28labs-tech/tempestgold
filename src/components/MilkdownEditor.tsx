import { useEffect, useRef, useCallback } from 'react';
import { Crepe } from '@milkdown/crepe';
import '@milkdown/crepe/theme/nord.css';

interface MilkdownEditorProps {
  value: string;
  onChange: (markdown: string) => void;
}

export function MilkdownEditor({ value, onChange }: MilkdownEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const crepeRef = useRef<Crepe | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const initEditor = useCallback(async () => {
    if (!containerRef.current) return;

    if (crepeRef.current) {
      await crepeRef.current.destroy();
      crepeRef.current = null;
    }

    const crepe = new Crepe({
      root: containerRef.current,
      defaultValue: value,
    });

    crepe.on((listener) => {
      listener.markdownUpdated((_, markdown) => {
        onChangeRef.current(markdown);
      });
    });

    await crepe.create();
    crepeRef.current = crepe;
  }, [value]);

  useEffect(() => {
    initEditor();
    return () => {
      if (crepeRef.current) {
        crepeRef.current.destroy();
        crepeRef.current = null;
      }
    };
  }, [initEditor]);

  return (
    <div
      ref={containerRef}
      className="milkdown-crepe border border-gray-medium rounded-lg overflow-hidden bg-black-primary"
    />
  );
}
