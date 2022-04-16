console.log("hello!");

$(function () {
  $(".carousel").carousel({ interval: 100 });
});

const previ = () => {
  console.log("prev!");
  $(".carousel").carousel("prev");
};

const next = () => {
  console.log("prev!");
  $(".carousel").carousel(3);
};
