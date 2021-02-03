import { addGlossary } from "../glossary";

const glossaryData = [
  {
    abbreviations: [],
    definition:
      "<p>Phrase ou ensemble de phrases d'un accord, d'une convention collective, d'une loi.</p>",
    term: "Disposition",
    variants: ["dispositions"],
  },
  {
    abbreviations: [],
    definition:
      "<p>Sommes versées en compensation ou en réparation de quelque chose.</p>",
    term: "indemnité",
    variants: ["indemnité"],
  },
  {
    abbreviations: ["cc"],
    tagName: "webcomponent-tooltip-cc",
    term: "Convention Collective",
    variants: [
      "convention collective",
      "conventions collectives",
      "accords de branches",
      "accord de branche",
      "disposition conventionnelle",
      "dispositions conventionnelles",
    ],
  },
];

describe("addGlossary", () => {
  test("should return a formated html with web components tooltip", () => {
    const htmlContent =
      "voici une convention collective et un web component mais aussi dispositions, ceci est un test";
    expect(addGlossary(htmlContent, glossaryData)).toEqual(
      `voici une <webcomponent-tooltip-cc>convention collective</webcomponent-tooltip-cc> et un web component mais aussi <webcomponent-tooltip content="Phrase%20ou%20ensemble%20de%20phrases%20d%E2%80%99un%20accord%2C%20d%E2%80%99une%20convention%20collective%2C%20d%E2%80%99une%20loi.">disposition</webcomponent-tooltip>s, ceci est un test`
    );
  });
  test("should not replace html property for glossary word", () => {
    const htmlContent = `<Tab title="test">test</Tab>

<Tab title="Cas où le salarié ne perçoit pas l'indemnité">
  L'indemnité de fin de contrat n'est pas due dans les cas suivants
</Tab>`;
    expect(addGlossary(htmlContent, glossaryData)).toEqual(
      `<Tab title="test">test</Tab>

<Tab title="Cas où le salarié ne perçoit pas l'indemnité">
  L'<webcomponent-tooltip content="Sommes%20vers%C3%A9es%20en%20compensation%20ou%20en%20r%C3%A9paration%20de%20quelque%20chose.">indemnité</webcomponent-tooltip> de fin de contrat n'est pas due dans les cas suivants
</Tab>`
    );
  });
  test("should not replace html property for cc word", () => {
    const htmlContent =
      '<p class="un accord de branche ou pas">voici une convention collective et un web component mais aussi dispositions, ceci est un test</p>';
    expect(addGlossary(htmlContent, glossaryData)).toEqual(
      `<p class="un accord de branche ou pas">voici une <webcomponent-tooltip-cc>convention collective</webcomponent-tooltip-cc> et un web component mais aussi <webcomponent-tooltip content="Phrase%20ou%20ensemble%20de%20phrases%20d%E2%80%99un%20accord%2C%20d%E2%80%99une%20convention%20collective%2C%20d%E2%80%99une%20loi.">disposition</webcomponent-tooltip>s, ceci est un test</p>`
    );
  });
  test("should replace inside html property for cc word", () => {
    const htmlContent =
      "voici une <b>convention collective</b> et un web component mais aussi dispositions, ceci est un test";
    expect(addGlossary(htmlContent, glossaryData)).toEqual(
      `voici une <b><webcomponent-tooltip-cc>convention collective</webcomponent-tooltip-cc></b> et un web component mais aussi <webcomponent-tooltip content="Phrase%20ou%20ensemble%20de%20phrases%20d%E2%80%99un%20accord%2C%20d%E2%80%99une%20convention%20collective%2C%20d%E2%80%99une%20loi.">disposition</webcomponent-tooltip>s, ceci est un test`
    );
  });
  test("should replace variants too", () => {
    const htmlContent =
      "voici une variante <b>accord de branche</b> et un web component";
    expect(addGlossary(htmlContent, glossaryData)).toEqual(
      `voici une variante <b><webcomponent-tooltip-cc>accord de branche</webcomponent-tooltip-cc></b> et un web component`
    );
  });
});
