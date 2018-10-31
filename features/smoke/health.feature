Feature: System liveliness and readiness

  Scenario: liveliness Check is OK
    When I go to the system path "liveliness"
    Then the response status is 200
    Then I should see "OK"

  Scenario: readiness Check is OK
    When I go to the system path "readiness"
    Then the response status is 200
    Then I should see "OK"
