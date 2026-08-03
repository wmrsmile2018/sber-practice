import React, { useState, useRef, useEffect, memo } from 'react';
import styles from './FilterButton.module.css';

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

type FilterButtonProps = {
  options: FilterOption[];
  defaultSelected?: string;
  onChange?: (selectedValue: string) => void;
  placeholder?: string;
};

export const FilterButton: React.FC<FilterButtonProps> = memo(
  ({ options, defaultSelected, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string>(
      defaultSelected || options[0]?.id || ''
    );
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find((opt) => opt.id === selectedId);

    const handleSelect = (id: string) => {
      setSelectedId(id);
      const option = options.find((opt) => opt.id === id);
      if (option && onChange) {
        onChange(option.value);
      }
      setIsOpen(false);
    };

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className={styles.wrapper} ref={dropdownRef}>
        <button
          className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
          onClick={toggleDropdown}
          type='button'
        >
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
          <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
        </button>

        {isOpen && (
          <div className={styles.dropdown}>
            {options.map((option) => (
              <button
                key={option.id}
                className={styles.option}
                onClick={() => handleSelect(option.id)}
              >
                <span>{option.label}</span>
                {selectedId === option.id && (
                  <span className={styles.checkmark}>✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
