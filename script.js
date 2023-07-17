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

if (window.onload) {
    let repoList = fetch(`https://api.github.com/users/pratyushsingha/repos`)
    repoList.then(response => response.json())
        .then(data => {
            const reposContainer = document.getElementById('repos');

            // Iterate over each repository and create a card for it
            data.forEach(repo => {
                // Create the card element
                const card = document.createElement('a');
                card.href = repo.html_url;
                card.target = '_blank';
                card.rel = 'noopener noreferrer';
                card.classList.add('repo-card', 'p-4', 'flex', 'flex-col', 'justify-between', 'group');

                // Create the repository name element
                const name = document.createElement('h2');
                name.classList.add('text-xl', 'font-bold', 'text-[#2F81F7]', 'hover:underline');
                name.textContent = repo.name;

                // Create the repository description element
                const description = document.createElement('p');
                description.classList.add('text-sm', 'text-gray-400', 'mt-2');
                description.textContent = repo.description || 'No description provided.';

                // Append the name and description to the card
                card.appendChild(name);
                card.appendChild(description);

                // Append the card to the repositories container
                reposContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.log('Error:', error);
        });
}
else {
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
                profile_blog.href = `https://${data.blog}`
                profile_blog.textContent = data.blog
                console.log(profile_blog.href)
                if (data.twitter_username != null) {
                    profile_twitter.href = `https://twitter.com/${data.twitter_username}`
                    profile_twitter.textContent = data.twitter_username
                    console.log(data.twitter_username)
                }
                else {
                    twitterDiv.style.display = 'none'
                }

                document.getElementById('profile_location').textContent = data.location
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
            email.then((Response) => {
                return Response.json()
            }).then((data) => {
                // console.log(data)
                // want to fetch email id
                for (let i = 0; i < data.length; i++) {
                    if (data[i].type === "PushEvent") {
                        console.log(data[i].payload.commits[0].author.email)
                        profile_email.href = `mailto:${data[i].payload.commits[0].author.email}`
                        profile_email.textContent = data[i].payload.commits[0].author.email
                    }
                }


            }).catch(error => {
                console.log(error + "data cant be fetched")
            })

            let repoList = fetch(`https://api.github.com/users/${usernameVal}/repos`)
            repoList.then(response => response.json())
                .then(data => {
                    const reposContainer = document.getElementById('repos');

                    // Iterate over each repository and create a card for it
                    data.forEach(repo => {
                        // Create the card element
                        const card = document.createElement('a');
                        card.href = repo.html_url;
                        card.target = '_blank';
                        card.rel = 'noopener noreferrer';
                        card.classList.add('repo-card', 'p-4', 'flex', 'flex-col', 'justify-between', 'group');

                        // Create the repository name element
                        const name = document.createElement('h2');
                        name.classList.add('text-xl', 'font-bold', 'text-[#2F81F7]', 'hover:underline');
                        name.textContent = repo.name;

                        // Create the repository description element
                        const description = document.createElement('p');
                        description.classList.add('text-sm', 'text-gray-400', 'mt-2');
                        description.textContent = repo.description || 'No description provided.';

                        // Append the name and description to the card
                        card.appendChild(name);
                        card.appendChild(description);

                        // Append the card to the repositories container
                        reposContainer.appendChild(card);
                    });
                })
                .catch(error => {
                    console.log('Error:', error);
                });
        }
    })
}