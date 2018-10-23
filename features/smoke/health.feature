Feature: System liveliness and readiness

  Scenario: Health Check is OK
    Given('I am on the homepage', visitHomepage);
    When I visit "liveliness"
    Then I should see "ok"

    # Scenario: liveliness Check is OK
    #   When I go to the system path "liveliness"
    #   Then I should see "It's alive"
    #
    # Scenario: readiness Check is OK
    #   When I go to the system path "readiness"
    #   Then I should see "ok"
