"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, r, t, i) {
    let o;
    const n = arguments.length;
    let g =
      n < 3 ? r : i === null ? (i = Object.getOwnPropertyDescriptor(r, t)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      g = Reflect.decorate(e, r, t, i);
    else
      for (let a = e.length - 1; a >= 0; a--)
        (o = e[a]) && (g = (n < 3 ? o(g) : n > 3 ? o(r, t, g) : o(r, t)) || g);
    return n > 3 && g && Object.defineProperty(r, t, g), g;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterTriggerComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController");
const Trigger_1 = require("./Trigger/Trigger");
const TriggerType_1 = require("./Trigger/TriggerType");
const builtinFunc = {
  GetTags: (e) => {
    const r = [];
    for (const t of e.CheckGetComponent(185).TagContainer.GetAllExactTags() ??
      [])
      r.push(GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t));
    return r;
  },
  GetAttributeByID(e, r) {
    return e.CheckGetComponent(156).GetCurrentValue(r);
  },
  MatchAnyTag: (e, r) =>
    e
      .CheckGetComponent(185)
      .HasAnyTag(
        r.map((e) => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)),
      ),
  MatchAllTags: (e, r) =>
    e
      .CheckGetComponent(185)
      .HasAllTag(
        r.map((e) => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)),
      ),
  GetShieldValue: (e) => e.CheckGetComponent(64)?.ShieldTotal ?? 0,
  Distance: (e, r) => {
    const t = ModelManager_1.ModelManager.CreatureModel;
    var i = e?.GetComponent(0);
    const o = r?.GetComponent(0);
    var i = i?.IsRole()
      ? t.GetScenePlayerData(i.GetPlayerId())?.GetLocation()
      : e?.CheckGetComponent(3)?.ActorLocationProxy;
    var e = o?.IsRole()
      ? t.GetScenePlayerData(o.GetPlayerId())?.GetLocation()
      : r?.CheckGetComponent(3)?.ActorLocationProxy;
    return i && e ? Vector_1.Vector.Dist(i, e) : 1 / 0;
  },
  Distance2D: (e, r) => {
    const t = ModelManager_1.ModelManager.CreatureModel;
    var i = e?.GetComponent(0);
    const o = r?.GetComponent(0);
    var i = i?.IsRole()
      ? t.GetScenePlayerData(i.GetPlayerId())?.GetLocation()
      : e?.CheckGetComponent(3)?.ActorLocationProxy;
    var e = o?.IsRole()
      ? t.GetScenePlayerData(o.GetPlayerId())?.GetLocation()
      : r?.CheckGetComponent(3)?.ActorLocationProxy;
    return i && e ? Vector_1.Vector.Dist2D(i, e) : 1 / 0;
  },
};
let triggerHandleCounter = 0;
let CharacterTriggerComponent = class CharacterTriggerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), (this.o2r = new Map()), (this.r2r = new Map());
  }
  OnInit() {
    return !0;
  }
  OnStart() {
    for (const e of Object.keys(builtinFunc)) this.r2r.set(e, builtinFunc[e]);
    return (
      this.r2r.set("GetSelfTeamAttributeByID", (e) => {
        return ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
          this.Entity.Id,
          { ParamType: 1 },
        )?.IsMyRole() ?? !1
          ? FormationAttributeController_1.FormationAttributeController.GetValue(
              e,
            )
          : 0;
      }),
      !0
    );
  }
  OnClear() {
    this.r2r.clear();
    for (const e of this.o2r.keys()) this.RemoveTrigger(e);
    return this.o2r.clear(), !0;
  }
  AddTrigger(r, e) {
    if (!r)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 20, "添加Trigger失败，找不到对应配置", [
            "owner",
            this.Entity.Id,
          ]),
        TriggerType_1.INVALID_TRIGGER_HANDLE
      );
    var t = TriggerType_1.ETriggerEvent[r.Type];
    var t = Trigger_1.Trigger.GetClass(t);
    if (void 0 === t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            20,
            "添加Trigger失败, 找不到对应的Trigger类型或客户端未作实现",
            ["owner", this.Entity.Id],
            ["triggerType", r.Type],
          ),
        TriggerType_1.INVALID_TRIGGER_HANDLE
      );
    const i = triggerHandleCounter++;
    try {
      const o = new t(r, i, this, this.r2r, e);
      o.OnInitParams(r.Preset), this.o2r.set(i, o);
    } catch (e) {
      return (
        e instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Battle",
              20,
              "创建Trigger实例失败",
              e,
              ["owner", this.Entity.Id],
              ["triggerType", r.Type],
              ["formula", r.Formula],
              ["error", e.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              20,
              "创建Trigger实例失败",
              ["owner", this.Entity.Id],
              ["triggerType", r.Type],
              ["formula", r.Formula],
              ["error", e],
            ),
        TriggerType_1.INVALID_TRIGGER_HANDLE
      );
    }
    return i;
  }
  GetTrigger(e) {
    return this.o2r.get(e);
  }
  RemoveTrigger(e) {
    const r = this.o2r.get(e);
    r && (r.Destroy(), this.o2r.delete(e));
  }
  SetTriggerActive(e, r) {
    this.o2r.get(e)?.SetActive(r);
  }
};
(CharacterTriggerComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(25)],
  CharacterTriggerComponent,
)),
  (exports.CharacterTriggerComponent = CharacterTriggerComponent);
// # sourceMappingURL=CharacterTriggerComponent.js.map
