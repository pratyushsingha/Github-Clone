const usernameText = document.getElementById('username')
const btn = document.getElementById('search')
const results = document.getElementById('results')
const profile_pic = document.getElementById('profile_pic')
const profile_login = document.getElementById('profile_login')
const profile_bio = document.getElementById('profile_bio')
const profile_blog = document.getElementById('profile_blog')

btn.addEventListener('click', () => {
    const usernameVal = usernameText.value
    console.log(usernameVal)
    const p = fetch(`https://api.github.com/users/${usernameVal}`)
    p.then((Response) => {
        return Response.json()
    }).then((data) => {
        console.log(data)
        results.textContent = `${data.name}`
        profile_pic.src = data.avatar_url
        profile_login.textContent = data.login
        profile_bio.textContent = data.bio
        profile_blog.href = data.blog 
        profile_blog.textContent = data.blog
        console.log(profile_blog.href)
        usernameText.value = ""

    })
        .catch(error => {
            console.error("data cant be fetched")
        })
        // const email = fetch(`https://api.github.com/users/${usernameVal}/events/public`)
        // email.then((Response) => {
        //     return Response.json()
        // }).then((data) => {
        //     console.log(data.)
            

        // })

})