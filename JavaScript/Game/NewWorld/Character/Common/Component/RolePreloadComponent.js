"use strict";
var RolePreloadComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, o, i) {
      var r,
        l = arguments.length,
        s =
          l < 3
            ? e
            : null === i
              ? (i = Object.getOwnPropertyDescriptor(e, o))
              : i;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(t, e, o, i);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (r = t[a]) &&
            (s = (l < 3 ? r(s) : 3 < l ? r(e, o, s) : r(e, o)) || s);
      return 3 < l && s && Object.defineProperty(e, o, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RolePreloadComponent = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  MonsterBattleConfById_1 = require("../../../../../Core/Define/ConfigQuery/MonsterBattleConfById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimeLimit_1 = require("../../../../../Core/Performance/TimeLimit"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
  ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PreloadDefine_1 = require("../../../../Preload/PreloadDefine"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
  PreloadControllerNew_1 = require("../../../../World/Controller/PreloadControllerNew"),
  characterCommonSkillSet = new Set([
    100001, 100002, 100003, 100004, 100005, 100006, 100007,
  ]),
  TIME_LIMIT_MICRO_SECOND = 5e3;
let RolePreloadComponent =
  (RolePreloadComponent_1 = class RolePreloadComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.u1t = void 0),
        (this.tRr = void 0),
        (this.XJr = void 0),
        (this.$Jr = !1),
        (this.fGn = void 0),
        (this.T8_ = []),
        (this.AR1 = []),
        (this.PR1 = []),
        (this.cL1 = !1),
        (this.PreloadSkillIds = new Set()),
        (this.YJr = (t, e) => {
          e &&
            !this.$Jr &&
            this.tRr &&
            this.u1t.GetEntityType() ===
              Protocol_1.Aki.Protocol.kks.Proto_Monster &&
            (CombatLog_1.CombatLog.Warn(
              "Skill",
              this.Entity,
              "开始加载技能和子弹",
            ),
            (this.$Jr = !0),
            this.xR1(),
            this.DR1());
        });
    }
    OnInitData() {
      return (
        PreloadDefine_1.PreloadSetting.UseNewPreload &&
          ((this.tRr = this.Entity.GetComponent(38)),
          (this.u1t = this.Entity.GetComponent(0)),
          this.Entity.GetComponent(203).ListenForTagAddOrRemove(
            1996802261,
            this.YJr,
          )),
        !0
      );
    }
    OnTick(t) {
      for (
        ;
        (0 < this.AR1.length || 0 < this.PR1.length) &&
        !RolePreloadComponent_1.UR1.IsTimeLimitExceeded();

      ) {
        var e = cpp_1.KuroTime.GetMicroseconds64(),
          o = this.AR1.shift(),
          o = (o && this.LoadSkillAsync(o), this.PR1.shift()),
          o = (o && this.BR1(o), cpp_1.KuroTime.GetMicroseconds64());
        RolePreloadComponent_1.UR1.AddCost(o - e);
      }
      (0 < this.AR1.length || 0 < this.PR1.length) &&
        RolePreloadComponent_1.UR1.ResetCost();
    }
    InitPreload(t) {
      (this.XJr = t),
        this.tRr &&
          (this.dL1(),
          this.SGn(),
          this.EGn(),
          RolePreloadComponent_1.kR1.Start(),
          this.zJr(),
          RolePreloadComponent_1.kR1.Stop(),
          this.ZJr(),
          this.y6_());
    }
    GetFightInfo() {
      return this.fGn;
    }
    dL1() {
      33 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
        )?.InstSubType &&
        (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 28, "CAONIMA"),
        (this.cL1 = !0));
    }
    SGn() {
      var t = this.XJr?.BlueprintClassPath;
      t &&
        (this.fGn =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(t));
    }
    EGn() {
      this.T8_.length = 0;
      var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
      );
      if (t && 0 < t.FightInfoDtType.length)
        for (const e of t.FightInfoDtType) this.T8_.push(e);
      else if (this.u1t.IsAutoRole()) this.T8_.push(2);
      else {
        if (this.u1t.IsMonster()) {
          t = this.u1t.GetMonsterComponent()?.FightConfigId;
          if (t) {
            t =
              MonsterBattleConfById_1.configMonsterBattleConfById.GetConfig(t);
            if (t && 0 < t.RoleMappingId) return void this.T8_.push(2);
          }
        }
        (ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelikeOnly() ||
          ModelManager_1.ModelManager.BattleLinkModel.CheckInDreamLink()) &&
          this.T8_.push(1);
      }
    }
    zJr() {
      if (this.tRr) {
        var t,
          e = this.XJr,
          o = this.fGn?.SkillDataTable.ToAssetPathName();
        o?.length &&
          "None" !== o &&
          ((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            o,
            UE.DataTable,
          ))?.IsValid() ||
            CombatLog_1.CombatLog.Warn(
              "Skill",
              this.Entity,
              "SkillComponent中找不到技能表",
              ["ActorPath", e.BlueprintClassPath],
              ["技能表Path", o],
            ),
          (this.tRr.DtSkillInfo = t));
        for (const l of this.T8_) {
          var i,
            r = this.fGn?.SkillDataTableMap.Get(l)?.ToAssetPathName();
          r &&
            0 < r.length &&
            "None" !== r &&
            ((i = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              r,
              UE.DataTable,
            ))?.IsValid() ||
              CombatLog_1.CombatLog.Warn(
                "Skill",
                this.Entity,
                "SkillComponent中找不到玩法额外技能表",
                ["加载类型", l],
                ["ActorPath", e.BlueprintClassPath],
                ["额外技能表Path", r],
              ),
            i) &&
            (this.tRr.DtSkillInfoExtraList ||
              (this.tRr.DtSkillInfoExtraList = []),
            this.tRr.DtSkillInfoExtraList.push(i));
        }
        o = this.u1t.GetEntityType();
        o === Protocol_1.Aki.Protocol.kks.Proto_Player
          ? this.tzr()
          : o === Protocol_1.Aki.Protocol.kks.Proto_Vision
            ? this.izr()
            : this.u1t?.SummonType !==
                Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeDefault
              ? this.tzr()
              : o === Protocol_1.Aki.Protocol.kks.Proto_Monster
                ? this.ozr()
                : o === Protocol_1.Aki.Protocol.kks.HI_ && this.qHl();
      }
    }
    tzr() {
      if (this.tRr) {
        var t = new Array();
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
          this.tRr.DtSkillInfo,
          t,
        );
        for (const o of t) this.kk_(Number(o));
        this.MGn();
        for (const i of ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillRowNames()) {
          var e = Number(i);
          characterCommonSkillSet.has(e) &&
            !this.PreloadSkillIds.has(e) &&
            this.kk_(e);
        }
      }
    }
    LoadSkillAsync(e) {
      var t;
      this.XJr.FightAssetManager.SkillAssetManager.GetSkill(e) ||
        (RolePreloadComponent_1.OR1.Start(),
        (t = this.kk_(e)) &&
          PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(
            t,
            this.XJr.LoadPriority,
            !1,
            void 0,
            (t) => {
              t
                ? Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Preload", 4, "技能加载完毕", ["SkillId", e])
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error("Preload", 4, "技能加载失败", ["SkillId", e]);
            },
          ),
        RolePreloadComponent_1.OR1.Stop());
    }
    BR1(t) {
      this.XJr.FightAssetManager.BulletAssetManager.GetBullet(t) ||
        (RolePreloadComponent_1.qR1.Start(),
        (t = this.GR1(t)) &&
          PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(
            t,
            this.XJr.LoadPriority,
            !1,
          ),
        RolePreloadComponent_1.qR1.Stop());
    }
    FlushSkill(t) {
      PreloadControllerNew_1.PreloadControllerNew.FlushSkill(this.XJr, t);
    }
    RemoveSkill(t) {
      PreloadControllerNew_1.PreloadControllerNew.RemoveSkill(this.XJr, t);
    }
    ozr() {
      if (this.tRr && this.tRr.DtSkillInfo) {
        var t = new Array();
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowWithKeysFromTable(
          this.tRr.DtSkillInfo,
          t,
        );
        for (const i of t)
          if (void 0 !== i[0] && void 0 !== i[1]) {
            var e = Number(i[0]),
              o = i[1];
            if (this.cL1) this.kk_(e);
            else if (o && 8 === o.SkillGenre) this.kk_(e);
            else
              for (let t = 0; t < o.SkillTag.Num(); t++)
                2057104696 === o.SkillTag.Get(t).TagId &&
                  (this.kk_(e), Log_1.Log.CheckDebug()) &&
                  Log_1.Log.Debug("Preload", 4, "预加载怪物出场技能", [
                    "SkillId",
                    e,
                  ]);
          }
      }
    }
    qHl() {
      if (this.tRr) {
        var t = new Array();
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
          this.tRr.DtSkillInfo,
          t,
        );
        for (const e of t) this.kk_(Number(e));
        this.MGn();
      }
    }
    izr() {
      if (this.tRr) {
        var t = new Array();
        if (this.tRr.DtSkillInfo) {
          DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
            this.tRr.DtSkillInfo,
            t,
          );
          for (const e of t) this.kk_(Number(e));
        }
        for (const o of ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillRowNames())
          this.kk_(Number(o));
        this.MGn();
      }
    }
    MGn() {
      if (this.tRr) {
        var t = this.tRr.DtSkillInfoExtraList;
        if (t && !(t.length <= 0))
          for (const i of t) {
            var e = new Array();
            DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
              i,
              e,
            );
            for (const r of e) {
              var o = Number(r);
              this.kk_(o);
            }
          }
      }
    }
    ZJr() {
      var t = this.u1t.GetEntityType();
      t === Protocol_1.Aki.Protocol.kks.Proto_Player ||
      t === Protocol_1.Aki.Protocol.kks.Proto_Vision ||
      t === Protocol_1.Aki.Protocol.kks.HI_
        ? this.JJr(!0)
        : t === Protocol_1.Aki.Protocol.kks.Proto_Monster
          ? this.JJr(this.cL1)
          : this.JJr(!1),
        this.vGn();
    }
    JJr(t) {
      if (this.tRr) {
        var e = this.fGn?.BulletDataTable?.ToAssetPathName();
        if (e?.length && "None" !== e) {
          RolePreloadComponent_1.R6l.Start();
          e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.DataTable);
          this.IGn(e, t) && (this.tRr.DtBulletInfo = e),
            RolePreloadComponent_1.R6l.Stop(),
            RolePreloadComponent_1.w6l.Start();
          for (const i of this.T8_) {
            var o = this.fGn?.BulletDataTableMap.Get(i)?.ToAssetPathName();
            o &&
              0 < o.length &&
              "None" !== o &&
              ((o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                o,
                UE.DataTable,
              )),
              this.IGn(o, t)) &&
              (this.tRr.DtBulletInfoExtraList ||
                (this.tRr.DtBulletInfoExtraList = []),
              this.tRr.DtBulletInfoExtraList.push(o));
          }
          RolePreloadComponent_1.w6l.Stop();
        }
      }
    }
    IGn(t, e = !0) {
      var o = this.XJr;
      return t?.IsValid()
        ? !!t &&
            (e &&
              (RolePreloadComponent_1.P6l.Start(),
              (e = new Array()),
              DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
                t,
                e,
              ),
              RolePreloadComponent_1.P6l.Stop(),
              e.forEach((e) => {
                let t = void 0;
                try {
                  t = BigInt(e);
                } catch (t) {
                  return void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error("Editor", 4, "子弹ID不合法", ["子弹Id", e])
                  );
                }
                this.GR1(t);
              })),
            !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              4,
              "[预加载] 加载角色子弹表失败。",
              ["Path", o.BlueprintClassPath],
              ["子弹表Path", this.fGn?.BulletDataTable?.ToAssetPathName()],
            ),
          !1);
    }
    vGn() {
      if (this.tRr) {
        const o = this.fGn?.HitEffectTable.ToAssetPathName();
        var t, e;
        o &&
          0 < o.length &&
          "None" !== o &&
          ((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            o,
            UE.DataTable,
          )),
          (this.tRr.DtHitEffect = t));
        for (const i of this.T8_) {
          const o = this.fGn?.HitEffectTableMap.Get(i)?.ToAssetPathName();
          o &&
            0 < o.length &&
            "None" !== o &&
            ((e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              o,
              UE.DataTable,
            )),
            this.tRr.DtHitEffectExtraList ||
              (this.tRr.DtHitEffectExtraList = []),
            this.tRr.DtHitEffectExtraList.push(e));
        }
      }
    }
    kk_(t) {
      return (
        this.PreloadSkillIds.add(t),
        PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
          this.XJr,
          t,
          !1,
        )
      );
    }
    GR1(t) {
      return PreloadControllerNew_1.PreloadControllerNew.CollectAssetByBulletId(
        this.XJr,
        t,
      );
    }
    y6_() {
      if (this.XJr) {
        var e = this.fGn?.MorphModelInfoMap;
        if (e && 0 !== e.Num())
          for (let t = 0; t < e.Num(); t++) {
            var o,
              i,
              r,
              l = e.GetKey(t),
              l = e.Get(l);
            l &&
              0 !== l.ModelId &&
              ((o = this.XJr),
              (i = ModelUtil_1.ModelUtil.GetModelConfig(l.ModelId)) &&
              i.特效替换表 &&
              i.蒙太奇替换表
                ? (0 < (r = i.特效替换表.ToAssetPathName()).length &&
                    (o?.MainAsset.SetupReplaceEffect(r),
                    this.Entity.GetComponent(3).SetReplaceEffect(
                      o?.MainAsset.ReplaceEffectMap,
                    )),
                  0 < (r = i.蒙太奇替换表.ToAssetPathName()).length &&
                    (o?.MainAsset.SetupReplaceMontage(r),
                    this.Entity.GetComponent(3).SetReplaceMontage(
                      o?.MainAsset.ReplaceMontageMap,
                    )))
                : i ||
                  (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Preload",
                      67,
                      "[预加载] 多形态预加载 ModelConfig为空",
                      [
                        "CreatureDataId",
                        o?.CreatureDataComponent?.GetCreatureDataId(),
                      ],
                      ["EntityId", this.Entity?.Id],
                      ["ModelId", l.ModelId],
                    )),
              PreloadControllerNew_1.PreloadControllerNew.CollectAssetByModelId(
                o,
                l.ModelId,
                !1,
              ));
          }
      }
    }
    xR1() {
      for (const t of this.tRr.GetAllBulletData()) this.PR1.push(t);
    }
    DR1() {
      for (const t of this.tRr.GetAllSkillData(5)) this.AR1.push(t);
    }
  });
(RolePreloadComponent.UR1 = new TimeLimit_1.TimeLimit(TIME_LIMIT_MICRO_SECOND)),
  (RolePreloadComponent.kR1 = Stats_1.Stat.Create("Preload.PreloadSkill")),
  (RolePreloadComponent.R6l = Stats_1.Stat.Create("Preload.PreloadBullet1")),
  (RolePreloadComponent.w6l = Stats_1.Stat.Create("Preload.PreloadBullet2")),
  (RolePreloadComponent.P6l = Stats_1.Stat.Create(
    "Preload.PreloadBulletGetDataTableAllRow",
  )),
  (RolePreloadComponent.qR1 = Stats_1.Stat.Create("Preload.LoadBulletAsync")),
  (RolePreloadComponent.OR1 = Stats_1.Stat.Create("Preload.LoadSkillAsync")),
  (RolePreloadComponent = RolePreloadComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(216)],
      RolePreloadComponent,
    )),
  (exports.RolePreloadComponent = RolePreloadComponent);
//# sourceMappingURL=RolePreloadComponent.js.map
