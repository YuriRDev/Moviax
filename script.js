let open = false;

const openMenu = () => {
  if (open) {
    document.getElementsByClassName("mobile")[0].style = "display: none";
    document.getElementsByClassName("header")[0].style =
      "background-color: rgba(16, 17, 20, 0.8)";
  } else {
    document.getElementsByClassName("mobile")[0].style = "display: flex";
    document.getElementsByClassName("header")[0].style =
      "background-color: #101114";
  }
  open = !open;
};

const closeMenu = () => {
  document.getElementsByClassName("mobile")[0].style = "display: none";
  document.getElementsByClassName("header")[0].style =
    "background-color: rgba(16, 17, 20, 0.8)";
  open = false;
};
