import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { ArrowDown } from "../icons";
import { animations, box, colors, fonts, spacings } from "../theme";

export const Select = ({ children, disabled, ...props }) => (
  <StyledWrapper>
    <StyledSelect disabled={disabled} {...props}>
      {children}
    </StyledSelect>
    <StyledArrowDown aria-hidden="true" isdisabled={disabled}>
      <ArrowDown />
    </StyledArrowDown>
  </StyledWrapper>
);

Select.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool
};

Select.defaultProps = {
  disabled: false
};

const INPUT_HEIGHT = "5.4rem";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`;

const StyledArrowDown = styled.div`
  position: absolute;
  top: ${spacings.medium};
  right: ${spacings.medium};
  width: 1.6rem;
  height: 1.6rem;
  color: ${props => (props.isdisabled ? colors.placeholder : colors.primary)};
  pointer-events: none;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: ${INPUT_HEIGHT};
  padding: 0 ${spacings.medium} 0;
  padding-right: 5rem;
  color: ${({ theme }) => theme.paragraph};
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  vertical-align: middle;
  border: none;
  border-radius: ${box.borderRadius};
  box-shadow: ${({ theme }) => box.shadow.large(theme.secondary)};
  cursor: pointer;
  transition: border-color ${animations.transitionTiming} ease;
  appearance: none;
  /* Internet Explorer 11 specifics rules */
  &::-ms-expand {
    background-color: transparent;
    border: 0 transparent;
  }
  *::-ms-backdrop,
  & {
    padding-right: ${spacings.base};
  }
  &:invalid {
    border-color: ${colors.error};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.bgTertiary};
  }
`;