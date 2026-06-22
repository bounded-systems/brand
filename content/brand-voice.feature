Feature: Brand voice
  Canonical Bounded Systems copy. These scenarios are the contract: every surface
  (across every repo) must present this wording verbatim. Quoted strings must also
  exist in content/strings.json — the content tool checks both directions.

  Scenario: The org name is exact
    Then surfaces present the name "Bounded Systems"

  Scenario: The tagline is consistent
    Then surfaces present the tagline "Bounded authority for AI agents"

  Scenario: The one-line description is consistent
    Then surfaces present the description "Infrastructure for letting AI agents do real engineering work without handing them unbounded authority."
