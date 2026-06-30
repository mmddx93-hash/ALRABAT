import { supabase } from './supabase.js';

// ================= تنقل الصفحات =================

function go(pageId) {



  // 🔥 وقف تحديث الادمن

  if (adminInterval) clearInterval(adminInterval);





  // 🔥 وقف أي تايمر شغال

  clearInterval(timer);



  // إزالة كل الصفحات

  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));



  // تحويل صفحة النجاح حسب النوع

  if (pageId === "success") {

    if (currentType === "level") {

      pageId = "levelSuccess";

    } 

    else if (currentType === "lost") {

      pageId = "lostSuccess";

    }

  }



  // عرض الصفحة المطلوبة

  document.getElementById(pageId).classList.add("active");



  // 💰 عرض السعر في صفحة الدفع العادية

  if (pageId === "payment") {

    let priceEl = document.getElementById("price");

    if (priceEl) {

      priceEl.innerText = "Price: " + examPrice + " EGP";

    }

  }



  // 💰 عرض السعر في صفحة بدل الفاقد

  if (pageId === "lostPay") {

    let amountEl = document.querySelector("#lostPay .amount");

    if (amountEl) {

      amountEl.innerText = "Amount Due: " + examPrice + " EGP";

    }

  }

}



// ================= دارك مود =================



document.getElementById("darkBtn").onclick = () => {

  document.body.classList.toggle("dark");

};



// ================= متغيرات =================

let current = 0;

let score = 0;

let userLevel = "";

let timer;

let timeLeft = 20;

let activeQuestions = [];

let userAnswers = [];

let currentType = "main";

let isPass = true;

let examPrice = 0;

let adminInterval;





function saveUserData() {

  localStorage.setItem("name", document.getElementById("name")?.value);

  localStorage.setItem("age", document.getElementById("age")?.value);

  localStorage.setItem("phone", document.getElementById("phone")?.value);

  localStorage.setItem("education", document.getElementById("education")?.value);

}



// ================= الأسئلة =================

// 🔥 الرئيسي (25)

const mainExam = [

  {q:"Please ….. careful!",a:["be","you","you be"],c:0},

  {q:"Don’t …..",a:["late","you late","be late"],c:2},

  {q:"My ….. name is Peter.",a:["father’s","of father","father"],c:0},

  {q:"The ….. names are Fred and Tom.",a:["boy is","boys’","boy’s"],c:1},

  {q:"….. phone is this?",a:["Who’s","Whose","Who is"],c:1},

  {q:"What were you doing when you ….. the text?",a:["were getting","got","get"],c:1},

  {q:"What time ….. you go to bed last night?",a:["were","had","did"],c:2},

  {q:"Apollo 11 ….. on the Moon in 1969",a:["landed","did landed","has landed"],c:0},

  {q:"….. your parents use to have mobile phones when they were younger?",a:["Are","Did","Do"],c:1},

  {q:"Jackie didn’t ….. to like coffee, but she loves it now.",a:["use","using","used"],c:0},

  {q:"The candidate had to ….. a questionnaire for the job interview in the text.",a:["complete","close","finish"],c:0},

  {q:"Tom didn't have binoculars and couldn't ….. what type of bird was perched on the branch.",a:["detect","discern","observe"],c:1},

  {q:"The tour company ….. to families with young children.",a:["equips","supplies","caters"],c:2},

  {q:"Mark never managed to live up to his parents' …..",a:["assumptions","expectations","ambitions"],c:1},

  {q:"The organisation works to ….. the city's ancient buildings.",a:["keep","hold","preserve"],c:2}, 

  {q:"robin's rude comments made me ….. my temper.",a:["miss","lose","spoil"],c:1},

  {q:"travellers to jamaica should expect ….. weather conditions, including fierce winds and torrential rain.",a:["extreme","great","maximum"],c:0},

  {q:"we were shocked by how much industrial ….. the factory produced.",a:["waste","litter","garbage"],c:0},

  {q:"john's funny expression made us ….. into laughter.",a:["break","begin","burst"],c:2},

  {q:"the news about the accident ….. quickly and within a few hours everyone in the town knew about it.",a:["passed","unfolded","multiplied"],c:0},

  {q:"..... Over his shoulder, he could see a dog chasing him.",a:["Glanced","Glance","Glancing"],c:2},

  {q:"Help yourself to apples. They are..... for the taking.",a:["free","freely","frees"],c:0},

  {q:" I haven't..... to walk properly since the car accident.",a:["had success","succeeded","been able"],c:2},

  {q:"Susan's regular dental appointment was...... 2.30.",a:["on","for","by"],c:1},

  {q:"Despite his acquittal, the air of scandal remained....... .",a:["otherwise","nevermore","nevertheless"],c:2}

];



