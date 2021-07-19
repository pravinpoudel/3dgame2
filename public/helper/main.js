const generateHash = (string) => {
    var hash = 0;
    if (string.length == 0) return hash;
    for (i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  };

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const hasChanged = canvas.width !== width || canvas.height !== height;
    if (hasChanged) {
      renderer.setSize(width, height, false);
    }
    return hasChanged;
  }

export {generateHash, resizeRendererToDisplaySize};