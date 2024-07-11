"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HudUnitController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  HudUnitManager_1 = require("./HudUnitManager");
class HudUnitController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return !0;
  }
  static OnClear() {
    return HudUnitManager_1.HudUnitManager.Clear(), this.Yii(), !0;
  }
  static OnLeaveLevel() {
    return HudUnitManager_1.HudUnitManager.Clear(), this.Yii(), !0;
  }
  static OnTick(e) {
    HudUnitManager_1.HudUnitManager.Tick(e);
  }
  static OnAfterTick(e) {
    HudUnitManager_1.HudUnitManager.AfterTick(e);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChangeRole,
      this.xie,
    ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(
        17,
        this.iJe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeRole,
      this.xie,
    ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(
        17,
        this.iJe,
      );
  }
  static Jii(e) {}
  static zii(e) {
    this.Yii();
  }
  static ListenForTagSignificantChanged(e, t, n) {
    e = e.GetComponent(188).ListenForTagAddOrRemove(t?.TagId, n);
    this.Zii.push(e);
  }
  static Yii() {
    for (const e of this.Zii) e.EndTask();
    this.Zii.length = 0;
  }
}
((exports.HudUnitController = HudUnitController).Zii = []),
  (HudUnitController.xie = (e, t) => {
    t?.Valid && HudUnitController.zii(t), e?.Valid && HudUnitController.Jii(e);
  }),
  (HudUnitController.iJe = () => {
    var e = UiLayer_1.UiLayer.GetBattleViewUnit(1),
      t = UiLayer_1.UiLayer.GetBattleViewUnit(3),
      n =
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
          17,
        );
    e.SetUIActive(n),
      t.SetUIActive(n),
      n
        ? ModelManager_1.ModelManager.GameModeModel.WorldDone
          ? HudUnitManager_1.HudUnitManager.ShowHud()
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Battle", 18, "WorldDone前不允许打开hud")
        : HudUnitManager_1.HudUnitManager.HideHud();
  });
//# sourceMappingURL=HudUnitController.js.map
