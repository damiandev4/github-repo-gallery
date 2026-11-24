const userData = document.querySelector(".user-data");
const username = "damiandev4";
const repoList = document.querySelector(".repo-list")

const gitUserInfo = async function () { // create and name an async function to fetch information from your GitHub profile
  const userInfo = await fetch(`https://api.github.com/users/${username}`); // using the GitHub API address: https://api.github.com. Target the “users” endpoint and use a template literal to add the global username variable to the endpoint: users/${username} // using the GitHub API address: https://api.github.com. Target the “users” endpoint and use a template literal to add the global username variable to the endpoint: users/${username} (add “$” in front of variable name to create a placeholder).
  const data = await userInfo.json();  // In your next await statement, resolve the JSON response.
  displayUserInfo(data); //calling function and passing JSON data as argument
};

gitUserInfo(); // call function

const displayUserInfo = function (data) {  // Below async function create + name a new function to display the fetched user information on the page. This function should accept the JSON data as a parameter.
  const div = document.createElement("div"); // Inside the function, create the same element used to contain the user info (the container for the user avatar, name, bio, location, and number of public repos), 
  div.classList.add("user-info"); // and give it a class that matches what you’ve named it.
// Using innerHTML, populate the div by doing a copy and paste of the exact structure of everything within the element container that contains your user info
  div.innerHTML = `  
      <img alt="user avatar" src=${data.avatar_url} /> 
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
  `;
  userData.append(div); //Append the div to the element that wraps around the container for the user info using the class name you’ve chosen for this wrapper.
  gitRepos();
};

const gitRepos = async function () {  //create and name a new async function to fetch your repos
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`); //Add parameters to API call.
  const repoData = await fetchRepos.json(); // second await statement should return the JSON response
  displayRepos(repoData);
};

const displayRepos = function (repos) {  //create and name a function to display information about each repo. Use repos as a parameter so that the function accepts the data returned from your last API call
for (const repo of repos) {
  const repoItem = document.createElement("li"); // Inside the function, loop and create a list item for each repo and give each item:
  repoItem.classList.add("repo"); // A class of “repo” (if you are starting with your own HTML/CSS, use the same class name you chose for the repo card)
  repoItem.innerHTML = `<button type="button" class="repo-name">${repo.name}</button>`; // A <button> element with a class of “repo-name” with the repo name.if you are starting with your own HTML/CSS, use the class you chose
  repoList.append(repoItem); //Append the list item to the global variable that selects the unordered repos list
  }
};
