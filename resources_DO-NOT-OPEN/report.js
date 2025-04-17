function device() {
   return (document.getElementById('consent').checked) ? navigator.userAgent : 'blocked';
}

function mail() {
   if (cat.value == '' || desc.value == '' || pg.value == '') {
      alert('One or more fields are empty; please fill them up.')
   } else {
      let text = 'issue_type="' + cat.value + '" on_page="' + pg.value + '" device_details=" ' + device() + '. search_tracker="' + localStorage.tracker + '".  DESCRIPTION:  ' + desc.value;
      let body = encodeURI(text), 
      maillink = `https://mail.google.com/mail/?view=cm&fs=1&to=change.address@domain.com&su=Issue%20with%20archive&body=` + body, 
      
      link = document.createElement('a'); link.setAttribute('href',maillink); link.click();
  }
}
