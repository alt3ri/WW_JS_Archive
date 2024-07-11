"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BackToGameLoadingViewData = exports.BackToGameData = void 0);
class BackToGameData {
  constructor() {
    (this.BackToGameType = 0),
      (this.Progress = 0),
      (this.LoadingWidget = void 0),
      (this.LoadingTexturePath = void 0),
      (this.LoadingTitle = void 0),
      (this.LoadingTips = void 0);
  }
}
exports.BackToGameData = BackToGameData;
class BackToGameLoadingViewData {
  constructor() {
    this.LoadingWidget = void 0;
  }
  RebootFinished() {
    this.LoadingWidget.RebootFinished();
  }
  SetProgress(s) {
    this.LoadingWidget.UpdateOtherLoadingProgerss(s);
  }
  Close() {
    this.LoadingWidget?.IsValid() && this.LoadingWidget.RemoveFromParent();
  }
}
exports.BackToGameLoadingViewData = BackToGameLoadingViewData;
//# sourceMappingURL=BackToGameDefine.js.map
