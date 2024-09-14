"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BackToGameLoginData =
    exports.BackToGameLoadingViewData =
    exports.BackToGameData =
    exports.BACK_TO_GAME_KEY =
    exports.LOADING_WIDGET_KEY =
      void 0),
  (exports.LOADING_WIDGET_KEY = "loading_widget"),
  (exports.BACK_TO_GAME_KEY = "back_to_game");
class BackToGameData {
  constructor() {
    (this.BackToGameType = 0),
      (this.Progress = 0),
      (this.LoadingWidget = void 0),
      (this.LoadingTexturePath = void 0),
      (this.LoadingTitle = void 0),
      (this.LoadingTips = void 0),
      (this.BackToGameLoginData = void 0);
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
  SetProgress(t) {
    this.LoadingWidget.UpdateOtherLoadingProgerss(t);
  }
  Close() {
    this.LoadingWidget?.IsValid() && this.LoadingWidget.RemoveFromParent();
  }
}
exports.BackToGameLoadingViewData = BackToGameLoadingViewData;
class BackToGameLoginData {
  constructor() {
    (this.Uid = void 0),
      (this.UserName = void 0),
      (this.Token = void 0),
      (this.SelectServerId = void 0),
      (this.SelectServerIp = void 0);
  }
}
exports.BackToGameLoginData = BackToGameLoginData;
//# sourceMappingURL=BackToGameDefine.js.map
