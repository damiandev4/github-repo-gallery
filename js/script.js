const userData = document.querySelector(".user-data");
const username = "damiandev4";
const repoList = document.querySelector(".repo-list");
const allRepos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

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
    <figure>  
      <img alt="user avatar" src=${data.avatar_url} /> 
    </figure>
    <div class= "user-details">
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

  repoList.addEventListener("click", function (e) { // create an event listener called repoList for a click event on the unordered list with a class of “repo-list.” Pass the event (e) in the callback function. 
  if (e.target.matches(".repo-name")) {  //Add a conditional statement to check if the event target (i.e., the element that was clicked on) matches the class “.repo-name”
    const repoName = e.target.innerText; //In the body of the conditional statement, create a variable called repoName to target the innerText where the event happens
    getRepoInfo(repoName); //call this async function, passing repoName as an argument
  }
});

const getRepoInfo = async function (repoName) { //create and name an async function to get specific repo information that accepts repoName as a parameter
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`); //In the function, make a fetch request to grab information about the specific repository
  const repoInfo = await fetchInfo.json();  //Declare a variable called repoInfo to resolve and save the JSON response
  console.log(repoInfo);
//get languages
  const fetchLanguages = await fetch(repoInfo.languages_url); //inside async function to get specific repo information, create a variable called fetchLanguages to fetch data from languages_url property of your repoInfo
  const languageData = await fetchLanguages.json(); // Create a variable called languageData to save the JSON response
//make languages list
  const languages = []; //add each language to an empty array called languages
  for (const language in languageData) {
    languages.push(language); //add the languages to the end of the array
  } 
  displayRepoInfo(repoInfo, languages); //call the function to display the repo info. Pass it the repoInfo object and the languages array.
  };

  const displayRepoInfo = function (repoInfo, languages) { //Below the async function to get specific repo info, create and name a new function to display the specific repo info. It should accept two parameters: repoInfo and languages.
  repoData.innerHTML = ""; // Inside the function, empty the HTML of the section with a class of “repo-data” where the individual repo data will appear.
  repoData.classList.remove("hide");  //Unhide (show) this wrapper element with the class name you chose
  allRepos.classList.add("hide"); //Hide the element that contains the repo gallery view.
  const div = document.createElement("div");
  div.classList.add("repo-info");
  div.innerHTML = `
    <h2>Name: ${repoInfo.name}</h2>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoData.append(div); //Append the new div element to the element that wraps around all of the repo data. 
  };


