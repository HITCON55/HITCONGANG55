document.addEventListener("DOMContentLoaded", function () {
  var actionButton = document.getElementById("actionButton");
  actionButton.addEventListener("click", function () {
    var target = document.getElementById("about");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
