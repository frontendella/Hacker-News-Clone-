import Story from "../components/story.js";
import view from "../utils/view.js";

export default async function Stories(path) {
    const stories = await getStories(path)
    const hasStories = stories.length > 0

    view.innerHTML = `<div>
        ${hasStories ? stories.map(story => Story(story)).join('') : "No stories"}
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
    const response = await fetch(`https://node-hnapi.herokuapp.com${path}`)
    const stories = await response.json()
    return stories
}


