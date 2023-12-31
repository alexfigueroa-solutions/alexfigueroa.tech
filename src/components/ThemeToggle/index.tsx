import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Brightness3Icon from '@mui/icons-material/Brightness3'; // Moon icon
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Sun icon
import { useTheme, useToggleTheme } from '../../hooks/useTheme';
import { lightTheme } from '../../theming/theme';
import { createStyledMotionComponent } from '../../theming/styled-motion-utils/createStyledMotionComponent';
import { fixedBottomRight } from '../../theming/util-style-functions/position';
import { zIndex } from '../../theming/design-tokens/spacing';
import { margin } from '../../theming/util-style-functions/spacing';
import { textColor } from '../../theming/util-style-functions/colors';
import { CursorContext } from '../../contexts/CursorContext';
import { useCursorEffect } from '../../hooks/useCursorEffect';

const StyledIconButton = createStyledMotionComponent(IconButton)(({ theme }) => `
    z-index: ${zIndex.modal};
    ${margin('md')}
    color: ${textColor(theme, 'text')};
    flex-basis: 15%;
`);

const ThemeToggle = ({ onClick }: { onClick: () => void }) => {
    const theme = useTheme();
    return (<StyledIconButton
        aria-label="mode"
        onClick={onClick}
        theme={theme}
    >
        {theme.mode === 'light'
            ? <Brightness3Icon fontSize="large" color="inherit" />
            : <WbSunnyIcon fontSize="large" color="inherit" />}
    </StyledIconButton>

    );
};

export default ThemeToggle;
