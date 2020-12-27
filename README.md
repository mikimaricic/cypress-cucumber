# cypress-cucumber

## Pre-requisites:

Node.js:

- https://nodejs.org/en/download/

Visual Studio Code:

- https://code.visualstudio.com/download

## Steps to use this project:

Download or clone repo:

- https://github.com/mikimaricic/cypress-cucumber.git

Install dependencies by running the following command in terminal (from inside your app directory i.e. where package.json is):

```
npm install
```

## Steps how to run test:

Run all 3 scenarios from command line with this command (be positioned in this folder: cypress-cucumber):

```
npx cypress run --spec "cypress/integration/\*.feature"
```

The result should be:

```
     Spec                                              Tests  Passing  Failing  Pending  Skipped
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ ✔  dsl_calculator.feature                   00:09        1        1        -        -        - │
├────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ✔  multiple_tariff.feature                  00:13        1        1        -        -        - │
├────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ✔  offer_deatils.feature                    00:10        1        1        -        -        - │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
  ✔  All specs passed!                        00:33        3        3        -        -        -
```

Run Cypress test UI from the command line with this command (be positioned in this folder: cypress-cucumber):

```
npx cypress open
```

Cypress UI should open like in the screenshot below:

- https://ibb.co/tDpJY2z

You can manually run the test by clicking one of the .feature test files then you should see test execution (see screenshot):

- https://ibb.co/wcKX3pY

## Reports:

JSON:

- Moch JSON reports can be found here: cypress/reports/mocha

Screenshots:

- Screenshots can be found here: cypress/screenshots

Videos:

- Video .mp4 files can be found here: cypress/screenshots
