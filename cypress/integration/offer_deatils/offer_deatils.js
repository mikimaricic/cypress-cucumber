import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

let tarifPrice = "";
let headlineName = "";
let wifiIncluded = false;

Given("that I can open www.verivox.de", () => {
  cy.visit("/");

  // Handle accept cokies overlay if visible
  cy.get('button[id="uc-btn-accept-banner"]').then(($btn) => {
    if ($btn.is(":visible")) {
      $btn.trigger("click");
    }
  });
});

When("I navigate to the DSL calculator page", () => {
  // FIXME : find solution for hover problem
  cy.get("a").contains("DSL-Vergleich").click({ force: true });
});

And("I enter 030 for my area code", () => {
  cy.get(`input[name="phonePrefix"]`).first().type("030");
});

And("I select the 100 Mbit\\/s bandwidth option", () => {
  // FIXME : Remove force
  cy.get("label").contains("100").click({ force: true });
});

And("I click the Jetzt vergleichen button", () => {
  cy.get("button").contains("Jetzt vergleichen").click();
});

Then("I display the tariff result list page", () => {
  // wait loading screen overlay
  cy.get(".loading-screen").should("not.exist");

  // VERIFY : that number of avaible tarife is visible
  cy.get(".summary-tariff").contains("Tarife").should("be.visible");

  // VERIFY : At least 5 internet tariffs are displayed
  cy.get(".my-4")
    .find(".comparison-rank")
    .should("exist")
    .and("have.length.at.least", 5);

  // Get and save tarif price
  cy.get(".my-4")
    .find(".mb-2")
    .first()
    .contains("€")
    .then(($elm) => {
      tarifPrice = $elm.text();
    });

  // Get and save headline text
  cy.get(".my-4")
    .find(".headline-short-name")
    .first()
    .then(($elm) => {
      headlineName = $elm.text();
      console.log(headlineName);
    });

  // Get and save hardware is included
  cy.get(".my-4")
    .find(".col-12")
    .first()
    .then(($elm) => {
      if ($elm.text().match(/WLAN-Kabelrouter gratis|inkl. WLAN Kabelbox/g)) {
        wifiIncluded = true;
      }
    });
});

When("I click on any Zum Angebot button to select a tariff offer", () => {
  cy.get(".my-4").contains("Zum Angebot").first().click();
});

Then(
  "I should see the corresponding offer page for the selected tariff",
  () => {
    // VERIFY : that both In 5 Minuten online wechseln buttons are visible
    cy.get(".offer-page-cta").should("be.visible").and("have.length", 2);

    // VERIFY : that the expected page contents and tariff details for your
    // Check is price same as on selected tariff from tariff results page
    cy.get(".effective-price-wrapper")
      .should("contain.text", tarifPrice)
      .and("be.visible");

    // Check is headline text same as on selected tariff from tariff results page
    cy.get(".group-header")
      .should("contain.text", headlineName)
      .and("be.visible");

    // Check is hardware included as on selected tariff from tariff results page
    if (wifiIncluded == true) {
      cy.get(".hardware-tab").find(".checkbox-frame").should("be.visible");
    }

    // Check is tarif sum details is visible on page
    cy.get(".costs-table").contains("Tarifkosten").should("be.visible");
    cy.get(".costs-table").contains("Hardware").should("be.visible");
    cy.get(".costs-table").contains("Vorteile").should("be.visible");

    // Check if correct text is in tarif sum price details
    cy.get(".average-price")
      .contains("Durchschnittspreis")
      .should("be.visible");

    // Check if correct price is in tarif sum details
    cy.get(".average-price").should("contain.text", tarifPrice);
  }
);
