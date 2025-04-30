function drawWalls() {
  const numWalls = parseInt(document.getElementById('numWalls').value);
  const heightsInput = document.getElementById('heights').value.trim();
  const heightArray = heightsInput.split('#').map(Number);
  const wallContainer = document.getElementById('wall-container');
  const resultsDiv = document.getElementById('results');
  const errorDiv = document.getElementById('error');

  wallContainer.innerHTML = '';
  resultsDiv.innerHTML = '';
  errorDiv.textContent = '';

  if (isNaN(numWalls) || numWalls <= 0) {
    errorDiv.textContent = 'Please enter a valid number of walls.';
    return;
  }

  if (heightArray.length !== numWalls || heightArray.some(h => isNaN(h) || h <= 0)) {
    errorDiv.textContent = 'Please enter exactly ' + numWalls + ' positive wall heights, separated by "#".';
    return;
  }

  const maxHeight = Math.max(...heightArray);
  const scaleFactor = maxHeight > 0 ? 200 / maxHeight : 0;

  heightArray.forEach(height => {
    const bar = document.createElement('div');
    bar.classList.add('wall');
    bar.style.height = `${height * scaleFactor}px`;
    bar.textContent = height;
    wallContainer.appendChild(bar);
  });

  let maxLeft = -1, visibleLeft = 0;
  for (let i = 0; i < heightArray.length; i++) {
    if (heightArray[i] > maxLeft) {  
      visibleLeft++;
      maxLeft = heightArray[i];
    }
  }

  let maxRight = -1, visibleRight = 0;
  for (let i = heightArray.length - 1; i >= 0; i--) {
    if (heightArray[i] > maxRight) {
      visibleRight++;
      maxRight = heightArray[i];
    }
  }

  resultsDiv.innerHTML = `
    <strong>Wall visible from Left:</strong> ${visibleLeft}<br>
    <strong>Wall visible from Right:</strong> ${visibleRight}
  `;
}