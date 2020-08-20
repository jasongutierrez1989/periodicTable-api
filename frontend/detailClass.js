class detailClass {
  constructor(info, category_id, element_id, group_id, period_id) {
    this.info = info;
    this.category_id = category_id;
    this.element_id = element_id;
    this.group_id = group_id;
    this.period_id = period_id;
  }

  uriConstructor() {
    let uri = this.category_id + '/' + this.element_id + '/' + this.group_id + '/' + this.period_id;

    return uri;
  }

  elementGet(array) {
    let newArray = [];
    for(let i = 0; i < array.length; i++) {
      let domElement = document.getElementById(array[i]);
      newArray[i] = domElement;
    }
    return newArray;
  }

  toggleEditor(array) {
    let newArray = this.elementGet(array);
    let detailInfo = newArray[0].innerText;
    newArray[1].value = newArray[0].innerText;

    newArray[0].style.display = 'none';
    newArray[2].style.display = 'inline';
  }

  submitEdit(array) {
    let test = document.getElementById('')
    let detailInfo = this.elementGet(array);
    let subject = detailInfo[1].value;
    detailInfo[0].innerHTML = subject;

    detailInfo[0].style.display = 'inline';
    detailInfo[2].style.display = 'none';

    let uri = this.uriConstructor();
    let formData = {
      info: detailInfo[0].textContent
    };
    let configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };

      fetch((`http://localhost:3000/details/` + uri), configObject)
        .then(function(response) {
          return response.json();
        })
        .then(function(object) {
          return object;
        });
  }

  addText(identifier) {
    identifier.textContent = this.info;
  }

  addRemoveClass(identifier1, identifier2) {
    identifier1.className = 'none';
    identifier2.classList.remove = 'none';
  }

  createDomElements(array) {
    let btn1 = document.createElement('BUTTON');
    let btn2 = document.createElement('BUTTON');

    btn1.addEventListener('click', function() {
      window.location.reload();
    })
    btn2.addEventListener('click', this.toggleEditor(array));

    let btnArray = [btn1, btn2];

    return btnArray;
  }
}
