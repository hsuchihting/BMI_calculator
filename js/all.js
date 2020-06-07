//身高
let peopleHeight = document.querySelector(".peopleHeight");
//體重
let peopleWeight = document.querySelector(".peopleWeight");
//結果按鈕
let calculatorBMI = document.querySelector(".calculatorBMI");
//結果清單
let bmiRecordList = document.querySelector(".bmiRecordList");

//若是資料庫中有資料，就轉成物件存進Data, 若沒有就創造一個空陣列
let data = JSON.parse(localStorage.getItem("BMIData")) || [];

//bmi數值分析
function BMICalculate(e) {
  // e.preventDefault();
  //將身高輸入值轉成數字，單位為公尺
  var height = parseInt(peopleHeight.value) / 100;
  //將體重輸入值轉為數字
  var weight = parseInt(peopleWeight.value);
  //bmi value = 體重/身高平方
  var bmiValue = (weight / Math.pow(height, 2)).toFixed(2);

  let bmiStatus = "";
  let color = "";

  //.calculatorBMI 結果,對應顏色
  switch (true) {
    case bmiValue <= 18.5:
      bmiStatus = "太輕了";
      break;
    case 18.5 < bmiValue && bmiValue <= 25:
      bmiStatus = "剛剛好";
      break;
    case 25 < bmiValue && bmiValue <= 30:
      bmiStatus = "有點重";
      break;
    case 30 < bmiValue && bmiValue <= 35:
      bmiStatus = "有點胖";
      break;
    case 35 < bmiValue && bmiValue <= 40:
      bmiStatus = "太胖囉";
      break;
    case 40 < bmiValue:
      bmiStatus = "超級胖";
      break;
    default:
      alert("請輸入資料");
      break;
  }

  //取得日期
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1; //month表示月份的整數。由 0 開始（一月）到 11 （十二月）。
  let day = date.getDate();
  let time = `${year}/${month}/${day}`;

  // 結果
  let BMIData = {
    height: height * 100,
    weight: weight,
    bmiValue: bmiValue,
    bmiStatus: bmiStatus,
    time: time,
    color: color
  };

  //將最新的資料插入陣列中第一個，讓列表能從最新一筆開始
  data.splice(0, 0, BMIData); //將新的BMIData(物件)存進data
  updateList(data);

  localStorage.setItem("BMIList", JSON.stringify(data));
  if (data.length >= 6) {
    clear();
  }

  //清單超過 6 筆即刪除最舊的資料
  function clear() {
    for (let i = 0; i < data.length; i++) {
      data.splice(i, 1);
    }
    localStorage.setItem("BMIList", JSON.stringify(data));
  }
}
calculatorBMI.addEventListener("click", BMICalculate);

