"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  RogueResDungeonConfigById_1 = require("../../../Core/Define/ConfigQuery/RogueResDungeonConfigById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  StateRef_1 = require("../../../Core/Utils/Audio/StateRef"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RoleRobotData_1 = require("../RoleUi/RoleData/RoleRobotData"),
  RoleDefine_1 = require("../RoleUi/RoleDefine"),
  RoleInstance_1 = require("../RoleUi/View/ViewData/RoleInstance"),
  ROLELEVEL_EFFECTSHOW_TAG = 34,
  SKILLLEVEL_EFFECTSHOW_TAG = 33,
  WEAPONLEVEL_EFFECTSHOW_TAG = 32;
class RogueBattleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.TotalGainDataMap = new Map()),
      (this.GainDataMap = new Map()),
      (this.ElementMap = new Map()),
      (this.RoleFetterMap = new Map()),
      (this.BondAllRoleMap = new Map()),
      (this.FormationData = []),
      (this.DescMode = 0),
      (this.SelectGainData = void 0),
      (this.CurrentBindId = 0),
      (this.CurrentRoomTypeId = ""),
      (this.CurrentRoomId = 0),
      (this.CurrentMapSummaryBond = 0),
      (this.IsMapSummaryBondJumping = !1),
      (this.MaxRoleStar = 0),
      (this.SummaryRoleList = []),
      (this.lec = new StateRef_1.StateRef("game_rogue_room_type", "none")),
      (this.v5i = new Map());
  }
  get CurrentRoomMusicState() {
    return this.lec.State;
  }
  set CurrentRoomMusicState(t) {
    this.lec.State = t ?? "none";
  }
  ChangeDescMode() {
    (this.DescMode = 0 === this.DescMode ? 1 : 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RogueBattleDescModeChange,
      );
  }
  GetOptionDataById(t) {
    return this.v5i.get(t);
  }
  SetOptionData(t, e) {
    this.v5i.set(t, e);
  }
  GetFormationDataByIndex(t) {
    return this.FormationData[t];
  }
  UpdateFormationData(t, e) {
    this.FormationData[t] = e;
  }
  GetPhantomData() {
    if (this.TotalGainDataMap.has(Protocol_1.Aki.Protocol.Lac.hxs))
      return (
        Array.from(
          this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.Lac.hxs).values(),
        )[0] ?? void 0
      );
  }
  GetTokenData() {
    return this.TotalGainDataMap.has(Protocol_1.Aki.Protocol.Lac.$9n)
      ? Array.from(
          this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.Lac.$9n).values(),
        )
      : [];
  }
  GetRoleInfoById(t) {
    var e = this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.Lac.RUs);
    if (e) return e.get(t)?.Uac;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("RogueBattle", 34, "没有角色数据");
  }
  GetIncIdByRoleId(t) {
    if (this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.Lac.RUs))
      for (const e of this.TotalGainDataMap.get(
        Protocol_1.Aki.Protocol.Lac.RUs,
      ))
        if (e[1].Uac?.Ud1 === t) return e[0];
    return 0;
  }
  GetRoleList() {
    var t = this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.Lac.RUs);
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("RogueBattle", 34, "没有角色数据"),
        []
      );
    var e = [];
    for (const o of t.values()) {
      let t = void 0;
      (t = new (
        o.Uac.Ud1 > RoleDefine_1.ROBOT_DATA_MIN_ID
          ? RoleRobotData_1.RoleRobotData
          : RoleInstance_1.RoleInstance
      )(o.Uac.Ud1))
        .GetLevelData()
        .SetLevel(
          ModelManager_1.ModelManager.MapRogueModel.GetRogueRoleLevel(),
        ),
        t && e.push(t);
    }
    return e;
  }
  IsRoleGot(t) {
    var e = this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.Lac.RUs);
    if (e) {
      for (const o of e.values()) if (o.Uac.Ud1 === t) return !0;
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("RogueBattle", 34, "没有角色数据");
    return !1;
  }
  GetRoleBondDataById(t) {
    return this.RoleFetterMap.has(t)
      ? this.RoleFetterMap.get(t)
      : {
          v9n: t,
          Psc: 0,
          Pd1:
            ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(
              t,
            )?.StarMap.get(1) ?? 0,
          F6n: 0,
        };
  }
  GetAllOwnedRoleBondData() {
    return Array.from(this.RoleFetterMap.values());
  }
  UpdateOptionData(t) {
    for (const a of Object.keys(t.Bac)) {
      var e = Number.parseInt(a),
        o = t.Bac[a];
      this.SetOptionData(e, o);
    }
    for (const s of Object.keys(t.Oac)) {
      var r = Number.parseInt(s);
      this.v5i.delete(r);
    }
    for (const f of Object.keys(t.kac)) {
      var n = Number.parseInt(f),
        i = t.kac[f];
      this.SetOptionData(n, i);
    }
  }
  UpdateGainData(t) {
    for (const r of t.Bac) {
      let t = r.w5n;
      r.Lac === Protocol_1.Aki.Protocol.Lac.RUs && (t = r.Uac.Ud1),
        this.GainDataMap.set(r.w5n, r),
        this.TotalGainDataMap.has(r.Lac) ||
          this.TotalGainDataMap.set(r.Lac, new Map()),
        this.TotalGainDataMap.get(r.Lac).set(t, r);
    }
    for (const n of t.kac) {
      let t = n.w5n;
      n.Lac === Protocol_1.Aki.Protocol.Lac.RUs && (t = n.Uac.Ud1),
        this.GainDataMap.set(n.w5n, n),
        this.TotalGainDataMap.has(n.Lac) ||
          this.TotalGainDataMap.set(n.Lac, new Map()),
        this.TotalGainDataMap.get(n.Lac).set(t, n);
    }
    for (const i of t.Oac) {
      var e,
        o = this.GainDataMap.get(i);
      o &&
        (this.GainDataMap.delete(i), (e = this.TotalGainDataMap.get(o.Lac))) &&
        (o.Lac === Protocol_1.Aki.Protocol.Lac.RUs
          ? ((o = o.Uac.Ud1), e.delete(o))
          : e.delete(i));
    }
  }
  UpdateElementData(t) {
    for (const e of t.iVc) this.ElementMap.set(e.aVc, e);
  }
  UpdateFetterData(t) {
    for (const e of t.xh1) this.RoleFetterMap.set(e.v9n, e);
  }
  InitOptionData(t) {
    for (const r of Object.keys(t.uBc)) {
      var e = Number.parseInt(r),
        o = t.uBc[r];
      this.SetOptionData(e, o);
    }
  }
  InitGainData(t) {
    this.RoleFetterMap.clear(),
      this.TotalGainDataMap.clear(),
      this.GainDataMap.clear(),
      this.RoleFetterMap.clear(),
      this.ElementMap.clear();
    for (const e of t.Dac)
      this.TotalGainDataMap.has(e.Lac) ||
        this.TotalGainDataMap.set(e.Lac, new Map()),
        e.Lac === Protocol_1.Aki.Protocol.Lac.RUs
          ? this.TotalGainDataMap.get(e.Lac).set(e.Uac.Ud1, e)
          : this.TotalGainDataMap.get(e.Lac).set(e.w5n, e),
        this.GainDataMap.set(e.w5n, e);
    this.ElementMap.set(1, { aVc: 1, m9n: 0 }),
      this.ElementMap.set(2, { aVc: 2, m9n: 0 }),
      this.ElementMap.set(3, { aVc: 3, m9n: 0 }),
      this.ElementMap.set(4, { aVc: 4, m9n: 0 });
    for (const o of t.iVc) this.ElementMap.set(o.aVc, o);
    t.xh1.forEach((t) => {
      this.RoleFetterMap.set(t.v9n, t);
    });
  }
  InitFormationData(t) {
    this.FormationData = t;
  }
  OnClear() {
    return (
      this.v5i.clear(),
      this.TotalGainDataMap.clear(),
      this.GainDataMap.clear(),
      this.ElementMap.clear(),
      (this.SelectGainData = void 0),
      (this.CurrentBindId = 0),
      (this.CurrentRoomTypeId = ""),
      (this.CurrentRoomId = 0),
      (this.CurrentRoomMusicState = "none"),
      !0
    );
  }
  GetTotalElementInfo(t = []) {
    var e,
      o = new Map();
    for (const n of t) {
      var r = { ElementId: n.aVc, Count: n.m9n, IsPreview: !0 };
      o.set(n.aVc, r);
    }
    for (const i of this.ElementMap.values())
      o.has(i.aVc)
        ? (o.get(i.aVc).Count += i.m9n)
        : ((e = { ElementId: i.aVc, Count: i.m9n, IsPreview: !1 }),
          o.set(i.aVc, e));
    return Array.from(o.values()).sort((t, e) => t.ElementId - e.ElementId);
  }
  GetTotalElementCount() {
    let t = 0;
    for (const e of this.ElementMap.values()) t += e.m9n;
    return t;
  }
  GetElementInfoById(t) {
    t = this.ElementMap.get(t);
    if (t) return { ElementId: t.aVc, Count: t.m9n, IsPreview: !1 };
  }
  CheckPhantomAffixCanUnlock(t) {
    let e = !0;
    for (const o of t.iVc)
      if (this.ElementMap.get(o.aVc).m9n < o.m9n) {
        e = !1;
        break;
      }
    return e;
  }
  GetCurrentSeasonId() {
    var t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    return 0 === t
      ? 0
      : (t =
            RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(
              t,
            ))
        ? t.SeasonId
        : ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId();
  }
  GetRoleListByBond(t) {
    if (0 === this.BondAllRoleMap.size)
      for (const f of ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResBondRole())
        for (const h of f.BondIds)
          this.BondAllRoleMap.get(h) || this.BondAllRoleMap.set(h, []),
            this.BondAllRoleMap.get(h).push(f.RoleId);
    t = this.BondAllRoleMap.get(t);
    if (!t) return [];
    var e = new Array(),
      o = new Array(),
      r = this.GetCurrentSeasonId(),
      n = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailRole(
        r,
        0,
      ),
      i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailRole(
        r,
        1,
      );
    for (const _ of t)
      if (this.IsRoleGot(_)) {
        var a = { IsGain: !0, ConfigId: _, NeedLevel: !1 };
        e.push(a);
      } else if (!ModelManager_1.ModelManager.RoleModel.IsMainRole(_)) {
        a =
          ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(
            _,
          );
        if (this.IsRoleGot(a.TrialRoleId)) {
          var s = { IsGain: !0, ConfigId: a.TrialRoleId, NeedLevel: !1 };
          e.push(s);
        } else {
          let t = 0;
          s = {
            IsGain: !1,
            ConfigId: (t =
              n.includes(a.TrialRoleId) || i.includes(a.TrialRoleId)
                ? a.TrialRoleId
                : _),
            NeedLevel: !1,
          };
          o.push(s);
        }
      }
    return (
      e.sort((t, e) => {
        var o = this.GetRoleInfoById(t.ConfigId),
          r = this.GetRoleIsRogueTrial(t.ConfigId),
          n = this.GetRoleInfoById(e.ConfigId),
          i = this.GetRoleIsRogueTrial(e.ConfigId);
        return o.F6n === n.F6n
          ? r === i
            ? t.ConfigId - e.ConfigId
            : r
              ? -1
              : 1
          : n.F6n - o.F6n;
      }),
      o.sort((t, e) => {
        var o = this.GetRoleIsRogueTrial(t.ConfigId),
          r = this.GetRoleCantGet(t.ConfigId),
          n = this.GetRoleIsRogueTrial(e.ConfigId),
          i = this.GetRoleCantGet(e.ConfigId);
        return o !== n
          ? o
            ? -1
            : 1
          : r !== i
            ? r
              ? 1
              : -1
            : t.ConfigId - e.ConfigId;
      }),
      [...e, ...o]
    );
  }
  GetRoleCantGet(t) {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    return (
      !ConfigManager_1.ConfigManager.RoleConfig.IsTrialRole(t) &&
      !ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.Id)
    );
  }
  GetRoleIsRogueTrial(t) {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    return (
      ConfigManager_1.ConfigManager.RoleConfig.IsTrialRole(t) &&
      !ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.Id)
    );
  }
  GetEffectList() {
    var t = new Map(),
      e = (this.wT1(t), this.AT1(t), this.PT1(t), []);
    for (const o of t) e.push(o[1]);
    return e;
  }
  AT1(t) {
    var e = ModelManager_1.ModelManager.MapRogueModel.GameInfo.TeamLv;
    for (const s of ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResTeamLvRule()) {
      if (
        2 === s.LevelRange.length &&
        0 < s.RangeEffects.length &&
        e >= s.LevelRange[0]
      )
        for (const f of s.RangeEffects) {
          var o,
            r,
            n =
              ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectById(
                f,
              );
          n &&
            ((o =
              ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResEffectTagById(
                n.Tag,
              )),
            (r =
              e >= s.LevelRange[1]
                ? s.LevelRange[1] - s.LevelRange[0] + 1
                : e - s.LevelRange[0] + 1),
            t.get(o.Text)
              ? (t.get(o.Text).Count += r * n.DescIntParam)
              : ((r = {
                  TagKey: o.Text,
                  Count: r * n.DescIntParam,
                  IsRatio: o.IsRatio,
                  Icon: o.Icon,
                }),
                t.set(o.Text, r)));
        }
      if (
        0 !== s.TargetLevel &&
        e >= s.TargetLevel &&
        0 < s.TargetEffects.length
      )
        for (const h of s.TargetEffects) {
          var i,
            a =
              ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectById(
                h,
              );
          a &&
            ((i =
              ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResEffectTagById(
                a.Tag,
              )),
            t.get(i.Text)
              ? (t.get(i.Text).Count += a.DescIntParam)
              : ((a = {
                  TagKey: i.Text,
                  Count: a.DescIntParam,
                  IsRatio: i.IsRatio,
                  Icon: i.Icon,
                }),
                t.set(i.Text, a)));
        }
    }
  }
  wT1(t) {
    var e,
      o = ModelManager_1.ModelManager.MapRogueModel.GameInfo.TeamLv,
      r =
        ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResTeamLvRule(),
      n =
        ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectTagById(
          ROLELEVEL_EFFECTSHOW_TAG,
        ),
      i = { TagKey: n.Text, Count: 0, IsRatio: !1, Icon: n.Icon },
      a =
        ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectTagById(
          WEAPONLEVEL_EFFECTSHOW_TAG,
        ),
      s = { TagKey: a.Text, Count: 0, IsRatio: !1, Icon: a.Icon };
    for (const _ of r)
      2 === _.LevelRange.length &&
        0 < _.RoleLevel &&
        o >= _.LevelRange[0] &&
        ((e =
          o >= _.LevelRange[1]
            ? _.LevelRange[1] - _.LevelRange[0] + 1
            : o - _.LevelRange[0] + 1),
        (i.Count += e * _.RoleLevel));
    s.Count = i.Count;
    var f =
        ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResSkillLvRule(),
      r =
        ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectTagById(
          SKILLLEVEL_EFFECTSHOW_TAG,
        ),
      h = { TagKey: r.Text, Count: 0, IsRatio: !1, Icon: r.Icon };
    for (let t = f.length - 1; 0 <= t; t--)
      if (o >= f[t].Level) {
        h.Count = f[t].SkillLevel.get(1) ?? 0;
        break;
      }
    t.set(n.Text, i), t.set(a.Text, s), t.set(r.Text, h);
  }
  PT1(t) {
    for (const n of this.GetAllOwnedRoleBondData())
      if (0 !== n.F6n) {
        var e,
          o,
          r = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(
            n.v9n,
          );
        if (r && 0 !== r.ExploreEffect.size)
          for (const i of r.ExploreEffect)
            n.F6n < i[0] ||
              ((o =
                ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectById(
                  i[1],
                )),
              (e =
                ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResEffectTagById(
                  o.Tag,
                )),
              t.get(e.Text)
                ? (t.get(e.Text).Count += o.DescIntParam)
                : ((o = {
                    TagKey: e.Text,
                    Count: o.DescIntParam,
                    IsRatio: e.IsRatio,
                    Icon: e.Icon,
                  }),
                  t.set(e.Text, o)));
      }
  }
  ClearData() {
    this.TotalGainDataMap.clear(),
      this.BondAllRoleMap.clear(),
      this.GainDataMap.clear(),
      this.ElementMap.clear(),
      this.RoleFetterMap.clear(),
      (this.FormationData = []);
  }
}
exports.RogueBattleModel = RogueBattleModel;
//# sourceMappingURL=RogueBattleModel.js.map
