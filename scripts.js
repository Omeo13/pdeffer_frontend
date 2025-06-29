document.querySelectorAll(".plan-learn-more-container").forEach((container) => {
  const trigger = container.querySelector(".learn-more-trigger");
  const tooltip = container.querySelector(".plan-tooltip");

  // Show tooltip
  const showTooltip = () => {
    tooltip.setAttribute("aria-hidden", "false");
    tooltip.style.opacity = "1";
    tooltip.style.transform = "scale(1)";
  };

  // Hide tooltip
  const hideTooltip = () => {
    tooltip.setAttribute("aria-hidden", "true");
    tooltip.style.opacity = "0";
    tooltip.style.transform = "scale(0.9)";
  };

  trigger.addEventListener("mouseenter", showTooltip);
  trigger.addEventListener("focus", showTooltip);

  trigger.addEventListener("mouseleave", hideTooltip);
  trigger.addEventListener("blur", hideTooltip);
});
document.querySelectorAll(".plan-learn-more-container").forEach((container) => {
  const trigger = container.querySelector(".learn-more-trigger");
  const tooltip = container.querySelector(".plan-tooltip");

  // Reference elements for positioning
  const leftPinkBox = document.querySelector(".nb-left");
  const glassBox = document.querySelector(".glass-box-floating-wrapper");
  const greenBoxes = document.querySelector(".green-subtitle-container");

  // ✅ Define this function OUTSIDE of showTooltip
  const updateTooltipPosition = () => {
    if (!leftPinkBox || !glassBox || !greenBoxes) {
      console.log("One or more required elements missing:", {
        leftPinkBox,
        glassBox,
        greenBoxes,
      });
      return;
    }

    const leftBoxRect = leftPinkBox.getBoundingClientRect();
    const left = leftBoxRect.left + leftBoxRect.width + 10;

    const glassRect = glassBox.getBoundingClientRect();
    const greenRect = greenBoxes.getBoundingClientRect();
    // Add scrollY to convert viewport coords to page coords
    const verticalCenter =
      window.scrollY + (glassRect.top + greenRect.bottom) / 2;
    tooltip.style.top = `${verticalCenter - tooltipHeight / 2}px`;

    const tooltipHeight = tooltip.offsetHeight;

    console.log("Calculated tooltip position:", {
      left,
      verticalCenter,
      tooltipHeight,
      top: verticalCenter - tooltipHeight / 2,
    });

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${verticalCenter - tooltipHeight / 2}px`;
  };

  // 👇 This uses the function
  const showTooltip = () => {
    updateTooltipPosition();
    tooltip.setAttribute("aria-hidden", "false");
    tooltip.style.opacity = "1";
    tooltip.style.transform = "scale(1)";
  };

  const hideTooltip = () => {
    tooltip.setAttribute("aria-hidden", "true");
    tooltip.style.opacity = "0";
    tooltip.style.transform = "scale(0.9)";
  };

  // Event listeners
  trigger.addEventListener("mouseenter", showTooltip);
  trigger.addEventListener("focus", showTooltip);
  trigger.addEventListener("mouseleave", hideTooltip);
  trigger.addEventListener("blur", hideTooltip);

  // Reposition tooltip on window resize
  window.addEventListener("resize", () => {
    if (tooltip.getAttribute("aria-hidden") === "false") {
      updateTooltipPosition();
    }
  });
});
