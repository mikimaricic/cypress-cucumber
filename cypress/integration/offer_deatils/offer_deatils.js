import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import * as homePage from "../../pages/HomePage.page";
import * as dslCalculatorPage from "../../pages/DslCalculator.page";
import * as offerDetailPage from "../../pages/OfferDetail.page";

const NET_BANDWIDTH = "100";

Given("that I can open www.verivox.de", () => {
  homePage.openHomePage();
  homePage.handleCookiesOverlay();
});

When("I navigate to the DSL calculator page", () => {
  homePage.goToDslCalculator();
});

And("I enter {string} for my area code", (areaCode) => {
  dslCalculatorPage.addAreaCode(areaCode);
});

And("I select the {string} Mbit\\/s bandwidth option", (bandwidth) => {
  dslCalculatorPage.addBandwidth(bandwidth);
});

And("I click the Jetzt vergleichen button", () => {
  dslCalculatorPage.confirmSearchFilter();
});

Then("I display the tariff result list page", () => {
  offerDetailPage.handleTarifeResultPage;
});

When("I click on any Zum Angebot button to select a tariff offer", () => {
  offerDetailPage.seeTarifeDetails();
});

Then(
  "I should see the corresponding offer page for the selected tariff",
  () => {
    offerDetailPage.checkOfferDetails();
  }
);
