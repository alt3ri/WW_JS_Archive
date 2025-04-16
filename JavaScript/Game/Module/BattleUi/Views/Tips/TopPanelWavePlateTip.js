"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TopPanelWavePlateTip = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence"),
  InventoryDefine_1 = require("../../../Inventory/InventoryDefine"),
  BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
class TopPanelWavePlateTip extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments), (this.kgl = void 0), (this.Ogl = !1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  OnBeforeCreate() {
    (this.kgl = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
      this.AddUiBehavior(this.kgl);
  }
  Initialize(e) {
    super.Initialize(e), this.InitChildType(4), this.SetVisible(0, !0);
  }
  OnShowBattleChildView() {
    var e, i;
    this.Ogl
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("PowerModule", 58, "TopPanelWavePlateTip-OnShow Return")
      : ModelManager_1.ModelManager.PowerModel.GetCanShowPowerTip()
        ? ((this.Ogl = !0),
          this.SetVisible(0, !0),
          (i = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(
            InventoryDefine_1.WAVEPLATE_COIN,
          )),
          (e = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(
            InventoryDefine_1.WAVEPLATE_CRYSTAL_COIN,
          )),
          this.GetText(1).SetText(
            i.GetCurrentPower() + "/" + i.GetPowerLimit(),
          ),
          this.GetText(0).SetText(e.GetCurrentPower().toString()),
          (i =
            CommonParamById_1.configCommonParamById.GetIntConfig(
              "PowerTipShowTime",
            )),
          ModelManager_1.ModelManager.PowerModel.SetCanShowPowerTip(!1),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "PowerModule",
              58,
              "TopPanelWavePlateTip-PlaySequence Show",
            ),
          this.kgl.PlaySequence("Show"),
          TimerSystem_1.TimerSystem.Delay(() => {
            this.kgl?.PlaySequence("Hide"),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "PowerModule",
                  58,
                  "TopPanelWavePlateTip-PlaySequence Hide",
                );
          }, i))
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("PowerModule", 58, "TopPanelWavePlateTip-Hide"),
          this.SetVisible(0, !1));
  }
  OnHideBattleChildView() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("PowerModule", 58, "TopPanelWavePlateTip-OnHide"),
      (this.Ogl = !1);
  }
}
exports.TopPanelWavePlateTip = TopPanelWavePlateTip;
//# sourceMappingURL=TopPanelWavePlateTip.js.map
