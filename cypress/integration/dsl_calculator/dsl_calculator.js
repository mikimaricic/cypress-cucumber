import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

Given("that I can open www.verivox.de", () => {
  cy.visit("/");
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

Then(
  "I should see a page that lists the available tariffs for my selection",
  () => {
    // FIXME : Try to find more precise way
    cy.get(".button-primary")
      .should("have.length.greaterThan", 5)
      .and("contain.text", "Zum Angebot")
      .and("be.visible");

    cy.get(".internet-speed-download").each(($el, $index, $list) => {
      expect(parseInt($el.text().replace(/\./g, ""), 10)).to.be.at.least(100);
      console.log(parseInt($el.text().replace(/\./g, ""), 10));
    });
  }
);
