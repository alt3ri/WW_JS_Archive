"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, r, o) {
    let i;
    const s = arguments.length;
    let l =
      s < 3 ? t : o === null ? (o = Object.getOwnPropertyDescriptor(t, r)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      l = Reflect.decorate(e, t, r, o);
    else
      for (let n = e.length - 1; n >= 0; n--)
        (i = e[n]) && (l = (s < 3 ? i(l) : s > 3 ? i(t, r, l) : i(t, r)) || l);
    return s > 3 && l && Object.defineProperty(t, r, l), l;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RolePreloadComponent = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const AiBaseById_1 = require("../../../../../Core/Define/ConfigQuery/AiBaseById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../../Module/Phantom/PhantomUtil");
const PreloadDefine_1 = require("../../../../Preload/PreloadDefine");
const CombatDebugController_1 = require("../../../../Utils/CombatDebugController");
const PreloadControllerNew_1 = require("../../../../World/Controller/PreloadControllerNew");
let RolePreloadComponent = class RolePreloadComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.zht = void 0),
      (this.mzr = void 0),
      (this.rDr = void 0),
      (this.dzr = void 0),
      (this.Czr = !1),
      (this.BBn = void 0),
      (this.wBn = 0),
      (this.gzr = (e, t) => {
        if (t && !this.Czr) {
          t = this.zht.GetEntityType();
          if (t === Protocol_1.Aki.Protocol.HBs.Proto_Monster) {
            CombatDebugController_1.CombatDebugController.CombatWarn(
              "Skill",
              this.Entity,
              "开始加载技能和子弹",
            ),
              (this.Czr = !0),
              this.fzr(!0),
              this.bBn();
            var t = (0, puerts_1.$ref)(void 0);
            const r =
              (UE.DataTableFunctionLibrary.GetDataTableRowNames(
                this.rDr.DtSkillInfo,
                t,
              ),
              (0, puerts_1.$unref)(t));
            for (let e = 0; e < r.Num(); e++) {
              var o;
              const i = Number(r.Get(e).toString());
              this.rDr?.LoadedSkills.has(i) ||
                ((o = this.rDr.GetSkillInfo(i)) &&
                  o.SkillLoadType === 0 &&
                  this.LoadSkillAsync(i));
            }
            for (const n of ConfigManager_1.ConfigManager.WorldConfig.GetMonsterCommonSkillRowNames()) {
              var s;
              const l = Number(n);
              this.rDr?.LoadedSkills.has(l) ||
                ((s = this.rDr.GetSkillInfo(l)) &&
                  s.SkillLoadType === 0 &&
                  this.LoadSkillAsync(l));
            }
            this.qBn();
          }
        }
      });
  }
  OnInitData() {
    return (
      PreloadDefine_1.PreloadSetting.UseNewPreload &&
        ((this.rDr = this.Entity.GetComponent(33)),
        (this.mzr = this.Entity.GetComponent(1)),
        (this.zht = this.Entity.GetComponent(0)),
        this.Entity.GetComponent(185).ListenForTagAddOrRemove(
          1996802261,
          this.gzr,
        )),
      !0
    );
  }
  InitPreload(e) {
    (this.dzr = e), this.GBn(), this.OBn(), this.pzr(), this.vzr(), this.Mzr();
  }
  GBn() {
    const e = this.dzr?.BlueprintClassPath;
    e &&
      (this.BBn =
        ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(e));
  }
  OBn() {
    ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike()
      ? (this.wBn = 1)
      : (this.wBn = 0);
  }
  pzr() {
    let e;
    var t = this.dzr;
    const r = this.BBn?.SkillDataTable.ToAssetPathName();
    var t =
      (r?.length &&
        r !== "None" &&
        ((e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          r,
          UE.DataTable,
        ))?.IsValid() ||
          CombatDebugController_1.CombatDebugController.CombatWarn(
            "Skill",
            this.Entity,
            "SkillComponent中找不到技能表",
            ["ActorPath", t.BlueprintClassPath],
            ["技能表Path", r],
          ),
        (this.rDr.DtSkillInfo = e)),
      this.zht.GetEntityType());
    t === Protocol_1.Aki.Protocol.HBs.Proto_Player
      ? this.Szr()
      : t === Protocol_1.Aki.Protocol.HBs.Proto_Vision
        ? this.Ezr()
        : t === Protocol_1.Aki.Protocol.HBs.Proto_Monster && this.yzr();
  }
  Szr() {
    let e = (0, puerts_1.$ref)(void 0);
    const t =
      (UE.DataTableFunctionLibrary.GetDataTableRowNames(
        this.rDr.DtSkillInfo,
        e,
      ),
      (0, puerts_1.$unref)(e));
    for (let e = 0; e < t.Num(); e++) {
      const r = Number(t.Get(e).toString());
      const o = this.rDr.GetSkillInfo(r);
      o &&
        o.SkillLoadType === 0 &&
        PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
          this.dzr,
          r,
          !1,
        );
    }
    e = ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillRowNames();
    let i = void 0;
    let s = this.mzr.CreatureData.GetVisionComponent();
    s &&
      (s = PhantomUtil_1.PhantomUtil.GetVisionData(s.VisionId)) &&
      (i = s.类型);
    for (const a of e) {
      const l = Number(a);
      const n = this.rDr.GetSkillInfo(l);
      n &&
        ((n.SkillLoadType === 3 && Number(i) === 1) ||
          (n.SkillLoadType === 2 && Number(i) === 0)) &&
        PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
          this.dzr,
          l,
          !1,
        );
    }
    this.qBn();
  }
  LoadSkillAsync(e) {
    this.dzr.FightAssetManager.SkillAssetManager.GetSkill(e) ||
      ((e = PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
        this.dzr,
        e,
        !1,
      )) &&
        PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(
          e,
          this.dzr.LoadPriority,
          !1,
        ));
  }
  FlushSkill(e) {
    PreloadControllerNew_1.PreloadControllerNew.FlushSkill(this.dzr, e);
  }
  RemoveSkill(e) {
    PreloadControllerNew_1.PreloadControllerNew.RemoveSkill(this.dzr, e);
  }
  yzr() {}
  Ezr() {
    const e = (0, puerts_1.$ref)(void 0);
    const t =
      (UE.DataTableFunctionLibrary.GetDataTableRowNames(
        this.rDr.DtSkillInfo,
        e,
      ),
      (0, puerts_1.$unref)(e));
    for (let e = 0; e < t.Num(); e++) {
      const r = Number(t.Get(e).toString());
      const o = this.rDr.GetSkillInfo(r);
      o &&
        o.SkillLoadType === 0 &&
        PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
          this.dzr,
          r,
          !1,
        );
    }
    for (const l of ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillRowNames()) {
      const i = Number(l);
      const s = this.rDr.GetSkillInfo(i);
      s &&
        s.SkillLoadType === 0 &&
        PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
          this.dzr,
          i,
          !1,
        );
    }
    this.qBn();
  }
  qBn() {
    if (this.wBn !== 0) {
      var t = this.BBn?.SkillDataTableMap.Get(this.wBn)?.ToAssetPathName();
      let e = void 0;
      if (
        (e =
          t && t.length > 0 && t !== "None"
            ? ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable)
            : e)
      ) {
        this.rDr.DtSkillInfoExtra = e;
        var t = (0, puerts_1.$ref)(void 0);
        const r =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(e, t),
          (0, puerts_1.$unref)(t));
        for (let e = 0; e < r.Num(); e++) {
          const o = Number(r.Get(e).toString());
          const i = this.rDr.GetSkillInfo(o);
          i &&
            i.SkillLoadType === 0 &&
            PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
              this.dzr,
              o,
              !1,
            );
        }
      }
    }
  }
  vzr() {
    const e = this.zht.GetEntityType();
    (e !== Protocol_1.Aki.Protocol.HBs.Proto_Player &&
      e !== Protocol_1.Aki.Protocol.HBs.Proto_Vision) ||
      (this.fzr(), this.bBn());
  }
  fzr(e = !1) {
    let t = this.BBn?.BulletDataTable?.ToAssetPathName();
    t?.length &&
      t !== "None" &&
      ((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable)),
      this.kBn(t, e) && (this.rDr.DtBulletInfo = t),
      this.wBn !== 0) &&
      (t = this.BBn?.BulletDataTableMap.Get(this.wBn)?.ToAssetPathName()) &&
      t.length > 0 &&
      t !== "None" &&
      ((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable)),
      this.kBn(t, e)) &&
      (this.rDr.DtBulletInfoExtra = t);
  }
  kBn(e, t = !1) {
    const r = this.dzr;
    if (!e?.IsValid())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            4,
            "[预加载] 加载角色子弹表失败。",
            ["Path", r.BlueprintClassPath],
            ["子弹表Path", this.BBn?.BulletDataTable?.ToAssetPathName()],
          ),
        !1
      );
    if (!e) return !1;
    const o =
      DataTableUtil_1.DataTableUtil.GetAllDataTableRowFromTableWithRowName(e);
    if (!o) return !1;
    const i = o.length;
    for (let e = 0; e < i; ++e) {
      var s = o[e];
      var s = BigInt(s[0]);
      var s =
        PreloadControllerNew_1.PreloadControllerNew.CollectAssetByBulletId(
          r,
          s,
        );
      t &&
        s &&
        PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(
          s,
          this.dzr.LoadPriority,
          !1,
        );
    }
    return !0;
  }
  bBn() {
    const e = this.BBn?.HitEffectTable.ToAssetPathName();
    let t;
    if (
      (e &&
        e.length > 0 &&
        e !== "None" &&
        ((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.DataTable)),
        (this.rDr.DtHitEffect = t)),
      this.wBn !== 0)
    ) {
      const e = this.BBn?.HitEffectTableMap.Get(this.wBn)?.ToAssetPathName();
      e &&
        e.length > 0 &&
        e !== "None" &&
        ((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.DataTable)),
        (this.rDr.DtHitEffectExtra = t));
    }
  }
  Mzr() {
    const e = this.dzr;
    let t = e.CreatureDataComponent.GetPbEntityInitData();
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
  [(0, RegisterComponent_1.RegisterComponent)(194)],
  RolePreloadComponent,
)),
  (exports.RolePreloadComponent = RolePreloadComponent);
// # sourceMappingURL=RolePreloadComponent.js.map
