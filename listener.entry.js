(function () {
  var selectorIframe = '',
      selectorInput = '';
  
  var iframeElement = document.querySelector(selectorIframe),
      inputElement = document.querySelector(selectorInput)

  function setValues(iframe, input) {
     iframe.contentWindow.postMessage({
      type: 'INIT_FORM',
      value: input.value
    }, '*');
  }

  function processIframeMessage(payload) {
    
    if (payload.from != "NG_FORM") {
      return;
    }

    if (!inputElement) {
      inputElement = document.querySelector(payload.selector);
    }

    iframeElement.value = payload.value;
  } 

  setValues(iframeElement, inputElement);

  iframeElement.addEventListener('load', function() {
    setValues(iframeElement, inputElement)
  });

  window.addEventListener('message', (e) => {
    var payload = e.data;
    processIframeMessage(payload);
  }, false);
})();
