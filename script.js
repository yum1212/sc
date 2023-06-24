document.addEventListener('DOMContentLoaded', function() {
  var urlInput = document.getElementById('urlInput');
  var scrapeButton = document.getElementById('scrapeButton');
  var resultDiv = document.getElementById('result');

  scrapeButton.addEventListener('click', function() {
    var url = urlInput.value;
    if (url) {
      scrapeData(url);
    } else {
      resultDiv.textContent = 'URLを入力してください';
    }
  });

  function scrapeData(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var responseHTML = xhr.responseText;
          var parser = new DOMParser();
          var doc = parser.parseFromString(responseHTML, 'text/html');
          var titleElement = doc.querySelector('title');
          var title = titleElement ? titleElement.textContent : '';

          resultDiv.textContent = 'タイトル: ' + title;
          copyToClipboard(title);
          showMessage('クリップボードにコピーされました');
        } else {
          resultDiv.textContent = 'データの取得に失敗しました';
        }
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  }

  function copyToClipboard(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  function showMessage(message) {
    var messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.classList.add('text-sm', 'text-gray-700', 'mt-2');
    resultDiv.appendChild(messageDiv);
  }
});
