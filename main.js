const API_URL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getUser(username) {
  try {
    const { data } = await axios(API_URL + username);
    //console.log(data);
    creatUserCard(data);
    getRepos(username);
  } catch (error) {
    //console.log(err);
    creatErrorCard("Aradiginiz Kullanici Bulunamadi...");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});

function creatUserCard(user) {
  const userName = user.name || user.login;
  // biyografi olup olmadigina bak(?), varsa bilgiyi cek, yoksa bosluk birak!!!
  const userBio = user.bio ? `<p>${user.bio}</p>` : "";
  const cardHtml = `
    <div class="card">
    <img
      class="user-image"
      src="${user.avatar_url}"
      alt="${user.name}"
    />
    <div class="user-info">
      <div class="user-name">
        <h2>${user.name}</h2>
        <small>@${user.login}</small>
      </div>
    </div>
    <p>
      ${userBio}
    </p>
    <ul>
      <li>
        <i class="fa-solid fa-user-group"></i> ${user.followers}
        <strong>Followers</strong>
      </li>
      <li>${user.following} <strong>Following</strong></li>
      <li>
        <i class="fa-solid fa-bookmark"></i> ${user.public_repos} <strong>Repository</strong>
      </li>
    </ul>
    <div class="repos" id="repos"></div>
</div>
    `;
  main.innerHTML = cardHtml;
}

function creatErrorCard(msg) {
  const errorHTML = `

    <div class="card">
        <p>${msg}</p>
    </div>

    `;
  main.innerHTML = errorHTML;
}

async function getRepos(username) {
  try {
    const { data } = await axios(API_URL + username + "/repos");
    //console.log(data);
    addReposToCard(data);
  } catch (error) {
    creatErrorCard("Repos verileri yüklenemedi...");
  }
}

function addReposToCard(repos) {
  const reposElemnt = document.getElementById("repos");
  repos.forEach((repo) => {
    const repoLink = document.createElement("a")
    repoLink.href = repo.html_url
    repoLink.target = "-blank"
    repoLink.innerHTML = `
        <i class="fa-solid fa-book-bookmark"></i> ${repo.name} 
        `;
        reposElemnt.appendChild(repoLink);
  });
}
