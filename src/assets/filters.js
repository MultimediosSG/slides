const $filter = document.querySelector("#filter");
const $colors = document.querySelector("#colors");
const $fusion = document.querySelector("#fusion");
const $image = document.querySelector("#filter-image");

const FILTERS = [
  "none",
  "grayscale(100%)",
  "blur(5px)",
  "sepia(100%)",
  "saturate(200%)",
  "opacity(25%)",
  "brightness(200%)",
  "contrast(200%)",
  "hue-rotate(0.5turn)",
  "invert(100%)"
];

const FUSIONS = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity"
];

FILTERS.forEach(filter => $filter.insertAdjacentHTML("beforeend", `<option>${filter}</option>`));
$filter.addEventListener("change", (ev) => {
  $image.style.setProperty("filter", $filter.selectedOptions[0].value);
});

["transparent", "red", "green", "blue"].forEach(color => $colors.insertAdjacentHTML("beforeend", `<option>${color}</option>`));
$colors.addEventListener("change", (ev) => {
  $image.style.setProperty("background-color", $colors.selectedOptions[0].value);
});

FUSIONS.forEach(fusion => $fusion.insertAdjacentHTML("beforeend", `<option>${fusion}</option>`));
$fusion.addEventListener("change", (ev) => {
  $image.style.setProperty("background-blend-mode", $fusion.selectedOptions[0].value);
});