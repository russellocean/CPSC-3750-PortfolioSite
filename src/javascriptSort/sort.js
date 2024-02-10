// initialize the array
const names = [];

document.addEventListener("DOMContentLoaded", () => {
  document.theform.newname.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      sortNames();
    }
  });
});

function sortNames() {
  // Get the name from the text field
  const theName = document.theform.newname.value.toUpperCase(); // Convert to uppercase
  // Add the name to the array if not empty
  if (theName) {
    names.push(theName);
    // Sort the array
    names.sort();
    // Create a numbered list of names
    const numberedNames = names.map((name, index) => `${index + 1}. ${name}`);
    document.theform.sorted.value = numberedNames.join("\n");
  }
}
