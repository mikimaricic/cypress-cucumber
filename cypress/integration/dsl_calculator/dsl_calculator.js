import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

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
  "I should see a page that lists the available tariffs for my selection",
  () => {
    // wait loading screen overlay
    cy.get(".loading-screen").should("not.exist");

    // VERIFY : At least 5 internet tariffs are displayed
    cy.get(".my-4")
      .find(".comparison-rank")
      .should("exist")
      .and("have.length.at.least", 5);

    // VERIFY : The displayed tariffs provide at least 100 Mbit/s download speed
    cy.get(".internet-speed-download").each(($el, $index, $list) => {
      expect(parseInt($el.text().replace(/\./g, ""), 10)).to.be.at.least(100);
    });
  }
);
