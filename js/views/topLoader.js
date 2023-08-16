export const displayTopLoader = (isLoading) => {
  const loader = document.querySelector(".loading-line");
  loader.style.display = isLoading ? "block" : "none";
};
