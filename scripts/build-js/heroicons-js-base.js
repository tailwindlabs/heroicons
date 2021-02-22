const heroiconsLoader = {
  replaceAllIcons: () => {
    const getAttrs = (element) =>
    Array.from(element.attributes).reduce((attrs, attr) => {
      attrs[attr.name] = attr.value;
      return attrs;
    }, {});

    const replaceElement = (element) => {
      const attributes = getAttrs(element);
      const iconName = attributes["data-heroicons"];

      const classNames =
        element.classList.length > 0
          ? element.classList.value.split(" ")
          : null;

      const isOutline =
        attributes["data-type"] && attributes["data-type"] === "outline";

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

    const heroIcons = document.querySelectorAll("i[data-heroicons]");
    for (const element of heroIcons) {
      replaceElement(element);
    }
  }
}

heroiconsLoader.replaceAllIcons();
