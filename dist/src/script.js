const input = document.getElementById("input");
const add =  document.getElementById("add");
const list_container = document.querySelector(".list-con");
const calender = document.getElementById('calender');
const heading = document.getElementById('header');
const audio = new Audio('./reminder.mp3');
const fp = flatpickr(calender,{
    enableTime: true,
    dateFormat: "Y-m-d H:i", //date format
});
var date;
const colors = ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'];
var i = 0;
// var del = document.querySelectorAll('.del')
var length;
var dateArr = [];
function checkDate(){
    const date = new Date();
    console.log(date, dateArr[0]);
    dateArr.forEach(dateAndTask => {
        const t = getTwoMinutesBefore(dateAndTask[0]);
        // console.log(dateAndTask[0].getTime());
        if(dateAndTask[0].toDateString() === date.toDateString() && (t.toTimeString() === date.toTimeString() || dateAndTask[0].toTimeString() === date.toTimeString())){
            console.log("Success");
            audio.play().then(()=>{
                alert(`Reminder about task: ${dateAndTask[1]}`);
            }).catch((error)=>{
                console.error('Playback failed', error);
                alert(`Reminder about task: ${dateAndTask[1]}`);
            });
            
        }
        else console.log("Failure");
    });
    
    
}
// document.addEventListener('DOMContentLoaded',()=>setInterval(checkDate,1000));
add.addEventListener('click', (e) => {
    data.push(input.value);
    date = fp.selectedDates[0];
    if(date === undefined){
        date = new Date();
    }
    
    // time = `${date.getHours()}:${}:${}`
    fp.selectedDates = [];
    // console.log(date);
    // console.log(date.getFullYear(), date.getMonth()+1, date.getDate(), date.getTime());
    length = data.length;
    input.value = "";
    // console.log(data);
    const childList = document.createElement("div");
    const childDel = document.createElement("button");
    const childDone = document.createElement('button');
    const childTask = document.createElement("span");
    const childDateTime = document.createElement("div");
    childDone.innerHTML = '&#10003;'
    childDone.className = 'done'
    childDateTime.textContent = formatDateTime(date);
    childDateTime.className = 'date-time';
    childDateTime.style.backgroundColor = '#f7d6d6';
    childDateTime.style.borderColor = '#f27066'
    childTask.className = 'task';
    childTask.style.color = '#ffffff';
    childTask.textContent = data[length-1];
    childDel.textContent = '-';
    childDel.className = 'del';
    childList.className = "list";
    childList.appendChild(childTask);
    childList.appendChild(childDel);
    childList.appendChild(childDone);
    childList.appendChild(childDateTime);
    list_container.appendChild(childList);
    
    dateArr.push([date, childTask.textContent]);
});

// const dels = document.querySelectorAll('.del');
document.addEventListener('click', (event) => {
    // console.log(event);
    if(event.target.classList.contains('del')){
        event.target.parentNode.remove()
        // console.log("OK")
    }
    if(event.target.classList.contains('done')){
        event.target.nextSibling.textContent = 'Task Completed'
        event.target.parentNode.style.transition = 'textDecoration 1s ease';
        event.target.parentNode.firstElementChild.style.textDecoration = 'line-through';
        event.target.parentNode.firstElementChild.style.opacity = '0.5';
        event.target.parentNode.children[3].style.backgroundColor = '#c3ffbf';
        event.target.parentNode.children[3].style.borderColor = '#2df821';
    }
})
// function for formatting date and time from the date object
function formatDateTime(date){
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2,'0');
    const day = String(date.getDate()).padStart(2,'0');
    const hours = String(date.getHours()).padStart(2,'0');
    const minutes = String(date.getMinutes()).padStart(2,'0');
    const seconds = String(date.getSeconds()).padStart(2,'0');
    return `Due on ${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`;
}
function changeColor(){
    if(i === colors.length){
        i = 0;
    }
    heading.style.color = colors[i];
    i++;
}
document.addEventListener('DOMContentLoaded', ()=>{
    setInterval(()=>{
        // checkDate();
        changeColor();
    }, 1000);
});
function getTwoMinutesBefore(date){
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - 2);
    return d;
}
