"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRoguePanelFetter = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  FETTER_DISPLAY_NUM = 6;
class FetterData {
  constructor(e = 0, t = 0) {
    (this.ConfigId = e), (this.Lv = t);
  }
}
class MapRoguePanelFetter extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.FetterLayout = void 0),
      (this.pf1 = (e, t) =>
        e.Lv === t.Lv ? t.ConfigId - e.ConfigId : t.Lv - e.Lv),
      (this.oWi = () => {
        return new FetterItem();
      }),
      (this.vf1 = () => {
        ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueFetterView();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.vf1]]);
  }
  OnStart() {
    this.FetterLayout = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(0),
      this.oWi,
    );
  }
  OnBeforeShow() {
    this.yf1();
  }
  yf1() {
    var e = [];
    for (const r of ModelManager_1.ModelManager.RogueBattleModel.GetAllOwnedRoleBondData()) {
      var t = new FetterData(r.v9n, r.F6n);
      e.push(t);
    }
    this.FetterLayout.RefreshByData(
      e.slice(0, FETTER_DISPLAY_NUM).sort(this.pf1),
    );
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return 0 !== e.length && (e = this.FetterLayout?.GetGridByDisplayIndex(0))
      ? [e, e]
      : void 0;
  }
}
exports.MapRoguePanelFetter = MapRoguePanelFetter;
class FetterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.vf1 = () => {
        this.Data.ConfigId &&
          ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueFetterView(
            this.Data.ConfigId,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.vf1]]);
  }
  Refresh(e, t, r) {
    this.Data = e;
    var i,
      s = this.GetTexture(1),
      o = this.GetText(2);
    0 === e.ConfigId
      ? (s.SetUIActive(!1), o.SetUIActive(!1), this.SetButtonActive(!1))
      : (i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(
          e.ConfigId,
        )) &&
        (this.SetTextureShowUntilLoaded(i.Icon, s),
        LguiUtil_1.LguiUtil.SetLocalTextNew(o, "RogueResSynergyLV", e.Lv),
        o.SetUIActive(!0),
        this.SetButtonActive(!0));
  }
  SetButtonActive(e) {
    this.GetButton(0).SetSelfInteractive(e);
  }
}
//# sourceMappingURL=MapRoguePanelFetter.js.map
