
onload = fetch('./js/historical_v.csv').then(res => {
    return res.text();
}).then(data => {
    let result = data.split(/\r?\n|\r/).map(e => {
        return e.split(',');
    })
    result.forEach(e => {
       let m = e.map(e => {
            return `<td>${e}</td>`;
        }); // use '.join()' to eliminate ',' and join elements of <td>
        let ce = document.createElement('tr');
        for (i=3; i<=8; i++) {
        ce.innerHTML += m[i];
        }
        document.querySelector('table').appendChild(ce);
        console.log(m);
    })
});
