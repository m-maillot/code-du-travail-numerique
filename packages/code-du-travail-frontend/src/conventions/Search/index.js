import { Button, Input, Label, theme } from "@socialgouv/cdtn-ui";
import debounce from "debounce-promise";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Spinner from "react-svg-spinner";
import styled from "styled-components";
import { v4 as generateUUID } from "uuid";

import { matopush } from "../../piwik";
import { CompanyTile } from "./CompanyTile";
import { ConventionLink } from "./ConventionLink";
import { HelpModal } from "./HelpModal";
import { ResultList } from "./ResultList";
import useSearchCC from "./searchHook";

const trackInput = debounce((query, path, trackingUID) => {
  if (query.length > 1) {
    matopush(["trackEvent", "cc_search", path, `${trackingUID} : ${query}`]);
  }
}, 2000);

const Search = ({ onSelectConvention }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [trackingUID, setTrackingUID] = useState("");

  useEffect(() => {
    // we want to connect events that are
    // related so we only generate an uuid on mount
    setTrackingUID(generateUUID());
  }, []);

  const onInputChange = (keyEvent) => {
    const value = keyEvent.target.value;
    trackInput(value, router.asPath, trackingUID);
    setQuery(value);
  };

  const [status, { conventions = [], entreprises = [] } = {}] = useSearchCC(
    query
  );

  return (
    <>
      <Label htmlFor="convention-search">
        Renseignez le nom de votre convention collective, le nom de votre
        entreprise ou son SIRET.
      </Label>
      <BlockInput
        role="search"
        placeholder="Nom de la convention collective, de l’entreprise ou son SIRET"
        value={query}
        type="search"
        name="q"
        id="convention-search"
        onChange={onInputChange}
      />
      {query && (
        <ResultsContainer>
          {status === "loading" && (
            <div>
              <Spinner /> Recherche des convention collectives...
            </div>
          )}
          {status === "error" && (
            <div>Le service de recherche est indisponible.</div>
          )}
          {status === "empty" && <div>Aucun résultat n’a été trouvé.</div>}
          {status === "success" && (
            <>
              {conventions.length !== 0 && (
                <ResultList
                  title="CONVENTIONS COLLECTIVES"
                  query={query}
                  items={conventions.map((convention, index) => (
                    <ConventionLink
                      convention={convention}
                      isFirst={index === 0}
                      key={convention.slug}
                      onClick={onSelectConvention}
                    />
                  ))}
                />
              )}
              {entreprises.length !== 0 && (
                <ResultList
                  title="ENTREPRISES"
                  query={query}
                  items={entreprises.map((entreprise) => (
                    <CompanyTile
                      {...entreprise}
                      key={entreprise.siret}
                      onClick={onSelectConvention}
                    />
                  ))}
                />
              )}
            </>
          )}
        </ResultsContainer>
      )}
      <P>
        Vous ne connaissez pas ou ne trouvez pas votre convention
        collective&nbsp;?
        <Span>
          Consultez{" "}
          <HelpModal>
            {(openModal) => (
              <HelpButton
                type="button"
                variant="navLink"
                onClick={() => {
                  matopush([
                    "trackEvent",
                    "cc_search_help",
                    router.asPath,
                    `${trackingUID}`,
                  ]);
                  openModal();
                }}
              >
                notre aide
              </HelpButton>
            )}
          </HelpModal>
          .
        </Span>
      </P>
    </>
  );
};

const { spacings } = theme;
const BlockInput = styled(Input)`
  width: 100%;
`;

const P = styled.p`
  margin-top: ${spacings.xmedium};
`;

const Span = styled.span`
  display: block;
  margin-top: ${spacings.base};
`;

const HelpButton = styled(Button)`
  color: ${theme.colors.secondary};
  text-decoration: underline;
`;

const ResultsContainer = styled.div`
  margin-top: ${spacings.medium};
`;

export default Search;
