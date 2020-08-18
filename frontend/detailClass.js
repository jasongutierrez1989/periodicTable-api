class detail {
  constructor(info, category_id, element_id, group_id, period_id) {
    this.info = info;
    this.category_id = category_id;
    this.element_id = element_id;
    this.group_id = group_id;
    this.period_id = period_id;
  }

  async function elementDetail () {
    let maybe = document.getElementsByClassName('element');
      for (let i = 0; i < maybe.length; i++) {
        maybe[i].addEventListener('click', async function () {
          let elementFetch = fetch(`http://localhost:3000/elements/` + (i + 1))
            .then(function(response) {
              return response.json();
            })
            .then(function(json) {
              return json
            });

          let detailFetch = fetch(`http://localhost:3000/details/0/` + (i + 1) + '/0/0')
            .then(function(response) {
              return response.json();
            })
            .then(function(json) {
              return json
            });

        let newElement = await elementFetch;
        let test = document.getElementById('container');
        let test2 = document.getElementById('detailHold');
        test.className = 'none';
        let newDiv = document.createElement('div');
        let btn = document.createElement('BUTTON');
        btn.innerHTML = "Go Back";

        let detail = await detailFetch;
        let textnode = document.createTextNode(detail.info);
        newDiv.appendChild(textnode);
        test2.appendChild(newDiv);
        test2.appendChild(btn);
        test2.classList.remove('none');
        let bigElementSave = new elementClass(newElement.atomic_number, newElement.symbol, newElement.name, newElement.weight, newElement.category_id, newElement.group_id, newElement.period_id);
        let elementDiv = bigElementSave.createDivs2();
        bigElementSave.appender(elementDiv, 'detailView');
        btn.addEventListener('click', function () {
          window.location.reload();
        })
      }, false);
    }
  }

}
