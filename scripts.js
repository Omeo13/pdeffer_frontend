document.addEventListener("DOMContentLoaded", () => {
  console.log(
    "Number of .plan-learn-more-container elements found:",
    document.querySelectorAll(".plan-learn-more-container").length
  );

  document
    .querySelectorAll(".plan-learn-more-container")
    .forEach((container) => {
      const trigger = container.querySelector(".learn-more-trigger");
      const tooltip = container.querySelector(".plan-tooltip");

      // Position tooltip so top-right corner is fixed at (23, 4)
      const updateTooltipPosition = () => {
        if (!tooltip) return;

        const tooltipWidth = tooltip.offsetWidth;
        const fixedRightX = 23; // Right edge X of tooltip (px)
        const fixedTopY = 4; // Top edge Y of tooltip (px)

        // Calculate left so that tooltip's right edge ends at fixedRightX
        const left = fixedRightX - tooltipWidth;

        tooltip.style.position = "fixed";
        tooltip.style.top = `${fixedTopY}px`;
        tooltip.style.left = `${left}px`;
        tooltip.style.right = "auto";
        tooltip.style.bottom = "auto";
        tooltip.style.maxWidth = "300px";
        tooltip.style.zIndex = 1000;

        console.log(
          `Tooltip anchored top-right at x=${fixedRightX}, y=${fixedTopY}. Left=${left}, Width=${tooltipWidth}`
        );
      };

      const showTooltip = () => {
        console.log("showTooltip triggered for:", trigger);
        updateTooltipPosition();
        tooltip.setAttribute("aria-hidden", "false");
        tooltip.style.opacity = "1";
        tooltip.style.transform = "scale(1)";
        tooltip.style.pointerEvents = "auto";
      };

      const hideTooltip = () => {
        console.log("hideTooltip triggered for:", trigger);
        tooltip.setAttribute("aria-hidden", "true");
        tooltip.style.opacity = "0";
        tooltip.style.transform = "scale(0.9)";
        tooltip.style.pointerEvents = "none";
      };

      // Attach event listeners for mouse and keyboard
      trigger.addEventListener("mouseenter", showTooltip);
      trigger.addEventListener("focus", showTooltip);
      trigger.addEventListener("mouseleave", hideTooltip);
      trigger.addEventListener("blur", hideTooltip);

      // Adjust tooltip position on window resize if visible
      window.addEventListener("resize", () => {
        if (tooltip.getAttribute("aria-hidden") === "false") {
          updateTooltipPosition();
        }
      });
    });
});
