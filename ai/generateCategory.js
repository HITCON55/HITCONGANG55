// Simple rule-based category generator (placeholder for Gemini integration).
// Input: { title, description }
// Output: string category

function generateCategory({ title = "", description = "" } = {}) {
  const text = (title + " " + description).toLowerCase();

  if (text.includes("garbage") || text.includes("trash") || text.includes("bin")) {
    return "Garbage";
  }
  if (text.includes("pothole") || text.includes("road") || text.includes("asphalt")) {
    return "Road / Pothole";
  }
  if (text.includes("water") || text.includes("flood") || text.includes("leak")) {
    return "Water";
  }
  if (text.includes("light") || text.includes("streetlight") || text.includes("lamp")) {
    return "Broken streetlight";
  }
  if (text.trim().length === 0) {
    return "Uncategorized";
  }
  return "Other";
}

// Quick test when run directly
if (require.main === module) {
  const sample = { title: "Broken light on 5th", description: "The streetlight is broken for two nights." };
  console.log("Test sample ->", generateCategory(sample));
}

module.exports = { generateCategory };
