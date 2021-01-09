import { hydrate, render } from "react-dom";

export const hydratatePage = (component, target) => (
  hydrate(component, document.getElementById(target))
);

export const renderPage = (component, target) => (
  render(component, document.getElementById(target))
);
