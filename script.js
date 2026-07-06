/* ===========================
   PIXORA PRO — FINAL BUILD (001+002+003)
   Namespace: PixoraApp
   =========================== */

const PixoraApp = {

  state: {
    imageLoaded: false,
    zoomLevel: 1,
    originalImage: null,
    rotation: 0,
    cropMode: false,
    cropBoxRect: null,
    filterMode: false,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      grayscale: 0,
      sepia: 0,
      invert: 0
    }
  },

  elements: {},
  cropDrag: null,

  init() {
    this.cacheElements();
    this.bindEvents();
    this.setRealViewportHeight();
  },

  setRealViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
      const newVh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${newVh}px`);
    });

    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        const newVh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${newVh}px`);
      }, 200);
    });
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

    this.elements.btnFilters = document.getElementById('pixora-btn-filters');
    this.elements.filterPanel = document.getElementById('pixora-filter-panel');
    this.elements.sliderBrightness = document.getElementById('pixora-filter-slider-brightness');
    this.elements.sliderContrast = document.getElementById('pixora-filter-slider-contrast');
    this.elements.sliderSaturation = document.getElementById('pixora-filter-slider-saturation');
    this.elements.presetOriginal = document.getElementById('pixora-filter-preset-original');
    this.elements.presetGrayscale = document.getElementById('pixora-filter-preset-grayscale');
    this.elements.presetSepia = document.getElementById('pixora-filter-preset-sepia');
    this.elements.presetInvert = document.getElementById('pixora-filter-preset-invert');
    this.elements.btnFilterCancel = document.getElementById('pixora-btn-filter-cancel');
    this.elements.btnFilterConfirm = document.getElementById('pixora-btn-filter-confirm');
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

    this.elements.btnFilters.addEventListener('click', () => this.toggleFilterMode());
    this.elements.sliderBrightness.addEventListener('input', (e) => this.updateFilterValue('brightness', e.target.value));
    this.elements.sliderContrast.addEventListener('input', (e) => this.updateFilterValue('contrast', e.target.value));
    this.elements.sliderSaturation.addEventListener('input', (e) => this.updateFilterValue('saturation', e.target.value));
    this.elements.presetOriginal.addEventListener('click', () => this.applyPreset('original'));
    this.elements.presetGrayscale.addEventListener('click', () => this.applyPreset('grayscale'));
    this.elements.presetSepia.addEventListener('click', () => this.applyPreset('sepia'));
    this.elements.presetInvert.addEventListener('click', () => this.applyPreset('invert'));
    this.elements.btnFilterCancel.addEventListener('click', () => this.cancelFilter());
    this.elements.btnFilterConfirm.addEventListener('click', () => this.confirmFilter());
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
    canvas.style.filter = 'none';
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
    this.elements.btnFilters.disabled = !enabled;
  },

  zoom(factor) {
    if (!this.state.imageLoaded || this.state.cropMode || this.state.filterMode) return;
    this.state.zoomLevel *= factor;
    this.state.zoomLevel = Math.max(0.2, Math.min(this.state.zoomLevel, 5));
    this.elements.canvas.style.transform = `scale(${this.state.zoomLevel})`;
  },

  resetView() {
    if (!this.state.imageLoaded) return;
    this.state.zoomLevel = 1;
    this.elements.canvas.style.transform = 'scale(1)';
  },

  setToolbarLocked(locked) {
    const hasImage = this.state.imageLoaded;
    this.elements.btnUpload.disabled = locked;
    this.elements.btnZoomIn.disabled = locked || !hasImage;
    this.elements.btnZoomOut.disabled = locked || !hasImage;
    this.elements.btnReset.disabled = locked || !hasImage;
    this.elements.btnRotateLeft.disabled = locked || !hasImage;
    this.elements.btnRotateRight.disabled = locked || !hasImage;
    this.elements.btnCrop.disabled = locked || !hasImage;
    this.elements.btnFilters.disabled = locked || !hasImage;
    this.elements.btnExport.disabled = locked || !hasImage;
  },

  rotateImage(direction) {
    if (!this.state.imageLoaded || this.state.cropMode || this.state.filterMode) return;

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

  toggleCropMode() {
    if (!this.state.imageLoaded || this.state.filterMode) return;
    if (this.state.cropMode) {
      this.cancelCrop();
    } else {
      this.enterCropMode();
    }
  },

  enterCropMode() {
    this.state.cropMode = true;
    this.resetView();
    this.initCropBox();
    this.elements.cropOverlay.style.display = 'block';
    this.elements.cropActions.classList.remove('pixora-hidden');
    this.setToolbarLocked(true);
  },

  initCropBox() {
    const rect = this.elements.canvas.getBoundingClientRect();
    const margin = 0.1;
    const width = rect.width * (1 - margin * 2);
    const height = rect.height * (1 - margin * 2);
    const left = rect.width * margin;
    const top = rect.height * margin;

    this.state.cropBoxRect = { left, top, width, height };
    this.updateCropBoxStyle();
  },

  updateCropBoxStyle() {
    const r = this.state.cropBoxRect;
    const box = this.elements.cropBox;
    box.style.left = r.left + 'px';
    box.style.top = r.top + 'px';
    box.style.width = r.width + 'px';
    box.style.height = r.height + 'px';
  },

  bindCropDragEvents() {
    this.elements.cropBox.addEventListener('pointerdown', (e) => this.handleCropPointerDown(e));
    window.addEventListener('pointermove', (e) => this.handleCropPointerMove(e));
    window.addEventListener('pointerup', () => this.handleCropPointerUp());
  },

  handleCropPointerDown(e) {
    if (!this.state.cropMode) return;
    this.cropDrag = {
      active: true,
      handle: e.target.dataset.handle || 'move',
      startX: e.clientX,
      startY: e.clientY,
      startRect: { ...this.state.cropBoxRect }
    };
    e.preventDefault();
  },

  handleCropPointerMove(e) {
    if (!this.cropDrag || !this.cropDrag.active) return;

    const dx = e.clientX - this.cropDrag.startX;
    const dy = e.clientY - this.cropDrag.startY;
    const start = this.cropDrag.startRect;
    const wrapperRect = this.elements.canvas.getBoundingClientRect();
    const minSize = 40;

    let { left, top, width, height } = start;

    switch (this.cropDrag.handle) {
      case 'move':
        left = start.left + dx;
        top = start.top + dy;
        break;
      case 'tl':
        left = start.left + dx;
        top = start.top + dy;
        width = start.width - dx;
        height = start.height - dy;
        break;
      case 'tr':
        top = start.top + dy;
        width = start.width + dx;
        height = start.height - dy;
        break;
      case 'bl':
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
    this.setToolbarLocked(false);
    this.cropDrag = null;
  },

  toggleFilterMode() {
    if (!this.state.imageLoaded || this.state.cropMode) return;
    if (this.state.filterMode) {
      this.cancelFilter();
    } else {
      this.enterFilterMode();
    }
  },

  enterFilterMode() {
    this.state.filterMode = true;
    this.resetFilterValuesUI();
    this.elements.filterPanel.classList.remove('pixora-hidden');
    this.setToolbarLocked(true);
  },

  resetFilterValuesUI() {
    this.state.filters = {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      grayscale: 0,
      sepia: 0,
      invert: 0
    };
    this.elements.sliderBrightness.value = 100;
    this.elements.sliderContrast.value = 100;
    this.elements.sliderSaturation.value = 100;
    this.applyLivePreview();
  },

  updateFilterValue(key, value) {
    this.state.filters[key] = Number(value);
    this.applyLivePreview();
  },

  applyPreset(name) {
    const f = this.state.filters;
    f.grayscale = 0;
    f.sepia = 0;
    f.invert = 0;

    if (name === 'grayscale') f.grayscale = 1;
    if (name === 'sepia') f.sepia = 1;
    if (name === 'invert') f.invert = 1;
    if (name === 'original') {
      f.brightness = 100;
      f.contrast = 100;
      f.saturation = 100;
      this.elements.sliderBrightness.value = 100;
      this.elements.sliderContrast.value = 100;
      this.elements.sliderSaturation.value = 100;
    }

    this.applyLivePreview();
  },

  buildFilterString() {
    const f = this.state.filters;
    return `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturation}%) grayscale(${f.grayscale}) sepia(${f.sepia}) invert(${f.invert})`;
  },

  applyLivePreview() {
    this.elements.canvas.style.filter = this.buildFilterString();
  },

  confirmFilter() {
    const canvas = this.elements.canvas;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    tempCtx.filter = this.buildFilterString();
    tempCtx.drawImage(canvas, 0, 0);

    canvas.style.filter = 'none';
    this.elements.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.elements.ctx.drawImage(tempCanvas, 0, 0);

    this.exitFilterMode();
  },

  cancelFilter() {
    this.elements.canvas.style.filter = 'none';
    this.exitFilterMode();
  },

  exitFilterMode() {
    this.state.filterMode = false;
    this.elements.filterPanel.classList.add('pixora-hidden');
    this.setToolbarLocked(false);
  }

};

document.addEventListener('DOMContentLoaded', () => PixoraApp.init());
