import html2canvas from 'html2canvas';

export function addGlitchEffect(element: HTMLElement, sliceCount: number = 5) {
  console.warn('ADDING GLITCH EFFECT', element);

  // Check for existing wrapper and container
  const wrapper = element.closest('.glitch-wrapper') as HTMLElement;
  const glitchContainer = wrapper?.querySelector('.glitch-layer-container') as HTMLElement;

  if (!wrapper || !glitchContainer) {
    console.error('Missing .glitch-wrapper or .glitch-layer-container for', element);
    return;
  }

  // Ensure required styles
  wrapper.style.position = 'relative';
  wrapper.style.display = 'inline-block';
  element.style.position = 'relative';
  element.style.zIndex = '1';
  glitchContainer.style.position = 'absolute';
  glitchContainer.style.top = '0';
  glitchContainer.style.left = '0';
  glitchContainer.style.pointerEvents = 'none';
  glitchContainer.style.zIndex = '2';

  // Hover logic
  element.addEventListener('mouseenter', async () => {
    const rect = element.getBoundingClientRect();

    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 1,
      width: rect.width,
      height: rect.height,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight
    });

    const imgData = canvas.toDataURL();
    const sliceHeight = canvas.height / sliceCount;

    glitchContainer.innerHTML = '';
    glitchContainer.style.width = `${canvas.width}px`;
    glitchContainer.style.height = `${canvas.height}px`;

    element.classList.add('hidden'); // Hide real element

    for (let i = 0; i < sliceCount; i++) {
      const slice = document.createElement('div');
      slice.classList.add('glitch-slice');
      slice.style.position = 'absolute';
      slice.style.width = `${canvas.width}px`;
      slice.style.height = `${sliceHeight}px`;
      slice.style.background = `url(${imgData}) 0 -${i * sliceHeight}px no-repeat`;
      slice.style.top = `${i * sliceHeight}px`;
      slice.style.willChange = 'transform';

      glitchContainer.appendChild(slice);
      glitchAnimate(slice);
    }
  });

  element.addEventListener('mouseleave', () => {
    // Cancel all animations within the glitch container
    const allAnimations = glitchContainer.getAnimations();
    allAnimations.forEach(anim => anim.cancel());

    glitchContainer.innerHTML = '';
    element.classList.remove('hidden');
  });
}

// Glitch animation for slices
function glitchAnimate(slice: HTMLDivElement) {
  const offset = Math.random() * 10 - 5;
  const duration = 100 + Math.random() * 200;

  slice.animate(
    [
      { transform: `translateX(0px)` },
      { transform: `translateX(${offset}px)` },
      { transform: `translateX(0px)` }
    ],
    {
      duration,
      iterations: Infinity,
    }
  );
}
