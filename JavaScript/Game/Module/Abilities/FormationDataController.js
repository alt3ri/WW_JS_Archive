"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationDataController = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PlayerEntity_1 = require("../../NewWorld/Player/PlayerEntity");
class FormationDataController extends ControllerBase_1.ControllerBase {
  static get Model() {
    return ModelManager_1.ModelManager.FormationDataModel;
  }
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        this.lqt,
      ),
      !0
    );
  }
  static OnClear() {
    return (
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
  static CreatePlayerEntity(t) {
    var e = EntitySystem_1.EntitySystem.Create(
      PlayerEntity_1.PlayerEntity,
      void 0,
      { PlayerId: t },
    );
    if (e)
      return (
        EntitySystem_1.EntitySystem.Init(e),
        EntitySystem_1.EntitySystem.Start(e),
        EntitySystem_1.EntitySystem.Activate(e),
        this.ebe.set(t, e),
        e
      );
  }
  static GetPlayerEntity(t) {
    return this.ebe.get(t);
  }
  static RefreshPlayerEntities(t) {
    for (const e of this.ebe.values())
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Character", 20, "清除编队实体", [
          "PlayerId",
          e.PlayerId,
        ]),
        EntitySystem_1.EntitySystem.Destroy(e);
    this.ebe.clear();
    for (const a of t)
      this.CreatePlayerEntity(a.q5n)
        ?.GetComponent(183)
        ?.AddInitPlayerBuff(a._Rs);
    this.Vzs();
  }
  static MarkAggroDirty() {
    this.tbe = !0;
  }
  static ZBe() {
    if (this.tbe) {
      this.tbe = !1;
      var t =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
          160,
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
      for (const n of this.ibe) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAggroAdd, n);
        var e = EntitySystem_1.EntitySystem.Get(n)
          ?.GetComponent(0)
          ?.GetBaseInfo();
        !e ||
          (3 !== (e = e.Category.MonsterMatchType) && 2 !== e) ||
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnBossFight,
            n,
          );
      }
      for (const s of this.bie)
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnAggroRemoved,
          s,
        );
    }
  }
  static NotifyInFight(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Battle", 25, "NotifyInFight: " + t),
      FormationDataController.wK !== t &&
        ((FormationDataController.wK = t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnBattleStateChanged,
          t,
        ));
  }
  static AddPlayerTag(t, e) {
    var a = this.GetPlayerEntity(t)?.GetComponent(184);
    a
      ? a?.AddTag(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 20, "找不到对应的PlayerTag组件", [
          "PlayerId",
          t,
        ]);
  }
  static RemovePlayerTag(t, e) {
    var a = this.GetPlayerEntity(t)?.GetComponent(184);
    a
      ? a?.RemoveTag(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 20, "找不到对应的PlayerTag组件", [
          "PlayerId",
          t,
        ]);
  }
  static GetPlayerTagCount(t, e) {
    var a = this.GetPlayerEntity(t)?.GetComponent(184);
    return a
      ? a?.GetTagCount(e) ?? 0
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 20, "找不到对应的PlayerTag组件", [
            "PlayerId",
            t,
          ]),
        0);
  }
  static HasPlayerTag(t, e) {
    var a = this.GetPlayerEntity(t)?.GetComponent(184);
    return a
      ? a?.HasTag(e) ?? !1
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 20, "找不到对应的PlayerTag组件", [
            "PlayerId",
            t,
          ]),
        !1);
  }
  static SetKeyboardLockEnemyMode(t) {
    (ModelManager_1.ModelManager.FormationDataModel.KeyboardLockEnemyMode = t),
      this.Vzs();
  }
  static SetGamepadLockEnemyMode(t) {
    (ModelManager_1.ModelManager.FormationDataModel.GamepadLockEnemyMode = t),
      this.Vzs();
  }
  static Vzs() {
    var t = ModelManager_1.ModelManager.FormationDataModel;
    let e = t.KeyboardLockEnemyMode;
    Info_1.Info.IsInGamepad() && (e = t.GamepadLockEnemyMode);
    var a = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      r = -2091266968;
    switch (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Character", 20, "刷新索敌模式Tag", [
          "lockEnemyMode",
          e,
        ]),
      e)
    ) {
      case 0:
        this.HasPlayerTag(a, r) && this.RemovePlayerTag(a, r);
        break;
      case 1:
        this.HasPlayerTag(a, r) || this.AddPlayerTag(a, r);
    }
  }
}
(exports.FormationDataController = FormationDataController),
  ((_a = FormationDataController).lqt = (t, e) => {
    _a.Vzs();
  }),
  (FormationDataController.ebe = new Map()),
  (FormationDataController.ibe = []),
  (FormationDataController.bie = []),
  (FormationDataController.tbe = !1),
  (FormationDataController.wK = !1);
//# sourceMappingURL=FormationDataController.js.map