// 🔥 A (15)

const levelA = [

  {q:"I ….. 25 years old.",a:["am","have","is"],c:0},

  {q:"My name ….. Robert.",a:["are","is","called"],c:1},

  {q:"Are you busy? Yes …..",a:["I am","I have","I'm have"],c:0},

  {q:"We’re students. That’s ….. classroom.",a:["us","our","we"],c:1},

  {q:"What are those? ….. my pens.",a:["They are","It’s","Those"],c:0},

  {q:"What are ….. names?",a:["they","them","their"],c:2},

  {q:"There are 60 minutes in ….. hour.",a:["a","an","some"],c:1},

  {q:"Hello how are you? …..",a:["I'm fine","Thanks","I'm very"],c:0},

  {q:"There’s a nice picture ….. the wall ",a:["in","on","at"],c:1},

  {q:"I’m ….. very hard at the moment. ",a:["working","work","worker"],c:0},

  {q:"We went to Spain ….. plane and then rented a car. ",a:["by","on","in"],c:0},

  {q:"I ….. never seen a coral reef. I’d love to go diving one day. ",a:["didn’t","haven’t","did"],c:1},

  {q:"I can’t eat now. I’ve ….. had dinner. ",a:["yet","just","ever"],c:1},

  {q:"Our organisation is trying hard to ….. the local environment. ",a:["destroy","pollute","protect"],c:2},

  {q:"What ….. like when temperatures rise by 2°C? ",a:["will world","will world be","will the world be"],c:2}

];



// 🔥 B (15)

const levelB = [

  {q:"How do you usually ….. your evenings?",a:["spend","do","make"],c:0},

  {q:"We ….. have English lessons on Friday.",a:["don’t","aren’t","haven’t"],c:0},

  {q:" ….. your parents like pop music?",a:["are","do","does"],c:1},

  {q:"Shall I ….. a snack for you?",a:["do","make","serve"],c:1},

  {q:" Are there ….. cheap hotels near the beach?",a:["any","some","much"],c:0},

  {q:"In my opinion, camping holidays are always great fun.",a:["the","a","ø"],c:2},

  {q:"Bob’s looking for a part-time ….. three mornings a week.",a:["job","work","salary"],c:0},

  {q:"We ….. a film at the moment, but it’s nearly finished ",a:["watch","are watching","watching"],c:1},

  {q:"I usually ….. football on Saturdays ",a:["am playing","do play","play"],c:2},

  {q:"My brother ….. to play the guitar at the moment.",a:["learns","am learning","is learning"],c:2},

  {q:"We were shocked by how much industrial ….. the factory produced.",a:["waste","litter","garbage"],c:0},

  {q:"John’s funny expression made us ….. into laughter.",a:["break","erupt","burst"],c:2},

  {q:"The news about the accident ….. quickly and within a few hours everyone in the town knew about it.",a:["passed","spread","unfolded"],c:1},

  {q:"Paul was ….. with a medal for his bravery.",a:["presented","awarded","given"],c:1},

  {q:"Deborah’s family have a low ….. because her parents only work part-time.",a:["account","income","profit"],c:1}

];



// 🔥 C (15)

