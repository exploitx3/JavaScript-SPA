if(!localStorage.getItem('name')){
    var name = prompt('Enter your name.');
    localStorage.setItem('name', name);
}else {
    document.body.appendChild(
        document.createElement('h3')
            .appendChild(document.createTextNode('Greatings ' + localStorage.getItem('name'))));
}

if(!sessionStorage.getItem('visitCount')){
    sessionStorage.setItem('visitCount', 0);
}else{
    var visits = parseInt(sessionStorage.getItem('visitCount'));
    visits++;
    sessionStorage.setItem('visitCount', visits);
}

if(!localStorage.getItem('totalVisitsCount')){
    localStorage.setItem('totalVisitsCount', 0);
}else{
    var visits = parseInt(localStorage.getItem('totalVisitsCount'));
    visits++;
    localStorage.setItem('totalVisitsCount', visits);
}

document.body.appendChild(document.createElement('h4').appendChild(document.createTextNode('\nSession Visits: ' + sessionStorage.getItem('visitCount') + '\r\n')));
document.body.appendChild(document.createElement('h4').appendChild(document.createTextNode('\nTotal Visits: ' + localStorage.getItem('totalVisitsCount'))));