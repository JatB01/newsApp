const APIKey = "5f7ea61110b042d3a0ad010c7c83238e";
var url = `https://newsapi.org/v2/top-headlines?country=gb&apiKey=${APIKey}`;
const body = document.getElementById("all");

//time variables and functions
var today = new Date();
var getDate = function() {
  return new Date().toString();
};
var GMT = function() {
  return new Date().toString().substring(0, getDate().lastIndexOf("GMT"));
};
var now = today.toISOString();
var time = document.getElementById("timenow");
function setTime() {
  time.textContent = GMT();
  setTimeout(setTime, 500);
}

// retrives the API and creates dynamic card elements using forEach
function getData() {
  articles = () => {
    return fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error("HTTP error " + res.status);
        }
        return res.json();
      })
      .then(post => post.articles);
  };
  articles().then(post => {
    // console.log(post);
    setTime();
    post.forEach((element, i) => {
      const div = document.createElement("div");
      div.setAttribute("class", "card my-2 mx-2");
      const div2 = document.createElement("div");
      div2.setAttribute("class", "card-body");
      const img = document.createElement("img");
      img.setAttribute("class", "card-img-top");
      img.setAttribute("src", element.urlToImage);
      img.setAttribute("onerror", "this.src='img/news.jpg'");
      const IMGa = document.createElement("a");
      IMGa.setAttribute("href", element.url);
      IMGa.setAttribute("target", "popup");
      IMGa.setAttribute(
        "onclick",
        `window.open("${
          element.url
        }", "popup", "width=600, height=600,scrollbars=no, resizeable=no"); return false;`
      );
      const h5 = document.createElement("h5");
      h5.setAttribute("class", "card-title mb-1");
      const p1 = document.createElement("p");
      p1.setAttribute("class", "card-text mb-2");
      p1.setAttribute("id", "desc");
      const a = document.createElement("a");
      a.setAttribute("class", "btn btn-info btn-sm mt-3");
      a.setAttribute("id", "btn");
      a.setAttribute("href", element.url);
      a.setAttribute("target", "popup");
      a.setAttribute(
        "onclick",
        `window.open("${
          element.url
        }", "popup", "width=600, height=600,scrollbars=no, resizeable=no"); return false;`
      );
      const source = document.createElement("p");
      source.setAttribute("class", "source");
      const time = document.createElement("p");
      time.setAttribute("id", "time");
      h5.textContent = element.title;
      // .substring(0, 50) + "...";
      p1.textContent = element.description;
      // .substring(0, 150) + "...";
      a.textContent = "Full Article";
      source.textContent = element.source.name;
      var publishedTime = new Date(element.publishedAt);
      var Timepassed = new Date(today - publishedTime).getMinutes();
      time.textContent = `${Timepassed} min ago`;
      body.appendChild(div);
      div.appendChild(IMGa);
      IMGa.appendChild(img);
      div.appendChild(div2);
      div2.appendChild(h5);
      div2.appendChild(p1);
      div2.appendChild(a);
      div2.appendChild(source);
      div2.appendChild(time);
    });
  });
}
getData();

//deletes all the dynamically created elements
function clearData() {
  while (body.firstElementChild) {
    body.removeChild(body.firstElementChild);
  }
}

//resets url to selected category
function changePage(evt) {
  clearData();
  url = `https://newsapi.org/v2/top-headlines?country=gb&category=${evt.target.id.toLowerCase()}&apiKey=${APIKey}`;
  getData();
  // time.textContent = GMT;
  //   highlights selected element
  var parent = evt.target.parentElement;
  var children = parent.childNodes;
  for (var x = 0; x < children.length; x++) {
    children[x].style = "font-weight: normal";
  }
  evt.target.style = "font-weight: bold";
}

// event listeners
const business = document.getElementById("business");
const hl = document.getElementById("hl");
const health = document.getElementById("health");
const sports = document.getElementById("sports");
const tech = document.getElementById("technology");
const et = document.getElementById("entertainment");
business.addEventListener("click", changePage);
hl.addEventListener("click", changePage);
health.addEventListener("click", changePage);
sports.addEventListener("click", changePage);
tech.addEventListener("click", changePage);
et.addEventListener("click", changePage);
