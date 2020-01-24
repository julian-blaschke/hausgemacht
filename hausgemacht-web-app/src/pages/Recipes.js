import React from "react";
import { PageHeader, Layout, Button } from "antd";
import { useQuery } from "@apollo/react-hooks";

import { ALL_RECIPES } from "../graphql/queries";
import { RecipeTable } from "../components/data-display/table";
import { Link } from "react-router-dom";

export default function Recipes() {
  const { loading, error, data } = useQuery(ALL_RECIPES);
  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Layout.Content>
        <PageHeader
          title="Hausgemacht"
          subTitle="ein Platz für Familienrezepte"
        ></PageHeader>
        <RecipeTable
          loading={loading}
          error={error}
          recipes={data ? data.recipes : []}
        ></RecipeTable>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        <Button>
          <Link to="/create_recipe">Neues Rezept</Link>
        </Button>
      </Layout.Footer>
    </Layout>
  );
}
