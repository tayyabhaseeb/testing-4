import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("check that the language is visible in the document", () => {
  const repository = {
    language: "Python",
    stargazers_count: 5,
    open_issues: 1,
    forks: 30,
  };

  render(<RepositoriesSummary repository={repository} />);

  for (const key in repository) {
    const value = repository[key];
    const element = screen.getByText(new RegExp(value)); // must looser matcher and its okay if there is other element as well

    expect(element).toBeInTheDocument();
  }
});
