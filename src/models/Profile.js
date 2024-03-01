export class Profile {
    constructor(data) {
        this.id = data._id
        this.email = data.email
        this.name = data.name
        this.picture = data.picture
        this.bio = data.bio
        this.coverImg = data.coverImg
        this.graduated = data.graduated
        this.linkedin = data.linkedin
        this.github = data.github
        this.resume = data.resume
        this.class = data.class || ''
        this.memberSince = new Date(data.createdAt).toLocaleDateString()
    }
}

const profileData = {
    "_id": "649b15df024908ebc1ffe602",
    "subs": [
        "auth0|649b15dfeca66e8683e55ea8"
    ],
    "email": "liljeremy@lil.jeremy",
    "name": "LIL JEREMY 🐀",
    "picture": "https://64.media.tumblr.com/tumblr_m0ai0nrErM1r03kk7o1_500.jpg",
    "bio": "The raddest dude. Also the littlest dude.",
    "coverImg": "https://i.gifer.com/9ZNS.gif",
    "github": "",
    "linkedin": "https://www.youtube.com/watch?v=c9eipcOFEhY",
    "resume": "",
    "class": "",
    "graduated": true,
    "createdAt": "2023-06-27T17:01:48.349Z",
    "updatedAt": "2023-07-20T17:29:12.030Z",
    "__v": 0,
    "id": "649b15df024908ebc1ffe602"
}