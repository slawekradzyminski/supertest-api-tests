## Security testy

Tested application has 2 roles - ADMIN and USER

For each secured endpoint we should have the following security test:
- request without JWT token should return 401/403
- each endpoint should be queried with each role
- for roles who have access to queried endpoint we expect 200
- for roles who don't have access to queried endpoint we expect 401/403