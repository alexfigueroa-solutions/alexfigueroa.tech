import React, { useRef } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useAlternateTheme } from "../../hooks/theming/useAlternateTheme";
import HamburgerMenu from "../HamburgerMenu";
import { AnimatePresence } from "framer-motion";
import { RouteItem } from "../../routing/RouteItem.type";
import { NavLink } from "../NavLink";
import { DefaultTheme } from "styled-components/dist/models/ThemeProvider";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { relative } from "../../theming/util-style-functions/position";
import { flexBetween, flexCenter } from "../../theming/util-style-functions/layout";
import { gradientBackground, textColor } from "../../theming/util-style-functions/colors";

interface HoverItemsContainerProps {
    links: RouteItem[];
    toggleTheme: () => void;
    isHovered: boolean;
    theme: DefaultTheme;
    hoverAnimations: any;
    linkHoverInAnimation: any;
    linkHoverOutAnimation: any;
}

const Wrapper = createStyledMotionComponent('div')(props => `
    ${relative}
    width: 100%;
    height: 100%;
`)

const HoverItemsWrapper = createStyledMotionComponent('div')(props => `
    ${relative}
    min-width: 40%;
    max-width: 40%;
    left: 40%;

    @media (max-width: 768px) {
        left: 0;
        max-width: 100%;
        min-width: 100%;
    }
`)


const DualBorderEffect = theme => `
  border: 2px solid ${theme.mode === 'dark' ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.6)"};
  box-shadow: 0 0 0 4px ${theme.mode === 'dark' ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)"};
`;

const DynamicShadow = theme => `
  box-shadow: 0 4px 6px ${theme.mode === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.2)"};
`;




const AdditionalItemsContainer = createStyledMotionComponent('div')(props => `
    ${DualBorderEffect(props.theme)}
    ${DynamicShadow(props.theme)}
    ${textColor(props.theme, 'text')}
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: auto;
`);


const ParallaxEffect = `
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05) translateY(-5px);
  }
`;

const MenuContainer = createStyledMotionComponent('div')(props => `
    ${flexBetween}
    ${ParallaxEffect}
    gap: 1rem;
    width: 100%;
    max-width: 1200px;
    min-height: 105%;
`);

const HoverItemsContainer = ({
    links,
    toggleTheme,
    isHovered,
    theme,
    hoverAnimations,
    linkHoverInAnimation,
    linkHoverOutAnimation,
}: HoverItemsContainerProps) => {

    return (
        <HoverItemsWrapper>
            <AnimatePresence>
                {isHovered && (
                    <Wrapper>
                        <AdditionalItemsContainer
                            initial={linkHoverOutAnimation}
                            animate={linkHoverInAnimation}
                            exit={linkHoverOutAnimation}
                            theme={theme}
                        >
                            {links.map((link, index) =>
                                <NavLink data-id="special" key={index} link={link} theme={theme} hoverAnimations={hoverAnimations} />
                            )}
                        </AdditionalItemsContainer>
                    </Wrapper>
                )}
            </AnimatePresence>
        </HoverItemsWrapper>
    )
};

const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

function NavMenu(props) {
    const altTheme = useAlternateTheme();
    const theme = useTheme();
    const [isHovered, setHovered] = React.useState(false);

    const linkHoverInAnimation = { opacity: 1, x: 0, scale: 1 };
    const linkHoverOutAnimation = { opacity: 0, x: 100, scale: 0.95 };

    const menuContainerRef = useRef();

    const handleMouseEnter = debounce(() => setHovered(true), 200);
    const handleMouseLeave = debounce(() => setHovered(false), 200);

    const hoverAnimations = {
        // Example:
        enter: { ...linkHoverInAnimation },
        leave: { ...linkHoverOutAnimation }
    };

    return (
        <MenuContainer
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={menuContainerRef}
            menuWidth={'20rem'}
        >
            <HoverItemsContainer
                links={props.links}
                toggleTheme={props.toggleTheme}
                isHovered={isHovered}
                theme={theme}
                hoverAnimations={hoverAnimations}
                linkHoverInAnimation={linkHoverInAnimation}
                linkHoverOutAnimation={linkHoverOutAnimation}
            />
            <HamburgerMenu isHovered={isHovered} />
        </MenuContainer>
    );
}

export default React.memo(NavMenu); // Memoizing the main component
