let cont = document.createElement("div");
cont.className = "cont";

let image_container = document.createElement("div");
image_container.className = "image_container";

let header = document.createElement("h1");
header.innerHTML = "Wallpaper Generator";
cont.appendChild(header);

//Input Box
let num_div = document.createElement("div");
num_div.className = "num_div";
let num = document.createElement("input");
num.setAttribute("placeholder", "No. of Wallpapers");
num.setAttribute("type", "text");
num.setAttribute("id", "number");
num_div.appendChild(num);

//Generate Button
let button_div = document.createElement("div");
button_div.className = "button_div";
let generate_button = document.createElement("button");
generate_button.setAttribute("type", "button");
generate_button.setAttribute("class", "btn btn-success");
generate_button.addEventListener("click", generator);
generate_button.innerHTML = "Generate Wallpaper";
button_div.appendChild(generate_button);

//Reset Button
let reset_button = document.createElement("button");
reset_button.setAttribute("type", "button");
reset_button.setAttribute("class", "btn btn-warning");
reset_button.addEventListener("click", reset);
reset_button.innerHTML = "Reset";
button_div.appendChild(reset_button);

cont.appendChild(num_div);
cont.appendChild(button_div);

document.body.append(cont);
document.body.append(image_container);

async function generator() {
    let n = parseInt(document.getElementById("number").value);
    if (isNaN(n) || n <= 0) {
        alert("Please enter a valid positive number.");
        return;
    }
    
    image_container.innerHTML = "";
    for (let i = 0; i < n; i++) {
        let x = Math.floor(Math.random() * 1000);
        let api_url = `https://picsum.photos/id/${x}/info`;
        try {
            let info = await get_info(api_url);

            let image_content = document.createElement("div");
            image_content.className = "image_content";
            image_content.innerHTML = `
                <img src="${info.download_url}" alt="Image not Found">
                <div class="image-details">
                    <p>Image ID: #${info.id}</p>
                    <p>Resolution: ${info.height}x${info.width}</p>
                    <button type="button" class="button"><a href="${info.download_url}" target="_blank">View Image</a></button>
                </div>`;
            image_container.appendChild(image_content);
        } catch (error) {
            console.error(`Failed to fetch image info: ${error}`);

            let error_message = document.createElement("div");
            error_message.className = "error_message";
            error_message.innerHTML = `<p>Error fetching image with ID ${x}. Please try again.</p>`;
            image_container.appendChild(error_message);
        }
    }
}

async function get_info(link) {
    let response = await fetch(link);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    return data;
}

function reset() {
    document.getElementById("number").value = "";
    image_container.innerHTML = "";
}
