import sublinks from "./data.js";

const toggleBtn = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector(".close-btn");
const sideWrapper = document.querySelector(".sidebar-wrapper");
const sidebar = document.querySelector(".sidebar-links");

const linkBtns = [...document.querySelectorAll(".link-btn")];
const submenu = document.querySelector(".submenu");
const hero = document.querySelector(".hero");
const nav = document.querySelector(".nav");

// hide/showwrapper
toggleBtn.addEventListener("click", () => {
  sideWrapper.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  sideWrapper.classList.remove("show");
});

// set side bar
sidebar.innerHTML = sublinks
  .map((item) => {
    const { links, page } = item;
    return `<article>
   <h4>${page}</h4>
   <div class="sidebar-sublinks">
   ${links
     .map((link) => {
       return `<a href="${link.url}">
       <i class="${link.icon}"></i>${link.label}
       </a>
       
       `;
     })
     .join("")}
   </div>
  </article>`;
  })
  .join("");

//   link nav
linkBtns.forEach((btn) => {
  btn.addEventListener("mouseover", (e) => {
    const text = e.currentTarget.textContent;
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;

    const tempPage = sublinks.find(({ page }) => page === text);
    if (tempPage) {
      const { page, links } = tempPage;
      submenu.classList.add("show");
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;

      //   OPTIONAL
      let columns = "col-2";
      if (links.length === 3) {
        columns = "col-3";
      }
      if (links.length > 3) {
        columns = "col-4";
      }
      submenu.innerHTML = `
       <section>
       <h4>${page}</h4>
        <div class="submenu-center col-2">
        ${links
          .map((link) => {
            return `<a href="${link.url}">
            <i class= "${link.icon}"></i> ${link.label}
            </a>`;
          })
          .join("")}
        </div>
 

       </section>
      `;
    }
  });
});

// hero
hero.addEventListener("mouseover", function (e) {
  submenu.classList.remove("show");
});

nav.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("link-btn"))
    submenu.classList.remove("show");
});
