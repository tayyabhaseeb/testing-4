import { render, screen } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";
import { async } from "validate.js";

// Method 1 to deal with act function (findBy)

function renderProps() {
  const repository = {
    full_name: "react",
    language: "javaScript",
    description: "Project by FaceBook",
    owner: "Brian  Holt",
    name: "react",
    html_url: "https://github.com/facebook/react",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return {
    repository,
  };
}

test("check whether there is link for github profiles", async () => {
  const { repository } = renderProps();
  await screen.findByRole("img", { name: /javascript/i });

  //   const link = screen.getByText(/Github link/i);
  const link = screen.getByRole("link", { name: /Github link/i });

  expect(link).toHaveAttribute("href", repository.html_url);
});

// const pause = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 1000);
//   });
// };

// const link = screen.getByText(/Github link/i);
// expect(link).toBeInTheDocument();

// =======================> Method 2 (use a module mock to avoid rendering the troublesome component) <================================= //
// its mean exclude that component that is causing the error of act
// jest.mock("../tree/FileIcon.js", () => {
// Content of FileIcon.js

//   return () => {
//     return "File Icon Component";
//   };
// });

// test("check whether there is link for github profiles", async () => {
//   const repository = {
//     full_name: "react",
//     language: "JavaScript",
//     description: "Project by FaceBook",
//     owner: "Brian  Holt",
//     name: "react",
//     html_url: "https://github.com/facebook/react",
//   };

//   render(
//     <MemoryRouter>
//       <RepositoriesListItem repository={repository} />
//     </MemoryRouter>
//   );

//   expect(screen.getByText(/Github link/i)).toBeInTheDocument();
// });

// Test 2

test("check whether the correct icon of language is showing", async () => {
  renderProps();
  const iconImg = await screen.findByRole("img", { name: /javascript/i });
  expect(iconImg).toHaveClass("js-icon");
});

// Test 3

test("checking wheather the link is working correctly", async () => {
  const { repository } = renderProps();
  await screen.findByRole("img", { name: /javascript/i });
  const title = screen.getByRole("link", {
    name: /react/i,
  });

  expect(title).toHaveAttribute(
    "href",
    `/repositories/${repository.full_name}`
  );
});
