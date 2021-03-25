const heroiconsLoader = {
  replaceAllIcons: () => {
    const replaceElement = (element) => {
      const iconName = element.dataset.heroicons;

      const classNames =
        element.classList.length > 0
          ? element.classList.value.split(" ")
          : null;

      const isOutline =
        element.dataset.iconType && element.dataset.iconType === "outline";

      const svg = isOutline
        ? outline[iconName]
        : solid[iconName];
  
      const span = document.createElement("span");
      if (classNames !== null) {
        span.classList.add(...classNames);
      }

      span.innerHTML = svg;
  
      element.replaceWith(span, element);
      element.remove();
    };

    const heroIcons = document.querySelectorAll("[data-heroicons]");
    for (const element of heroIcons) {
      replaceElement(element);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  heroiconsLoader.replaceAllIcons();
})
