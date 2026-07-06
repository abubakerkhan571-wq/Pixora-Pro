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
/* ===========================
   PIXORA PRO — BUILD 002 JS
   Namespace: PixoraApp
   =========================== */

const PixoraApp = {

  state: {
    imageLoaded: false,
    zoomLevel: 1,
    originalImage: null,
    rotation: 0,
    cropMode: false,
    cropBoxRect: null
  },

  elements: {},
  cropDrag: null,

  init() {
    this.cacheElements();
    this.bindEvents();
  },

  cacheElements() {
    this.elements.canvas = document.getElementById('pixora-canvas');
    this.elements.ctx = this.elements.canvas.getContext('2d');
    this.elements.canvasWrapper = document.getElementById('pixora-canvas-wrapper');
    this.elements.emptyState = document.getElementById('pixora-empty-state');
    this.elements.fileInput = document.getElementById('pixora-file-input');

    this.elements.btnUpload = document.getElementById('pixora-btn-upload');
    this.elements.btnUploadEmpty = document.getElementById('pixora-btn-upload-empty');
    this.elements.btnExport = document.getElementById('pixora-btn-export');
    this.elements.btnZoomIn = document.getElementById('pixora-btn-zoom-in');
    this.elements.btnZoomOut = document.getElementById('pixora-btn-zoom-out');
    this.elements.btnReset = document.getElementById('pixora-btn-reset');

    this.elements.btnRotateLeft = document.getElementById('pixora-btn-rotate-left');
    this.elements.btnRotateRight = document.getElementById('pixora-btn-rotate-right');
    this.elements.btnCrop = document.getElementById('pixora-btn-crop');

    this.elements.cropOverlay = document.getElementById('pixora-crop-overlay');
    this.elements.cropBox = document.getElementById('pixora-crop-box');
    this.elements.cropActions = document.getElementById('pixora-crop-actions');
    this.elements.btnCropCancel = document.getElementById('pixora-btn-crop-cancel');
    this.elements.btnCropConfirm = document.getElementById('pixora-btn-crop-confirm');
  },

  bindEvents() {
    this.elements.btnUpload.addEventListener('click', () => this.triggerFileSelect());
    this.elements.btnUploadEmpty.addEventListener('click', () => this.triggerFileSelect());
    this.elements.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

    this.elements.btnZoomIn.addEventListener('click', () => this.zoom(1.2));
    this.elements.btnZoomOut.addEventListener('click', () => this.zoom(0.8));
    this.elements.btnReset.addEventListener('click', () => this.resetView());

    this.elements.btnRotateLeft.addEventListener('click', () => this.rotateImage(-1));
    this.elements.btnRotateRight.addEventListener('click', () => this.rotateImage(1));

    this.elements.btnCrop.addEventListener('click', () => this.toggleCropMode());
    this.elements.btnCropCancel.addEventListener('click', () => this.cancelCrop());
    this.elements.btnCropConfirm.addEventListener('click', () => this.confirmCrop());

    this.bindCropDragEvents();
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
    this.state.rotation = 0;

    canvas.style.display = 'block';
    canvas.style.transform = 'scale(1)';
    this.elements.emptyState.style.display = 'none';

    this.setControlsEnabled(true);
  },

  setControlsEnabled(enabled) {
    this.elements.btnExport.disabled = !enabled;
    this.elements.btnZoomIn.disabled = !enabled;
    this.elements.btnZoomOut.disabled = !enabled;
    this.elements.btnReset.disabled = !enabled;
    this.elements.btnRotateLeft.disabled = !enabled;
    this.elements.btnRotateRight.disabled = !enabled;
    this.elements.btnCrop.disabled = !enabled;
  },

  zoom(factor) {
    if (!this.state.imageLoaded || this.state.cropMode) return;
    this.state.zoomLevel *= factor;
    this.state.zoomLevel = Math.max(0.2, Math.min(this.state.zoomLevel, 5));
    this.elements.canvas.style.transform = `scale(${this.state.zoomLevel})`;
  },

  resetView() {
    if (!this.state.imageLoaded) return;
    this.state.zoomLevel = 1;
    this.elements.canvas.style.transform = 'scale(1)';
  },

  /* ===========================
     BUILD 002 — Rotate
     =========================== */

  rotateImage(direction) {
    if (!this.state.imageLoaded || this.state.cropMode) return;

    const canvas = this.elements.canvas;
    const ctx = this.elements.ctx;
    const oldWidth = canvas.width;
    const oldHeight = canvas.height;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = oldHeight;
    tempCanvas.height = oldWidth;
    const tempCtx = tempCanvas.getContext('2d');

    tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
    tempCtx.rotate((direction * 90 * Math.PI) / 180);
    tempCtx.drawImage(canvas, -oldWidth / 2, -oldHeight / 2);

    canvas.width = tempCanvas.width;
    canvas.height = tempCanvas.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);

    this.state.rotation = (this.state.rotation + direction * 90 + 360) % 360;
  },

          left = start.left + dx;
        width = start.width - dx;
        height = start.height + dy;
        break;
      case 'br':
        width = start.width + dx;
        height = start.height + dy;
        break;
    }

    width = Math.max(width, minSize);
    height = Math.max(height, minSize);
    left = Math.max(0, Math.min(left, wrapperRect.width - width));
    top = Math.max(0, Math.min(top, wrapperRect.height - height));

    this.state.cropBoxRect = { left, top, width, height };
    this.updateCropBoxStyle();
  },

  handleCropPointerUp() {
    if (this.cropDrag) this.cropDrag.active = false;
  },

  confirmCrop() {
    const canvas = this.elements.canvas;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const box = this.state.cropBoxRect;

    const sx = box.left * scaleX;
    const sy = box.top * scaleY;
    const sw = box.width * scaleX;
    const sh = box.height * scaleY;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = sw;
    tempCanvas.height = sh;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, sx, sy, sw, sh, 0, 0, sw, sh);

    canvas.width = sw;
    canvas.height = sh;
    this.elements.ctx.clearRect(0, 0, sw, sh);
    this.elements.ctx.drawImage(tempCanvas, 0, 0);

    this.exitCropMode();
  },

  cancelCrop() {
    this.exitCropMode();
  },

  exitCropMode() {
    this.state.cropMode = false;
    this.elements.cropOverlay.style.display = 'none';
    this.elements.cropActions.classList.add('pixora-hidden');
    this.setToolbarLockedForCrop(false);
    this.cropDrag = null;
  },

  setToolbarLockedForCrop(locked) {
    const hasImage = this.state.imageLoaded;
    this.elements.btnUpload.disabled = locked;
    this.elements.btnZoomIn.disabled = locked || !hasImage;
    this.elements.btnZoomOut.disabled = locked || !hasImage;
    this.elements.btnReset.disabled = locked || !ha
