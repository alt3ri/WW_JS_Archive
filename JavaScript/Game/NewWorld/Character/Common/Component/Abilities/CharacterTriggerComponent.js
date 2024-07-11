"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, r, t, i) {
    var o,
      n = arguments.length,
      g =
        n < 3
          ? r
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(r, t))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      g = Reflect.decorate(e, r, t, i);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (o = e[a]) && (g = (n < 3 ? o(g) : 3 < n ? o(r, t, g) : o(r, t)) || g);
    return 3 < n && g && Object.defineProperty(r, t, g), g;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterTriggerComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController"),
  Trigger_1 = require("./Trigger/Trigger"),
  TriggerType_1 = require("./Trigger/TriggerType"),
  builtinFunc = {
    GetTags: (e) => {
      var r = [];
      for (const t of e.CheckGetComponent(188).TagContainer.GetAllExactTags() ??
        [])
        r.push(GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t));
      return r;
    },
    GetAttributeByID(e, r) {
      return e.CheckGetComponent(158).GetCurrentValue(r);
    },
    HasInt: (e, r) => !(!r || 0 === r.length) && r.includes(e),
    MatchAnyInt: (e, r) =>
      !(!e || !r || 0 === e.length || 0 === r.length) &&
      e.some((e) => r.includes(e)),
    MatchAllInt: (e, r) =>
      !(!e || !r || 0 === e.length || 0 === r.length) &&
      e.every((e) => r.includes(e)),
    MatchAnyTag: (e, r) =>
      e
        .CheckGetComponent(188)
        .HasAnyTag(
          r.map((e) => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)),
        ),
    MatchAllTags: (e, r) =>
      e
        .CheckGetComponent(188)
        .HasAllTag(
          r.map((e) => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)),
        ),
    GetShieldValue: (e) => e.CheckGetComponent(66)?.ShieldTotal ?? 0,
    Distance: (e, r) => {
      var t = ModelManager_1.ModelManager.CreatureModel,
        i = e?.GetComponent(0),
        o = r?.GetComponent(0),
        i = i?.IsRole()
          ? t.GetScenePlayerData(i.GetPlayerId())?.GetLocation()
          : e?.CheckGetComponent(3)?.ActorLocationProxy,
        e = o?.IsRole()
          ? t.GetScenePlayerData(o.GetPlayerId())?.GetLocation()
          : r?.CheckGetComponent(3)?.ActorLocationProxy;
      return i && e ? Vector_1.Vector.Dist(i, e) : 1 / 0;
    },
    Distance2D: (e, r) => {
      var t = ModelManager_1.ModelManager.CreatureModel,
        i = e?.GetComponent(0),
        o = r?.GetComponent(0),
        i = i?.IsRole()
          ? t.GetScenePlayerData(i.GetPlayerId())?.GetLocation()
          : e?.CheckGetComponent(3)?.ActorLocationProxy,
        e = o?.IsRole()
          ? t.GetScenePlayerData(o.GetPlayerId())?.GetLocation()
          : r?.CheckGetComponent(3)?.ActorLocationProxy;
      return i && e ? Vector_1.Vector.Dist2D(i, e) : 1 / 0;
    },
  };
let triggerHandleCounter = 0,
  CharacterTriggerComponent = class CharacterTriggerComponent extends EntityComponent_1.EntityComponent {
    constructor() {
      super(...arguments), (this.wkr = new Map()), (this.Bkr = new Map());
    }
    OnInit() {
      return !0;
    }
    OnStart() {
      for (const e of Object.keys(builtinFunc)) this.Bkr.set(e, builtinFunc[e]);
      return (
        this.Bkr.set("GetSelfTeamAttributeByID", (e) => {
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
      this.Bkr.clear();
      for (const e of this.wkr.keys()) this.RemoveTrigger(e);
      return this.wkr.clear(), !0;
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
      var t = TriggerType_1.ETriggerEvent[r.Type],
        t = Trigger_1.Trigger.GetClass(t);
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
      var i = triggerHandleCounter++;
      try {
        var o = new t(r, i, this, this.Bkr, e);
        o.OnInitParams(r.Preset), this.wkr.set(i, o);
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
      return this.wkr.get(e);
    }
    RemoveTrigger(e) {
      var r = this.wkr.get(e);
      r && (r.Destroy(), this.wkr.delete(e));
    }
    SetTriggerActive(e, r) {
      this.wkr.get(e)?.SetActive(r);
    }
  };
(CharacterTriggerComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(25)],
  CharacterTriggerComponent,
)),
  (exports.CharacterTriggerComponent = CharacterTriggerComponent);
//# sourceMappingURL=CharacterTriggerComponent.js.map
