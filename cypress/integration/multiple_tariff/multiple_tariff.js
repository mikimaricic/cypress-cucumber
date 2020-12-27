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

And("I enter {string} for my area code", (content) => {
  dslCalculatorPage.addAreaCode(content);
});

And("I select the {string} Mbit\\/s bandwidth option", (content) => {
  dslCalculatorPage.addBandwidth(content);
});

And("I click the Jetzt vergleichen button", () => {
  dslCalculatorPage.confirmSearchFilter();
});

Then(
  "I should see the total number of available tariffs listed in the Ermittelte Tarife section",
  () => {
    homePage.waitLoadingOverlay();
    resultPage.getTotalTarifNumber();
  }
);

When("I scroll to the end of the Result List page", () => {
  resultPage.scrollIntoView();
});

Then("I should see only the first 20 tariffs displayed", () => {
  resultPage.numberOfTarifLoaded();
});

When("I click on the button labeled 20 weitere Tarife laden", () => {
  resultPage.loadMoreTarifOptions();
  homePage.waitLoadingOverlay();
});

Then("I should see the next 20 tariffs displayed", () => {
  resultPage.next20TarifLoaded();
});

And(
  "I can continue to load any additional tariffs until all tariffs have been displayed",
  () => {
    resultPage.loadMoreTarifOptions();
    homePage.waitLoadingOverlay();
    resultPage.loadAllTarifOptions();
    resultPage.checkLoadMoreTarifBtnNotVisible();
  }
);
