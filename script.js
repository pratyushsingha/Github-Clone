// const { createLogger } = require("vite")

const usernameText = document.getElementById('username')
const btn = document.getElementById('search')
const results = document.getElementById('results')
const profile_pic = document.getElementById('profile_pic')
const profile_login = document.getElementById('profile_login')
const profile_bio = document.getElementById('profile_bio')
const profile_blog = document.getElementById('profile_blog')
const profile_email = document.getElementById('profile_email')
const profile_twitter = document.getElementById('profile_twitter')
const twitterDiv = document.getElementById('twitterDiv')
const public_repos = document.getElementById('profile_repos')
const repo_name = document.getElementById('repos_name')
const repo_description = document.getElementById('repos_description')




function displayRepositories(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    // Fetch repositories from GitHub API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const reposContainer = document.getElementById('repos');
            reposContainer.innerHTML = ""; // Clear previous repositories

            // Iterate over repositories and create HTML elements
            data.forEach(repo => {
                // Create the card element
                const card = document.createElement('a');
                card.href = repo.html_url;
                card.target = '_blank';


                // card.classList.add('flex', 'flex-col', 'justify-center', 'py-6');
                card.classList.add('flex', 'flex-col', 'justify-center', 'py-5');


                // Create the repository name element
                const name = document.createElement('div');
                name.classList.add('flex', 'justify-between', 'text-xl', 'text-[#2D79E9]', 'hover:underline', 'font-extrabold');
                name.textContent = repo.name;

                // Create the repository description element
                const description = document.createElement('div');
                description.classList.add('text-sm', 'text-gray-400', 'mb-8', 'text-justify', 'mr-5');
                description.textContent = repo.description || 'No description provided🥹.';

                const hr = document.createElement('hr');
                hr.classList.add('border-gray-600', 'my-4');

                // Append the name and description to the card
                card.appendChild(name);
                card.appendChild(description)
                card.appendChild(hr);
                // Append the card to the repositories container
                reposContainer.appendChild(card);

            });
        })
        .catch(error => {
            console.log("Error fetching repositories:", error);
        });
}

displayRepositories("pratyushsingha");


usernameText.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        const usernameVal = usernameText.value
        console.log(usernameVal)
        const p = fetch(`https://api.github.com/users/${usernameVal}`)
        p.then((Response) => {
            return Response.json()
        }).then((data) => {
            // console.log(data)
            results.textContent = `${data.name}`
            document.title = `${data.name} (${data.name})`
            profile_pic.src = data.avatar_url
            profile_login.textContent = data.login
            profile_bio.textContent = data.bio
            // console.log(data.blog)
            if (data.blog != null) {
                profile_blog.href = `https://${data.blog}`
                profile_blog.textContent = data.blog
                // console.log(profile_blog.href)
            }
            else {
                document.getElementById('webDiv').style.display = 'none'
            }
            // console.log(profile_blog.href)
            if (data.twitter_username != null) {
                profile_twitter.href = `https://twitter.com/${data.twitter_username}`
                profile_twitter.textContent = data.twitter_username
                // console.log(data.twitter_username)
            }
            else {
                twitterDiv.style.display = 'none'
            }
            if (data.location != null) {

                document.getElementById('profile_location').textContent = data.location
            }
            else {
                document.getElementById('locationDiv').style.display = 'none'
            }
            document.getElementById('profile_followers').textContent = `${data.followers}`
            document.getElementById('profile_following').textContent = `${data.following}`

            // console.log(data.followers)

            public_repos.textContent = data.public_repos
            // console.log(data.public_repos)
            usernameText.value = ""

        }).catch(error => {
            console.error(error + " data cant be fetched")
        })


        const email = fetch(`https://api.github.com/users/${usernameVal}/events/public`)
        email
            .then((Response) => {
                return Response.json()
            })
            .then((data) => {
                // console.log(data)
                // want to fetch email id
                for (let i = 0; i < data.length; i++) {
                    if (data[i].type === "PushEvent") {
                        const authorEmail = data[i].payload.commits[0].author.email;
                        console.log(authorEmail);

                        // Check if the email starts with a number
                        if (!isNaN(authorEmail.charAt(0))) {
                            document.getElementById('emailDiv').style.display = 'none';
                        } else {
                            profile_email.href = `mailto:${authorEmail}`;
                            profile_email.textContent = authorEmail;
                        }
                    }
                }
            })
            .catch((error) => {
                console.log(error + "data cant be fetched");
            });



        let repoList = fetch(`https://api.github.com/users/${usernameVal}/repos`)
        repoList
            .then(response => response.json())
            .then(data => {
                const reposContainer = document.getElementById('repos');

                // Clear previous repository cards
                reposContainer.innerHTML = '';


                data.forEach(repo => {

                    const card = document.createElement('a');
                    card.href = repo.html_url;
                    card.target = '_blank';


                    card.classList.add('flex', 'flex-col', 'justify-center', 'py-5');


                    const name = document.createElement('div');
                    name.classList.add('flex', 'justify-between', 'text-xl', 'text-[#2D79E9]', 'hover:underline', 'font-extrabold');
                    name.textContent = repo.name;




                    const description = document.createElement('div');
                    description.classList.add('text-sm', 'text-gray-400', 'mb-8', 'text-justify', 'mr-5');
                    description.textContent = repo.description || 'No description provided🥹.';

                    const hr = document.createElement('hr');
                    hr.classList.add('border-gray-600', 'my-4');

                    card.appendChild(name);
                    card.appendChild(description)
                    card.appendChild(hr);

                    reposContainer.appendChild(card);

                });
            })
            .catch(error => {
                console.log('Error:', error);
            });

    }
})