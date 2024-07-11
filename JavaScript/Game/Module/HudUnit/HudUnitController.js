"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HudUnitController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiLayer_1 = require("../../Ui/UiLayer");
const HudUnitManager_1 = require("./HudUnitManager");
class HudUnitController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return !0;
  }
  static OnClear() {
    return HudUnitManager_1.HudUnitManager.Clear(), this.Yti(), !0;
  }
  static OnLeaveLevel() {
    return HudUnitManager_1.HudUnitManager.Clear(), this.Yti(), !0;
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
        this.j$e,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeRole,
      this.xie,
    ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(
        17,
        this.j$e,
      );
  }
  static Jti(e) {}
  static zti(e) {
    this.Yti();
  }
  static ListenForTagSignificantChanged(e, t, n) {
    e = e.GetComponent(185).ListenForTagAddOrRemove(t?.TagId, n);
    this.Zti.push(e);
  }
  static Yti() {
    for (const e of this.Zti) e.EndTask();
    this.Zti.length = 0;
  }
}
((exports.HudUnitController = HudUnitController).Zti = []),
  (HudUnitController.xie = (e, t) => {
    t?.Valid && HudUnitController.zti(t), e?.Valid && HudUnitController.Jti(e);
  }),
  (HudUnitController.j$e = () => {
    const e = UiLayer_1.UiLayer.GetBattleViewUnit(1);
    const t =
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
        17,
      );
    e.SetUIActive(t),
      t
        ? ModelManager_1.ModelManager.GameModeModel.WorldDone
          ? HudUnitManager_1.HudUnitManager.ShowHud()
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Battle", 18, "WorldDone前不允许打开hud")
        : HudUnitManager_1.HudUnitManager.HideHud();
  });
// # sourceMappingURL=HudUnitController.js.map
