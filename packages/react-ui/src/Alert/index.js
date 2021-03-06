import PropTypes from "prop-types";
import styled from "styled-components";

import { box, spacings } from "../theme";

export const Alert = styled.div`
  margin-bottom: ${spacings.base};
  padding: ${spacings.small} ${spacings.medium};
  color: ${({ theme }) => theme.paragraph};
  background-color: ${({ theme }) => theme.bgSecondary};
  border: 1px solid
    ${({ theme, variant }) =>
      variant === "primary" ? theme.primary : theme.bgSecondary};
  border-radius: ${box.borderRadius};
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary"]),
};

Alert.defaultProps = {
  variant: "secondary",
};
