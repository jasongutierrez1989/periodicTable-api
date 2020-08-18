class categoryClass {
  constructor(name, id){
    this.name = name;
    this.id = id;
  }

  toTextNode() {
    let nameText = document.createTextNode(this.name);

    return nameText;
  }

  addClassId1(categoryContainer) {
    categoryContainer.className = 'categories';
    categoryContainer.id = 'category-' + this.id;
  }

  addTextToDivs(textName, divTarget) {
    divTarget.appendChild(textName);
  }

  createDivs() {
    let categoryContainer = document.createElement('div');
    this.addClassId1(categoryContainer);
    this.addTextToDivs(this.toTextNode(), categoryContainer);

    return categoryContainer;
  }

  appender(nameText, identifier) {
    let grid = document.getElementById(identifier);
    grid.appendChild(nameText);
  }

}
