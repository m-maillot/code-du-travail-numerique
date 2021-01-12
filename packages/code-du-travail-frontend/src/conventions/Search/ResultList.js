import { Heading, theme, ViewMore, Wrapper } from "@socialgouv/cdtn-ui";
import React from "react";
import { useUIDSeed } from "react-uid";
import styled from "styled-components";

export const ResultList = ({
  buttonLabel = "Plus de résultats",
  items,
  query,
  title,
}) => {
  const seedId = useUIDSeed();
  return (
    <StyledWrapper variant="light">
      <Heading>
        {`${title} (${items.length}`}&nbsp;
        {`résultat${items.length > 1 ? "s" : ""})`}
      </Heading>
      <ViewMore label={buttonLabel} query={query} stepSize={7}>
        {items.map((item) => (
          <StyledListItem key={seedId(item)}>{item}</StyledListItem>
        ))}
      </ViewMore>
    </StyledWrapper>
  );
};

const { box, spacings } = theme;

const StyledWrapper = styled(Wrapper)`
  & + & {
    margin-top: ${spacings.base};
  }
`;

const StyledListItem = styled.li`
  & + & {
    border-top: ${({ theme }) => box.border(theme.border)};
  }
  &:last-of-type {
    & > *:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }
`;