// 更新畫面
function updateList(data) {
  str = "";
  for (let i = 0; i < data.length; i++) {
    let text = "";

    function textFunction(color, item) {
      if (data[i].bmiStatus == "太輕了") {
        text = `
        <li class="BMIStatus"  style='border-left: 10px solid #31BAF9'>
          <div class="BMIStatus">${data[i].bmiStatus}</div>
          <div class="BMIStatus"><span class="text">BMI</span>${data[i].bmiValue}</div>
          <div class="BMIStatus"><span class="text">Height</span>${data[i].height}cm</div>
          <div class="BMIStatus"><span class="text">Weight</span>${data[i].weight}kg</div>
          <div class="BMIStatus">${data[i].time}</div>
          <div class="BMIStatus"><a href="#"><i class='fas fa-times-circle'></i></a></div>
        </li>`
      } else if (data[i].bmiStatus == "剛剛好") {
        text = `
        <li class="BMIStatus"
        style='border-left: 10px solid #72ce22'>
          <div class="BMIStatus">${data[i].bmiStatus}</div>
          <div class="BMIStatus"><span class="text">BMI</span>${data[i].bmiValue}</div>
          <div class="BMIStatus"><span class="text">Height</span>${data[i].height}cm</div>
          <div class="BMIStatus"><span class="text">Weight</span>${data[i].weight}kg</div>
          <div class="BMIStatus">${data[i].time}</div>
          <div class="BMIStatus"><a href="#"><i class='fas fa-times-circle'></i></a></div>
        </li>`
      } else if (data[i].bmiStatus == "有點重") {
        text = `
        <li class="BMIStatus"
        style='border-left: 10px solid #FF982D'>
          <div class="BMIStatus">${data[i].bmiStatus}</div>
          <div class="BMIStatus"><span class="text">BMI</span>${data[i].bmiValue}</div>
          <div class="BMIStatus"><span class="text">Height</span>${data[i].height}cm</div>
          <div class="BMIStatus"><span class="text">Weight</span>${data[i].weight}kg</div>
          <div class="BMIStatus">${data[i].time}</div>
          <div class="BMIStatus"><a href="#"><i class='fas fa-times-circle'></i></a></div>
        </li>`
      } else if (data[i].bmiStatus == "有點胖") {
        text = `
        <li class="BMIStatus"
        style='border-left: 10px solid #FF6C03'>
          <div class="BMIStatus">${data[i].bmiStatus}</div>
          <div class="BMIStatus"><span class="text">BMI</span>${data[i].bmiValue}</div>
          <div class="BMIStatus"><span class="text">Height</span>${data[i].height}cm</div>
          <div class="BMIStatus"><span class="text">Weight</span>${data[i].weight}kg</div>
          <div class="BMIStatus">${data[i].time}</div>
          <div class="BMIStatus"><a href="#"><i class='fas fa-times-circle'></i></a></div>
        </li>`
      } else if (data[i].bmiStatus == "太胖囉") {
        text = `
        <li class="BMIStatus"
        style='border-left: 10px solid #FF6C03'>
          <div class="BMIStatus">${data[i].bmiStatus}</div>
          <div class="BMIStatus"><span class="text">BMI</span>${data[i].bmiValue}</div>
          <div class="BMIStatus"><span class="text">Height</span>${data[i].height}cm</div>
          <div class="BMIStatus"><span class="text">Weight</span>${data[i].weight}kg</div>
          <div class="BMIStatus">${data[i].time}</div>
          <div class="BMIStatus"><a href="#"><i class='fas fa-times-circle'></i></a></div>
        </li>`
      } else if (data[i].bmiStatus == "超級胖") {
        text = `
        <li class="BMIStatus"
        style='border-left: 10px solid #FF1200'>
          <div class="BMIStatus">${data[i].bmiStatus}</div>
          <div class="BMIStatus"><span class="text">BMI</span>${data[i].bmiValue}</div>
          <div class="BMIStatus"><span class="text">Height</span>${data[i].height}cm</div>
          <div class="BMIStatus"><span class="text">Weight</span>${data[i].weight}kg</div>
          <div class="BMIStatus">${data[i].time}</div>
          <div class="BMIStatus"><a href="#"><i class='fas fa-times-circle'></i></a></div>
        </li>`
      } else {
        return;
      }
    }

    // 對應 textFunction 內容
    switch (data[i].bmiStatus) {
      case "太輕了":
        textFunction(data[i]);
        break;

      case "剛剛好":
        textFunction(data[i]);
        break;

      case "有點重":
        textFunction(data[i]);
        break;

      case "有點胖":
        textFunction(data[i]);
        break;

      case "太胖囉":
        textFunction(data[i]);
        break;

      case "超級胖":
        textFunction(data[i]);
        break;

      default:
        // alert('請輸入資料');
        // break;
    }
    str += text;
  }
  bmiRecordList.innerHTML = str;
}
updateList(data);
// 刪除 li

function clearData(e) {
  let current = e.target.nodeName;
  if (current == "A" || current == "I") {
    let currentNum = e.target.dataset.num;
    data.splice(currentNum, 1);
  } else {
    return;
  }
  updateList(data);
}
bmiRecordList.addEventListener("click", clearData);