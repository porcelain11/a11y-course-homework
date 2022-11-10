import React, { useState, useRef } from 'react';
import {
  isElementInView,
  getActionFromKey,
  getUpdatedIndex,
  isScrollable,
  maintainScrollVisibility,
} from './utils';
import { SelectActions } from './constants';
import { options, idBase } from './constants';
import PropTypes from 'prop-types';
import homeStyles from '../../styles/Home.module.css';
import styles from './CustomSelect.module.css';

type CustomSelectProps = {
  handleSelectOrder: (order: number) => void;
};

function CustomSelect(props: CustomSelectProps) {
  const { handleSelectOrder } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentOptionId, setCurrentOptionId] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(undefined);
  const [ignoreBlur, setIgnoreBlur] = useState(false);

  const comboRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef<HTMLDivElement>(null);
  const optionsRefs = useRef<HTMLDivElement[]>([]);

  const updateMenuState = (open: boolean, callFocus = true) => {
    if (isExpanded === open) {
      return;
    }
    setIsExpanded((prevState) => !prevState);

    if (comboRef.current && callFocus) {
      comboRef.current.focus();
    }
  };

  const onComboClick = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const selectOption = (index: number) => {
    handleSelectOrder(index);
    setSelectedOptionId(options[index].id);
  };

  const onComboBlur = () => {
    // do not do blur action if ignoreBlur flag has been set
    if (ignoreBlur) {
      setIgnoreBlur(false);
      return;
    }

    // select current option and close
    if (isExpanded) {
      selectOption(activeIndex);
      updateMenuState(false, false);
    }
  };

  const onOptionChange = (index: number) => {
    // update state
    setActiveIndex(index);

    // update active option styles
    setCurrentOptionId(options[index].id);

    // ensure the new option is in view
    const optionElem = optionsRefs.current[index];
    if (isScrollable(listBoxRef.current)) {
      maintainScrollVisibility(optionElem, listBoxRef.current);
    }

    // ensure the new option is visible on screen
    // ensure the new option is in view
    if (!isElementInView(optionsRefs.current[index])) {
      optionElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const onOptionClick = (
    evt: React.KeyboardEvent | React.MouseEvent,
    index: number
  ) => {
    evt.stopPropagation();

    selectOption(index);
    updateMenuState(false, true);
  };

  const onComboKeyDown = (evt: React.KeyboardEvent) => {
    const max = options.length - 1;

    const action = getActionFromKey(evt, isExpanded);

    switch (action) {
      case SelectActions.Last:
      case SelectActions.First:
        updateMenuState(true);
      // intentional fallthrough
      case SelectActions.Next:
      case SelectActions.Previous:
      case SelectActions.PageUp:
      case SelectActions.PageDown:
        evt.preventDefault();
        return onOptionChange(getUpdatedIndex(activeIndex, max, action));
      case SelectActions.CloseSelect:
        evt.preventDefault();
        selectOption(activeIndex);
      // intentional fallthrough
      case SelectActions.Close:
        evt.preventDefault();
        return updateMenuState(false);
      case SelectActions.Open:
        evt.preventDefault();
        return updateMenuState(true);
    }
  };

  return (
    <div
      aria-labelledby='headingId'
      className={styles.comboExample}
      role='group'
    >
      <p id='headingId' className={homeStyles.visuallyHidden}>
        Сортировка товаров
      </p>
      <p id='combo1-label' className={styles.comboLabel}>
        Сортировать по:
      </p>
      <div
        className={`${styles.combo} js-select ${
          isExpanded ? `${styles.open}` : ''
        }`}
      >
        <div
          ref={comboRef}
          aria-controls='listbox1'
          aria-expanded={isExpanded}
          aria-haspopup='listbox'
          aria-labelledby='combo1-label'
          aria-activedescendant={isExpanded ? `${idBase}-${activeIndex}` : ''}
          id={idBase}
          className={styles.comboInput}
          role='combobox'
          tabIndex={0}
          onClick={onComboClick}
          onBlur={onComboBlur}
          onKeyDown={(evt) => onComboKeyDown(evt)}
        >
          {' '}
          {!selectedOptionId
            ? `${options[3].value}`
            : `${options.find((opt) => opt.id === selectedOptionId)?.value}`}
        </div>
        <div
          className={styles.comboMenu}
          role='listbox'
          id='listbox1'
          aria-labelledby='combo1-label'
          tabIndex={-1}
          ref={listBoxRef}
        >
          {options.map((opt, i) => {
            const setRef = (elem: HTMLDivElement) => {
              optionsRefs.current[i] = elem;
            };

            return (
              <div
                key={opt.id}
                id={`${idBase}-${i}`}
                className={`${styles.comboOption} ${
                  currentOptionId === opt.id ? `${styles.optionCurrent}` : ''
                }`}
                role='option'
                aria-selected={selectedOptionId === opt.id}
                onClick={(evt) => onOptionClick(evt, i)}
                onMouseDown={() => setIgnoreBlur(true)}
                ref={setRef}
              >
                {opt.value}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CustomSelect;

CustomSelect.propTypes = {
  handleSelectOrder: PropTypes.func,
};
