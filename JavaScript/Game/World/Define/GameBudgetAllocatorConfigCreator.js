"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameBudgetAllocatorConfigCreator =
    exports.EFFECT_IMPORTANCE_ENABLE_RANGE =
    exports.EFFECT_USE_BOUNDS_RANGE =
    exports.EFFECT_ENABLE_RANGE =
      void 0);
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const GameBudgetAllocatorConfig_1 = require("../../../Core/GameBudgetAllocator/GameBudgetAllocatorConfig");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const PLAYER_ALWAYS_TICK_PRIORITY = 4;
const ALWAYS_TICK_PRIORITY = 5;
const ALWAYS_TICK_2_PRIORITY = 6;
const FIGHT_EFFECT_PRIPRITY = 7;
const ROLE_PRIORITY = 8;
const HUD_PRIORITY = 9;
const OTHER_PRIORITY = 10;
const IDLE_EXEC_PRIORITY = 100;
const EFFECT_IMPORTANCE_ENABLE_MAX_RANGE =
  ((exports.EFFECT_ENABLE_RANGE = 30001),
  (exports.EFFECT_USE_BOUNDS_RANGE = 1e4),
  (exports.EFFECT_IMPORTANCE_ENABLE_RANGE = 2e5),
  5e5);
const HUD_ENABLE_RANGE = 5e3;
class GameBudgetAllocatorConfigCreator {
  static get TsNormalEntityGroupConfig() {
    return this.ppr;
  }
  static get TsCharacterEntityGroupConfig() {
    return this.vpr;
  }
  static get TsFightEffectGroupConfig() {
    return this.Mpr;
  }
  static get TsEffectGroupConfig() {
    return this.Spr;
  }
  static get TsEffectInportanceGroupConfig() {
    return this.U6s;
  }
  static get TsAlwaysTickConfig() {
    return this.Epr;
  }
  static get TsPlayerAlwaysTickConfig() {
    return this.ypr;
  }
  static get TsIdleExecConfig() {
    return this.Ipr;
  }
  static get TsAlwaysTick2Config() {
    return this.Tpr;
  }
  static get TsHUDTickConfig() {
    return this.Lpr;
  }
  static get TsCharacterDtailConfig() {
    return this.vbn;
  }
  static CreateCharacterEntityConfigOnly() {
    this.vbn = this.Rpr(!1);
  }
  static CreateConfigs() {
    this.Dpr(),
      this.Rpr(),
      this.Upr(),
      this.Apr(),
      this.x6s(),
      this.Ppr(),
      this.xpr(),
      this.wpr(),
      this.Bpr(),
      this.bpr();
  }
  static UpdateGroupConfigTickStrategy(e, t, o) {
    (e.ueGroupConfig.DisableActorTickStrategy = t),
      (e.ueGroupConfig.DisableActorTickDistance = o),
      cpp_1.FKuroGameBudgetAllocatorInterface.UpdateGroupConfig(
        e.ueGroupConfig,
      );
  }
  static RestoreGroupConfigTickStrategy(e) {
    (e.ueGroupConfig.DisableActorTickStrategy =
      e.DefaultDisableActorTickStrategy),
      (e.ueGroupConfig.DisableActorTickDistance =
        e.DefaultDisableActorTickDistance),
      cpp_1.FKuroGameBudgetAllocatorInterface.UpdateGroupConfig(
        e.ueGroupConfig,
      );
  }
  static qpr(e, t) {
    const o = (0, puerts_1.$ref)(e);
    for (const i in t) {
      const a = t[i];
      i === "Default"
        ? (a ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Game", 25, "Missing default config!", [
                "GroupName",
                e.GroupName.toString(),
              ])),
          cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
            o,
            a.MaxInterval,
            a.TickReductionStartSize,
            a.TickReductionIntervalSize,
          ))
        : a &&
          cpp_1.FKuroGameBudgetAllocatorInterface.SetTickIntervalDetailConfig(
            o,
            a.GlobalMode,
            a.ActorMode,
            a.MaxInterval,
            a.TickReductionStartSize,
            a.TickReductionIntervalSize,
          );
    }
    cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e);
  }
  static Bpr() {
    const e =
      new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
        0,
        0,
        30,
        1,
        1,
      );
    const t = new UE.GameBudgetAllocatorGroupConfig();
    const o =
      ((t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("IdleExecGroup")),
      (t.SignificanceGroup = 0),
      (t.TickPriority = IDLE_EXEC_PRIORITY),
      (this.Ipr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
        t,
      )),
      (0, puerts_1.$ref)(t));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
      o,
      e.MaxInterval,
      e.TickReductionStartSize,
      e.TickReductionIntervalSize,
    ),
      cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
  }
  static Rpr(e = !0) {
    const t = {
      Default:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          60,
          3e3,
          300,
        ),
      Normal_Render:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          60,
          3e3,
          300,
        ),
      Normal_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          1,
          120,
          1e3,
          100,
        ),
      Fighting_Rendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          1,
          0,
          120,
          1e3,
          100,
        ),
      Fighting_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          1,
          1,
          120,
          500,
          50,
        ),
      Fighting_Fighting:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          1,
          2,
          1,
          1,
          1,
        ),
      Cutscene_Rendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          2,
          0,
          1,
          1,
          1,
        ),
      Cutscene_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          2,
          1,
          1,
          1,
          1,
        ),
    };
    return (
      e &&
        (((e = new UE.GameBudgetAllocatorGroupConfig()).GroupName =
          FNameUtil_1.FNameUtil.GetDynamicFName("CharacterEntity")),
        (e.SignificanceGroup = 2),
        (e.TickPriority = ROLE_PRIORITY),
        (this.vpr =
          new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e)),
        this.qpr(e, t)),
      t
    );
  }
  static Dpr() {
    const e = {
      Default:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          180,
          500,
          100,
        ),
      Normal_Render:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          180,
          2e3,
          400,
        ),
      Normal_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          1,
          600,
          500,
          100,
        ),
      Fighting_Rendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          1,
          0,
          600,
          500,
          100,
        ),
      Fighting_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          1,
          1,
          600,
          250,
          100,
        ),
      Fighting_Fighting:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          1,
          2,
          1,
          1,
          1,
        ),
      Cutscene_Rendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          2,
          0,
          180,
          2e3,
          400,
        ),
      Cutscene_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          2,
          1,
          240,
          1e3,
          200,
        ),
    };
    const t = new UE.GameBudgetAllocatorGroupConfig();
    (t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("NormalEntity")),
      (t.SignificanceGroup = 1),
      (t.TickPriority = OTHER_PRIORITY),
      (t.DisableActorTickStrategy = 4),
      (this.ppr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
        t,
      )),
      this.qpr(t, e);
  }
  static Upr() {
    const e =
      new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
        0,
        0,
        1,
        1,
        1,
      );
    const t = new UE.GameBudgetAllocatorGroupConfig();
    const o =
      ((t.GroupName =
        FNameUtil_1.FNameUtil.GetDynamicFName("FightEffectGroup")),
      (t.SignificanceGroup = 4),
      (t.TickPriority = FIGHT_EFFECT_PRIPRITY),
      (t.DisableActorTickStrategy = 1),
      (t.DisableActorTickDistance = exports.EFFECT_ENABLE_RANGE),
      (this.Mpr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
        t,
      )),
      (0, puerts_1.$ref)(t));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
      o,
      e.MaxInterval,
      e.TickReductionStartSize,
      e.TickReductionIntervalSize,
    ),
      cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
  }
  static Apr() {
    const e = {
      Default:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          180,
          500,
          100,
        ),
      Normal_Render:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          60,
          3e3,
          300,
        ),
      Normal_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          1,
          300,
          500,
          100,
        ),
      Fighting_Rendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          1,
          0,
          300,
          500,
          100,
        ),
      Fighting_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          1,
          1,
          600,
          250,
          100,
        ),
      Fighting_Fighting:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          1,
          2,
          1,
          1,
          1,
        ),
      Cutscene_Rendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          2,
          0,
          1,
          1,
          1,
        ),
      Cutscene_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          2,
          1,
          120,
          1e3,
          100,
        ),
    };
    const t = new UE.GameBudgetAllocatorGroupConfig();
    (t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("EffectGroup")),
      (t.SignificanceGroup = 2),
      (t.TickPriority = OTHER_PRIORITY),
      (t.DisableActorTickStrategy = 1),
      (t.DisableActorTickDistance = exports.EFFECT_ENABLE_RANGE),
      (this.Spr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
        t,
      )),
      this.qpr(t, e);
  }
  static x6s() {
    const e = {
      Default:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          100,
          3e4,
          3e3,
        ),
      Normal_Render:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          100,
          5e4,
          5e3,
        ),
      Normal_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          1,
          300,
          1e4,
          1e3,
        ),
      Fighting_Rendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          1,
          0,
          100,
          5e4,
          5e3,
        ),
      Fighting_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          1,
          1,
          600,
          1e4,
          1e3,
        ),
      Fighting_Fighting:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          1,
          2,
          100,
          5e4,
          5e3,
        ),
      Cutscene_Rendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          2,
          0,
          1,
          1,
          1,
        ),
      Cutscene_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          2,
          1,
          300,
          1e4,
          1e3,
        ),
    };
    const t = new UE.GameBudgetAllocatorGroupConfig();
    (t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName(
      "EffectImportanceGroup",
    )),
      (t.SignificanceGroup = 3),
      (t.TickPriority = OTHER_PRIORITY),
      (t.DisableActorTickStrategy = 1),
      (t.DisableActorTickDistance = EFFECT_IMPORTANCE_ENABLE_MAX_RANGE),
      (this.U6s = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
        t,
      )),
      this.qpr(t, e);
  }
  static Ppr() {
    const e =
      new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
        0,
        0,
        1,
        1,
        1,
      );
    const t = new UE.GameBudgetAllocatorGroupConfig();
    const o =
      ((t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName(
        "PlayerAlwaysTickGroup",
      )),
      (t.SignificanceGroup = 4),
      (t.TickPriority = PLAYER_ALWAYS_TICK_PRIORITY),
      (this.ypr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
        t,
      )),
      (0, puerts_1.$ref)(t));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
      o,
      e.MaxInterval,
      e.TickReductionStartSize,
      e.TickReductionIntervalSize,
    ),
      cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
  }
  static xpr() {
    const e =
      new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
        0,
        0,
        1,
        1,
        1,
      );
    const t = new UE.GameBudgetAllocatorGroupConfig();
    const o =
      ((t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("AlwaysTickGroup")),
      (t.SignificanceGroup = 4),
      (t.TickPriority = ALWAYS_TICK_PRIORITY),
      (this.Epr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
        t,
      )),
      (0, puerts_1.$ref)(t));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
      o,
      e.MaxInterval,
      e.TickReductionStartSize,
      e.TickReductionIntervalSize,
    ),
      cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
  }
  static wpr() {
    const e =
      new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
        0,
        0,
        1,
        1,
        1,
      );
    const t = new UE.GameBudgetAllocatorGroupConfig();
    const o =
      ((t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName(
        "CameraAlwaysTickGroup",
      )),
      (t.SignificanceGroup = 4),
      (t.TickPriority = ALWAYS_TICK_2_PRIORITY),
      (this.Tpr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
        t,
      )),
      (0, puerts_1.$ref)(t));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
      o,
      e.MaxInterval,
      e.TickReductionStartSize,
      e.TickReductionIntervalSize,
    ),
      cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
  }
  static bpr() {
    const e =
      new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
        0,
        0,
        5,
        2e3,
        300,
      );
    const t = new UE.GameBudgetAllocatorGroupConfig();
    const o =
      ((t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("HUDGroup")),
      (t.SignificanceGroup = 2),
      (t.TickPriority = HUD_PRIORITY),
      (t.DisableActorTickStrategy = 1),
      (t.DisableActorTickDistance = HUD_ENABLE_RANGE),
      (this.Lpr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
        t,
      )),
      (0, puerts_1.$ref)(t));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
      o,
      e.MaxInterval,
      e.TickReductionStartSize,
      e.TickReductionIntervalSize,
    ),
      cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
  }
  static GetEffectDynamicGroup(e) {
    let t, o, a, i, r, n, g, _, l, c, C, s;
    return e >= exports.EFFECT_IMPORTANCE_ENABLE_RANGE
      ? this.TsEffectInportanceGroupConfig
      : this.TsEffectDynamicGroupConfigMap.get(e) ||
          (0,
          (C = (e - (c = 0.2 * e)) / 179),
          (r = (e - (s = 0.8 * e)) / 59),
          (n = (e - (t = 0.2 * e)) / 299),
          (g = (e - (o = 0.2 * e)) / 299),
          (_ = (e - (a = 0.1 * e)) / 599),
          (l = (e - (i = 0.4 * e)) / 119),
          (c = {
            Default:
              new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
                0,
                0,
                180,
                c,
                C,
              ),
            Normal_Render:
              new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
                0,
                0,
                60,
                s,
                r,
              ),
            Normal_NotRendered:
              new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
                0,
                1,
                300,
                t,
                n,
              ),
            Fighting_Rendered:
              new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
                1,
                0,
                300,
                o,
                g,
              ),
            Fighting_NotRendered:
              new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
                1,
                1,
                600,
                a,
                _,
              ),
            Fighting_Fighting:
              new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
                1,
                2,
                1,
                1,
                1,
              ),
            Cutscene_Rendered:
              new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
                2,
                0,
                1,
                1,
                1,
              ),
            Cutscene_NotRendered:
              new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
                2,
                1,
                120,
                i,
                l,
              ),
          }),
          ((C = new UE.GameBudgetAllocatorGroupConfig()).GroupName =
            FNameUtil_1.FNameUtil.GetDynamicFName("EffectGroup_" + e)),
          (C.SignificanceGroup = 2),
          (C.TickPriority = OTHER_PRIORITY),
          (C.DisableActorTickStrategy = 1),
          (C.DisableActorTickDistance = e),
          (s = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(C)),
          this.TsEffectDynamicGroupConfigMap.set(e, s),
          this.qpr(C, c),
          s);
  }
}
(exports.GameBudgetAllocatorConfigCreator =
  GameBudgetAllocatorConfigCreator).TsEffectDynamicGroupConfigMap = new Map();
// # sourceMappingURL=GameBudgetAllocatorConfigCreator.js.map
