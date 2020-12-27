// Locators
export const LOADING_OVERLAY_ELEMENT = ".loading-screen";
export const OVERLAY_COOKIES_ACCEPT_BUTTON =
  'button[id="uc-btn-accept-banner"]';

// Open home page
export function openHomePage() {
  cy.visit("/");
}

// Handle accept cookies overlay if visible
export function handleCookiesOverlay() {
  cy.get(OVERLAY_COOKIES_ACCEPT_BUTTON).then(($btn) => {
    if ($btn.is(":visible")) {
      $btn.trigger("click");
    }
  });
}

// Navigate to the DSL calculator page
export function goToDslCalculator() {
  // FIXME : Find a solution for the hover problem
  cy.get("a").contains("DSL-Vergleich").click({ force: true });
}

// Wait for loading screen overlay
export function waitLoadingOverlay() {
  cy.get(LOADING_OVERLAY_ELEMENT).should("not.exist");
}
