const container = document.getElementById("visualizer-container");
let array = [];
let speed = 100; // Default speed in milliseconds

// Function to generate random array and display bars
function generateRandomArray(size = 50) {
  array = [];
  container.innerHTML = ''; // Clear previous bars
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 100) + 1;
    array.push(value);
    const bar = document.createElement('div');
    bar.style.height = `${value}%`;
    bar.classList.add('bar');
    container.appendChild(bar);
  }
}

// Function to add color-coded bars for comparison, swapping, and sorted state
function setColor(bar, color) {
  bar.style.backgroundColor = color;
}

// Bubble Sort Visualization with early exit condition for efficiency
async function bubbleSort() {
  let bars = document.getElementsByClassName('bar');
  let swapped;
  for (let i = 0; i < array.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < array.length - i - 1; j++) {
      setColor(bars[j], 'red'); // Comparison color
      setColor(bars[j + 1], 'red');

      if (array[j] > array[j + 1]) {
        await swap(bars[j], bars[j + 1]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      }

      setColor(bars[j], 'blue'); // Reset color after comparison
      setColor(bars[j + 1], 'blue');
    }
    setColor(bars[array.length - i - 1], 'green'); // Mark sorted bar

    if (!swapped) break; // Early exit if no swaps
  }
  setColor(bars[0], 'green'); // Mark remaining bar as sorted
}

// Quick Sort Visualization
async function quickSort(low = 0, high = array.length - 1) {
  if (low < high) {
    let pi = await partition(low, high);
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
}

// Partition function for Quick Sort
async function partition(low, high) {
  let pivot = array[high];
  let i = low - 1;
  let bars = document.getElementsByClassName('bar');

  for (let j = low; j < high; j++) {
    setColor(bars[j], 'red');
    if (array[j] < pivot) {
      i++;
      await swap(bars[i], bars[j]);
      [array[i], array[j]] = [array[j], array[i]];
    }
    setColor(bars[j], 'blue');
  }
  await swap(bars[i + 1], bars[high]);
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  setColor(bars[i + 1], 'green'); // Mark pivot as sorted
  return i + 1;
}

// Merge Sort Visualization
async function mergeSort(start = 0, end = array.length - 1) {
  if (start < end) {
    let mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
  }
}

// Merge function for Merge Sort
async function merge(start, mid, end) {
  let bars = document.getElementsByClassName('bar');
  let left = array.slice(start, mid + 1);
  let right = array.slice(mid + 1, end + 1);
  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    setColor(bars[k], 'red'); // Comparison color
    if (left[i] <= right[j]) {
      array[k] = left[i];
      bars[k].style.height = `${left[i]}%`;
      i++;
    } else {
      array[k] = right[j];
      bars[k].style.height = `${right[j]}%`;
      j++;
    }
    setColor(bars[k], 'blue'); // Reset color after comparison
    k++;
    await new Promise((resolve) => setTimeout(resolve, speed));
  }

  while (i < left.length) {
    array[k] = left[i];
    bars[k].style.height = `${left[i]}%`;
    setColor(bars[k], 'blue');
    i++;
    k++;
    await new Promise((resolve) => setTimeout(resolve, speed));
  }

  while (j < right.length) {
    array[k] = right[j];
    bars[k].style.height = `${right[j]}%`;
    setColor(bars[k], 'blue');
    j++;
    k++;
    await new Promise((resolve) => setTimeout(resolve, speed));
  }
}

// Swap bar heights for visual effect
async function swap(bar1, bar2) {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        let tempHeight = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tempHeight;
        resolve();
      }, speed);
    });
  });
}

// Start sorting based on selected algorithm
function startSort(algorithm) {
  switch (algorithm) {
    case 'bubble':
      bubbleSort();
      break;
    case 'quick':
      quickSort();
      break;
    case 'merge':
      mergeSort();
      break;
  }
}

// Generate random array and set speed on page load
window.onload = () => {
  const sizeInput = document.getElementById("array-size");
  const speedInput = document.getElementById("speed-range");

  sizeInput.addEventListener("input", (e) => {
    generateRandomArray(e.target.value);
  });

  speedInput.addEventListener("input", (e) => {
    speed = 200 - e.target.value; // Adjust speed dynamically
  });

  generateRandomArray();
};
