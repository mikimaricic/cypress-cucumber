import * as homePage from "../pages/HomePage.page";

// Variable
let tarifeTotal = "";
let listLast = "";
let btnLast = "";

// Locators
export const LIST_RESULT_ITEM_ELEMENT = ".my-4";
export const LIST_RESULT_SEC_ITEM_ELEMENT = ".comparison-rank";
export const MIN_DOWNLOAD_SPEED_FIELD = ".internet-speed-download";
export const TOTAL_TARIFES_NUM_FIELD = ".summary-tariff";
export const END_OF_LIST_BUTTON_FIELD = "button";

// String constants
export const TOTAL_TARIFES_NUM_TEXT = "Tarife";
export const MIN_DOWNLOAD_SPEED_VALUE = 100;
export const MIN_ITEMS_LOADED_NUM = 5;
export const LIST_ITEMS_NUM_LOADED_FIRST_PAGE = 20;
export const LIST_ITEMS_TEXT_LOADED_FIRST_PAGE = "20.";
export const LIST_ITEMS_NUM_LOADED_SECOND_PAGE = 40;
export const LIST_ITEMS_TEXT_LOADED_SECOND_PAGE = "40.";
export const LIST_ITEMS_TEXT_LOADED_THIRD_PAGE = "60";
export const END_OF_LIST_BUTTON_TEXT = "weitere tarife laden";

// VERIFY : At least 5 internet tariffs are displayed
export function minLoadedInternetTarifs() {
  // FIXME : Find a way how to resolve the flaky test issues and remove timers
  cy.wait(3000);

  cy.get(LIST_RESULT_ITEM_ELEMENT)
    .find(LIST_RESULT_SEC_ITEM_ELEMENT)
    .should("exist")
    .and("have.length.at.least", MIN_ITEMS_LOADED_NUM);
}

// VERIFY : The displayed tariffs provide at least 100 Mbit/s download speed
export function minDownloadSpeed() {
  cy.get(MIN_DOWNLOAD_SPEED_FIELD).each(($el) => {
    expect(parseInt($el.text().replace(/\./g, ""), 10)).to.be.at.least(
      MIN_DOWNLOAD_SPEED_VALUE
    );
  });
}

// VERIFY : Get the total number of available tariffs listed in the Ermittelt Tariff section to save in a variable
export function getTotalTarifNumber() {
  cy.get(TOTAL_TARIFES_NUM_FIELD)
    .contains(TOTAL_TARIFES_NUM_TEXT)
    .then(($elm) => {
      tarifeTotal = parseInt($elm.text(), 10);
    })
    .should("be.visible");
}

// Scroll end of a list into view
export function scrollIntoView() {
  cy.get(END_OF_LIST_BUTTON_FIELD)
    .contains(END_OF_LIST_BUTTON_TEXT)
    .scrollIntoView();
}

// VERIFY : That only the first 20 tariffs are displayed
export function numberOfTarifLoaded() {
  cy.get(LIST_RESULT_ITEM_ELEMENT)
    .find(LIST_RESULT_SEC_ITEM_ELEMENT)
    .should("exist")
    .and("have.length", LIST_ITEMS_NUM_LOADED_FIRST_PAGE);

  cy.get(LIST_RESULT_ITEM_ELEMENT)
    .find(LIST_RESULT_SEC_ITEM_ELEMENT)
    .last()
    .should("have.text", LIST_ITEMS_TEXT_LOADED_FIRST_PAGE);
}

// VERIFY : That the next 20 tariffs are displayed
export function next20TarifLoaded() {
  cy.get(LIST_RESULT_ITEM_ELEMENT)
    .find(LIST_RESULT_SEC_ITEM_ELEMENT)
    .should("exist")
    .and("have.length", LIST_ITEMS_NUM_LOADED_SECOND_PAGE);

  cy.get(LIST_RESULT_ITEM_ELEMENT)
    .find(LIST_RESULT_SEC_ITEM_ELEMENT)
    .last()
    .should("have.text", LIST_ITEMS_TEXT_LOADED_SECOND_PAGE);
}

export function loadMoreTarifOptions() {
  cy.get(END_OF_LIST_BUTTON_FIELD).contains(END_OF_LIST_BUTTON_TEXT).click();
}

// VERIFY : I can continue to load any additional tariffs until all tariffs have been displayed
export function loadAllTarifOptions() {
  // FIXME : Add dynamic check (loop) to avoid hardcoded check
  cy.get(LIST_RESULT_SEC_ITEM_ELEMENT)
    .contains(LIST_ITEMS_TEXT_LOADED_THIRD_PAGE)
    .should("be.visible");

  // VERIFY : That the final weitere Tarife laden button displays the expected number of tariffs remaining
  cy.get(LIST_RESULT_ITEM_ELEMENT)
    .find(LIST_RESULT_SEC_ITEM_ELEMENT)
    .then(($elm) => {
      listLast = $elm.length;
    });

  cy.get(END_OF_LIST_BUTTON_FIELD)
    .contains(END_OF_LIST_BUTTON_TEXT)
    .then(($btn) => {
      btnLast = parseInt($btn.text(), 10);
      expect(tarifeTotal - listLast).to.equal(btnLast);
    });

  loadMoreTarifOptions();

  homePage.waitLoadingOverlay();

  // VERIFY : if the total number of tariffs displayed matches the total listed in the Ermittelte Tarife section
  cy.get(LIST_RESULT_SEC_ITEM_ELEMENT)
    .last()
    .should("be.visible")
    .then(($num) => {
      const resultTarifeTotal = parseInt($num.text(), 10);
      expect(resultTarifeTotal).to.be.equal(tarifeTotal);
    });
}

// VERIFY : that the weitere Tarife laden button is no longer displayed when all the tariffs are visible
export function checkLoadMoreTarifBtnNotVisible() {
  cy.get(END_OF_LIST_BUTTON_FIELD)
    .contains(END_OF_LIST_BUTTON_TEXT)
    .should("not.exist");
}
