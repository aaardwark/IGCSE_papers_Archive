function docquery(attr, val) {
   d = document;
   (attr == 'id') ? el = d.getElementById(val) : el = d.querySelectorAll('['+attr+'='+val+']');
   return el;
}

function drop(p) {
   if (docquery('id','b' + p).innerHTML == '-') {
      docquery('id',p).hidden = true;
      docquery('id','b' + p).innerHTML = '+';
   } else {
      setdiv_no = (docquery('class','info')[1].id == '22') ? 4 : 7;
      for (i = 1; i < setdiv_no+1; i++) {
         let x = docquery('id',i).hidden;
         docquery('id','b' + i).innerHTML = '+';
         if (x !== '') {
            docquery('id',i).hidden = true;
         } 
      }
      docquery('id',p).hidden = false;
      docquery('id','b' + p).innerHTML = '-'; 
   } 
}

function pstatus() { // for every question paper, <if it isn't marked done> shows the mark done button, <else> labels it  completed
   infos = docquery('class','info');
   const syl = infos[0].id;
   const papers = infos[0].getAttribute('value').split('');
   const yr = infos[1].id;

   for (p = 0; p < papers.length; p++) {
      var pno = papers[p]; var pid = syl + '_m' + yr + '_qp_' + pno + '2'; // in feb-march
      docquery('id',pid).innerHTML = (getHistory().indexOf(pid) == -1) ? btnConstruct(pid) : 'Completed';
   }

   for (p = 0; p < papers.length; p++) {
    for (v = 1; v < 4; v++) { // in may-june, so needs two for loops since there are 3 sets
         var pno = papers[p]; var pid = syl + '_s' + yr + '_qp_' + pno + v;
         docquery('id',pid).innerHTML = (getHistory().indexOf(pid) == -1) ? btnConstruct(pid) : 'Completed';
      }
   }

   for (p = 0; p < papers.length; p++) {
      for (v = 1; v < 4; v++) { // in oct-nov, so again needs two loops
         var pno = papers[p], pid = syl + '_w' + yr + '_qp_' + pno + v;
         docquery('id',pid).innerHTML = (getHistory().indexOf(pid) == -1) ? btnConstruct(pid) : 'Completed';
      }
   }
}

function pstatus_nowinter() {
   infos = docquery('class','info');
   const syl = infos[0].id;
   const papers = infos[0].getAttribute('value').split('');
   const yr = infos[1].id;

   for (p = 0; p < papers.length; p++) {
      var pno = papers[p]; var pid = syl + '_m' + yr + '_qp_' + pno + '2'; // in feb-march
      docquery('id',pid).innerHTML = (getHistory().indexOf(pid) == -1) ? btnConstruct(pid) : 'Completed';
   }

   for (p = 0; p < papers.length; p++) {
    for (v = 1; v < 4; v++) { // in may-june, so needs two for loops since there are 3 sets
         var pno = papers[p]; var pid = syl + '_s' + yr + '_qp_' + pno + v;
         docquery('id',pid).innerHTML = (getHistory().indexOf(pid) == -1) ? btnConstruct(pid) : 'Completed';
      }
   }
}

function getHistory() { 
   return (localStorage.PaperLog) ? localStorage.PaperLog : '';
}

(docquery('class','info')[1].id ==  '22') ? setTimeout(pstatus_nowinter, 10) : setTimeout(pstatus, 10); 
// allows all elements to load so their innerHTML can be set

function btnConstruct(value) {
   var fxn = "recordBox('" + value + "')"; 
   var btncode = '<button class="btn2" onclick="' + fxn + '">Mark as Done</button>';
   return btncode;
}

function recordBox(btnID) {
   var d = new Date().toString(), 
      timestamp = d.slice(0,21), 
      downloads = localStorage.IGCSEPaperLog + ', "' + btnID + '" on ' + timestamp;
   localStorage.PaperLog = downloads;
   docquery('id',btnID).innerHTML = 'Completed';
}