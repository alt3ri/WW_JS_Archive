"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoadingView = void 0);
const UE = require("ue"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoadingViewBase_1 = require("./LoadingViewBase");
class LoadingView extends LoadingViewBase_1.LoadingViewBase {
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UIButtonComponent],
      [5, UE.UIText],
      [6, UE.UISprite],
      [7, UE.UILayoutBase],
    ]),
      (this.BtnBindInfo = [[4, this.ChangeShowTips.bind(this)]]);
  }
  OnStart() {
    super.OnStart(),
      this.GetButton(4).RootUIComp.SetUIActive(1 < this.ShowData.GetTipCount()),
      this.RootItem?.SetAlpha(1);
  }
  OnAfterShow() {
    super.OnAfterShow(), this.Ovi();
  }
  Ovi() {
    const i = this.GetLayoutBase(7);
    i?.GetRootComponent()?.SetAlpha(0),
      i?.OnLateUpdate.Bind(() => {
        i?.OnLateUpdate.Unbind(), i?.GetRootComponent()?.SetAlpha(1);
      });
  }
  UpdateShowTipsUi(i, t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i);
  }
  UpdateProgressRate(i) {
    this.SetTextureProgressRate(0, i);
  }
  UpdateProgressValue(i) {
    this.SetTextProgressValue(5, i);
  }
  UpdateBgUi(i) {
    this.SetTextureByPath(i, this.GetTexture(3), this.Info.Name);
  }
}
exports.LoadingView = LoadingView;
//# sourceMappingURL=LoadingView.js.map
