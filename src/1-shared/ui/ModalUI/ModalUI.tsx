import {
  FC,
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import s from './ModalUI.module.css';

export type ModalUIProps = PropsWithChildren & {
  id?: string;
  visible?: boolean;
  onClose?: VoidFunction;
};
const DEFAULT_ROOT_ID = 'modal-root';

export const ModalUI: FC<ModalUIProps> = ({
  children,
  visible,
  onClose,
  id = DEFAULT_ROOT_ID,
}) => {
  const parentRef = useRef<HTMLElement | null>(null);
  const parent = useMemo(() => {
    return document.getElementById(id);
  }, [id]);

  useLayoutEffect(() => {
    const parent = document.getElementById(DEFAULT_ROOT_ID);
    if (parent) {
      parentRef.current = parent;
    }
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };

    if (!visible) {
      if (parentRef.current?.innerHTML.trim() === '') {
        parentRef.current.style.display = 'none';
      }
    } else {
      if (parentRef.current) {
        parentRef.current.style.display = 'block';
      }
    }
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [visible, onClose]);

  if (!parent || !visible) return null;

  return createPortal(
    <div className={s.container}>
      <div className={s.overlay} onClick={onClose} />
      <div className={s.content}> {children}</div>
    </div>,
    parent,
  );
};
