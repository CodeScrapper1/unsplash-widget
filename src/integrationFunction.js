var rootDiv = document.createElement("div");
rootDiv.id = "root";
document.body.appendChild(rootDiv);
var script = document.createElement("script");
script.type = "text/javascript";
script.src =
  "https://res.cloudinary.com/my-umt-final-project/raw/upload/v1715520609/main_h178ds.js";
document.head.appendChild(script);

var link = document.createElement("link");
link.type = "text/css";
link.rel = "stylesheet";
link.href =
  "https://res.cloudinary.com/my-umt-final-project/raw/upload/v1715520593/main_opk6vw.css";
var lastChild = document.head.lastChild;
document.head.insertBefore(link, lastChild.nextSibling);
