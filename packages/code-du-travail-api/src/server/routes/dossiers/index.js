const Router = require("koa-router");
const { DOCUMENTS } = require("@cdt/data/indexing/esIndexName");
const { SOURCES } = require("@socialgouv/cdtn-sources");
const getItemBySlugBody = require("../items/searchBySourceSlug.elastic");
const elasticsearchClient = require("../../conf/elasticsearch.js");

const API_BASE_URL = require("../v1.prefix");

const router = new Router({ prefix: API_BASE_URL });
const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;

/**
 * Return thematic files that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/dossiers/:slug
 *
 * @returns {Object} An object containing the matching thematic file .
 */

router.get("/dossiers/:slug", async (ctx) => {
  const { slug } = ctx.params;
  const body = getItemBySlugBody({ slug, source: SOURCES.THEMATIC_FILES });
  const response = await elasticsearchClient.search({ body, index });

  if (response.body.hits.total.value === 0) {
    ctx.throw(404, `there is no thematic files that match ${slug}`);
  }

  const thematicFile = response.body.hits.hits[0]._source;

  ctx.body = {
    ...thematicFile,
  };
});

module.exports = router;
