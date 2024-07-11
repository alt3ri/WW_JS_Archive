"use strict";
var CharacterPhysicsAssetComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, s, i) {
      var o,
        r = arguments.length,
        h =
          r < 3
            ? e
            : null === i
              ? (i = Object.getOwnPropertyDescriptor(e, s))
              : i;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(t, e, s, i);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (o = t[n]) &&
            (h = (r < 3 ? o(h) : 3 < r ? o(e, s, h) : o(e, s)) || h);
      return 3 < r && h && Object.defineProperty(e, s, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterPhysicsAssetComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ragDoll = new UE.FName("RagDoll");
class PhysicsState {
  constructor() {
    (this.Active = !1), (this.QuitCache = !1);
  }
  InitBaseState(t) {
    (this.Active = t), (this.QuitCache = !1);
  }
  ClearAnimState() {
    this.QuitCache = !1;
  }
  SetNewState(t) {
    this.Active && !t && (this.QuitCache = !0), (this.Active = t);
  }
  StateInherit(t) {
    (this.Active = t.Active), (this.QuitCache = t.QuitCache);
  }
}
class PhysicsAssetLoader {
  constructor() {
    (this.BoneNames = new Array()),
      (this.LoadSuccess = !1),
      (this.ActorComp = void 0);
  }
  SetDataAndLoadAsset(t, e, s) {
    if (((this.LoadSuccess = !1), 0 === e.BoneNames.length))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Character",
            58,
            "该角色未在角色物理资产配置表中配置骨骼名 /Config/j.角色物理资产",
            ["默认值Id", e.Id],
          ),
        !1
      );
    const i = e.PhysicsAssetPath;
    if (!i || "" === i)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Character",
            58,
            "该角色未在角色物理资产配置表中骨骼路径配置为空 /Config/j.角色物理资产",
            ["默认值Id", e.Id],
          ),
        !1
      );
    (this.ActorComp = t),
      ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.PhysicsAsset, (t) => {
        t ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Character",
              58,
              "该角色未在角色物理资产配置表中骨骼路径配置加载失败 /Config/j.角色物理资产",
              ["path", i],
            )),
          this.ActorComp.Actor.Mesh.SetPhysicsAsset(t, !0),
          (this.LoadSuccess = !0),
          s();
      });
    for (const o of e.BoneNames) this.BoneNames.push(o);
    return !0;
  }
  ClearData() {
    (this.BoneNames.length = 0),
      (this.ActorComp = void 0),
      (this.LoadSuccess = !1);
  }
}
let CharacterPhysicsAssetComponent =
  (CharacterPhysicsAssetComponent_1 = class CharacterPhysicsAssetComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.jjr = !1),
        (this.Wjr = void 0),
        (this.Kjr = void 0),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.oRe = void 0),
        (this.pZo = new Array()),
        (this.Qjr = 0),
        (this.Ype = !1),
        (this.W3r = (t) => {
          t = t.GetComponent(61);
          t.Wjr.ClearAnimState();
        }),
        (this.Xjr = (t, e) => {
          e ? this.Qjr++ : this.Qjr--,
            0 === this.Qjr ? this.$jr(!1) : this.$jr(!0);
        });
    }
    static get Dependencies() {
      return [3, 185, 160];
    }
    OnInitData() {
      return (
        (this.Wjr = new PhysicsState()),
        (this.Kjr = new PhysicsAssetLoader()),
        !0
      );
    }
    OnStart() {
      if (
        ((this.Hte = this.Entity.GetComponent(3)),
        this.Hte.CreatureData?.GetEntityType() !==
          Protocol_1.Aki.Protocol.HBs.Proto_Player ||
          !this.Hte.IsAutonomousProxy)
      )
        return (this.jjr = !1), !(this.Hte = void 0);
      (this.Lie = this.Entity.GetComponent(185)),
        (this.oRe = this.Entity.GetComponent(160));
      var t = this.Hte.CreatureData.GetRoleConfig().RoleBody,
        t =
          ConfigManager_1.ConfigManager.EntityPhysicsAssetConfig.GetPhysicsAssetConfigByRoleBody(
            t,
          );
      for (const e of CharacterPhysicsAssetComponent_1.Yjr)
        this.Lie.HasTag(e) && this.Qjr++;
      if (
        (this.Wjr.InitBaseState(0 < this.Qjr),
        (this.jjr = this.Kjr.SetDataAndLoadAsset(this.Hte, t, () => {
          this.$jr(this.Wjr.Active, !0);
        })),
        this.jjr)
      ) {
        if (this.Lie?.Valid)
          for (const s of CharacterPhysicsAssetComponent_1.Yjr)
            this.Lie.HasTag(s) && this.Qjr++,
              this.pZo.push(this.Lie.ListenForTagAddOrRemove(s, this.Xjr));
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.W3r,
        );
      }
      return !0;
    }
    OnClear() {
      for (const t of this.pZo) t.EndTask();
      return (
        (this.pZo.length = 0),
        this.Kjr.ClearData(),
        this.jjr &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.RoleOnStateInherit,
            this.W3r,
          ),
        !0
      );
    }
    $jr(e, t = !1) {
      if ((this.Wjr.Active !== e || t) && this.Kjr.LoadSuccess) {
        let t = !0;
        if (e) {
          if (!(t = this.Hte.SetMeshCollisionEnabled(2, "布娃娃效果")))
            return void (
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Character",
                58,
                "角色物理资产模拟设置CollisionEnable失败",
                ["Entity", this.Entity.Id],
              )
            );
          if (!(t = this.Hte.SetMeshCollisionObjectType(5, "布娃娃效果")))
            return void (
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Character",
                58,
                "角色物理资产模拟设置CollisionObjectType失败",
                ["Entity", this.Entity.Id],
              )
            );
          this.Hte.Actor.Mesh.bEnableShearAnim = !1;
          for (const s of this.Kjr.BoneNames)
            this.Hte.Actor.Mesh.SetAllBodiesBelowSimulatePhysics(
              FNameUtil_1.FNameUtil.GetDynamicFName(s),
              !0,
              !1,
            );
          this.Ype &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Character", 58, "角色开启物理资产模拟", [
              "Entity",
              this.Entity.Id,
            ]);
        } else {
          if (
            !(t =
              (t = t && this.Hte.SetMeshCollisionEnabled(0, "布娃娃效果")) &&
              this.Hte.SetMeshCollisionObjectType(2, "布娃娃效果"))
          )
            return void (
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Character",
                58,
                "角色物理资产模拟重新设置Collision失败",
                ["Entity", this.Entity.Id],
              )
            );
          this.Hte.Actor.Mesh.SetSimulatePhysics(!1),
            (this.Hte.Actor.Mesh.bEnableShearAnim = !0),
            this.Ype &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Character", 58, "角色关闭物理资产模拟", [
                "Entity",
                this.Entity.Id,
              ]),
            this.oRe.MainAnimInstance.SavePoseSnapshot(ragDoll);
        }
        this.Wjr.SetNewState(e);
      }
    }
    GetRagRollQuitState() {
      var t = this.Wjr.QuitCache;
      return (this.Wjr.QuitCache = !1), t;
    }
    SetDebug(t) {
      (this.Ype = t),
        this.Ype &&
          ((t = `
            ------------------------角色物理资产管理组件开启Debug----------------------
            -物理资产: ${this.Hte.Actor.Mesh.PhysicsAssetOverride?.GetName()}
            -驱动骨骼：${this.Kjr.BoneNames}
            -脚本组件管理状态 是否激活：${this.Wjr.Active}
            -------------------------------------------------------------------------
            `),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("Character", 58, t);
    }
  });
(CharacterPhysicsAssetComponent.Yjr = [-648310348]),
  (CharacterPhysicsAssetComponent = CharacterPhysicsAssetComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(61)],
      CharacterPhysicsAssetComponent,
    )),
  (exports.CharacterPhysicsAssetComponent = CharacterPhysicsAssetComponent);
//# sourceMappingURL=CharacterPhysicsAssetComponent.js.map
