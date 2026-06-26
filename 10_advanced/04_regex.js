// -------------------------------------------------------------------------
// 📑 SUB-TOPIC A: "The Flag Modifiers"
// -------------------------------------------------------------------------
// * /pattern/g  -> Global: Finds all matches in a string instead of stopping at the first.
// * /pattern/i  -> Insensitive: Ignores uppercase vs lowercase mutations.
// * /pattern/m  -> Multiline: Treats boundary anchors (^ and $) as matching individual lines.

// -------------------------------------------------------------------------
// 📑 SUB-TOPIC B: "Capturing Groups vs Full Matches"
// -------------------------------------------------------------------------
// * Executing string.match(regex) returns a structured result array:
//   - Index [0]: Contains the entire substring that matched the absolute pattern.
//   - Index [1]: Contains ONLY the text trapped inside the first set of parentheses ().
//   - Index [2]: Contains text trapped inside the second set of parentheses (), etc.

const logData = "ERROR: [Auth_Service] Connection dropped.";
const parserRegex = /(ERROR|WARN):\s\[(\w+)\]/; 

const parsedResult = logData.match(parserRegex);

// Breakdown of array tracking slots:
// parsedResult[0] => "ERROR: [Auth_Service]" (The entire sequence)
// parsedResult[1] => "ERROR"                (Isolated via Group 1)
// parsedResult[2] => "Auth_Service"         (Isolated via Group 2)

// -------------------------------------------------------------------------
// 📑 KEY SYNTAX TOKENS FOR HIGHLIGHTING ENGINES:
// -------------------------------------------------------------------------
// * \s  -> Matches any single whitespace character (spaces, tabs, line breaks).
// * \b  -> Word Boundary: Assures a word starts or ends precisely at this anchor.
// * []  -> Character Class: Matches any single character enclosed within the boxes.
// * ^   -> Start Anchor: Assures the pattern matches from the absolute start line.