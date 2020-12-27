import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import * as homePage from "../../pages/HomePage.page";
import * as dslCalculatorPage from "../../pages/DslCalculator.page";
import * as resultPage from "../../pages/Result.page";

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

Then(
  "I should see a page that lists the available tariffs for my selection",
  () => {
    homePage.waitLoadingOverlay();
    resultPage.minLoadedInternetTarifs();
    resultPage.minDownloadSpeed();
  }
);
