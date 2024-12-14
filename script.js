let value;
let data;
let btn = document.querySelector("#btn");
let url = "";
let voice;
let title=document.querySelector('.title');
let phtics = document.querySelector(".phonitics");
let words = document.querySelector(".words");
let meaning = document.querySelector(".meaning");
let contain=document.querySelector('.container');
let vol=document.querySelector("#volup");


btn.addEventListener("click", async () => {
  title.style.display="none";
  phtics.style.display="none";
  words.style.display="none";
  meaning.style.display="none";
  content = document.querySelector(".input").value;

  value = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${content}`
  );
  
  if (value.ok == true) {
    data = await value.json();
    let word = document.querySelector(".word");
    word.innerText = content;

    phtics.innerText = `${data[0].meanings[0].partOfSpeech} ${data[0].phonetic}`.replace("undefined","");

    words.innerText = data[0].meanings[0].definitions[0].definition;

    if (data[0].meanings[0].definitions[0].example == undefined) {
      meaning.innerText = "We can't find a suitable example for it.";
    } else {
      meaning.innerText = data[0].meanings[0].definitions[0].example;
    }

    title.style.display="flex";

    phtics.style.display="flex";

    words.style.display="flex";

    meaning.style.display="flex";

    contain.style.minHeight=30+"vh";

  }
  else {
    words.innerText = "We can't find this word in Dictionary";
    contain.style.minHeight=20+"vh";
    words.style.display="flex";
    words.style.justifyContent="center";
    words.style.marginLeft=0+"px";
    words.style.paddingLeft=0+"px";
  }
});

vol.addEventListener("click",()=> {
  let audio=document.querySelector("#audio");
  voice=`${data[0].phonetics[0].audio}` || `${data[0].phonetics[1].audio}` || `${data[0].phonetics[2].audio}` || `${data[0].phonetics[3].audio}` || `${data[0].phonetics[4].audio}` || `${data[0].phonetics[5].audio}` || `${data[0].phonetics[6].audio}` || `${data[0].phonetics[7].audio}`;
  if(voice=='')
  {
    alert("Pronunciation sound is not found");
  }
  else
  {
    audio.src=voice;
  audio.play();
  }
});
