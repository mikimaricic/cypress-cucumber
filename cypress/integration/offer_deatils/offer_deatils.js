import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

const url = "https://verivox.de";
const url1 = "https://www.verivox.de/dsl-vergleich/";

Given("that I can open www.verivox.de", () => {
  cy.visit(url);
  // Accept all cookies
  // cy.get('[id="uc-btn-accept-banner"]').click();
});

When("I navigate to the DSL calculator page", () => {
  // FIXME : find solution for hover problem
  cy.get("a").contains("DSL-Vergleich").click({ force: true });
});

And("I enter 030 for my area code", () => {
  cy.get(`input[name="phonePrefix"]`).first().type("030");
});

And("I select the 100 Mbit\\/s bandwidth option", () => {
  cy.get("label").contains("100").click();
});

And("I click the Jetzt vergleichen button", () => {
  cy.get("button").contains("Jetzt vergleichen").click();
});

Then("I display the tariff result list page", () => {
  cy.get(".summary-tariff").contains("Tarife").should("be.visible");
});

When("I click on any Zum Angebot button to select a tariff offer", () => {
  cy.get(".button-primary").contains("Zum Angebot").click();
});

Then(
  "I should see the corresponding offer page for the selected tariff",
  () => {
    cy.get('[data-description="firstAvailabilityCheckButton"]').should(
      "be.visible"
    );
  }
);
