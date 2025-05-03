'use client';

import React from 'react';
import { ThemeSwitcher } from '../shared/ThemeSwitch/ThemeSwith';

const ThemeButton: React.FC = () => {

  return (
    <>
      <div
        className="fixed bottom-6 right-6 flex flex-col items-end gap-3"

      >
        <ThemeSwitcher/>
      </div>

    </>
  );
};

export default ThemeButton;