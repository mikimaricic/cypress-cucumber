import * as homePage from "../pages/HomePage.page";

// Locators
export const AREA_CODE_FIELD = `input[name="phonePrefix"]`;
export const BANDWIDTH_FIELD = "label";
export const LOAD_MORE_BTN = "button";

// String Constants
export const LOAD_MORE_BTN_TEXT = "Jetzt vergleichen";

// Type area code in the area field
export function addAreaCode(code) {
  cy.get(AREA_CODE_FIELD).first().type(code);
}

// Choose bandwidth option
export function addBandwidth(bandwidth) {
  // FIXME : Remove force which is added to remove flaky behavior
  cy.get(BANDWIDTH_FIELD).contains(bandwidth).click({ force: true });
}

// Load results based on DSL calculator filter
export function confirmSearchFilter() {
  cy.get(LOAD_MORE_BTN).contains(LOAD_MORE_BTN_TEXT).click();
  homePage.waitLoadingOverlay();
}
