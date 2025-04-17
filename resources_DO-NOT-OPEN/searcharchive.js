function arrayGen(input) {
   return document.getElementById(input).getAttribute('name'); 
}


function disable_paperopts() {
   const pnos = [1,2,4,6]; 
   let xpnos = arrayGen(Subject.value).split('');

   for (i = 0; i < pnos.length; i++) {
      var elem = document.getElementById(pnos[i]);
      if (!elem.hidden) {
         elem.hidden = true;
      }
   }
   for (i = 0; i < xpnos.length; i++) {
      var elem = document.getElementById(xpnos[i]); 
      elem.removeAttribute('hidden');
   }

   var inopt = document.getElementById('insert');
   (Subject.value == '0500') ? inopt.removeAttribute('hidden') : inopt.hidden = true
   
   document.getElementById('2').setAttribute('selected','')
   track('Subject');
}

function disable_setopts() {
   if (Season.value == 'm') {
      for (e of SetNo.children) {
         if ( e.getAttribute('value') != '2') { e.hidden = true; }
         else { e.hidden = false; }
      }
   } else {
      for (e of SetNo.children) { e.hidden = false;}
   }
}


function recordBox() {
   var link = document.getElementsByClassName('link')[0], 
   pcode = link.getAttribute('id'),
   d = new Date().toString(), timestamp = d.slice(0,15),
   downloads = localStorage.PaperLog + ', "' + pcode + '" on ' + timestamp;
   localStorage.PaperLog = downloads;
   document.getElementById('button_search').innerHTML = 'Done!';
}


function displayUrl() { 
   var url, w = FileType.value, x = SetNo.value, y = Season.value, z = PaperNo.value;

   if (arrayGen(Subject.value).indexOf(z) == -1) {
      url = 'Please re-select the "paper" field and press GO again. <br><button class="btn" title="search" id="search" onclick="displayUrl();"> <b>GO</b> </button>'; 
      trackbtn('p:e');
   } else if (x + y == '3m' || x + y == '1m') {
      url = 'The file does not exist, since only "Set 2" is created for the Feb/March series. <br> <a href="" id="redo"> SEARCH AGAIN </a>'; 
      trackbtn('s:e');
   } else if (w == 'in') {
      if (Subject.value != '0500') {
         url = 'Please un-select the "insert" option and press GO again. <br><button class="btn" title="search" id="search" onclick="displayUrl();">  <b>GO</b> </button>'; 
         trackbtn('in:e');
      }
   } else if (Year.value == '22' && y=='w') {
      url = 'The file does not yet exist, since papers for the October/November series have not been released. <br> <a href="" id="redo"> SEARCH AGAIN </a>'; 
      trackbtn('y:e');
   } else {
      var ButtonCode = (FileType.value == 'qp') ? btnGen() : '';
      let option = document.getElementById(Subject.value), 
         subname = option.getAttribute('class'); 
      trackbtn('GO');

      url = '<a id="' + Subject.value + '_' + Season.value + Year.value + '_' + FileType.value  + '_' + PaperNo.value + SetNo.value + '"class="link" target="_blank" href="https://papers.gceguide.com/Cambridge%20IGCSE/' + subname + ' (' + Subject.value + ')/20' + Year.value + '/' + Subject.value + '_' + Season.value + Year.value + '_' + FileType.value  + '_' + PaperNo.value + SetNo.value + '.pdf">Click to view the file</a>' + ButtonCode + '<br><a href="" id="redo"> Search again </a>';
   }

   document.getElementById('result').innerHTML = url;
}

function btnGen() {
   var string = (localStorage.PaperLog) ? localStorage.PaperLog : '';
   var paperid = Subject.value + '_' + Season.value + Year.value + '_' + FileType.value  + '_' + PaperNo.value + SetNo.value; 
   
   if (string.indexOf(paperid) == -1) {
      var btn =' <p id="button_search"><button class="btn2" onclick="recordBox()">Mark as Done</button></p>';
   } else {
      var btn = '<p>Completed</p>'
   }
   
   return btn;
}

function track(criterion) {
   var tracker = localStorage.tracker || '';
   var x = document.getElementById(criterion), toval = x.value;
   let trackerList = tracker.split(',');  
   if (trackerList.length > 25) {trackerList.shift();} 
   
   var selector = criterion.toString().slice(0,3),
   unit = selector + '_' + toval; 
   trackerList.push(unit); 
   localStorage.tracker = trackerList.toString(); 
}

function trackbtn(output) {
   var tracker = localStorage.tracker || '';
   let trackerList = tracker.split(',');  
   if (trackerList.length > 25) {trackerList.shift();} 
   trackerList.push(output); 
   localStorage.tracker = trackerList.toString(); 
}


