import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import * as homePage from "../../pages/HomePage.page";
import * as dslCalculatorPage from "../../pages/DslCalculator.page";
import * as offerDetailPage from "../../pages/OfferDetail.page";

const AREA_CODE = "030";
const NET_BANDWIDTH = "100";

Given("that I can open www.verivox.de", () => {
  homePage.openHomePage();
  homePage.handleCookiesOverlay();
});

When("I navigate to the DSL calculator page", () => {
  homePage.goToDslCalculator();
});

And("I enter 030 for my area code", () => {
  dslCalculatorPage.addAreaCode(AREA_CODE);
});

And("I select the 100 Mbit\\/s bandwidth option", () => {
  dslCalculatorPage.addBandwidth(NET_BANDWIDTH);
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
