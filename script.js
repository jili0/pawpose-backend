// VARIABLES
let animals =
  (localStorage.getItem("animals") &&
    JSON.parse(localStorage.getItem("animals"))) ||
  [];
let BACKEND_DOMAIN = "http://localhost:3000";

// FUNCTIONS - admin helper function
const updateSingleAnimalInStorage = (animalId, data) => {
  const animalsCopie = animals.map((animal) =>
    animal._id === animalId ? data : animal
  );
  localStorage.setItem("animals", JSON.stringify(animalsCopie));
  document.location.reload();
};

const updateAllAnimalsInStorage = (data) => {
  localStorage.setItem("animals", JSON.stringify(data));
  animals = JSON.parse(localStorage.getItem("animals"));
  document.location.reload();
};

const fetchAndUpdateAnimals = () => {
  fetch(`${BACKEND_DOMAIN}/admin/get/`, {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("animals", JSON.stringify(data));
      animals = JSON.parse(localStorage.getItem("animals"));
    })
    .catch((err) => console.error("Error", err));
};

// FUNCTIONS - admin main functions
const updateAdminUIWithAnimals = () => {
  const table = document.querySelector("tbody");
  const actions = document.querySelector("#actions");

  fetchAndUpdateAnimals();
  animals &&
    animals.forEach((animal) => {
      const { _id, name, desc, reserved } = animal;
      const tr = document.createElement("tr");
      tr.id = _id;
      tr.innerHTML = `<td>${name}</td><td>${reserved}</td><td>${desc}</td><td data-id="${_id}">${actions.innerHTML}</td>`;
      table.append(tr);
    });
};

const add = () => {
  event.preventDefault();
  const nameInputValue = document.querySelector("#name").value;
  const descInputValue = document.querySelector("#desc").value;

  fetch(`${BACKEND_DOMAIN}/admin/post/single`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: nameInputValue, desc: descInputValue }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      alert("successfully added animal!");
      const newAnimals = [...animals, data];
      updateAllAnimalsInStorage(newAnimals);
    })
    .catch((err) => console.error("Error", err));
};

const remove = (el) => {
  const animalId = el.parentElement.dataset.id;
  fetch(`${BACKEND_DOMAIN}/admin/delete/${animalId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(() => {
      const animalsCopie = animals.filter((animal) => animal._id !== animalId);
      updateAllAnimalsInStorage(animalsCopie);
    })
    .catch((err) => console.error("Error", err));
};

const reserve = (el) => {
  const animalId = el.parentElement.dataset.id;
  const { reserved } = animals.find((a) => a._id == animalId);
  fetch(`${BACKEND_DOMAIN}/admin/patch/${animalId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reserved: !reserved }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      updateSingleAnimalInStorage(animalId, data);
    })
    .catch((err) => console.error("Error", err));
};

const edit = (el) => {
  const bg = document.querySelector("#backdrop");
  const modal = document.querySelector("#modal");

  bg.classList.remove("hide");
  modal.classList.remove("hide");
  const animalId = el.parentElement.dataset.id;
  modal.dataset.id = animalId;
  const animal = animals.find((a) => a._id == animalId);
  document.querySelector("#edit-name").value = animal.name;
  document.querySelector("#edit-desc").value = animal.desc;
};

const doEdit = () => {
  const editName = document.querySelector("#edit-name");
  const editDesc = document.querySelector("#edit-desc");
  const modal = document.querySelector("#modal");

  const animalId = modal.dataset.id;
  const animal = animals.find((a) => a._id == animalId);
  const newAnimal = { ...animal, name: editName.value, desc: editDesc.value };
  fetch(`${BACKEND_DOMAIN}/admin/put/${animalId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAnimal),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => updateSingleAnimalInStorage(animalId, data));
};

// FUNCTIONS - index
const cardify = (animal) => {
  const cards = document.querySelector("#cards");
  const tmpl = document.querySelector("#card");
  const element = tmpl.content.cloneNode(true);
  element.querySelector(".name").innerText = animal.name;
  element.querySelector(".desc").innerText = animal.desc;
  element.querySelector(".hearts").innerText = animal.hearts;
  cards.append(element);
};

if (document.body.getAttribute("data-file") === "admin") {
  updateAdminUIWithAnimals();
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      !bg.classList.contains("hide") &&
      !modal.classList.contains("hide")
    ) {
      bg.classList.add("hide");
      modal.classList.add("hide");
    }
  });
} else {
  animals.forEach(cardify);
}
