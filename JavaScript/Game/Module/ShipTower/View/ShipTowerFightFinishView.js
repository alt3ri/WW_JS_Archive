"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerFightFinishView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ShipTowerFightFinishItem_1 = require("./ShipTowerFightFinishItem");
class ShipTowerFightFinishView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.HDo = void 0),
      (this.GV_ = void 0),
      (this.FV_ = void 0),
      (this.NV_ = void 0),
      (this.VV_ = void 0),
      (this.Bqe = () =>
        new ShipTowerFightFinishItem_1.ShipTowerFightFinishItem()),
      (this.jV_ = () => {
        this.NV_?.OnClickedCallback && this.NV_.OnClickedCallback(0),
          this.NV_?.IsClickedCloseView && this.CloseMe();
      }),
      (this.HV_ = () => {
        this.VV_?.OnClickedCallback && this.VV_.OnClickedCallback(1),
          this.VV_?.IsClickedCloseView && this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UITexture],
      [6, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [7, UE.UIText],
    ];
  }
  Es_() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("ShipTower", 69, "ShipTowerFightFinishView", [
        "DataParam",
        this.OpenParam,
      ]);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      this.Es_(),
      (this.HDo = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(0),
        this.Bqe,
      )),
      (this.GV_ = new ButtonItem_1.ButtonItem(this.GetButton(6).RootUIComp)),
      (this.FV_ = new ButtonItem_1.ButtonItem(this.GetButton(5).RootUIComp)),
      this.GV_.SetFunction(this.jV_),
      this.FV_.SetFunction(this.HV_);
  }
  OnBeforeShow() {
    this.Slo();
  }
  Slo() {
    this.HDo?.RefreshByData(this.OpenParam?.AreaList ?? []),
      this.GetText(3).SetText(this.$V_().toString());
    var i = this.GetTexture(4),
      t = void 0 !== this.OpenParam?.GradeResId;
    i.SetUIActive(t),
      t &&
        ((t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          this.OpenParam.GradeResId,
        )),
        this.SetTextureByPath(t, i)),
      this.GetItem(2).SetUIActive(this.OpenParam?.IsNewRecord ?? !1),
      this.WV_();
  }
  $V_() {
    return this.OpenParam?.TotalScore
      ? this.OpenParam.TotalScore
      : (this.OpenParam?.AreaList.reduce(
          (i, t) => i + t.ScoreA + t.ScoreB,
          0,
        ) ?? 0);
  }
  WV_() {
    var i = this.GetText(7),
      t = [this.GV_, this.FV_];
    const r = [void 0, i];
    t.forEach((i, t) => {
      var e,
        s,
        h = this.OpenParam?.ButtonList[t];
      h &&
        (i?.SetShowText(h.ButtonTextId),
        (e = h.DescriptionTextId) &&
          ((s = h.DescriptionArgs ?? []),
          LguiUtil_1.LguiUtil.SetLocalTextNew(r[t], e, ...s)),
        r[t]?.SetUIActive(void 0 !== e)),
        i?.SetActive(void 0 !== h);
    }),
      (this.NV_ = this.OpenParam?.ButtonList[0]),
      (this.VV_ = this.OpenParam?.ButtonList[1]);
  }
}
exports.ShipTowerFightFinishView = ShipTowerFightFinishView;
//# sourceMappingURL=ShipTowerFightFinishView.js.map
