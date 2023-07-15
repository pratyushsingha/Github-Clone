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
            profile_blog.href = data.blog
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

        const follower = fetch(`https://api.github.com/users/${usernameVal}/followers`)
        follower.then((Response) => {
            return Response.json()

        }).then((data) => {
            console.log(data.length)
            document.getElementById('profile_followers').textContent = `${data.length}`
        })

        const following = fetch(`https://api.github.com/users/${usernameVal}/following`)
        following.then((Response) => {
            return Response.json()

        }).then((data) => {
            console.log(data.length)
            document.getElementById('profile_following').textContent = `${data.length}`
        })
    }
})