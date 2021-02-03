const findAndReplace = require("mdast-util-find-and-replace");
const acorn = require("acorn");
const syntax = require("micromark-extension-mdx-jsx");
const fromMarkdown = require("mdast-util-from-markdown");
const toMarkdown = require("mdast-util-to-markdown");
const mdxJsx = require("mdast-util-mdx-jsx");
const mdxMd = require("micromark-extension-mdx-md");

const stripDefinition = (definition) =>
  definition.replace(/'/g, "’").replace("<p>", "").replace("</p>", "");

const getTooltipElement = (entry) => (match) => {
  const tagName = entry.tagName || "webcomponent-tooltip";
  // const attributes = [];
  // if (entry.definition) {
  //   attributes.push({
  //     type: "mdxJsxAttribute",
  //     name: "content",
  //     value: encodeURIComponent(stripDefinition(entry.definition)),
  //   });
  // }
  // return {
  //   type: "mdxJsxTextElement",
  //   name: tagName,
  //   attributes,
  //   children: [{ type: "text", value: match }],
  // };
  const attrs =
    (entry.definition &&
      ` content="${encodeURIComponent(stripDefinition(entry.definition))}"`) ||
    "";
  return {
    type: "html",
    value: `<${tagName}${attrs}>${match}</${tagName}>`,
  };
};

// replace glossary terms in some MDX content
export const addGlossary = (content, glossaryData) => {
  // build a flat list of all possibles expressions
  // todo: add with diacritics removed ?
  const valueMap = glossaryData.flatMap((entry) => [
    [new RegExp(entry.term, "i"), getTooltipElement(entry)],
    ...entry.variants.map((variant) => [
      new RegExp(variant, "i"),
      getTooltipElement(entry),
    ]),
  ]);

  try {
    const tree = fromMarkdown(content, {
      extensions: [syntax({ acorn: acorn }), mdxMd],
      mdastExtensions: [mdxJsx.fromMarkdown],
    });

    findAndReplace(tree, valueMap, {
      //ignore: ["webcomponent-tooltip", "webcomponent-tooltip-cc"],
    });

    const out = toMarkdown(tree, { extensions: [mdxJsx.toMarkdown] }).trim();

    return out;
  } catch (e) {
    console.log(`Cannot parse content`, e.message);
    console.log(content);
    return content;
  }
};
