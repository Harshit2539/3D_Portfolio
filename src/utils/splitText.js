// SplitText utility - fallback for GSAP SplitText
export class SplitText {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.options = options;
    this.chars = [];
    this.words = [];
    this.lines = [];
    
    if (this.element) {
      this.split();
    }
  }

  split() {
    const text = this.element.textContent;
    const { type = 'chars' } = this.options;
    
    // Clear the element
    this.element.innerHTML = '';
    
    if (type.includes('chars')) {
      this.splitChars(text);
    } else if (type.includes('words')) {
      this.splitWords(text);
    } else if (type.includes('lines')) {
      this.splitLines(text);
    }
  }

  splitChars(text) {
    const chars = text.split('');
    const { charsClass = 'split-char' } = this.options;
    
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.className = charsClass;
      span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space
      span.style.display = 'inline-block';
      this.element.appendChild(span);
      this.chars.push(span);
    });
  }

  splitWords(text) {
    const words = text.split(' ');
    const { wordsClass = 'split-word' } = this.options;
    
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.className = wordsClass;
      span.textContent = word;
      span.style.display = 'inline-block';
      
      if (index < words.length - 1) {
        span.style.marginRight = '0.25em';
      }
      
      this.element.appendChild(span);
      this.words.push(span);
    });
  }

  splitLines(text) {
    // Simple line splitting - more complex implementation would be needed for true line detection
    const lines = text.split('\n');
    const { linesClass = 'split-line' } = this.options;
    
    lines.forEach((line, index) => {
      const div = document.createElement('div');
      div.className = linesClass;
      div.textContent = line;
      this.element.appendChild(div);
      this.lines.push(div);
    });
  }

  revert() {
    if (this.element && this.originalText) {
      this.element.textContent = this.originalText;
    }
  }
}