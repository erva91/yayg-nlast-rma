const analyzeBtn = document.getElementById("analyzeBtn");
const sentenceInput = document.getElementById("sentenceInput");
const resultArea = document.getElementById("resultArea");
const sentimentResult = document.getElementById("sentimentResult");
const suggestions = document.getElementById("suggestions");
const projectInfoBtn = document.getElementById("project-info");
const infoSection = document.getElementById("infoSection");

// 🌿 Daha kapsamlı pozitif & negatif kelime listeleri
const positiveWords = [
  "iyi","harika","güzel","mükemmel","başarılı","seviyorum","mutlu","pozitif",
  "harikasın","tebrik","beğendim","hoş","sevinçli","sevinç","olumlu","takdir",
  "memnun","şahane","olağanüstü","süper","neşeli","destekliyorum","teşekkür",
  "yetenekli","nazik","kibar","sempatik","tatlı","şirin","güler yüzlü",
  "dostça","sabırlı","umutlu","sevgili","başardın","çalışkan"
];

const negativeWords = [
  "kötü","berbat","rezalet","nefret","aptal","salak","iğrenç","beceriksiz",
  "beceriksizsin","değersiz","umutsuz","üzgün","pişman","sinirli","kızgın",
  "nefret ediyorum","sevmem","bıktım","yoruldum","nefret ettim","nefret ediyorum",
  "ağlamak","ağladım","ağlıyorum","korkunç","nefretlik","çirkin","yetersiz",
  "aptalsın","anlamsız","saçma","kırıldım","üzüldüm","yalan","yalancı","sinir bozucu",
  "yalancısın","gıcık","sıkıcı","değil","nefretlik","nefret","bıktım","bitirdin",
  "acı","acımasız","korkunç","cehalet","yeteneksiz","nefret","pişmanım","nefret ettim",
  "üzgünüm","soğuk","duygusuz","umursamaz","nefret","kırıcı","sert","nefret dolu",
  "öfkeliyim","nefret ettim","nefret ediyorum","nefret ettim","sinirliyim","öfkeliyim",
  "nefret ettim","nefret ettim","nefret ettim","yıkıldım","rezil","nefret","bıktım"
];

// 🔍 Cümle analizi — kelimelere göre puanlama
function analyzeSentiment(text) {
  let score = 0;
  const words = text.toLowerCase().split(/\s+/);

  words.forEach(word => {
    if (positiveWords.includes(word)) score += 1;
    if (negativeWords.includes(word)) score -= 1;
  });

  return score;
}

// 💬 Pozitif alternatif önerici
function generatePositiveAlternatives(text) {
  const lower = text.toLowerCase();

  if (lower.includes("aptal") || lower.includes("beceriksiz")) {
    return [
      "Bu konuda biraz daha dikkatli olabiliriz.",
      "Belki de farklı bir yol denemeliyiz.",
      "Bu konuda sana destek olabilirim."
    ];
  }

  if (lower.includes("nefret") || lower.includes("sevmem")) {
    return [
      "Bu durumdan pek hoşlanmadım ama konuşabiliriz.",
      "Beni rahatsız eden bazı şeyler oldu.",
      "Bu konuda daha farklı düşünebiliriz."
    ];
  }

  if (lower.includes("yalancı") || lower.includes("güven")) {
    return [
      "Güven konusunda biraz endişeliyim.",
      "Beni kıran bazı durumlar yaşandı.",
      "Açık konuşabilirsek çok sevinirim."
    ];
  }

  if (lower.includes("sinirli") || lower.includes("kızgın")) {
    return [
      "Biraz sakinleşmeye ihtiyacım var.",
      "Kendimi şu an gergin hissediyorum.",
      "Bu konuyu daha sonra konuşmak isterim."
    ];
  }

  if (lower.includes("üzgün") || lower.includes("ağla")) {
    return [
      "Kendimi biraz üzgün hissediyorum.",
      "Bu durum beni duygusal olarak etkiledi.",
      "Biraz destek hissetmeye ihtiyacım var."
    ];
  }

  return [
    "Bu durumu daha yapıcı şekilde ifade edebilirim.",
    "Kendimi daha pozitif anlatmak istiyorum.",
    "Söylediklerimi daha nazikçe ifade edebilirim."
  ];
}

// ⚙️ Ana analiz işlemi
analyzeBtn.addEventListener("click", () => {
  const text = sentenceInput.value.trim();
  if (!text) return alert("Lütfen bir cümle giriniz.");

  const score = analyzeSentiment(text);
  resultArea.classList.remove("hidden");

  if (score < 0) {
    sentimentResult.textContent = "🔴 Bu cümle negatif bir ifade içeriyor.";
    const alt = generatePositiveAlternatives(text);
    suggestions.innerHTML = `Bu cümle yerine şunları kullanabilirsiniz:<br><br>• ${alt.join("<br>• ")}`;
  } else if (score > 0) {
    sentimentResult.textContent = "🟢 Bu cümle pozitif bir ifade içeriyor.";
    suggestions.textContent = "Harika! Pozitif bir dil her zaman etkileyicidir. 🌸";
  } else {
    sentimentResult.textContent = "🟡 Bu cümle nötr bir ifade içeriyor.";
    suggestions.textContent = "Bu cümleyi biraz daha duygusal veya kibar hale getirebilirsin. 💬";
  }
});

// 📖 Proje tanıtımı aç/kapat
projectInfoBtn.addEventListener("click", () => {
  infoSection.classList.toggle("hidden");
});
