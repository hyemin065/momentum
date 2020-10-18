//clock
const clockDisplay = document.querySelector(".clock-display");
const getLocalTime =() =>{
    const data = new Date();
    const min = data.getMinutes();
    const hour = data.getHours();
    clockDisplay.innerText = `${hour< 10 ?`0${hour}`: hour}:${min < 10 ? `0${min}`:min}`
}

getLocalTime();
setInterval(getLocalTime, 1000);

//clock

//username
const nameForm = document.querySelector(".name-form");
const nameInput = nameForm.querySelector("input");
const nameDisplay = document.querySelector(".name-display h2");

const inputName = (event) =>{
    event.preventDefault();
    const curName = nameInput.value;
    localStorage.setItem("username", curName);
    showName(curName);
}

const formHandler = () =>{
    nameForm.classList.add("show");
    nameForm.addEventListener("submit", inputName);
}

const showName = (text) =>{
    nameForm.classList.remove("show");
    nameDisplay.classList.add("show");
    nameDisplay.innerText = `웰컴 ${text}`;
}

const getUserInfo = () =>{
    const curUser = localStorage.getItem("username");
    if(curUser === null){
        formHandler();
    }else{
        showName(curUser);
    }
}
getUserInfo();
//username

//to do 
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

let todoData = [];
const createID = () => Math.ceil(Math.random() * 100000000);

const saveLocalStroage = (data) =>{
    localStorage.setItem("tododata",JSON.stringify(data));
}

const deleteTodo= (event) =>{
    const {target:{parentNode : li}} = event;
    todoList.removeChild(li);
    const newTodoData = todoData.filter(todo => todo.id !== parseInt(li.id));
    todoData = newTodoData;
    saveLocalStroage(todoData);
}
const onFinished = (target) =>{
    target.classList.add("finished");
    const newState = todoData.map(item =>{
        if(item.id === parseInt(target.id)){
            item.success = true;
        }
        return item;
    });
    return newState;

}

const cancelFinished = target =>{
    target.classList.remove("finished");
    const newState = todoData.map(item =>{
        if(item.id === parseInt(target.id)){
            item.success = false;
        }
        return item;
    });
    return newState;
}

const setFinishData = (event) =>{
    const {target:{parentNode : li}} = event;
    if(li.classList.contains("finished")){
        todoData = cancelFinished(li);
    }else{
        todoData = onFinished(li);
    }
    saveLocalStroage(todoData);
} 

const showTodoList = (text) =>{
    const li = document.createElement("li");
    const del = document.createElement("button");
    const fin = document.createElement("button");
    const span = document.createElement("span");
    const id = createID();

    del.innerText = "X";
    del.addEventListener("click", deleteTodo);

    fin.innerText = "O";
    fin.addEventListener("click", setFinishData);

    span.innerText = text;
    li.appendChild(span);
    li.appendChild(del);
    li.appendChild(fin);

    li.id = id;
    todoList.appendChild(li);

    const data = {
        text,
        id,
        success:false
    }
    todoData.push(data);
    saveLocalStroage(todoData);

}

const getTodoData = event =>{
    event.preventDefault();
    const curTask = todoInput.value;
    showTodoList(curTask);
    todoInput.value = "";
}

const loadData = () =>{
    const data = JSON.parse(localStorage.getItem("tododata"));
    if(data !== null){
        data.forEach(todo =>{
            showTodoList(todo.text);
        })
    }
}
loadData();

todoForm.addEventListener("submit", getTodoData);
//to do

//background
const wrap = document.querySelector(".wrap");
const randomIMG = () =>{
    const randomNumber = Math.floor((Math.random() * 3)+1);
    wrap.style.backgroundImage = `url('img/${randomNumber}.jpg')`;
}

window.addEventListener("load", randomIMG);

//background

//weather
const weather = document.querySelector(".weather-wrap");
const API_KEY ="162e461eec9f4717a6f4c16182a714f3"

const successLocation = (pos) =>{
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const locationObject = {
        lat,
        lng
    }
    localStorage.setItem("location", JSON.stringify(locationObject));
}

const getWeather = (lat, lng) =>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(res =>{
        return res.json();
    }).then(data =>{
        const tem = data.main.temp;
        const location = data.name;
        weather.innerText = location + tem; 
    })
}

const getLocation =() =>{
    navigator.geolocation.getCurrentPosition(successLocation, (err)=>console.log(err));
}
const loadWeather = () =>{
    const LocationData = JSON.parse(localStorage.getItem("location"));
    const {lat, lng} = LocationData;
    if(LocationData === null){
        getLocation();
    }else{
        getWeather(lat, lng);
    }
}
loadWeather();
//weather