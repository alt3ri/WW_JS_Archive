"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonPopViewBase = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonCurrencyItemListComponent_1 = require("../../Module/Common/CommonCurrencyItemListComponent");
const UiPanelBase_1 = require("../Base/UiPanelBase");
const UiManager_1 = require("../UiManager");
class CommonPopViewBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.dur = void 0),
      (this.Cur = !0),
      (this.gur = void 0),
      (this.ContentItem = void 0),
      (this.ViewInfo = void 0),
      (this.OnClickBtnBtnCall = () => {}),
      (this.fur = !1),
      (this.OnClickMaskButton = () => {
        this.Cur && this.TryHideSelf();
      }),
      (this.OnClickCloseBtn = () => {
        this.TryHideSelf();
      });
  }
  AttachItem(t, e) {
    let i;
    let s;
    let o;
    let n;
    let r;
    let a;
    const h = this.GetAttachParent();
    h &&
      ((i = t.GetAnchorHAlign()),
      (s = t.GetAnchorVAlign()),
      (o = t.GetStretchBottom()),
      (n = t.GetStretchLeft()),
      (r = t.GetStretchRight()),
      (a = t.GetStretchTop()),
      t.SetUIParent(h),
      t.SetAnchorAlign(i, s),
      t.SetStretchBottom(o),
      t.SetStretchLeft(n),
      t.SetStretchRight(r),
      t.SetStretchTop(a),
      e !== t) &&
      (e.SetAnchorAlign(i, s),
      e.SetStretchBottom(o),
      e.SetStretchLeft(n),
      e.SetStretchRight(r),
      e.SetStretchTop(a));
  }
  GetAttachParent() {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("UiCommon", 28, "子类没有重写获取父物体方法");
  }
  GetCostParent() {}
  SetViewInfo(t) {
    this.ViewInfo = t;
  }
  SetPopupViewBase() {
    this.gur = this;
  }
  TryHideSelf() {
    this.pur();
  }
  OverrideBackBtnCallBack(t) {
    (this.OnClickBtnBtnCall = t), (this.fur = !0);
  }
  pur() {
    this.fur
      ? this.OnClickBtnBtnCall()
      : UiManager_1.UiManager.CloseView(this.ViewInfo.Name);
  }
  SetCloseBtnInteractive(t) {
    this.gur.OnSetCloseBtnInteractive(t);
  }
  SetHelpButtonActive(t) {
    this.gur.OnSetHelpButtonActive(t);
  }
  SetTitleByTextIdAndArg(t, ...e) {
    this.gur.OnSetTitleByTextIdAndArg(t, e);
  }
  SetBackBtnShowState(t) {
    this.gur.OnSetBackBtnShowState(t);
  }
  RefreshCost(t) {
    this.gur.OnRefreshCost(t);
  }
  SetMaskResponsibleState(t) {
    this.Cur = t;
  }
  async SetCurrencyItemList(t) {
    const e = this.GetCostParent();
    e
      ? (this.dur ||
          (this.dur =
            new CommonCurrencyItemListComponent_1.CommonCurrencyItemListComponent(
              e,
            )),
        await this.dur.SetCurrencyItemList(t))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiCommon", 28, "找不到CostParent");
  }
  GetCurrencyComponent() {
    return this.dur;
  }
  SetTitleVisible(t) {}
  SetTitleText(t) {}
  SetTexBgVisible(t) {}
}
exports.CommonPopViewBase = CommonPopViewBase;
// # sourceMappingURL=CommonPopViewBehaviourBase.js.map
