Feature: Offer details for a selected tariff

  AS A Verivox user
  I WANT TO use offer details for a selected tariff
  SO THAT I can see selected tariff details

  Scenario: Verify offer details for a selected tariff
    Given The same tariff calculation criteria from scenario 1
    And I display the tariff result list page # See screenshot 2
    When I click on any Zum Angebot button to select a tariff offer # Zum Angebot = to the offer
    Then I should see the corresponding offer page for the selected tariff