"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, r, o) {
    var i,
      s = arguments.length,
      l =
        s < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, r))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      l = Reflect.decorate(e, t, r, o);
    else
      for (var n = e.length - 1; 0 <= n; n--)
        (i = e[n]) && (l = (s < 3 ? i(l) : 3 < s ? i(t, r, l) : i(t, r)) || l);
    return 3 < s && l && Object.defineProperty(t, r, l), l;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RolePreloadComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  AiBaseById_1 = require("../../../../../Core/Define/ConfigQuery/AiBaseById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PreloadDefine_1 = require("../../../../Preload/PreloadDefine"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
  PreloadControllerNew_1 = require("../../../../World/Controller/PreloadControllerNew");
let RolePreloadComponent = class RolePreloadComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.u1t = void 0),
      (this.tRr = void 0),
      (this.XJr = void 0),
      (this.$Jr = !1),
      (this.hGn = void 0),
      (this.lGn = 0),
      (this.YJr = (e, t) => {
        if (t && !this.$Jr) {
          t = this.u1t.GetEntityType();
          if (t === Protocol_1.Aki.Protocol.wks.Proto_Monster) {
            CombatLog_1.CombatLog.Warn(
              "Skill",
              this.Entity,
              "开始加载技能和子弹",
            ),
              (this.$Jr = !0),
              this.JJr(!0),
              this._Gn();
            var t = (0, puerts_1.$ref)(void 0),
              r =
                (UE.DataTableFunctionLibrary.GetDataTableRowNames(
                  this.tRr.DtSkillInfo,
                  t,
                ),
                (0, puerts_1.$unref)(t));
            for (let e = 0; e < r.Num(); e++) {
              var o = Number(r.Get(e).toString());
              this.tRr?.LoadedSkills.has(o) ||
                (this.tRr.GetSkillInfo(o) && this.LoadSkillAsync(o));
            }
            for (const s of ConfigManager_1.ConfigManager.WorldConfig.GetMonsterCommonSkillRowNames()) {
              var i = Number(s);
              this.tRr?.LoadedSkills.has(i) ||
                (this.tRr.GetSkillInfo(i) && this.LoadSkillAsync(i));
            }
            this.uGn();
          }
        }
      });
  }
  OnInitData() {
    return (
      PreloadDefine_1.PreloadSetting.UseNewPreload &&
        ((this.tRr = this.Entity.GetComponent(33)),
        (this.u1t = this.Entity.GetComponent(0)),
        this.Entity.GetComponent(188).ListenForTagAddOrRemove(
          1996802261,
          this.YJr,
        )),
      !0
    );
  }
  InitPreload(e) {
    (this.XJr = e), this.cGn(), this.mGn(), this.zJr(), this.ZJr(), this.ezr();
  }
  cGn() {
    var e = this.XJr?.BlueprintClassPath;
    e &&
      (this.hGn =
        ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(e));
  }
  mGn() {
    ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike()
      ? (this.lGn = 1)
      : (this.lGn = 0);
  }
  zJr() {
    var e,
      t = this.XJr,
      r = this.hGn?.SkillDataTable.ToAssetPathName(),
      t =
        (r?.length &&
          "None" !== r &&
          ((e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            r,
            UE.DataTable,
          ))?.IsValid() ||
            CombatLog_1.CombatLog.Warn(
              "Skill",
              this.Entity,
              "SkillComponent中找不到技能表",
              ["ActorPath", t.BlueprintClassPath],
              ["技能表Path", r],
            ),
          (this.tRr.DtSkillInfo = e)),
        this.u1t.GetEntityType());
    t === Protocol_1.Aki.Protocol.wks.Proto_Player
      ? this.tzr()
      : t === Protocol_1.Aki.Protocol.wks.Proto_Vision
        ? this.izr()
        : t === Protocol_1.Aki.Protocol.wks.Proto_Monster && this.ozr();
  }
  tzr() {
    var e = (0, puerts_1.$ref)(void 0),
      t =
        (UE.DataTableFunctionLibrary.GetDataTableRowNames(
          this.tRr.DtSkillInfo,
          e,
        ),
        (0, puerts_1.$unref)(e));
    for (let e = 0; e < t.Num(); e++) {
      var r = Number(t.Get(e).toString());
      this.tRr.GetSkillInfo(r) &&
        PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
          this.XJr,
          r,
          !1,
        );
    }
    this.uGn();
  }
  LoadSkillAsync(e) {
    this.XJr.FightAssetManager.SkillAssetManager.GetSkill(e) ||
      ((e = PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
        this.XJr,
        e,
        !1,
      )) &&
        PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(
          e,
          this.XJr.LoadPriority,
          !1,
        ));
  }
  FlushSkill(e) {
    PreloadControllerNew_1.PreloadControllerNew.FlushSkill(this.XJr, e);
  }
  RemoveSkill(e) {
    PreloadControllerNew_1.PreloadControllerNew.RemoveSkill(this.XJr, e);
  }
  ozr() {}
  izr() {
    var e = (0, puerts_1.$ref)(void 0),
      t =
        (UE.DataTableFunctionLibrary.GetDataTableRowNames(
          this.tRr.DtSkillInfo,
          e,
        ),
        (0, puerts_1.$unref)(e));
    for (let e = 0; e < t.Num(); e++) {
      var r = Number(t.Get(e).toString());
      this.tRr.GetSkillInfo(r) &&
        PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
          this.XJr,
          r,
          !1,
        );
    }
    for (const i of ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillRowNames()) {
      var o = Number(i);
      this.tRr.GetSkillInfo(o) &&
        PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
          this.XJr,
          o,
          !1,
        );
    }
    this.uGn();
  }
  uGn() {
    if (0 !== this.lGn) {
      var t = this.hGn?.SkillDataTableMap.Get(this.lGn)?.ToAssetPathName();
      let e = void 0;
      if (
        (e =
          t && 0 < t.length && "None" !== t
            ? ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable)
            : e)
      ) {
        this.tRr.DtSkillInfoExtra = e;
        var t = (0, puerts_1.$ref)(void 0),
          r =
            (UE.DataTableFunctionLibrary.GetDataTableRowNames(e, t),
            (0, puerts_1.$unref)(t));
        for (let e = 0; e < r.Num(); e++) {
          var o = Number(r.Get(e).toString());
          this.tRr.GetSkillInfo(o) &&
            PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
              this.XJr,
              o,
              !1,
            );
        }
      }
    }
  }
  ZJr() {
    var e = this.u1t.GetEntityType();
    (e !== Protocol_1.Aki.Protocol.wks.Proto_Player &&
      e !== Protocol_1.Aki.Protocol.wks.Proto_Vision) ||
      (this.JJr(), this._Gn());
  }
  JJr(e = !1) {
    var t = this.hGn?.BulletDataTable?.ToAssetPathName();
    t?.length &&
      "None" !== t &&
      ((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable)),
      this.CGn(t, e) && (this.tRr.DtBulletInfo = t),
      0 !== this.lGn) &&
      (t = this.hGn?.BulletDataTableMap.Get(this.lGn)?.ToAssetPathName()) &&
      0 < t.length &&
      "None" !== t &&
      ((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable)),
      this.CGn(t, e)) &&
      (this.tRr.DtBulletInfoExtra = t);
  }
  CGn(e, t = !1) {
    var r = this.XJr;
    if (!e?.IsValid())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            4,
            "[预加载] 加载角色子弹表失败。",
            ["Path", r.BlueprintClassPath],
            ["子弹表Path", this.hGn?.BulletDataTable?.ToAssetPathName()],
          ),
        !1
      );
    if (!e) return !1;
    var o =
      DataTableUtil_1.DataTableUtil.GetAllDataTableRowFromTableWithRowName(e);
    if (!o) return !1;
    var i = o.length;
    for (let e = 0; e < i; ++e) {
      var s = o[e],
        s = BigInt(s[0]),
        s = PreloadControllerNew_1.PreloadControllerNew.CollectAssetByBulletId(
          r,
          s,
        );
      t &&
        s &&
        PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(
          s,
          this.XJr.LoadPriority,
          !1,
        );
    }
    return !0;
  }
  _Gn() {
    const e = this.hGn?.HitEffectTable.ToAssetPathName();
    var t;
    if (
      (e &&
        0 < e.length &&
        "None" !== e &&
        ((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.DataTable)),
        (this.tRr.DtHitEffect = t)),
      0 !== this.lGn)
    ) {
      const e = this.hGn?.HitEffectTableMap.Get(this.lGn)?.ToAssetPathName();
      e &&
        0 < e.length &&
        "None" !== e &&
        ((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.DataTable)),
        (this.tRr.DtHitEffectExtra = t));
    }
  }
  ezr() {
    var e = this.XJr,
      t = e.CreatureDataComponent.GetPbEntityInitData();
    let r = 0;
    t = (r =
      t?.ComponentsData &&
      (t = (0, IComponent_1.getComponent)(t.ComponentsData, "AiComponent"))
        ?.AiId &&
      !t.Disabled
        ? t.AiId
        : r)
      ? AiBaseById_1.configAiBaseById.GetConfig(r)
      : void 0;
    return !(
      t?.StateMachine &&
      !PreloadControllerNew_1.PreloadControllerNew.CollectAssetByStateMachineNode(
        e,
        t.StateMachine,
      )
    );
  }
};
(RolePreloadComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(199)],
  RolePreloadComponent,
)),
  (exports.RolePreloadComponent = RolePreloadComponent);
//# sourceMappingURL=RolePreloadComponent.js.map
