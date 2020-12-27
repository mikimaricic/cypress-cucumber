Feature: Offer details for a selected tariff

  AS A Verivox user
  I WANT TO use offer details for a selected tariff
  SO THAT I can see selected tariff details

  Scenario: Verify offer details for a selected tariff
    Given that I can open www.verivox.de
    When I navigate to the DSL calculator page
    And I enter 030 for my area code
    And I select the 100 Mbit/s bandwidth option
    And I click the Jetzt vergleichen button
    Then I display the tariff result list page
    When I click on any Zum Angebot button to select a tariff offer
    Then I should see the corresponding offer page for the selected tariff