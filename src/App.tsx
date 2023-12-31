import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import { GlobalStyle } from "./theming/GlobalStyle.ts";

import { ThemeProvider as AppThemeProvider } from './theming/ThemeProvider.tsx';
import { baseRoutes, routes } from './routing/routes.tsx';
import { ThemeContext, ThemeToggleContext } from './contexts/ThemeContext.tsx';
// AnimatedCursor seems to be a library component. Lazy loading is not needed for libraries.
import AnimatedCursor from 'react-animated-cursor';
import { CursorProvider } from './contexts/CursorContext.tsx';
import { useCursorEffect } from './hooks/useCursorEffect.tsx';
import { AnimatePresence } from 'framer-motion';
import SiteLayout from './components/Layout/index.tsx';
import { padding } from './theming/util-style-functions/spacing.ts';
import { mq } from './theming/util-style-functions/responsive.ts';
import { spacing, zIndex } from './theming/design-tokens/spacing.ts';
import { fixedBottomRight } from './theming/util-style-functions/position.ts';
import { ActiveProjectProvider } from './contexts/ActiveProjectContext.tsx';

// BackgroundImage and CustomCursor are components, so we can lazy load them
const CustomCursor = lazy(() => import('./components/Cursor/index.tsx'));

const ThemeToggle = lazy(() => import('./components/ThemeToggle/index.tsx'));


const RoutesWrapper = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </AnimatePresence>
  );
};





const App: React.FC = () => {


  return (
    <ActiveProjectProvider>
      <AppThemeProvider>
        <CursorProvider>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <CustomCursor />
              <ThemeContext.Consumer>
                {(theme) =>
                  <ThemeToggleContext.Consumer>
                    {(toggleTheme) =>
                      theme && toggleTheme ?
                        <SiteLayout toggleTheme={toggleTheme}>
                          <RoutesWrapper />
                        </SiteLayout>
                        : null
                    }
                  </ThemeToggleContext.Consumer>
                }
              </ThemeContext.Consumer>
            </Suspense>
          </Router>
        </CursorProvider>
      </AppThemeProvider>
    </ActiveProjectProvider>
  );
}

export default App;
