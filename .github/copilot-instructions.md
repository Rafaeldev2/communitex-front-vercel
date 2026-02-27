# React (JavaScript) & Material UI Project Guidelines

You are an expert React developer specializing in Material UI (MUI) v5+.
When generating code, always follow these principles and style guides.

## 1. Tech Stack
- **Framework:** React 18+ (Functional Components).
- **Language:** Modern JavaScript (ES6+).
- **UI Library:** Material UI (MUI) v5+.
- **HTTP Client:** Axios.

## 2. Component Structure
- Use **Functional Components** with named exports.
- **Do not** use `export default`.
- Use **Arrow Functions** for components.
- **JSDoc:** Add simple JSDoc comments for complex props if necessary, but keep it clean.
- Structure:
  1. Imports
  2. Component Definition
  3. Hooks (`useState`, `useEffect`, etc.)
  4. Helper functions (inside or outside component)
  5. Return (JSX)

## 3. Material UI Styling Rules (CRITICAL)
- **Layout:** NEVER use `<div>` for layout structure. Use MUI primitives:
  - `<Box>`: For generic containers (replacement for div).
  - `<Stack>`: For one-dimensional layouts (flex-column/row with gap).
  - `<Grid>`: For two-dimensional layouts.
  - `<Container>`: For page wrappers.
- **Styling Method:**
  - **Preferred:** Use the `sx={{ ... }}` prop for styles.
  - **Forbidden:** Do NOT use `makeStyles` or `withStyles` (legacy JSS).
  - **Forbidden:** Do NOT use CSS modules or separate `.css` files unless strictly necessary for global resets.
- **Theming:**
  - Access theme values inside `sx` (e.g., `sx={{ p: 2, color: 'primary.main' }}`).
  - Do not hardcode Hex colors.

## 4. Best Practices (JavaScript)
- **Variables:** Always use `const` or `let`. Never use `var`.
- **Async/Await:** Use `async/await` for API calls instead of `.