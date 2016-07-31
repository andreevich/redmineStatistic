chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('../html/window.html', {
    'outerBounds': {
      'width': 720,
      'height': 600
    }
  });
});