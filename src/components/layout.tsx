import React from "react";
import { useLoaderData } from "react-router-dom";

import Footer from "./footer";
import Header from "./navbar";
import useTitle from "../utils/hooks/use-title";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const loaderData = useLoaderData() as string;
  useTitle(loaderData);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
