Feature: Multiple tariff result page

  AS A Verivox user
  I WANT TO use the multiple tariff result pages
  SO THAT I can choose best tariff option

  Scenario: Load multiple tariff result pages
    Given the same tariff calculation criteria from scenario 1
    When I display the tariff Result List page
    Then I should see the total number of available tariffs listed in the Ermittelte Tarife section
    When I scroll to the end of the Result List page
    Then I should see only the first 20 tariffs displayed
    When I click on the button labeled 20 weitere Tarife laden
    Then I should see the next 20 tariffs displayed
    And I can continue to load any additional tariffs until all tariffs have been displayed