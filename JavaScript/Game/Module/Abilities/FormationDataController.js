"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationDataController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const PlayerEntity_1 = require("../../NewWorld/Player/PlayerEntity");
class FormationDataController extends ControllerBase_1.ControllerBase {
  static get Model() {
    return ModelManager_1.ModelManager.FormationDataModel;
  }
  static OnTick(t) {
    this.ZBe(), this.W6s();
  }
  static OnLeaveLevel() {
    return (
      this.NotifyInFight(!1), this.Model.LastPositionOnLand.Set(0, 0, 0), !0
    );
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
    const e = EntitySystem_1.EntitySystem.Create(
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
    for (const r of t)
      this.CreatePlayerEntity(r.aFn)
        ?.GetComponent(180)
        ?.AddInitPlayerBuff(r.jEs);
  }
  static MarkAggroDirty() {
    this.tbe = !0;
  }
  static ZBe() {
    if (this.tbe) {
      this.tbe = !1;
      const t =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
          158,
        )?.GetAggroSet();
      const r = this.Model.PlayerAggroSet;
      (this.ibe.length = 0),
        (this.bie.length = 0),
        t?.forEach((t) => {
          r.has(t) || this.ibe.push(t);
        });
      for (const a of r.values()) t?.has(a) || this.bie.push(a);
      for (const i of this.ibe) this.Model.PlayerAggroSet.add(i);
      for (const o of this.bie) this.Model.PlayerAggroSet.delete(o);
      for (const n of this.ibe) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAggroAdd, n);
        let e = EntitySystem_1.EntitySystem.Get(n)
          ?.GetComponent(0)
          ?.GetBaseInfo();
        !e ||
          ((e = e.Category.MonsterMatchType) !== 3 && e !== 2) ||
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
    const r = this.GetPlayerEntity(t)?.GetComponent(181);
    r
      ? r?.AddTag(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 20, "找不到对应的PlayerTag组件", [
          "PlayerId",
          t,
        ]);
  }
  static RemovePlayerTag(t, e) {
    const r = this.GetPlayerEntity(t)?.GetComponent(181);
    r
      ? r?.RemoveTag(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 20, "找不到对应的PlayerTag组件", [
          "PlayerId",
          t,
        ]);
  }
  static GetPlayerTagCount(t, e) {
    const r = this.GetPlayerEntity(t)?.GetComponent(181);
    return r
      ? r?.GetTagCountById(e) ?? 0
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 20, "找不到对应的PlayerTag组件", [
            "PlayerId",
            t,
          ]),
        0);
  }
  static HasPlayerTag(t, e) {
    const r = this.GetPlayerEntity(t)?.GetComponent(181);
    return r
      ? r?.HasTag(e) ?? !1
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 20, "找不到对应的PlayerTag组件", [
            "PlayerId",
            t,
          ]),
        !1);
  }
  static W6s() {
    let t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
    t &&
      t.GetComponent(158)?.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
      (t = t.GetComponent(1)?.ActorLocationProxy) &&
      this.Model.LastPositionOnLand.DeepCopy(t);
  }
}
((exports.FormationDataController = FormationDataController).ebe = new Map()),
  (FormationDataController.ibe = []),
  (FormationDataController.bie = []),
  (FormationDataController.tbe = !1),
  (FormationDataController.wK = !1);
// # sourceMappingURL=FormationDataController.js.map
