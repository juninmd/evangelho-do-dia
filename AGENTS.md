```markdown
# AGENTS.md File Guidelines

These guidelines are designed to ensure high-quality, maintainable, and productive development for all AGENTS.md files within this repository. Adherence to these principles is mandatory for all coding agents.

## 1. DRY (Don't Repeat Yourself)

*   All code should be encapsulated within individual files.
*   Avoid duplicating logic or functionality across multiple files.
*   When a functionality needs to be reused, it should be extracted into a separate, well-documented module.
*   If a solution exists across multiple files, ensure it’s a well-defined, reusable component.

## 2. KISS (Keep It Simple, Stupid)

*   Strive for the shortest, clearest, and simplest solution possible.
*   Avoid unnecessary complexity.
*   Prioritize readability and understandability.
*   Refactor only when necessary, focusing on improved clarity and maintainability.

## 3. SOLID Principles

*   **Single Responsibility Principle:** Each class or module should have one, and only one, reason to change.
*   **Open/Closed Principle:** The system should be open for extension but closed for modification.
*   **Liskov Substitution Principle:**  Subclasses should be substitutable for their base classes without altering the correctness of the program.
*   **Interface Segregation Principle:**  Clients should not be forced to implement interfaces that they do not use.
*   **Dependency Inversion Principle:**  High-level modules should not depend on low-level modules.  Interfaces should dictate implementation.

## 4. YAGNI (You Aren't Gonna Need It)

*   Do not implement features or functionalities that are not currently required.
*   Avoid adding unnecessary complexity or code that is unlikely to be used in the future.
*   Focus on delivering the core functionality and avoid premature optimization.

## 5. Code Structure & Best Practices

*   **Modularization:** Break down complex tasks into smaller, manageable functions and classes.
*   **Naming Conventions:** Follow consistent naming conventions (e.g., camelCase for functions/variables, PascalCase for classes).
*   **Comments:**  Provide clear and concise comments explaining complex logic or assumptions. Comments should not just restate code.
*   **Error Handling:** Implement robust error handling to prevent unexpected crashes and provide informative error messages.
*   **Logging:** Use logging to track events and debug issues.
*   **Testing:**  Write unit tests to verify the functionality of individual code units. All tests should be automatically compiled and executed for each code module.
*   **Data Structures:**  Employ appropriate data structures for efficient data storage and retrieval.
*   **Algorithm Design:** Utilize efficient algorithms and data structures for optimal performance.
*   **Code Style:** Follow a consistent code style using a linter (e.g., ESLint or similar) for automatic code formatting.

## 6. File Size Limits

*   Each file must be no more than 180 lines of code.

## 7. Test Coverage Requirements

*   Achieve a minimum of 80% test coverage.  Coverage will be verified via automated testing.

## 8.  File Organization

*   Files should be organized into logical directories based on functionality or component.
*   Include a README file within each file explaining its purpose and dependencies.

## 9.  Version Control

*   Use a version control system (e.g., Git) for all code.
*   Commit frequently with meaningful messages.
*   Branching strategy - Implement a well-defined branching strategy to support parallel development and feature releases.

## 10.  Documentation

*   Include a `README.md` file within each file describing the purpose, inputs, outputs, and dependencies.
*   Document API endpoints and data structures using standard documentation formats (e.g., Swagger/OpenAPI).

## 11.  Code Review Process

*   All code must be reviewed by at least one other developer before merging.
*   Review focuses on code quality, adherence to principles, and potential bugs.

## 12.  Maintainability

*   Code should be easily readable and understandable by other developers.
*   Use clear and concise language.
*   Avoid unnecessary abbreviations or jargon.

These guidelines are intended to guide development and promote the creation of a high-quality, maintainable AGENTS.md repository.  Regular review and updates of these guidelines are encouraged.
```