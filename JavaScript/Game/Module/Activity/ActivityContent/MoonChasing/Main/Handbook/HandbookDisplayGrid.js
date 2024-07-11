"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandbookDisplayGrid = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  UiManager_1 = require("../../../../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  WorldMapController_1 = require("../../../../../WorldMap/WorldMapController"),
  MoonChasingController_1 = require("../MoonChasingController");
class HandbookDisplayGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.MCt = 0),
      (this.MSa = void 0),
      (this.Lxt = () => {
        var i;
        this.MSa.IsUnlock
          ? this.MCt <= 0
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "MoonChasing",
                59,
                "HandbookDisplayGrid 无效markId",
              )
            : ((i = { MarkId: this.MCt, MarkType: 0 }),
              WorldMapController_1.WorldMapController.OpenView(2, !1, i))
          : UiManager_1.UiManager.IsViewOpen("MoonChasingMainView")
            ? MoonChasingController_1.MoonChasingController.OpenBuildingTipsInfoView(
                this.MSa.Id,
              )
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "Moonfiesta_BuildingUnlock",
              );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[3, this.Lxt]]);
  }
  Refresh(i, r, o) {
    this.MSa = i;
    var e = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(i.Id);
    this.Aqe(e.BuildingTexture, i.IsUnlock),
      this.q9s(!0),
      i.IsUnlock ? this.G9s(e.Name) : this.GetText(2).SetText("???"),
      this.GetItem(4).SetUIActive(i.IsUnlock),
      this.GetItem(5).SetUIActive(!i.IsUnlock),
      this.GetButton(3).RootUIComp.SetUIActive(i.IsUnlock),
      (this.MCt = e.MapMarkId);
  }
  Aqe(i, r) {
    const o = this.GetTexture(0),
      e = this.GetTexture(6);
    o.SetUIActive(!1),
      e.SetUIActive(!1),
      i &&
        (this.SetTextureByPath(i, o, void 0, () => {
          o.SetUIActive(!0);
        }),
        this.SetTextureByPath(i, e, void 0, () => {
          e.SetUIActive(!r);
        }));
  }
  q9s(i) {
    this.GetItem(1).SetUIActive(i);
  }
  G9s(i) {
    this.GetText(2).ShowTextNew(i);
  }
}
exports.HandbookDisplayGrid = HandbookDisplayGrid;
//# sourceMappingURL=HandbookDisplayGrid.js.map
