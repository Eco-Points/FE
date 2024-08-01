import "./match-media-mock";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { RenderOptions, render } from "@testing-library/react";
import { ReactElement } from "react";

import { Toaster } from "@/components/ui/sonner";

const renderWithRouter = (
  ui: ReactElement,
  path = "/",
  options?: Omit<RenderOptions, "wrapper">
) => {
  const { pathname } = new URL(`http://www.test.com${path}`);

  const router = createMemoryRouter(
    [
      {
        path: pathname,
        element: (
          <>
            {ui}
            <Toaster />
          </>
        ),
      },
    ],
    { initialEntries: [path] }
  );

  return render(<RouterProvider router={router} />, { ...options });
};

export * from "@testing-library/react";
export { renderWithRouter as render };