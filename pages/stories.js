import Story from "../components/story.js";
import view from "../utils/view.js";
import baseUrl from "../utils/baseUrl.js";

export default async function Stories(path) {
    const stories = await getStories(path)
    const hasStories = stories.length > 0

    view.innerHTML = `<div>
        ${hasStories ? stories.map((story, i) => Story({ ...story, index: i + 1 })).join('') : "No stories"}
    </div>`

}

async function getStories(path) {
    const isHomePath = path === '/';
    const isNewRoute = path === '/new'
    if (isHomePath) {
        path = '/news'
    } else if (isNewRoute) {
        path = '/newest'
    }
    const response = await fetch(`${baseUrl}${path}`)
    const stories = await response.json()
    return stories
}


