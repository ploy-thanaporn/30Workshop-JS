const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dataTransaction = [
//   { id: 1, text: "ค่าขนม", amount: -100 },
//   { id: 2, text: "ค่าห้อง", amount: -4700 },
//   { id: 3, text: "ค่าเงินเดือน", amount: +18000 },
// ];
// let transactions = dataTransaction;

let transactions = [];

// loop ข้อมูลจาก dataTransaction
function init() {
  // clear ค่าใน list เป็นค่าว่างละค่อย update
  list.innerHTML = "";
  transactions.forEach(addDataToList);
  calculateMoney();
}

function addDataToList(transactions) {
  const symbol = transactions.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  const status = transactions.amount < 0 ? "minus" : "plus";

  result = formatNumber(Math.abs(transactions.amount));
  item.classList.add(status);

  item.innerHTML = `${transactions.text}<span> ${symbol}${result} 
  <button class="delete" onclick="removeData(${transactions.id})">x</button>`;

  // ยัด li เข้า list
  list.appendChild(item);
  console.log(status);
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function autoID() {
  return Math.floor(Math.random() * 1000000);
}

function calculateMoney() {
  const amounts = transactions.map((transactions) => transactions.amount);

  //  result = ผลลัพธ์จากการคำนวณ  item คือ ตำแหน่ง index ของ amount
  //  คำนวณยอดคงเหลือ
  const total = amounts.reduce((result, item) => result + item, 0).toFixed(2);

  //  คำนวณรายรับ
  const income = amounts
    .filter((item) => item > 0)
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);

  //  คำนวณรายจ่าย
  const expense =
    amounts
      .filter((item) => item < 0)
      .reduce((result, item) => (result += item), 0) * -(1).toFixed(2);

  // แสกงผลทางจอภาพ
  balance.innerText = `฿` + formatNumber(total);
  money_plus.innerText = `฿` + formatNumber(income);
  money_minus.innerText = `฿` + formatNumber(expense);
}

form.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();

  // trim ลบช่องว่างซ้าย ขวา
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("กรุณาป้อนข้อมูลให้ครบ");
  } else {
    const data = {
      id: autoID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(data);
    addDataToList(data);
    calculateMoney();

    // clear ค่า
    text.value = "";
    amount.value = "";
    // console.log(typeof text.value);
    // ใส่ + ข้างหน้า ให้ string เป็น number
    // console.log(typeof +amount.value);
  }
}

function removeData(id) {
  transactions = transactions.filter((transactions) => transactions.id !== id);
  init();
  //   1,2,3 => id = 1 จะมองหาที่ไม่ใช่เลข 1 ก็จะเหลือ 2,3
  //  console.log("removeData", id);
}
