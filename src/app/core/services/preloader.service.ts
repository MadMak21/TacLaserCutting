import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  private platformId = inject(PLATFORM_ID);
  
  private _totalAssets = signal(0);
  private _loadedAssets = signal(0);
  private _isReady = signal(false);

  readonly progress = computed(() => {
    if (this._totalAssets() === 0) return 0;
    return Math.min(100, Math.round((this._loadedAssets() / this._totalAssets()) * 100));
  });

  readonly isReady = this._isReady.asReadonly();

  registerAsset() {
    if (isPlatformBrowser(this.platformId)) {
      this._totalAssets.update(v => v + 1);
    }
  }

  markAssetLoaded() {
    if (isPlatformBrowser(this.platformId)) {
      this._loadedAssets.update(v => v + 1);
      this.checkCompletion();
    }
  }

  private checkCompletion() {
    if (this._loadedAssets() >= this._totalAssets()) {
      // Add a slight artificial delay for the cinematic effect
      setTimeout(() => {
        this._isReady.set(true);
      }, 800);
    }
  }

  // Fallback in case some assets fail to load
  forceReady() {
    this._isReady.set(true);
  }
}
