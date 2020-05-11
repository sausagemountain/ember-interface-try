import { modifier } from "ember-modifier";

export default modifier((element, [callback]) => {
  let result = null;
  function handleClick(event) {
    if (!element.contains(event.target)) {
      result = callback();
    }
  }

  setTimeout(() => {
    document.addEventListener("click", handleClick);
  }, 100)

  return () => {
    document.removeEventListener("click", handleClick);
    return result
  };
});