const levelC = [

  {q:"I finally gave into the ….. and ate a huge piece of chocolate cake.",a:["temptation","appeal","attraction"],c:0},

  {q:"Lucy was ….. about her uncle’s car accident.",a:["ruined","upset","spoiled"],c:1},

  {q:"Though the film is primarily a comedy, the director has ….. an element of suspense into the plot.",a:["integrated","interpreted","interacted"],c:0},

  {q:"The doctor ….. cycling as the best all-round exercise.",a:["warned","recommended","required"],c:1},

  {q:"We ….. on the door but no one answered.",a:["knocked","hit","struck"],c:0},

  {q:"The product has been ….. due to the lack of sales.",a:["discontinued","disposed","dismissed"],c:0},

  {q:"Ken has ….. from the flu.",a:["treated","recovered","cured"],c:1},

  {q:"Sam often ….. on snacks while watching TV.",a:["crunches","munches","chews"],c:1},

  {q:"Bob suffered a ….. in the accident.",a:["injury","sickness","illness"],c:0},

  {q:"Joe’s parents didn’t ….. of his new friends.",a:["agree","approve","accept"],c:1},

  {q:"….. over his shoulder, he could see a dog chasing him.",a:["glanced","glancing","glance"],c:1},

  {q:"Help yourself to apples. They are for the …..",a:["free","freely","freed"],c:0},

  {q:".I haven’t ….. to walk properly since the car accident.",a:["been able","had success","succeeded"],c:0},

  {q:"Susan’s regular dental appointment was ….. 2.30.",a:["on","for","in"],c:0},

  {q:"Despite his acquittal, the air of scandal remained …..",a:["nevertheless","otherwise","moreover"],c:0}

];



// ================= بدء الامتحان =================

function startMainExam() {

  saveUserData();

  examPrice = 5000;

  activeQuestions = mainExam;

  currentType = "main";

  startExam();

} 



function startLevelExam(type) {

  saveUserData();

  currentType = type;

  examPrice = 3500;



  if (type === "A") activeQuestions = levelA;

  if (type === "B") activeQuestions = levelB;

  if (type === "C") activeQuestions = levelC;



  startExam();

} 



function startExam() {

  current = 0;

  score = 0;

  userAnswers = [];

  go("exam");

  loadQuestion();

}



// ================= عرض السؤال =================

function loadQuestion() {

  // 🔥 وقف أي تايمر قديم

  if (timer) clearInterval(timer);

  timeLeft = 20;

  let q = activeQuestions[current];

document.getElementById("question").innerText =

`Question ${current + 1}/${activeQuestions.length}: ${q.q}`; 



  document.getElementById("a1").innerText = q.a[0];

  document.getElementById("a2").innerText = q.a[1];

  document.getElementById("a3").innerText = q.a[2];

  // 🔄 إلغاء أي اختيار قديم

  document.querySelectorAll("input[name='q']").forEach(i => i.checked = false);

  document.getElementById("timer").innerText = timeLeft;

  const bar = document.getElementById("timerBar");

  // ✅ Reset كامل للتايمر (أخضر + 100%)

  bar.style.transition = "none";

  bar.style.width = "100%";

  bar.style.background = "linear-gradient(90deg, #4caf50, #8bc34a)";

  // 🔥 إجبار المتصفح يعمل reflow علشان الترانزيشن يشتغل صح

  bar.offsetHeight;

  // 🔄 رجوع الانيميشن

  bar.style.transition = "width 1s linear";



  // ⏱️ تشغيل التايمر

  timer = setInterval(() => {

    timeLeft--;

    // 🎨 تغيير اللون حسب الوقت

    if (timeLeft > 10) {

      bar.style.background = "linear-gradient(90deg, #4caf50, #8bc34a)";

   } 

    else if (timeLeft > 5) {

      bar.style.background = "linear-gradient(90deg, #ffc107, #ff9800)";

    } 

    else {

      bar.style.background = "linear-gradient(90deg, #f44336, #d32f2f)";

    }

    // ⏳ تقليل العرض

    bar.style.width = (timeLeft / 20 * 100) + "%";

    document.getElementById("timer").innerText = timeLeft;

    // ⛔ انتهاء الوقت

    if (timeLeft <= 0) {

      clearInterval(timer);

      nextQuestion();

    }

  }, 1000);

}





// ================= التالي =================



function nextQuestion() {

  clearInterval(timer);

  let selectedRadio = document.querySelector("input[name='q']:checked");

  let selected = selectedRadio ? Number(selectedRadio.value) : -1;

  userAnswers.push(selected);

  if (selected !== -1 && selected === activeQuestions[current].c) {

    score++;

  }

  current++;

  if (current < activeQuestions.length) {

    loadQuestion();

  } else {

    showResult();

  }

}



