import * as homePage from "../pages/HomePage.page";

// Variable
let tarifPrice = "";
let headlineName = "";
let wifiIncluded = false;

// Locators
export const LIST_RESULT_ITEM_ELEMENT = ".my-4";
export const LIST_RESULT_ITEM_SUB_ELEMENT = ".mb-2";
export const LIST_RESULT_SEC_ITEM_ELEMENT = ".comparison-rank";
export const TOTAL_TARIFES_NUM_FIELD = ".summary-tariff";
export const LIST_ITEM_HEADLINE_ELEMENT = ".headline-short-name";
export const OFFER_DETAILS_HEADLINE_ELEMENT = ".group-header";
export const LIST_ITEM_HARDWARE_ELEMENT = ".col-12";
export const PRICE_DETAILS_ELEMENT = ".effective-price-wrapper";
export const BUTTONS_5_MIN_ONLINE_ELEMENT = ".offer-page-cta";
export const OFFER_DETAILS_HARDWARE_ELEMENT = ".hardware-tab";
export const OFFER_DETAILS_HARDWARE_CHECKBOX = ".checkbox-frame";
export const TARIFE_DETAILS_PRICE_LIST_ELEMENT = ".costs-table";
export const TARIFE_DETAILS_AVERAGE_PRICE_ELEMENT = ".average-price";

// String constants
export const MIN_ITEMS_LOADED_NUM = 5;
export const TOTAL_TARIFES_TEXT_FIELD = "Tarife";
export const CURRENCY_EURO_LOGO = "€";
export const ITEM_DETAILS_BTN_TEXT = "Zum Angebot";
export const BUTTONS_5_MIN_ONLINE_NUM = 2;
export const TARIFE_DETAILS_PRICE_TARIFE_TEXT = "Tarifkosten";
export const TARIFE_DETAILS_PRICE_HARDWARE_TEXT = "Hardware";
export const TARIFE_DETAILS_PRICE_USE_TEXT = "Vorteile";
export const TARIFE_DETAILS_AVERAGE_PRICE_TEXT = "Durchschnittspreis";

// Get and save details from tariffs result from the page for the check after choosing the tariff
export function handleTarifeResultPage() {
  // Wait for the loading screen overlay to disappear
  homePage.waitLoadingOverlay();

  // VERIFY : that number of available tariffs is visible
  cy.get(TOTAL_TARIFES_NUM_FIELD)
    .contains(TOTAL_TARIFES_TEXT_FIELD)
    .should("be.visible");

  // VERIFY : At least 5 internet tariffs are displayed
  cy.get(LIST_RESULT_ITEM_ELEMENT)
    .find(LIST_RESULT_SEC_ITEM_ELEMENT)
    .should("exist")
    .and("have.length.at.least", MIN_ITEMS_LOADED_NUM);

  // Get and save tariff price
  cy.get(LIST_RESULT_ITEM_ELEMENT)
    .find(LIST_RESULT_ITEM_SUB_ELEMENT)
    .first()
    .contains(CURRENCY_EURO_LOGO)
    .then(($elm) => {
      tarifPrice = $elm.text();
    });

  // Get and save headline text
  cy.get(LIST_RESULT_ITEM_ELEMENT)
    .find(LIST_ITEM_HEADLINE_ELEMENT)
    .first()
    .then(($elm) => {
      headlineName = $elm.text();
      console.log(headlineName);
    });

  // Get and save hardware is included
  cy.get(LIST_RESULT_ITEM_ELEMENT)
    .find(LIST_ITEM_HARDWARE_ELEMENT)
    .first()
    .then(($elm) => {
      if ($elm.text().match(/WLAN-Kabelrouter gratis|inkl. WLAN Kabelbox/g)) {
        wifiIncluded = true;
      }
    });
}

// Go to tariff details page
export function seeTarifeDetails() {
  // FIXME : Find a way how to resolve the flaky test issues and remove timers
  cy.wait(3000);
  cy.get(LIST_RESULT_ITEM_ELEMENT)
    .contains(ITEM_DETAILS_BTN_TEXT)
    .first()
    .click();
}

// VERIFY : that the expected page contents and tariff details are ok for your picked tariff
export function checkOfferDetails() {
  homePage.waitLoadingOverlay();

  // VERIFY : that both In 5 Minuten online wechseln buttons are presented
  cy.get(BUTTONS_5_MIN_ONLINE_ELEMENT).should(
    "have.length",
    BUTTONS_5_MIN_ONLINE_NUM
  );

  // Check is price same as on selected tariff from the tariff results page
  cy.get(PRICE_DETAILS_ELEMENT)
    .should("contain.text", tarifPrice)
    .and("be.visible");

  // Check is headline text same as on selected tariff from tariff results page
  cy.get(OFFER_DETAILS_HEADLINE_ELEMENT)
    .should("contain.text", headlineName)
    .and("be.visible");

  // Check is hardware included as on selected tariff from the tariff results page
  if (wifiIncluded == true) {
    cy.get(OFFER_DETAILS_HARDWARE_ELEMENT)
      .find(OFFER_DETAILS_HARDWARE_CHECKBOX)
      .should("be.visible");
  }

  // Check is tariff sum details are visible on the page
  cy.get(TARIFE_DETAILS_PRICE_LIST_ELEMENT)
    .contains(TARIFE_DETAILS_PRICE_TARIFE_TEXT)
    .should("be.visible");

  cy.get(TARIFE_DETAILS_PRICE_LIST_ELEMENT)
    .contains(TARIFE_DETAILS_PRICE_HARDWARE_TEXT)
    .should("be.visible");

  cy.get(TARIFE_DETAILS_PRICE_LIST_ELEMENT)
    .contains(TARIFE_DETAILS_PRICE_USE_TEXT)
    .should("be.visible");

  // Check if the correct text is in the tariff sum price details
  cy.get(TARIFE_DETAILS_AVERAGE_PRICE_ELEMENT)
    .contains("Durchschnittspreis")
    .should("be.visible");

  // Check if the correct price is in the tariff sum details
  cy.get(TARIFE_DETAILS_AVERAGE_PRICE_ELEMENT).should(
    "contain.text",
    tarifPrice
  );
}
