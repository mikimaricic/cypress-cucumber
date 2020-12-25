import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

let tarifeTotal = "";

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
  "I should see the total number of available tariffs listed in the Ermittelte Tarife section",
  () => {
    cy.get(".summary-tariff").contains("Tarife").should("be.visible");
    // Save total number of tarifs in variable
    cy.get(".summary-tariff")
      .contains("Tarife")
      .then(($elm) => {
        tarifeTotal = parseInt($elm.text(), 10);
      });
  }
);

When("I scroll to the end of the Result List page", () => {
  cy.get("button").contains("weitere tarife laden").scrollIntoView();
});

Then("I should see only the first 20 tariffs displayed", () => {
  cy.get(".comparison-rank").contains("20").should("be.visible");
  cy.get(".comparison-rank").contains("21").should("not.exist");
});

When("I click on the button labeled 20 weitere Tarife laden", () => {
  cy.get("button").contains("weitere tarife laden").click();
});

Then("I should see the next 20 tariffs displayed", () => {
  // FIXME : Remove timer
  cy.wait(5000);
  cy.get("button").contains("weitere tarife laden").scrollIntoView();
  cy.get(".comparison-rank").contains("40").should("be.visible");
  cy.get(".comparison-rank").contains("41").should("not.exist");
});

And(
  "I can continue to load any additional tariffs until all tariffs have been displayed",
  () => {
    // FIXME : add dinamic check and remove timers
    // let condition = true;

    // while (condition) {
    //   cy.get(".comparison-rank")
    //     .last()
    //     .then(($num) => {
    //       let resultTarifeTotal = parseInt($num.text(), 10);
    //       let numTarifeTotal = parseInt($tarifeTotal.text(), 10);
    //       if (resultTarifeTotal === numTarifeTotal) {
    //         condition = false;
    //       } else {
    //         cy.get("button").contains("weitere tarife laden").click();
    //       }
    //     });
    // }

    cy.get("button").contains("weitere tarife laden").click();
    cy.wait(10000);
    cy.get(".comparison-rank").contains("60").click();
    cy.get("button").contains("weitere tarife laden").click();
    cy.wait(5000);

    // Check if the total number of tariffs displayed matches the total listed in the Ermittelte Tarife section
    cy.get(".comparison-rank")
      .last()
      .should("be.visible")
      .then(($num) => {
        const resultTarifeTotal = parseInt($num.text(), 10);
        expect(resultTarifeTotal).to.be.equal(tarifeTotal);
      });

    // Check that the weitere Tarife laden button is no longer displayed when all the tariffs are visible
    cy.get("button").contains("weitere tarife laden").should("not.exist");
  }
);
