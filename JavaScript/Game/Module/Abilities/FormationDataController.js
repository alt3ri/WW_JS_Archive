"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationDataController = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager");
class FormationDataController extends ControllerBase_1.ControllerBase {
  static get Model() {
    return ModelManager_1.ModelManager.FormationDataModel;
  }
  static OnInit() {
    return (
      Net_1.Net.Register(24494, FormationDataController.kVa),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        this.lqt,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(24494),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerChange,
        this.lqt,
      ),
      !0
    );
  }
  static OnTick(t) {
    this.ZBe(), this.Model?.RefreshOnLandPosition();
  }
  static OnLeaveLevel() {
    return this.NotifyInFight(!1), !0;
  }
  static get GlobalIsInFight() {
    return this.wK;
  }
  static set GlobalIsInFight(t) {
    this.wK = t;
  }
  static SetTimeDilation(t) {
    for (const e of this.ebe.values()) e.IsInit && e.SetTimeDilation(t);
  }
  static RegisterPlayerEntity(t, e) {
    this.ebe.set(t, e),
      ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === t &&
        this.Wea();
  }
  static UnRegisterPlayerEntity(t) {
    this.ebe.delete(t);
  }
  static GetPlayerEntity(t) {
    return this.ebe.get(t);
  }
  static RefreshPlayerEntities() {
    this.ebe.clear();
  }
  static IsPlayerExist(t) {
    return this.ebe.has(t);
  }
  static MarkAggroDirty() {
    this.tbe = !0;
  }
  static ZBe() {
    if (this.tbe) {
      this.tbe = !1;
      var t =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
          161,
        )?.GetAggroSet();
      const a = this.Model.PlayerAggroSet;
      (this.ibe.length = 0),
        (this.bie.length = 0),
        t?.forEach((t) => {
          a.has(t) || this.ibe.push(t);
        });
      for (const r of a.values()) t?.has(r) || this.bie.push(r);
      for (const o of this.ibe) this.Model.PlayerAggroSet.add(o);
      for (const i of this.bie) this.Model.PlayerAggroSet.delete(i);
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAggroAdd,
        this.ibe,
      );
      for (const s of this.ibe) {
        var e = EntitySystem_1.EntitySystem.Get(s)
          ?.GetComponent(0)
          ?.GetBaseInfo();
        !e ||
          (3 !== (e = e.Category.MonsterMatchType) && 2 !== e) ||
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnBossFight,
            s,
          );
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAggroRemoved,
        this.bie,
      );
    }
  }
  static NotifyInFight(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Battle", 25, "NotifyInFight: " + t),
      t &&
        ResourceSystem_1.ResourceSystem.ResetLoadMode(
          GlobalData_1.GlobalData.World,
          !0,
        ),
      FormationDataController.wK !== t &&
        ((FormationDataController.wK = t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnBattleStateChanged,
          t,
        ));
  }
  static AddPlayerTag(t, e) {
    var a = this.GetPlayerEntity(t)?.GetComponent(185);
    a
      ? a?.AddTag(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 20, "找不到对应的PlayerTag组件", [
          "PlayerId",
          t,
        ]);
  }
  static RemovePlayerTag(t, e) {
    var a = this.GetPlayerEntity(t)?.GetComponent(185);
    a
      ? a?.RemoveTag(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 20, "找不到对应的PlayerTag组件", [
          "PlayerId",
          t,
        ]);
  }
  static GetPlayerTagCount(t, e) {
    var a = this.GetPlayerEntity(t)?.GetComponent(185);
    return a
      ? (a?.GetTagCount(e) ?? 0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 20, "找不到对应的PlayerTag组件", [
            "PlayerId",
            t,
          ]),
        0);
  }
  static HasPlayerTag(t, e) {
    var a = this.GetPlayerEntity(t)?.GetComponent(185);
    return a
      ? (a?.HasTag(e) ?? !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 20, "找不到对应的PlayerTag组件", [
            "PlayerId",
            t,
          ]),
        !1);
  }
  static SetKeyboardLockEnemyMode(t) {
    (ModelManager_1.ModelManager.FormationDataModel.KeyboardLockEnemyMode = t),
      this.Wea();
  }
  static SetGamepadLockEnemyMode(t) {
    (ModelManager_1.ModelManager.FormationDataModel.GamepadLockEnemyMode = t),
      this.Wea();
  }
  static Wea() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (this.IsPlayerExist(e)) {
      var a = ModelManager_1.ModelManager.FormationDataModel;
      let t = a.KeyboardLockEnemyMode;
      Info_1.Info.IsInGamepad() && (t = a.GamepadLockEnemyMode);
      var r = -2091266968;
      switch (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Character", 8, "刷新索敌模式Tag", [
            "lockEnemyMode",
            t,
          ]),
        t)
      ) {
        case 0:
          this.HasPlayerTag(e, r) && this.RemovePlayerTag(e, r);
          break;
        case 1:
          this.HasPlayerTag(e, r) || this.AddPlayerTag(e, r);
      }
    }
  }
}
(exports.FormationDataController = FormationDataController),
  ((_a = FormationDataController).lqt = (t, e) => {
    _a.Wea();
  }),
  (FormationDataController.ebe = new Map()),
  (FormationDataController.kVa = (t) => {
    var e = t.W5n,
      a = _a.GetPlayerEntity(e)?.GetComponent(206);
    a
      ? a.UpdateFollowers(t.jih)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Battle", 49, "找不到对应的PlayerFollower组件", [
          "PlayerId",
          e,
        ]);
  }),
  (FormationDataController.ibe = []),
  (FormationDataController.bie = []),
  (FormationDataController.tbe = !1),
  (FormationDataController.wK = !1);
//# sourceMappingURL=FormationDataController.js.map
