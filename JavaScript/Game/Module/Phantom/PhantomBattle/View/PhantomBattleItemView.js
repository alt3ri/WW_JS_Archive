"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomFettersObtainItem = exports.PhantomFettersItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  VisionFetterSuitItem_1 = require("../../Vision/View/VisionFetterSuitItem");
class PhantomFettersItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.bxt = void 0),
      (this.ndi = void 0),
      (this.BTt = (t) => {
        this.ndi && this.ndi(this.fGt);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.BTt]]);
  }
  OnStart() {
    (this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
      this.GetItem(2),
    )),
      this.bxt.Init().finally(() => {
        this.bxt.SetActive(!0);
      }),
      this.GetItem(3).SetUIActive(!1),
      this.GetExtendToggle(0).SetToggleState(0);
  }
  Refresh(t, e, i) {
    (this.fGt = t),
      this.RefreshName(),
      this.m8i(),
      this.RefreshUnlockText(),
      this.N6e(e, !1);
  }
  RefreshName() {
    this.GetText(1).ShowTextNew(this.fGt.FetterGroupName);
  }
  RefreshUnlockText() {
    var t = this.fGt.Id,
      t =
        ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(
          t,
        ),
      e =
        ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterFindCountByMonsterIdArray(
          t,
        );
    this.GetText(4).SetText(e + "/" + t.length);
  }
  BindOnItemButtonClickedCallback(t) {
    this.ndi = t;
  }
  OnSelected(t) {
    this.N6e(!0);
  }
  OnDeselected(t) {
    this.N6e(!1);
  }
  m8i() {
    this.bxt.Update(this.fGt);
  }
  N6e(t, e = !0) {
    var i = this.GetExtendToggle(0);
    t ? i.SetToggleState(1, e) : i.SetToggleState(0, !1);
  }
}
exports.PhantomFettersItem = PhantomFettersItem;
class PhantomFettersObtainItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.u8i = 0),
      (this.ndi = void 0),
      (this.wqe = void 0),
      (this.d8i = () => {
        this.ndi &&
          (UiManager_1.UiManager.CloseView("PhantomBattleFettersObtainView"),
          this.ndi(this.u8i));
      }),
      (this.wqe = t);
  }
  Init() {
    this.CreateThenShowByActor(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[3, this.d8i]]);
  }
  Update(t) {
    (this.u8i = t.Id),
      t.IsGet
        ? (this.SetTextureByPath(t.Icon, this.GetTexture(0)),
          this.GetText(1).ShowTextNew(t.Name))
        : ((t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "T_IconMonsterHead00_UI",
          )),
          this.SetTextureByPath(t, this.GetTexture(0)),
          this.GetText(1).SetText("???")),
      this.GetText(2).SetUIActive(!1);
  }
  BindOnItemButtonClickedCallback(t) {
    this.ndi = t;
  }
}
exports.PhantomFettersObtainItem = PhantomFettersObtainItem;
//# sourceMappingURL=PhantomBattleItemView.js.map
