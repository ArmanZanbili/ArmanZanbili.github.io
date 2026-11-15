
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const hint = document.getElementById("hint");
const questionCard = document.getElementById("questionCard");
const finalCard = document.getElementById("finalCard");

let noCount = 0;

const messages = [
  "دلت میاد بهم نه بگی؟؟؟ 🥺💔",
  "نه رو نزنیا، دلم می‌شکنه 😭❤️",
  "ولی من قربونت رفتم قبلاً 🥹💗",
  "دورت بگردم، نه مگه داریم اینجا؟ 😂💕",
  "یه کوچولو به این خرسه رحم کن دیگه! 🧸🥺",
  "قول می‌دم آدم خوبی باشم، فقط آره رو بزن! 😇💞",
  "این نه گفتنت قلبمو ریز ریز کردااا 😭",
  "آخه چرا با دلم بازی می‌کنی؟ 🥲💘",
  "من هنوز امید دارمااا 😂❤️",
  "عه! باز پیدام کردی؟ فراررر! 🏃‍♂️💕"
];

const MIN_SCALE = 0.35;
const MAX_YES_SCALE = 2.2;

let previousX = null;
let previousY = null;

// پیدا کردن یک موقعیت جدید در کل صفحه
function moveNoButton() {
  const margin = 15;

  const width = noBtn.offsetWidth;
  const height = noBtn.offsetHeight;

  const maxX = window.innerWidth - width - margin;
  const maxY = window.innerHeight - height - margin;

  let newX;
  let newY;

  // تلاش برای پیدا کردن موقعیتی دور از موقعیت قبلی
  for (let i = 0; i < 40; i++) {
    newX = margin + Math.random() * Math.max(0, maxX - margin);
    newY = margin + Math.random() * Math.max(0, maxY - margin);

    if (
      previousX === null ||
      Math.hypot(newX - previousX, newY - previousY) > 120
    ) {
      break;
    }
  }

  previousX = newX;
  previousY = newY;

  noBtn.style.position = "fixed";
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
  noBtn.style.right = "auto";
  noBtn.style.bottom = "auto";
  noBtn.style.margin = "0";
  noBtn.style.zIndex = "1000";
}

// کلیک روی نه
noBtn.addEventListener("click", () => {
  noCount++;

  hint.textContent =
    messages[(noCount - 1) % messages.length];

  // بزرگ شدن آره
  const yesScale = Math.min(
    1 + noCount * 0.13,
    MAX_YES_SCALE
  );

  yesBtn.style.transform = `scale(${yesScale})`;

  // کوچک شدن نه
  const noScale = Math.max(
    1 - noCount * 0.09,
    MIN_SCALE
  );

  noBtn.style.transform = `scale(${noScale})`;

  // فرار به نقطه جدید
  moveNoButton();
});

// کلیک روی آره
yesBtn.addEventListener("click", () => {
  questionCard.classList.add("hidden");
  noBtn.style.display = "none";
  finalCard.classList.remove("hidden");

  document.title = "قربونت برم! 💗";
});

// تنظیم مجدد موقعیت در تغییر اندازه صفحه
window.addEventListener("resize", () => {
  if (noCount > 0 && !questionCard.classList.contains("hidden")) {
    moveNoButton();
  }
});

// ثبت PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .catch(console.error);
  });
}

