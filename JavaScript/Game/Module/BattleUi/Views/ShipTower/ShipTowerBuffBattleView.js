"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerBuffBattleView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView"),
  BattleUiHoverTipsD_1 = require("./BattleUiHoverTipsD");
class ShipTowerBuffBattleView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments),
      (this.Xmt = void 0),
      (this.kqe = (e) => {
        e
          ? ((e = this.GetItem(1)),
            this.Xmt.CreateAndShow(
              e,
              ModelManager_1.ModelManager.ShipTowerModel.GetInTheBattleBuffInfo(),
            ))
          : this.Xmt.EndShow();
      }),
      (this.RG_ = () => {
        var e = this.GetExtendToggle(0);
        e &&
          (1 === e.GetToggleState()
            ? e.SetToggleState(0, !0)
            : e.SetToggleState(1, !0));
      });
  }
  Initialize(e) {
    super.Initialize(e),
      this.InitChildType(4),
      this.SetVisible(1, !1),
      (this.Xmt = new BattleUiHoverTipsD_1.BattleUiHoverTipsD()),
      this.Ore();
  }
  Reset() {
    super.Reset(), this.kre();
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiToggleShipTowerBuffInfo,
      this.RG_,
    );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiToggleShipTowerBuffInfo,
      this.RG_,
    );
  }
  StartShow() {
    this.Xmt.UpdateInfo(
      ModelManager_1.ModelManager.ShipTowerModel.GetInTheBattleBuffInfo(),
    ),
      this.SetVisible(1, !0),
      ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(
        6,
        !0,
      );
  }
  EndShow() {
    this.Xmt.EndShow(),
      this.GetExtendToggle(0)?.SetToggleState(0, !0),
      this.SetVisible(1, !1),
      ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(
        6,
        !1,
      );
  }
  OnAfterDestroy() {
    ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(
      6,
      !1,
    );
  }
}
exports.ShipTowerBuffBattleView = ShipTowerBuffBattleView;
//# sourceMappingURL=ShipTowerBuffBattleView.js.map
