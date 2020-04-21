//Catch Elements
const $mainSec = document.getElementById("main-section");
const $dailyImageSection = document.getElementById("daily-Image-section");
const $dailyImage = document.getElementById("dailyImg");
const $dailyVideo = document.getElementById("dailyVideo");

//Setting URL
const url = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=d5eHDjw1Cvgc8WLIW7J1FLcPR1cKlZgT4H7XCnpG"
const dailyImgUrl = "https://api.nasa.gov/planetary/apod?api_key=d5eHDjw1Cvgc8WLIW7J1FLcPR1cKlZgT4H7XCnpG"


function createCard({
    neo_reference_id,
    name,
    nasa_jpl_url,
    is_potentially_hazardous_asteroid
} = {}) {
    return `<div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">Astroid Name: ${name}</h5>
        <h5>Astroid ID: ${neo_reference_id}</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item"><a href=${nasa_jpl_url} target="_blank">Click To View Astroid's full information</a></li>
        <li class="list-group-item ${is_potentially_hazardous_asteroid ? "offline-bg" : "online-bg"}">${is_potentially_hazardous_asteroid ? 'potentially hazardous Object' : 'Not potentially hazardous Object'}</li>
    </ul>
</div>`
}


async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
}


async function setBackgroundImg() {
    const imgRes = await fetch(dailyImgUrl);
    const imgData = await imgRes.json();

    console.log(imgData);
    console.log(imgData.url);
    console.log("file type= " + imgData.media_type);

    if (imgData.media_type = "image") {
        $dailyImage.src = imgData.url;
    } else {
        $dailyVideo.src = imgData.url;
    }
}

async function render() {
    const data = await getData();
    $mainSec.innerHTML = "";
    data.near_earth_objects.forEach(user => {
        $mainSec.innerHTML += createCard(user);
    });
}

async function refreshData() {
    render();
}

const $refreshButton = document.getElementById("refreshData");

// $refreshButton.addEventListener('click', refreshData);

setBackgroundImg();
render();