// ================= النتيجة =================

function showResult() {



  let level = "";

  let percent = (score / activeQuestions.length) * 100;



  if (percent < 40) level = "A1";

  else if (percent < 60) level = "A2";

  else if (percent < 75) level = "B1";

  else if (percent < 90) level = "B2";

  else level = "C1";



  userLevel = level;



  // ✅ عرض النتيجة

  document.getElementById("score").innerText = score;

  document.getElementById("level").innerText = level;

let levelView = document.getElementById("levelView");

if (levelView) {

  levelView.value = level;

}



  // ✅ نحط القيم في الفورم (المهم جدًا)

  document.getElementById("examTypeInput").value = currentType;

  document.getElementById("levelInput").value = userLevel;

  document.getElementById("scoreHidden").value = score;

  document.getElementById("totalInput").value = activeQuestions.length;



let reviewDiv = document.getElementById("review");

reviewDiv.innerHTML = "";



activeQuestions.forEach((q, i) => {

  let userAnsIndex = userAnswers[i];

  let correctIndex = q.c;



  let userAns = userAnsIndex !== -1 ? q.a[userAnsIndex] : "No Answer";

  let correctAns = q.a[correctIndex];



  let isCorrect = userAnsIndex === correctIndex;



  let className = isCorrect ? "correct" : "wrong";



  reviewDiv.innerHTML += `

    <div class="${className}">

      <p><b>Question ${i + 1}:</b> ${q.q}</p>

      <p>✔ Correct Answer: ${correctAns}</p>

      <p>👤 Your Answer: ${userAns}</p>

    </div>

  `;

});



  // ✅ نروح لصفحة النتيجة فقط (بدون إرسال)

  go("result");

}

//========pay=====//



function goLostPayment() {

  let phone = document.getElementById("lostPhone").value;

  if (!phone) {

    alert("Enter phone number"); 

    return;

  }



  currentType = "lost";

  examPrice = 3500;



  go("lostPay");

}

// ================= Payment =================//

async function pay() { 



  const paymentPage = document.querySelector("#payment.active, #lostPay.active");

  if (!paymentPage) return;



  const input = document.getElementById("payment").classList.contains("active")

    ? document.getElementById("bankakId")

    : document.getElementById("lostBankakId");



  // ✅ تغيير اسم error لتفادي التعارض

  const errorEl = paymentPage.querySelector(".pay-error");



  // 🔥 تنظيف الرقم أولاً

  let id = input.value.replace(/[^0-9]/g, "");

  input.value = id;



  errorEl.innerText = "";



  // ❌ فحص الإدخال

  if (!id) {

    errorEl.innerText = "Please complete the input";

    return;

  }



  if (id.length < 5) {

    errorEl.innerText = "Invalid Transaction ID";

    return;

  }



  // 💰 إرسال الدفع للسيرفر

  const { error } = await supabase

    .from("payments")

    .insert([{

      user_id: localStorage.getItem("user_id"),

      amount: examPrice,

      method: "bankak",

      status: "pending",

      transaction_id: id

    }]);



  if (error) {

    console.log(error.message);

    alert("❌ Payment failed");

  } else {

    go("success");

  }

}





// ================= Lost Payment =================//

function selectLostPay(type) {

  let container = document.getElementById("lostPay");

  container.querySelectorAll(".pay-box").forEach(box => {

    box.classList.remove("active");

  });

  container.querySelectorAll(".pay-form").forEach(form => {

    form.classList.remove("active");

  });

  document.getElementById(type + "Box").classList.add("active");

  document.getElementById(type + "Form").classList.add("active");

}

function selectPay(type) {

  let container = document.getElementById("payment");

  // إزالة التفعيل

  container.querySelectorAll(".pay-box").forEach(box => {

    box.classList.remove("active");

  });

  container.querySelectorAll(".pay-form").forEach(form => {

   form.classList.remove("active");

  });

  // تفعيل الجديد

  let box = document.getElementById(type + "Box");

  let form = document.getElementById(type + "Form");

  if (box && form) {

    box.classList.add("active");

    form.classList.add("active");

  }

} 

