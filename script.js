/* ===========================
   PIXORA PRO — BUILD 001 JS
   Namespace: PixoraApp
   =========================== */

const PixoraApp = {

  state: {
    imageLoaded: false,
    zoomLevel: 1,
    originalImage: null
  },

  elements: {},

  init() {
    this.cacheElements();
    this.bindEvents();
  },

  cacheElements() {
    this.elements.canvas = document.getElementById('pixora-canvas');
    this.elements.ctx = this.elements.canvas.getContext('2d');
    this.elements.emptyState = document.getElementById('pixora-empty-state');
    this.elements.fileInput = document.getElementById('pixora-file-input');
    this.elements.btnUpload = document.getElementById('pixora-btn-upload');
    this.elements.btnUploadEmpty = document.getElementById('pixora-btn-upload-empty');
    this.elements.btnExport = document.getElementById('pixora-btn-export');
    this.elements.btnZoomIn = document.getElementById('pixora-btn-zoom-in');
    this.elements.btnZoomOut = document.getElementById('pixora-btn-zoom-out');
    this.elements.btnReset = document.getElementById('pixora-btn-reset');
  },

  bindEvents() {
    this.elements.btnUpload.addEventListener('click', () => this.triggerFileSelect());
    this.elements.btnUploadEmpty.addEventListener('click', () => this.triggerFileSelect());
    this.elements.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
    this.elements.btnZoomIn.addEventListener('click', () => this.zoom(1.2));
    this.elements.btnZoomOut.addEventListener('click', () => this.zoom(0.8));
    this.elements.btnReset.addEventListener('click', () => this.resetView());
  },

  triggerFileSelect() {
    this.elements.fileInput.click();
  },

  handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => this.loadImageToCanvas(img);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  },

  loadImageToCanvas(img) {
    const canvas = this.elements.canvas;
    const ctx = this.elements.ctx;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    this.state.originalImage = img;
    this.state.imageLoaded = true;
    this.state.zoomLevel = 1;

    canvas.style.display = 'block';
    this.elements.emptyState.style.display = 'none';

    this.setControlsEnabled(true);
  },

  setControlsEnabled(enabled) {
    this.elements.btnExport.disabled = !enabled;
    this.elements.btnZoomIn.disabled = !enabled;
    this.elements.btnZoomOut.disabled = !enabled;
    this.elements.btnReset.disabled = !enabled;
  },

  zoom(factor) {
    if (!this.state.imageLoaded) return;
    this.state.zoomLevel *= factor;
    this.state.zoomLevel = Math.max(0.2, Math.min(this.state.zoomLevel, 5));
    this.elements.canvas.style.transform = `scale(${this.state.zoomLevel})`;
  },

  resetView() {
    if (!this.state.imageLoaded) return;
    this.state.zoomLevel = 1;
    this.elements.canvas.style.transform = 'scale(1)';
  }

};

document.addEventListener('DOMContentLoaded', () => PixoraApp.init());
