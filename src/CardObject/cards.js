document.addEventListener("DOMContentLoaded", function () {
  const cardForm = document.getElementById("cardForm");
  const addCardBtn = document.getElementById("addCard");
  const displayCardsBtn = document.getElementById("displayCards");
  const cardsTable = document.getElementById("cardsTable");
  let cards = [];

  function Card(name, email, address, phone, birthdate) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.birthdate = birthdate;
  }

  addCardBtn.addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const birthdate = document.getElementById("birthdate").value;
    const newCard = new Card(name, email, address, phone, birthdate);
    cards.push(newCard);
    alert("Card added successfully!");
    cardForm.reset();
  });

  displayCardsBtn.addEventListener("click", function () {
    let tableHTML =
      "<table><tr><th>Name</th><th>Email</th><th>Address</th><th>Phone</th><th>Birthdate</th></tr>";
    cards.forEach(function (card) {
      tableHTML +=
        "<tr><td>" +
        card.name +
        "</td><td>" +
        card.email +
        "</td><td>" +
        card.address +
        "</td><td>" +
        card.phone +
        "</td><td>" +
        card.birthdate +
        "</td></tr>";
    });
    tableHTML += "</table>";
    cardsTable.innerHTML = tableHTML;
  });
});
