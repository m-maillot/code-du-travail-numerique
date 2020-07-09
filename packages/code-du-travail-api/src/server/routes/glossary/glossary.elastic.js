const { SOURCES } = require("@socialgouv/cdtn-sources");

function getGlossaryBody() {
  return {
    query: {
      bool: {
        filter: {
          term: { source: SOURCES.GLOSSARY },
        },
      },
    },
  };
}

module.exports = getGlossaryBody;
