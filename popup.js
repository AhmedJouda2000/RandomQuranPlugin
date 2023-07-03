  document.addEventListener('DOMContentLoaded', function() {
    var generateButton = document.getElementById('generateButton');
    var verseElement = document.getElementById('verse');
    var audioPlayer = document.getElementById('audioPlayer');
    verseElement.setAttribute('style', 'white-space: pre-line;');
    generateButton.addEventListener('click', function() {
      var ayahnumber = Math.floor((Math.random() * 6237) + 1);
      var versePromises = [
        fetch('https://api.alquran.cloud/v1/ayah/'+ayahnumber),
        fetch('https://api.alquran.cloud/v1/ayah/'+ayahnumber+'/en.asad')
      ];
  
      Promise.all(versePromises)
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
          var verseArabicName = data.slice(0,1).map(response => response.data.surah.name);
          var verseEnglishName = data.slice(0,1).map(response => response.data.surah.englishName);
          var ayaNumberInSurah = data.slice(0,1).map(response => response.data.numberInSurah);
          var verseTexts = data.slice(0, 2).map(response => response.data.text);
          var combinedVerseText = verseTexts.join('\n');
          verseElement.textContent = "Surah: "+verseEnglishName+'-'+verseArabicName+'\nAyah: '+ayaNumberInSurah+'\n\n'+combinedVerseText;
          verseElement.classList.add('arabic-verse');
          audioPlayer.src = 'https://cdn.islamic.network//quran//audio//64//ar.alafasy//'+ayahnumber+'.mp3';
          audioPlayer.style.display = 'block';
        })
        .catch(error => {
          console.error('Error:', error);
          verseElement.textContent = 'Failed to fetch verse';
        });
    });
  });
  
  