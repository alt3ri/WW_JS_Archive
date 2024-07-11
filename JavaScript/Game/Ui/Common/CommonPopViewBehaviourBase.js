"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonPopViewBase = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonCurrencyItemListComponent_1 = require("../../Module/Common/CommonCurrencyItemListComponent"),
  UiPanelBase_1 = require("../Base/UiPanelBase"),
  UiManager_1 = require("../UiManager");
class CommonPopViewBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ucr = void 0),
      (this.ccr = !0),
      (this.mcr = void 0),
      (this.ContentItem = void 0),
      (this.ViewInfo = void 0),
      (this.OnClickBtnBtnCall = () => {}),
      (this.dcr = !1),
      (this.OnClickMaskButton = () => {
        this.ccr && this.TryHideSelf();
      }),
      (this.OnClickCloseBtn = () => {
        this.TryHideSelf();
      });
  }
  AttachItem(t, e) {
    var i,
      s,
      o,
      n,
      r,
      a,
      h = this.GetAttachParent();
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
    this.mcr = this;
  }
  TryHideSelf() {
    this.Ccr();
  }
  OverrideBackBtnCallBack(t) {
    (this.OnClickBtnBtnCall = t), (this.dcr = !0);
  }
  Ccr() {
    this.dcr
      ? this.OnClickBtnBtnCall()
      : UiManager_1.UiManager.CloseView(this.ViewInfo.Name);
  }
  SetCloseBtnInteractive(t) {
    this.mcr.OnSetCloseBtnInteractive(t);
  }
  SetHelpButtonActive(t) {
    this.mcr.OnSetHelpButtonActive(t);
  }
  SetTitleByTextIdAndArg(t, ...e) {
    this.mcr.OnSetTitleByTextIdAndArg(t, e);
  }
  SetBackBtnShowState(t) {
    this.mcr.OnSetBackBtnShowState(t);
  }
  RefreshCost(t) {
    this.mcr.OnRefreshCost(t);
  }
  SetMaskResponsibleState(t) {
    this.ccr = t;
  }
  async SetCurrencyItemList(t) {
    var e = this.GetCostParent();
    e
      ? (this.ucr ||
          (this.ucr =
            new CommonCurrencyItemListComponent_1.CommonCurrencyItemListComponent(
              e,
            )),
        await this.ucr.SetCurrencyItemList(t))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiCommon", 28, "找不到CostParent");
  }
  GetCurrencyComponent() {
    return this.ucr;
  }
  SetTitleVisible(t) {}
  SetTitleText(t) {}
  SetTexBgVisible(t) {}
}
exports.CommonPopViewBase = CommonPopViewBase;
//# sourceMappingURL=CommonPopViewBehaviourBase.js.map
