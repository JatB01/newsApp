const APIKey = "5f7ea61110b042d3a0ad010c7c83238e";
var url = `https://newsapi.org/v2/top-headlines?country=gb&apiKey=${APIKey}`;
const body = document.getElementById("all");

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
    post.forEach((element, i) => {
      const div = document.createElement("div");
      div.setAttribute("class", "card my-4 mx-2");
      const div2 = document.createElement("div");
      div2.setAttribute("class", "card-body");
      const img = document.createElement("img");
      img.setAttribute("class", "card-img-top");
      img.setAttribute("src", element.urlToImage);
      img.setAttribute("onerror", "this.src='img/news.jpg'");
      const h5 = document.createElement("h5");
      h5.setAttribute("class", "card-title mb-5");
      const p1 = document.createElement("p");
      p1.setAttribute("class", "card-text");
      const a = document.createElement("a");
      a.setAttribute("class", "btn btn-info btn-sm mt-5");
      a.setAttribute("id", "btn");
      a.setAttribute("href", element.url);
      const source = document.createElement("p");
      source.setAttribute("class", "source");
      h5.textContent = element.title.substring(0, 50) + "...";
      p1.textContent = element.description;
      a.textContent = "Full Article";
      source.textContent = element.source.name;
      body.appendChild(div);
      div.appendChild(img);
      div.appendChild(div2);
      div2.appendChild(h5);
      // div2.appendChild(p1);
      div2.appendChild(a);
      div2.appendChild(source);
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

//esets url to selected category
function changePage(evt) {
  clearData();
  url = `https://newsapi.org/v2/top-headlines?country=gb&category=${evt.target.id.toLowerCase()}&apiKey=${APIKey}`;
  getData();
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
