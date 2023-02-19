var word = "ufo";
var vowels = "AEIOU", alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var chosen = "", image = 0, rightChars = 2;
var imageBox, wordBox, keyboardBox;
var a_start = '<a href="#" onclick="check_key(\'', a_mid = '\')">', a_end = '</a>';
var span_start = '<span>', span_end = '</span>';
var span_ok = span_start.replace ('>', ' class="ok">'), span_ko = span_start.replace ('>', ' class="ko">');
var str = "Hello World!";
var n = str.length;
var cacca;



function init () {
  word = word.toUpperCase ();
  init_image ();
  init_word ();
  init_keyboard ();
}

//abcdefghijklmnopqrstuvwxyz
//aeiou

function init_image () {
  imageBox = document.getElementById ("impiccato");
  imageBox.className = "";
}

function init_word () {
  wordBox = document.getElementById ("word");
  for (i = 0; i < word.length; i++) {
    var chr = word.charAt (i);
    var reveal = (i == 0 || i == word.length -1) ? chr : (vowels.indexOf (chr) == -1) ? "&ndash;" : "+";
    wordBox.innerHTML += "<span>" + reveal + "</span>\n";
  }
  alert(word)
}

	
	
function init_keyboard () {
  keyboardBox = document.getElementById ("keyboard");
  var keyboardContent = "";
  for (i = 0; i < alphabet.length; i++) {
   keyboardContent += a_start + alphabet.charAt (i) + a_mid + alphabet.charAt (i) + a_end + "\n";
  }
  keyboardContent += span_start + '.' + span_end;
  keyboardBox.innerHTML = keyboardContent;
}

function check_key (key) {
  /*if (confirm ("La tua scelta e' " + key.toUpperCase () + "?")) {*/
    if ((num = controllo (key)) > 0) {
   rightChars += num;
 /* alert ("Sono stati trovate " + num + " occorrenze di " + key.toUpperCase () + " !");*/
   var span_type = 'ok';
    } else {
   /*alert ("Il carattere scelto non e' contenuto nella parola misteriosa!");*/
   impiccato ();
   var span_type = 'ko';
    }
    disable_key (key, span_type);
    check_endgame ();
  /*}*/
  return false;
}



function controllo (chr) {
  var result = 0;
  for (i = 0; i < word.length; i++) {
    if (i != 0 && i != word.length -1 && chr == word.charAt (i)) {
   reveal_char (i);
   result++;
   chosen += chr;
    }
  }
  return result;
}

function disable_key (key, type) {
  var search = a_start + key + a_mid + key + a_end;
  var replace = window ["span_" + type] + key + span_end;
  keyboardBox.innerHTML = keyboardBox.innerHTML.replace (search, replace);
}

function reveal_char (i) { document.getElementById ("word").getElementsByTagName ("span")[i].innerHTML = word.charAt (i); }

function impiccato () {
  imageBox.className = "x" + image;
  image++;
}

function check_endgame () {
  if (image > 6) {
    alert ("Peccato, hai perso!");
    alert ("La parola misteriosa era:\n" + word.toUpperCase ());
	top.location.href = "../FinalScreen/LoseF.html";
    // SOMETHING ON-LOOSE
  } 
  
  if (rightChars == word.length) {
    alert ("Yeah, hai vinto!");
	top.location.href = "../FinalScreen/WinF.html";
    // SOMETHING ON-WIN
  }
}


