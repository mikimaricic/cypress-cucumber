import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

let tarifeTotal = "";
let listLast = "";
let btnLast = "";

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

Then(
  "I should see the total number of available tariffs listed in the Ermittelte Tarife section",
  () => {
    // wait loading screen overlay
    cy.get(".loading-screen").should("not.exist");

    // VERIFY : Get total number of available tariffs listed in the Ermittelte Tarife section an save in variable
    cy.get(".summary-tariff")
      .contains("Tarife")
      .then(($elm) => {
        tarifeTotal = parseInt($elm.text(), 10);
      })
      .should("be.visible");
  }
);

When("I scroll to the end of the Result List page", () => {
  cy.get("button").contains("weitere tarife laden").scrollIntoView();
});

Then("I should see only the first 20 tariffs displayed", () => {
  // VERIFY : That only the first 20 tariffs are displayed
  cy.get(".my-4")
    .find(".comparison-rank")
    .should("exist")
    .and("have.length", 20);
  cy.get(".my-4").find(".comparison-rank").last().should("have.text", "20.");
});

When("I click on the button labeled 20 weitere Tarife laden", () => {
  cy.get("button").contains("weitere tarife laden").click();
});

Then("I should see the next 20 tariffs displayed", () => {
  // wait loading screen overlay
  cy.get(".loading-screen").should("not.exist");

  // VERIFY : That next 20 tariffs are displayed
  cy.get(".my-4")
    .find(".comparison-rank")
    .should("exist")
    .and("have.length", 40);
  cy.get(".my-4").find(".comparison-rank").last().should("have.text", "40.");
});

And(
  "I can continue to load any additional tariffs until all tariffs have been displayed",
  () => {
    // VERIFY : I can continue to load any additional tariffs until all tariffs have been displayed
    // FIXME : add dinamic check and remove timers
    cy.get("button").contains("weitere tarife laden").click();
    // wait loading screen overlay
    cy.get(".loading-screen").should("not.exist");
    cy.get(".comparison-rank").contains("60").should("be.visible");

    // VERIFY : that the final weitere Tarife laden button displays the expected number of tariffs remaining
    cy.get(".my-4")
      .find(".comparison-rank")
      .then(($elm) => {
        listLast = $elm.length;
      });
    cy.get("button")
      .contains("weitere tarife laden")
      .then(($btn) => {
        btnLast = parseInt($btn.text(), 10);
        expect(tarifeTotal - listLast).to.equal(btnLast);
      });

    cy.get("button").contains("weitere tarife laden").click();

    // VERIFY : if the total number of tariffs displayed matches the total listed in the Ermittelte Tarife section
    // wait loading screen overlay
    cy.get(".loading-screen").should("not.exist");
    cy.get(".comparison-rank")
      .last()
      .should("be.visible")
      .then(($num) => {
        const resultTarifeTotal = parseInt($num.text(), 10);
        expect(resultTarifeTotal).to.be.equal(tarifeTotal);
      });

    // VERIFY : that the weitere Tarife laden button is no longer displayed when all the tariffs are visible
    cy.get("button").contains("weitere tarife laden").should("not.exist");
  }
);