function copyAccount() {

  let acc1 = document.getElementById("accountNumber1");

  let acc2 = document.getElementById("accountNumber2");

  let text = acc1?.innerText || acc2?.innerText;

  navigator.clipboard.writeText(text);

  alert("Copied!");

}

function closeHelp(e){

  if(e.target.id === "help"){

    document.getElementById("help").classList.remove("active");

  }

}

// 🔥 بعد success

function afterSuccess() {



  // 🟡 بدل فاقد

  if (currentType === "lost") {

    go("welcome");

    return;

  }



  // 🔵 Level Exam (A / B / C بدون فيديو)

  if (currentType === "A" || currentType === "B" || currentType === "C") {

    go("welcome");

    return;

  }



 // 🟢 Placement Test بس

goVideos(); 

} 



function goWelcome() {

  go("welcome");

}

function goVideos() {

  let videoFrame = document.getElementById("videoFrame");



  if (userLevel.includes("A")) {

    videoFrame.src = "https://www.youtube.com/embed/nz4AlO8vjOY";

  } 

  else if (userLevel.includes("B")) {

    videoFrame.src = "https://www.youtube.com/embed/YwYSNwFpJw0";

  } 

  else if (userLevel.includes("C")) {

    videoFrame.src = "https://www.youtube.com/embed/5mEG32yZYE0";

  } 

  else {

    videoFrame.src = "";

  }



  go("videoPage");

}



// 🔥 يقفل الفيديو

function closeVideo() {

  document.getElementById("videoFrame").src = "";

  go("welcome");

} 

document.getElementById("studentForm").addEventListener("submit", async function (e) {

  e.preventDefault();



  const { data, error } = await supabase

    .from("users")

    .insert([{

      name: document.getElementById("name").value,

      age: document.getElementById("age").value,

      phone: document.getElementById("phone").value,

      education: document.getElementById("education").value,

      level: userLevel,

      score: score

    }])

    .select()

    .single();



  if (error) {

    console.log(error.message);

    alert("❌ Error saving user");

    return;

  }



  // نحفظ user id

  localStorage.setItem("user_id", data.id);



  go("payment");

});





function goToForm() {
let percent = (score / activeQuestions.length) * 100;

  if (percent < 40) {
    go("fail");
    return;
  }


  // ✅ نحط القيم قبل ما نروح للفورم

  document.getElementById("examTypeInput").value = currentType;

  document.getElementById("levelInput").value = userLevel;

  document.getElementById("scoreHidden").value = score;

  document.getElementById("totalInput").value = activeQuestions.length;



let levelView = document.getElementById("levelView");

if (levelView) {

  levelView.value = userLevel;

} 

  // 👉 نروح للفورم

  go("form");

}



function checkAdmin() {

  let pass = document.getElementById("adminPass").value;

  let error = document.getElementById("loginError");



  if (pass === "1234") {

    loadUsers();

  } else {

    error.innerText = "Wrong Password";

  }

}



async function loadUsers() {



  const { data, error } = await supabase

    .from("users")

    .select("*");



  if (error) {

    console.log(error.message);

    alert(error.message);

    return;

  }



  let html = "<table border='1' style='width:100%'>";

  html += "<tr><th>Name</th><th>Phone</th><th>Level</th><th>Score</th></tr>";



  data.forEach(user => {

    html += `

      <tr>

        <td>${user.name}</td>

        <td>${user.phone}</td>

        <td>${user.level || "-"}</td>

        <td>${user.score || "-"}</td>

      </tr>

    `;

  });



  html += "</table>";



  document.getElementById("usersData").innerHTML = html;



  go("adminPanel");

}

window.go = go;

window.startMainExam = startMainExam;

window.startLevelExam = startLevelExam;

window.nextQuestion = nextQuestion;

window.goToForm = goToForm;

window.pay = pay;

window.selectPay = selectPay;

window.selectLostPay = selectLostPay;

window.copyAccount = copyAccount;

window.closeHelp = closeHelp;

window.afterSuccess = afterSuccess;

window.goWelcome = goWelcome;

window.closeVideo = closeVideo;

window.goLostPayment = goLostPayment;

window.checkAdmin = checkAdmin;
