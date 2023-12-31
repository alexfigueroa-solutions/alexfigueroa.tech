import React from 'react';
import styled from 'styled-components';
import { withAnimations } from '../../hooks/animation/withAnimations';
import { useTheme } from '../../hooks/useTheme';

const IntroContainer = styled.div`
  text-align: center;
  color: ${props => props?.theme?.colors?.primary};
  background-color: ${props => props?.theme?.colors?.background};
  padding: 2rem;
`;

const Introduction = () => {
  const theme = useTheme();
  
  return (
    <IntroContainer theme={theme}>
      <h1>About Me</h1>
      <p>I'm Alex Figueroa, a full-stack software engineer focused on developing autonomous and semi-autonomous applications.</p>
    </IntroContainer>
  );
}

export default withAnimations('fadeIn')(Introduction);
