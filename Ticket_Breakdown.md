# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here:
---
## Ticket 1: Update Agent Model to include Custom Id field
Description:
Add a new field custom_id to the Agent model to allow Facilities to save their own custom ids for Agents they work with.

### Acceptance Criteria:

- Agent model should have a new field custom_id
- The custom_id field should be optional and not null
- The custom_id field should be unique per Facility
- Existing Agent records should have null value for the custom_id field
- API should allow CRUD operations on the custom_id field
- API should ensure uniqueness of custom_id per Facility

### Implementation Details:
- Add new field to Agent model
- Write migration to add the new column to the database table
- Update existing Agent records to set custom_id to null
- Write API endpoints to allow CRUD operations on custom_id field
- Add validation to ensure uniqueness of custom_id per Facility

Effort Estimate: 4 hours

## Ticket 2: Update getShiftsByFacility to include Custom Agent Id
Description:
Update the getShiftsByFacility function to include the custom id of the Agent assigned to each Shift in its response.

### Acceptance Criteria:

- The getShiftsByFacility function should return the custom id of the Agent along with the existing metadata.
- If a custom id has not been set for an Agent, the database id should be returned instead.

### Implementation Details:
- Update the SQL query in getShiftsByFacility to include custom_id field from Agent model
- Modify the response of getShiftsByFacility to include the custom_id field for each Shift

Effort Estimate: 2 hours

## Ticket 3: Update generateReport to use Custom Agent Id
Description:
Update the generateReport function to use the custom id of the Agent on the reports instead of the internal database id.

### Acceptance Criteria:

- The generateReport function should use the custom id of the Agent on the report if available, else use the database id.
- The report should include the custom id field next to the existing metadata.

Implementation Details:
- Modify the report generation function to include the custom_id field from the Agent model
- Update the report template to include the custom id field
- If the custom_id field is empty, use the internal database id instead.

Effort Estimate: 4 hours

## Ticket 4: Update API Documentation
Description:
Update the API documentation to include details on the new custom_id field.

### Acceptance Criteria:

- The API documentation should include details on the new custom_id field in the Agent model.
- The API documentation should include details on the API endpoints for CRUD operations on custom_id field.
- The API documentation should explain how custom ids will be used in reports.

### Implementation Details:

- Add details on the custom_id field to the Agent model documentation.
- Add details on the API endpoints for CRUD operations on custom_id field to API documentation.
- Explain how custom ids will be used in reports.

Effort Estimate: 1 hour

## Ticket 5: Update the Facilities UI to allow setting of Custom Agent Id
Description:
Add a new feature to the Facilities UI to allow them to set custom ids for Agents they work with.

### Acceptance Criteria:

- A new UI field should be added to the Facilities interface to allow entry of custom id for an Agent.
- Facilities should only be able to set custom ids for Agents they work with.

### Implementation Details:

- Add a new input field to the Facility UI to allow entry of custom ID for an Agent.
- Modify the Facility UI to ensure that Facilities can only set custom IDs for Agents they work with.

Effort Estimate: 2 hours

