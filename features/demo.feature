Feature: Sauce Demo test
Scenario: Verify more than forty total price
    Given I navigate to login page
    When User login with "standard_user" and "secret_sauce"
    Then Login is successful
    Then Add products in cart from csv file "product_over40.csv"
    Then Products are added in cart
    Then Navigate to cart page
    Then Remove a product from cart
    Then Click On Checkout
    Then Provide user detail and select continue
    Then Verify total prices is more than limit
    Then Click Finish Button
    Then Click Back Home Button
    Then Logout Application

Scenario: Verify less than forty total price
    Given I navigate to login page
    When User login with "standard_user" and "secret_sauce"
    Then Login is successful
    Then Add products in cart from csv file "product_under40.csv"
    Then Products are added in cart
    Then Navigate to cart page
    Then Remove a product from cart
    Then Click On Checkout
    Then Provide user detail and select continue
    Then Verify total prices is less than limit
    Then click Cancel Button