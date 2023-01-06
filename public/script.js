const ctnCards = document.getElementById("ctn-cards");

function getUsers() {

  fetch("/users")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
      const cardTemplate = document.querySelector("template");
      const card = cardTemplate.content.cloneNode(true);
      card.querySelector("h4").innerText = user.name;
      card.querySelector("p").innerText = user.email;
      card.querySelector("button").addEventListener("click", () => userDelete(user.id));
      ctnCards.appendChild(card);
      const divs = document.querySelectorAll('.card');
      divs[divs.length-1].setAttribute('id', `id-${user.id}`);
      });
    });
}

function register(){

  const _data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value
    }

    fetch('/user', {
      method: "POST",
      body: JSON.stringify(_data),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => 
        { if (response.status===201) {
            return response.json()
        } else {
            return Promise.reject('Erro inserindo dados');
            }
        })    
    .then((data) => {
      data.forEach((user) => {
        const cardTemplate = document.querySelector("template");
        const card = cardTemplate.content.cloneNode(true);
        card.querySelector("h4").innerText = user[0].name;
        card.querySelector("p").innerText = user[0].email;
        card.querySelector("button").addEventListener("click", () => userDelete(user[0].id));
        ctnCards.appendChild(card);
        const divs = document.querySelectorAll('.card');
        divs[divs.length-1].setAttribute('id', `id-${user[0].id}`);
        })
    })
    .catch(function (err) { console.log(err)
    });
}

function userDelete(_id) {

  fetch(`/user/${_id}`, {
      method: "DELETE",
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => 
        { if (response.status===200) {
            return response.json()
        } else {
            return Promise.reject('Erro excluindo usuário');
            }
        })    
    .then((data) => {
      data.forEach((user) => {
        const node = document.getElementById(`id-${user[0].id}`);
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      })
    })
    .catch(function (err) { console.log(err)
    });

}

getUsers();