// ----------------------------------------------------------------------------
// TOPIC: THE TRUTHY vs FALSY MATRIX & BALANCING FALLBACKS
// ----------------------------------------------------------------------------
// - Falsy Checklist: false, 0, -0, BigInt 0n, "", null, undefined, NaN.
// - Surprise Truthy Checklist: "0", 'false', " ", [], {}, function(){}.
// - Nullish Coalescing (??): A safety operator that ONLY triggers fallbacks if 
//   the value is strictly null or undefined (completely ignoring 0 or "").

// ----------------------------------------------------------------------------
// DEVELOPMENT SCENARIO: PROFILE SETUP & DATABASE FALLBACKS
// PROBLEM: A user profile page displays information from a database API. 
// If data is completely missing (null/undefined), we need a fallback name. 
// If the user has 0 posts, we must show 0, not run the fallback!
// ----------------------------------------------------------------------------

const dbUsername = ""; // User cleared their name input
const dbPostCount = 0; // User has created zero posts
const dbBio = null;    // Database entry is completely missing

// TRAP 1: Using OR (||) for fallbacks
// '||' returns the first TRUTHY value it sees. It considers "" and 0 as false!
const displayName = dbUsername || "Anonymous Guest";
const displayPosts = dbPostCount || 10; // 🛑 BUG! Changes legitimate 0 posts to 10.

console.log("--- THE OR (||) OPERATOR OUTCOMES ---");
console.log(`Username: ${displayName}`); // "Anonymous Guest" (Acceptable fallback)
console.log(`Post Count: ${displayPosts}`); // 10 (Wrong! User actually has 0 posts)

// FIX: Using Nullish Coalescing (??)
// '??' only cares if the value is null or undefined. It treats "" and 0 as perfectly valid!
const safePosts = dbPostCount ?? 10;
const safeBio = dbBio ?? "No bio written yet.";

console.log("\n--- THE NULLISH COALESCING (??) OPERATOR OUTCOMES ---");
console.log(`Safe Post Count: ${safePosts}`); // ✅ 0 (Preserved successfully!)
console.log(`Safe Bio: ${safeBio}`);          // "No bio written yet."


// ----------------------------------------------------------------------------
// LOGIC / DSA PUZZLE: SAFE DEEP ARTIFACT CHECKER
// PROBLEM: Write an evaluation routine to safely check if a highly nested database 
// object has a valid array before running operations on it. If you try to check 
// the length of an array that doesn't exist, the script crashes!
// ----------------------------------------------------------------------------
console.log("\n--- LOGIC PUZZLE: SAFE DATA CHECKER ---");

const serverResponse = {
    status: "Success",
    data: {
        // userList is missing or null because no users signed up today
        userList: null
    }
};

// SHORT-CIRCUIT EVALUATION (&&):
// The '&&' operator evaluates from left to right. The moment it hits a falsy value, 
// it short-circuits and stops executing instantly, returning that falsy value.
if (serverResponse.data && serverResponse.data.userList && serverResponse.data.userList.length > 0) {
    console.log("Processing user list data...");
} else {
    // ✅ SAFE: The line above short-circuited at userList (null) instead of trying 
    // to read '.length', which would have crashed the single thread!
    console.log("Safe Exit: User list data is empty or completely missing.");
}


// ----------------------------------------------------------------------------
// INTERVIEW TRAP: THE EMPTY ARRAY/OBJECT CHECK
// ----------------------------------------------------------------------------
const trackedLogs = [];

if (trackedLogs) {
    // 💡 WHY THIS RUNS: An empty array [] is structurally TRUTHY!
    console.log("Warning: This condition evaluates to true, even though the array is empty.");
}

// How to properly check if an array is truly empty:
if (trackedLogs.length === 0) {
    console.log("Success: Array verified to be empty by checking its length property.");
}

const configurationObj = {};
// How to properly check if an object is truly empty:
if (Object.keys(configurationObj).length === 0) {
    console.log("Success: Object verified to be empty by turning its keys into a length array.");
}