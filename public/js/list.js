main();

async function main() {
  const params = new URLSearchParams(location.search);

  let page = params.get("page") || 1;
  let show = params.get("show") || 10;
  let hoilday = params.get("hoilday") || false;

  let min = 1 + (page - 1) * show;
  let max = page * show;

  console.log(min, max);

  const res = await fetch(`/history?min=${min}&max=${max}&holiday=${hoilday}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const json = await res.json();

  if (!json.result) {
    return;
  }

  let table = document.getElementById("table");

  for (let result of json.result) {
    const tr = document.createElement("tr");
    let date = new Date(result.date);

    tr.appendChild(td(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()));
    tr.appendChild(td(result.holiday ? "YES" : "NO"));
    tr.appendChild(td(result.temperature));
    tr.appendChild(td(result.rainfall));
    tr.appendChild(td(result.demand));
    table.appendChild(tr);
  }

  console.log(json.result);
}

function td(text) {
  let td = document.createElement("td");
  td.textContent = text;
  return td;
}
