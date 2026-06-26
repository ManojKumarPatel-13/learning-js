// -------------------------------------------------------------------------
// 📑 SUB-TOPIC A: "Pure Functions"
// -------------------------------------------------------------------------
// * DEFINITION: A self-contained code unit that acts like a math equation.
// * RULE 1: Identical inputs MUST ALWAYS produce identical outputs.
// * RULE 2: ZERO side-effects. Cannot mutate inputs, cannot alter global scopes,
//   cannot trigger HTTP calls or write to disk internally.

// -------------------------------------------------------------------------
// 📑 SUB-TOPIC B: "Data Immutability"
// -------------------------------------------------------------------------
// * THE PARADIGM: Read-Only state architectures. Never mutate arrays/objects.
// * IMPLEMENTATION: Utilize the spread operator (...) or array methods that 
//   return new allocations (.map(), .filter(), .reduce()).

const baselineConfig = { coreId: "OMEGA", ports: [80, 443] };

// Deep Copy/Immutable Modification:
const secureConfig = {
    ...baselineConfig,
    ports: [...baselineConfig.ports, 8080] // Copying sub-array allocation
};

// -------------------------------------------------------------------------
// 📑 SUB-TOPIC C: "Currying & Function Composition"
// -------------------------------------------------------------------------
// * CURRYING: Deconstructing a multi-argument function into a unary (single argument) chain.
// * COMPOSITION: Creating a data pipe where data flows through a pipeline of pure operations.

const applyTax = (rate) => (amount) => amount * (1 + rate);
const applyDiscount = (discount) => (amount) => amount - discount;

// Specialized reusable partial application presets:
const addVat = applyTax(0.20);
const deductTenBucks = applyDiscount(10);

// Pipe/Composition simulation: Passing state down the line sequentially
const basePrice = 100;
const finalPrice = addVat(deductTenBucks(basePrice)); // Execution flow moves inner-out (right-to-left)