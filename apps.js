/**
 * Get elements
 */
let table_list = document.getElementById("table_list");
let single_davs_data = document.getElementById("single_davs_data");
let add_devs_data = document.getElementById("add_devs_data");
let edit_btn = document.getElementById("edit_btn");
let Skill = document.querySelector("#Skill");

/**
 * Get select option from skill list server
 */
axios.get("http://localhost:3000/devs_skill").then((response) => {
  let skill_list = "";
  response.data.map((skill) => {
    skill_list += `
   <option value="${skill.skill}">${skill.skill}</option>`;
  });

  Skill.insertAdjacentHTML("beforeend", skill_list);
});

/**
 * Add data  to jason server
 */
add_devs_data.addEventListener("submit", function (event) {
  event.preventDefault();
  let name = document.querySelector('input[name ="name"]');
  let Age = document.querySelector('input[name ="Age"]');
  let Photo = document.querySelector('input[name ="Photo"]');
  let Location = document.querySelector('input[name ="Location"]');
  let number = document.querySelector('input[name ="number"]');
  axios
    .post("http://localhost:3000/devs", {
      id: "",
      name: name.value,
      age: Age.value,
      number: number.value,
      skill: Skill.value,
      photo: Photo.value,
      Location: Location.value,
    })
    .then((response) => {
      let name = document.querySelector('input[name ="name"]');
      let Age = document.querySelector('input[name ="Age"]');
      let Photo = document.querySelector('input[name ="Photo"]');
      let Location = document.querySelector('input[name ="Location"]');
      let number = document.querySelector('input[name ="number"]');

      name.value = "";
      Age.value = "";
      Photo.value = "";
      Location.value = "";
      number.value = "";
      get_all_data();
    });
});

/**
 * Get all data from json server
 */
function get_all_data() {
  let show_table = "";
  axios.get("http://localhost:3000/devs").then((response) => {
    // console.log(response.data);

    response.data.map((devs, index) => {
      show_table += `
              
               <tr>
                  <td>${index + 1}</td>
                  <td>${devs.name}</td>
                  <td>${devs.number}</td>
                  <td>${devs.skill}</td>
                  <td>${devs.Location}</td>
                  <td>${devs.age}</td>
        
                  <td data-bs-toggle="modal"
                      data-bs-target="#modal_show"
                      onclick="single_devs_show(${devs.id})">
                    <img 
                      style="width: 50px; height: 35px; object-fit: cover"
                      src=${devs.photo}
                      alt=""
                    />
                  </td>
                  <td>
                    <i onclick="edite_data(${devs.id})"
                      data-bs-toggle="modal"
                      data-bs-target="#modal_edit"
                      class="fa fa-pencil-square-o btn btn-warning"
                      aria-hidden="true"
                    ></i>
                    <i 
                      data-bs-toggle="modal"
                      data-bs-target="#modal_show"
                      onclick="single_devs_show(${devs.id})"
                      class="fa fa-eye btn btn-success"
                      aria-hidden="true"
                    ></i>
                    <i onclick="delete_data(${devs.id})"
                      data-bs-toggle="modal"
                      data-bs-target="#modal_delete"
                      class="fa fa-trash-o btn btn-danger"
                      aria-hidden="true"
                    ></i>
                  </td>
                </tr>
              
              `;
    });
    table_list.innerHTML = show_table;
  });
}
get_all_data();

/**
 * View single data to modal
 * @param {*} id
 */
function single_devs_show(id) {
  axios.get("http://localhost:3000/devs/" + id).then((response) => {
    single_davs_data.innerHTML = `
  
       <div class="card shadow">
          <img class="card-img-top" src= ${response.data.photo} alt="">
          <div class="card-body">
            <h4 class="card-title"> Name : ${response.data.name}</h4>
            <p class="card-text m-0">Location : ${response.data.Location}</p>
            <p class="card-text m-0">Age : ${response.data.age}</p>
            <p class="card-text m-0">Skill : ${response.data.skill}</p>
            <p class="card-text m-0">Number : +6587323710</p>
          </div>
        </div>
  `;
  });
}

/**
 * Edit data
 */
function edite_data(id) {
  let ename = document.querySelector('#edit_form input[name ="name"]');
  let eid = document.querySelector('#edit_form input[name ="id"]');
  let eAge = document.querySelector('#edit_form input[name ="Age"]');
  let ePhoto = document.querySelector('#edit_form input[name ="Photo"]');
  let eLocation = document.querySelector('#edit_form input[name ="Location"]');
  let enumber = document.querySelector('#edit_form input[name ="number"]');
  axios.get("http://localhost:3000/devs/" + id).then((response) => {
    (ename.value = response.data.name),
      (eid.value = response.data.id),
      (eAge.value = response.data.age),
      (ePhoto.value = response.data.photo),
      (eLocation.value = response.data.Location),
      (enumber.value = response.data.number);
  });
}

/**
 * Edit data action
 */

edit_form.addEventListener("submit", function (e) {
  e.preventDefault();
  let ename = document.querySelector('#edit_form input[name ="name"]');
  let eid = document.querySelector('#edit_form input[name ="id"]');
  let eAge = document.querySelector('#edit_form input[name ="Age"]');
  let ePhoto = document.querySelector('#edit_form input[name ="Photo"]');
  let eLocation = document.querySelector('#edit_form input[name ="Location"]');
  let enumber = document.querySelector('#edit_form input[name ="number"]');
  let eskill = document.querySelector("#eSkill");
  axios
    .patch("http://localhost:3000/devs/" + eid.value, {
      id: "",
      name: ename.value,
      age: eAge.value,
      number: enumber.value,
      photo: ePhoto.value,
      Location: eLocation.value,
      number: enumber.value,
      skill: eskill.value,
    })
    .then((response) => {
      ename.value = "";
      eAge.value = "";
      ePhoto.value = "";
      eLocation.value = "";
      enumber.value = "";
      get_all_data();
    });
});

function delete_data(index) {
  let yes = document.querySelector("#modal_delete .yes");
  let no = document.querySelector("#modal_delete .no");
  yes.addEventListener("click", function () {
    axios.delete(`http://localhost:3000/devs/${index}`).then((response) => {
      get_all_data();
      console.log(response);
    });
  });
}
