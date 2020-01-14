import React from "react";
import { PageHeader, Layout } from "antd";
import Recipes from "../components/data-display/recipe/All";

export default function Landing() {
  return (
    <Layout>
      <PageHeader
        title="Hausgemacht"
        subTitle="ein Platz für Familienrezepte"
      ></PageHeader>
      <Recipes></Recipes>
    </Layout>
  );
}
