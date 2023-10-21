console.log("Welcome to Spotify");

//Initialize the variables
let songIndex=0;
let audioElement=new Audio('1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));



let songs=[ {songName:"Let me Love You",filepath:"1.mp3", coverPath:"cover6.jpg"},
            {songName:"Kaushalya Dashrath",filepath:"2.mp3", coverPath:"cover9.jpg"},
            {songName:"Radhe Krishna",filepath:"3.mp3", coverPath:"cover9.jpg"},
            {songName:"Ram Siya Ram Adipurush",filepath:"4.mp3", coverPath:"cover6.jpg"},
            {songName:"Izhar Hua",filepath:"5.mp3", coverPath:"cover10.jpg"},
            {songName:"jug jug jeeve",filepath:"6.mp3", coverPath:"cover6.jpg"},
            {songName:"Mera shyam",filepath:"7.mp3", coverPath:"cover9.jpg"},
            {songName:"Pata Nahi Kis Roop",filepath:"8.mp3", coverPath:"cover6.jpg"},
            {songName:"Mere Ghara Ram Aye",filepath:"9.mp3", coverPath:"cover9.jpg"},
            {songName:"Mere Maa K Barabar",filepath:"10.mp3", coverPath:"cover10.jpg"},
]

songItems.forEach((element,i)=>{
    //console.log(element,i);
element.getElementsByTagName("img")[0].src=songs[i].coverPath;
element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

//audioElement.play();
//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
//console.log('timeupdate');

//update seekbar
progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
//console.log(progress);
myProgressBar.value=progress;

})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays=()=>{
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.target.classList.remove('fa-pause-circle');
    element.target.classList.add('fa-play-circle');
})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        //console.log(e.target);
        makeAllPlays();
        
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src='&{songIndex+1}.mp3';
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+= 1;
    }
    audioElement.src='${songIndex+1}.mp3';
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-= 1;
    }
    audioElement.src='${songIndex+1}.mp3';
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})