import React from "react";
import { graphql } from "gatsby";
import rehypeReact from "rehype-react";
import ExampleRunner from '../components/ExampleRunner';
import FrameworkSpecificSection from '../components/FrameworkSpecificSection';

export default function DocPageTemplate({ data, pageContext: { framework } }) {
  const { markdownRemark: page } = data;

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      "example-runner": props => ExampleRunner({ ...props, framework }),
      "div": props => FrameworkSpecificSection({ ...props, framework })
    },
  }).Compiler;

  return (
    <div className="doc-page">
      <h1>{page.frontmatter.title}</h1>
      {renderAst(page.htmlAst)}
    </div>
  );
}

export const pageQuery = graphql`
  query DocPageByPath($srcPath: String!) {
    markdownRemark(frontmatter: { path: { eq: $srcPath } }) {
      htmlAst
      frontmatter {
        path
        title
      }
    }
  }
`;
