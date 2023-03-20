document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#github-form')
    const search = document.querySelector('#search')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        fetch(`https://api.github.com/search/users?q=${search.value}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data.items)
                const users = Object.entries(data.items)
                users.forEach(item => {
                    const userList = document.querySelector('#user-list')
                    const login = item[1].login
                    const loginList = document.createElement('li')
                    loginList.innerText = login
                    userList.appendChild(loginList)

                    const details = document.createElement('ul')
                    loginList.appendChild(details)

                    const avatarList = document.createElement('li')
                    details.appendChild(avatarList)
                    const avatar = item[1].avatar_url
                    const avatarImg = document.createElement('img')
                    avatarImg.src = avatar
                    avatarList.appendChild(avatarImg)

                    const profileList = document.createElement('li')
                    details.appendChild(profileList)
                    const profile = item[1].html_url
                    const profileLink = document.createElement('a')
                    profileLink.href = profile
                    profileLink.innerText = `Visit ${login}'s profile`
                    profileList.appendChild(profileLink)
                })
            })
    })
})
