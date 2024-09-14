"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameBudgetAllocatorConfigCreator =
    exports.EFFECT_IMPORTANCE_ENABLE_RANGE =
    exports.EFFECT_USE_BOUNDS_RANGE =
    exports.EFFECT_ENABLE_RANGE =
      void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  GameBudgetAllocatorConfig_1 = require("../../../Core/GameBudgetAllocator/GameBudgetAllocatorConfig"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  PLAYER_ALWAYS_TICK_PRIORITY = 4,
  ALWAYS_TICK_PRIORITY = 5,
  ALWAYS_TICK_2_PRIORITY = 6,
  FIGHT_EFFECT_PRIPRITY = 7,
  Boss_PRIORITY = 8,
  ROLE_PRIORITY = 9,
  NPC_PRIORITY = 10,
  SIMPLE_NPC_PRIORITY = 11,
  HUD_PRIORITY = 12,
  BATTLE_HEAD_STATE_VIEW_PRIORITY = 12,
  OTHER_PRIORITY = 12,
  IDLE_EXEC_PRIORITY = 100,
  EFFECT_IMPORTANCE_ENABLE_MAX_RANGE =
    ((exports.EFFECT_ENABLE_RANGE = 30001),
    (exports.EFFECT_USE_BOUNDS_RANGE = 1e4),
    (exports.EFFECT_IMPORTANCE_ENABLE_RANGE = 2e5),
    5e5),
  HUD_ENABLE_RANGE = 5e3,
  BATTLE_HEAD_STATE_VIEW_RANGE = 5e3,
  CHARCTER_RENDER_ENABLE_MAX_RANGE = 18e3;
class GameBudgetAllocatorConfigCreator {
  static get TsNormalEntityGroupConfig() {
    return this.Cvr;
  }
  static get TsBossEntityGroupConfig() {
    return this._wa;
  }
  static get TsCharacterEntityGroupConfig() {
    return this.gvr;
  }
  static get TsNormalNpcEntityGroupConfig() {
    return this.VPa;
  }
  static get TsSimpleNpcEntityGroupConfig() {
    return this.HPa;
  }
  static get TsFightEffectGroupConfig() {
    return this.fvr;
  }
  static get TsEffectGroupConfig() {
    return this.pvr;
  }
  static get TsEffectInportanceGroupConfig() {
    return this.AJs;
  }
  static get TsAlwaysTickConfig() {
    return this.vvr;
  }
  static get TsPlayerAlwaysTickConfig() {
    return this.Mvr;
  }
  static get TsIdleExecConfig() {
    return this.Evr;
  }
  static get TsAlwaysTick2Config() {
    return this.Svr;
  }
  static get TsHUDTickConfig() {
    return this.yvr;
  }
  static get TsCharacterRenderConfig() {
    return this.iNa;
  }
  static get TsStabilizeLowEntityGroupConfig() {
    return this.Jia;
  }
  static get TsBattleHeadStateViewConfig() {
    return this.pOa;
  }
  static get TsCharacterDtailConfig() {
    return this.DOn;
  }
  static get TsAlwaysTickHotFixConfig() {
    return this.J9a;
  }
  static CreateCharacterEntityConfigOnly() {
    this.DOn = this.Tvr(!1);
  }
  static CreateConfigs() {
    this.Ivr(),
      this.uwa(),
      this.Tvr(),
      this.jPa(),
      this.WPa(),
      this.Lvr(),
      this.Dvr(),
      this.DJs(),
      this.zia(),
      this.Z9a(),
      this.Rvr(),
      this.Uvr(),
      this.Avr(),
      this.Pvr(),
      this.xvr(),
      this.CreateCharacterRenderConfig(),
      this.fOa();
  }
  static UpdateGroupConfigTickStrategy(e, t, i) {
    (e.ueGroupConfig.DisableActorTickStrategy = t),
      (e.ueGroupConfig.DisableActorTickDistance = i),
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
  static wvr(e, t) {
    var i = (0, puerts_1.$ref)(e);
    for (const n in t) {
      var o = t[n];
      "Default" === n
        ? (o ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Game", 25, "Missing default config!", [
                "GroupName",
                e.GroupName.toString(),
              ])),
          cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
            i,
            o.MaxInterval,
            o.TickReductionStartSize,
            o.TickReductionIntervalSize,
          ))
        : o &&
          cpp_1.FKuroGameBudgetAllocatorInterface.SetTickIntervalDetailConfig(
            i,
            o.GlobalMode,
            o.ActorMode,
            o.MaxInterval,
            o.TickReductionStartSize,
            o.TickReductionIntervalSize,
          );
    }
    cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e);
  }
  static Pvr() {
    var e =
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          30,
          1,
          1,
        ),
      t = new UE.GameBudgetAllocatorGroupConfig(),
      i =
        ((t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("IdleExecGroup")),
        (t.SignificanceGroup = 0),
        (t.TickPriority = IDLE_EXEC_PRIORITY),
        (this.Evr =
          new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(t)),
        (0, puerts_1.$ref)(t));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
      i,
      e.MaxInterval,
      e.TickReductionStartSize,
      e.TickReductionIntervalSize,
    ),
      cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
  }
  static uwa(e = !0) {
    var t = {
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
          200,
        ),
      Normal_Fighting:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          2,
          10,
          3e3,
          500,
        ),
      Fighting_Rendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          1,
          0,
          60,
          2e3,
          200,
        ),
      Fighting_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          1,
          1,
          120,
          1e3,
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
          5,
          3e3,
          500,
        ),
      Cutscene_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          2,
          1,
          10,
          2e3,
          200,
        ),
      Cutscene_Fighting:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          2,
          2,
          5,
          5e3,
          500,
        ),
    };
    return (
      e &&
        (((e = new UE.GameBudgetAllocatorGroupConfig()).GroupName =
          FNameUtil_1.FNameUtil.GetDynamicFName("BossEntity")),
        (e.SignificanceGroup = 3),
        (e.TickPriority = Boss_PRIORITY),
        (this._wa =
          new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e)),
        this.wvr(e, t)),
      t
    );
  }
  static Tvr(e = !0) {
    var t = {
      Default:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          60,
          2e3,
          200,
        ),
      Normal_Render:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          60,
          2e3,
          200,
        ),
      Normal_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          1,
          120,
          1e3,
          100,
        ),
      Normal_Fighting:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          2,
          60,
          3e3,
          300,
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
          20,
          2e3,
          300,
        ),
      Cutscene_Rendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          2,
          0,
          20,
          3500,
          500,
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
    return (
      e &&
        (((e = new UE.GameBudgetAllocatorGroupConfig()).GroupName =
          FNameUtil_1.FNameUtil.GetDynamicFName("CharacterEntity")),
        (e.SignificanceGroup = 2),
        (e.TickPriority = ROLE_PRIORITY),
        (this.gvr =
          new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e)),
        this.wvr(e, t)),
      t
    );
  }
  static jPa(e = !0) {
    var t = {
      Default:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          60,
          500,
          100,
        ),
      Normal_Render: void 0,
      Normal_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          1,
          240,
          500,
          50,
        ),
      Normal_Fighting: void 0,
      Fighting_Rendered: void 0,
      Fighting_NotRendered: void 0,
      Fighting_Fighting: void 0,
      Cutscene_Rendered: void 0,
      Cutscene_NotRendered:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          2,
          1,
          240,
          500,
          50,
        ),
    };
    return (
      e &&
        (((e = new UE.GameBudgetAllocatorGroupConfig()).GroupName =
          FNameUtil_1.FNameUtil.GetDynamicFName("NormalNpcEntity")),
        (e.SignificanceGroup = 2),
        (e.TickPriority = NPC_PRIORITY),
        (this.VPa =
          new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e)),
        this.wvr(e, t)),
      t
    );
  }
  static WPa(e = !0) {
    var t = {
      Default:
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          20,
          500,
          100,
        ),
      Normal_Render: void 0,
      Normal_NotRendered: void 0,
      Normal_Fighting: void 0,
      Fighting_Rendered: void 0,
      Fighting_NotRendered: void 0,
      Fighting_Fighting: void 0,
      Cutscene_Rendered: void 0,
      Cutscene_NotRendered: void 0,
    };
    return (
      e &&
        (((e = new UE.GameBudgetAllocatorGroupConfig()).GroupName =
          FNameUtil_1.FNameUtil.GetDynamicFName("SimpleNpcEntity")),
        (e.SignificanceGroup = 1),
        (e.TickPriority = SIMPLE_NPC_PRIORITY),
        (e.DisableActorTickStrategy = 1),
        (e.DisableActorTickDistance = 2e3),
        (this.HPa =
          new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e)),
        this.wvr(e, t)),
      t
    );
  }
  static Ivr() {
    var e = {
        Default:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            0,
            0,
            60,
            500,
            100,
          ),
        Normal_Render:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            0,
            0,
            60,
            500,
            100,
          ),
        Normal_NotRendered:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            0,
            1,
            1e3,
            500,
            10,
          ),
        Normal_Fighting: void 0,
        Fighting_Rendered: void 0,
        Fighting_NotRendered: void 0,
        Fighting_Fighting: void 0,
        Cutscene_Rendered: void 0,
        Cutscene_NotRendered:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            2,
            1,
            1e3,
            500,
            10,
          ),
      },
      t = new UE.GameBudgetAllocatorGroupConfig();
    (t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("NormalEntity")),
      (t.SignificanceGroup = 1),
      (t.TickPriority = OTHER_PRIORITY),
      (this.Cvr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
        t,
      )),
      this.wvr(t, e);
  }
  static Lvr() {
    var e =
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          1,
          1,
          1,
        ),
      t = new UE.GameBudgetAllocatorGroupConfig(),
      i =
        ((t.GroupName =
          FNameUtil_1.FNameUtil.GetDynamicFName("FightEffectGroup")),
        (t.SignificanceGroup = 4),
        (t.TickPriority = FIGHT_EFFECT_PRIPRITY),
        (t.DisableActorTickStrategy = 1),
        (t.DisableActorTickDistance = exports.EFFECT_ENABLE_RANGE),
        (this.fvr =
          new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(t)),
        (0, puerts_1.$ref)(t));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
      i,
      e.MaxInterval,
      e.TickReductionStartSize,
      e.TickReductionIntervalSize,
    ),
      cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
  }
  static Dvr() {
    var e = {
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
        Normal_Fighting: void 0,
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
        Fighting_Fighting: void 0,
        Cutscene_Rendered:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            2,
            0,
            20,
            4500,
            500,
          ),
        Cutscene_NotRendered:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            2,
            1,
            120,
            1e3,
            100,
          ),
      },
      t = new UE.GameBudgetAllocatorGroupConfig();
    (t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("EffectGroup")),
      (t.SignificanceGroup = 2),
      (t.TickPriority = OTHER_PRIORITY),
      (t.DisableActorTickStrategy = 1),
      (t.DisableActorTickDistance = exports.EFFECT_ENABLE_RANGE),
      (this.pvr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
        t,
      )),
      this.wvr(t, e);
  }
  static DJs() {
    var e = {
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
        Normal_Fighting: void 0,
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
            5,
            6e4,
            5e3,
          ),
        Cutscene_NotRendered:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            2,
            1,
            300,
            1e4,
            1e3,
          ),
      },
      t = new UE.GameBudgetAllocatorGroupConfig();
    (t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName(
      "EffectImportanceGroup",
    )),
      (t.SignificanceGroup = 3),
      (t.TickPriority = OTHER_PRIORITY),
      (t.DisableActorTickStrategy = 1),
      (t.DisableActorTickDistance = EFFECT_IMPORTANCE_ENABLE_MAX_RANGE),
      (this.AJs = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
        t,
      )),
      this.wvr(t, e);
  }
  static zia() {
    var e = {
        Default:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            0,
            0,
            10,
            1,
            1,
          ),
        Normal_Render: void 0,
        Normal_NotRendered: void 0,
        Normal_Fighting: void 0,
        Fighting_Rendered: void 0,
        Fighting_NotRendered: void 0,
        Fighting_Fighting: void 0,
        Cutscene_Rendered: void 0,
        Cutscene_NotRendered: void 0,
      },
      t = new UE.GameBudgetAllocatorGroupConfig();
    (t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("CustomStabilizeLow")),
      (t.SignificanceGroup = 1),
      (t.TickPriority = OTHER_PRIORITY),
      (t.DisableActorTickStrategy = 0),
      (this.Jia = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
        t,
      )),
      this.wvr(t, e);
  }
  static Z9a() {
    var e = {
        Default:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            0,
            0,
            1,
            1,
            1,
          ),
        Normal_Render: void 0,
        Normal_NotRendered: void 0,
        Normal_Fighting: void 0,
        Fighting_Rendered: void 0,
        Fighting_NotRendered: void 0,
        Fighting_Fighting: void 0,
        Cutscene_Rendered: void 0,
        Cutscene_NotRendered: void 0,
      },
      t = new UE.GameBudgetAllocatorGroupConfig();
    (t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("AlwaysTickHotFix")),
      (t.SignificanceGroup = 3),
      (t.TickPriority = OTHER_PRIORITY),
      (t.DisableActorTickStrategy = 0),
      (this.J9a = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
        t,
      )),
      this.wvr(t, e);
  }
  static Rvr() {
    var e =
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          1,
          1,
          1,
        ),
      t = new UE.GameBudgetAllocatorGroupConfig(),
      i =
        ((t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName(
          "PlayerAlwaysTickGroup",
        )),
        (t.SignificanceGroup = 4),
        (t.TickPriority = PLAYER_ALWAYS_TICK_PRIORITY),
        (this.Mvr =
          new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(t)),
        (0, puerts_1.$ref)(t));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
      i,
      e.MaxInterval,
      e.TickReductionStartSize,
      e.TickReductionIntervalSize,
    ),
      cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
  }
  static Uvr() {
    var e =
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          1,
          1,
          1,
        ),
      t = new UE.GameBudgetAllocatorGroupConfig(),
      i =
        ((t.GroupName =
          FNameUtil_1.FNameUtil.GetDynamicFName("AlwaysTickGroup")),
        (t.SignificanceGroup = 4),
        (t.TickPriority = ALWAYS_TICK_PRIORITY),
        (this.vvr =
          new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(t)),
        (0, puerts_1.$ref)(t));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
      i,
      e.MaxInterval,
      e.TickReductionStartSize,
      e.TickReductionIntervalSize,
    ),
      cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
  }
  static Avr() {
    var e =
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          1,
          1,
          1,
        ),
      t = new UE.GameBudgetAllocatorGroupConfig(),
      i =
        ((t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName(
          "CameraAlwaysTickGroup",
        )),
        (t.SignificanceGroup = 4),
        (t.TickPriority = ALWAYS_TICK_2_PRIORITY),
        (this.Svr =
          new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(t)),
        (0, puerts_1.$ref)(t));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
      i,
      e.MaxInterval,
      e.TickReductionStartSize,
      e.TickReductionIntervalSize,
    ),
      cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
  }
  static xvr() {
    var e =
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          5,
          2e3,
          300,
        ),
      t = new UE.GameBudgetAllocatorGroupConfig(),
      i =
        ((t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("HUDGroup")),
        (t.SignificanceGroup = 2),
        (t.TickPriority = HUD_PRIORITY),
        (t.DisableActorTickStrategy = 1),
        (t.DisableActorTickDistance = HUD_ENABLE_RANGE),
        (this.yvr =
          new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(t)),
        (0, puerts_1.$ref)(t));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
      i,
      e.MaxInterval,
      e.TickReductionStartSize,
      e.TickReductionIntervalSize,
    ),
      cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
  }
  static fOa() {
    var e =
        new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
          0,
          0,
          5,
          2e3,
          300,
        ),
      t = new UE.GameBudgetAllocatorGroupConfig(),
      i =
        ((t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName(
          "BattleHeadViewGroup",
        )),
        (t.SignificanceGroup = 2),
        (t.TickPriority = BATTLE_HEAD_STATE_VIEW_PRIORITY),
        (t.DisableActorTickStrategy = 1),
        (t.DisableActorTickDistance = BATTLE_HEAD_STATE_VIEW_RANGE),
        (this.pOa =
          new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(t)),
        (0, puerts_1.$ref)(t));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(
      i,
      e.MaxInterval,
      e.TickReductionStartSize,
      e.TickReductionIntervalSize,
    ),
      cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
  }
  static CreateCharacterRenderConfig() {
    var e = {
        Default:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            0,
            0,
            60,
            5e3,
            500,
          ),
        Normal_Render:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            0,
            0,
            60,
            5e3,
            500,
          ),
        Normal_NotRendered:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            0,
            1,
            300,
            500,
            100,
          ),
        Normal_Fighting: void 0,
        Fighting_Rendered:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            1,
            0,
            60,
            3e3,
            300,
          ),
        Fighting_NotRendered:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            1,
            1,
            300,
            300,
            100,
          ),
        Fighting_Fighting:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            1,
            2,
            60,
            1e4,
            500,
          ),
        Cutscene_Rendered:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            2,
            0,
            5,
            1e4,
            1e3,
          ),
        Cutscene_NotRendered:
          new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
            2,
            1,
            300,
            300,
            100,
          ),
      },
      t = new UE.GameBudgetAllocatorGroupConfig();
    (t.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName(
      "CharacterRenderGroup",
    )),
      (t.SignificanceGroup = 3),
      (t.TickPriority = Boss_PRIORITY),
      (t.DisableActorTickStrategy = 1),
      (t.DisableActorTickDistance = CHARCTER_RENDER_ENABLE_MAX_RANGE),
      (this.iNa = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(
        t,
      )),
      this.wvr(t, e);
  }
  static GetEffectDynamicGroup(e) {
    var t, i, o, n, a, r, g, _, l, d, c, s;
    return e >= exports.EFFECT_IMPORTANCE_ENABLE_RANGE
      ? this.TsEffectInportanceGroupConfig
      : this.TsEffectDynamicGroupConfigMap.get(e) ||
          (0,
          (c = (e - (d = 0.2 * e)) / 179),
          (a = (e - (t = 0.8 * e)) / 59),
          (r = (e - (s = 0.2 * e)) / 299),
          (g = (e - (i = 0.2 * e)) / 299),
          (_ = (e - (o = 0.1 * e)) / 599),
          (l = (e - (n = 0.4 * e)) / 119),
          (d = {
            Default:
              new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
                0,
                0,
                180,
                d,
                c,
              ),
            Normal_Render:
              new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
                0,
                0,
                60,
                t,
                a,
              ),
            Normal_NotRendered:
              new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
                0,
                1,
                300,
                s,
                r,
              ),
            Normal_Fighting: void 0,
            Fighting_Rendered:
              new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
                1,
                0,
                300,
                i,
                g,
              ),
            Fighting_NotRendered:
              new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
                1,
                1,
                600,
                o,
                _,
              ),
            Fighting_Fighting: void 0,
            Cutscene_Rendered:
              new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
                2,
                0,
                5,
                t,
                a,
              ),
            Cutscene_NotRendered:
              new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(
                2,
                1,
                120,
                n,
                l,
              ),
          }),
          ((c = new UE.GameBudgetAllocatorGroupConfig()).GroupName =
            FNameUtil_1.FNameUtil.GetDynamicFName("EffectGroup_" + e)),
          (c.SignificanceGroup = 2),
          (c.TickPriority = OTHER_PRIORITY),
          (c.DisableActorTickStrategy = 1),
          (c.DisableActorTickDistance = e),
          (s = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(c)),
          this.TsEffectDynamicGroupConfigMap.set(e, s),
          this.wvr(c, d),
          s);
  }
}
(exports.GameBudgetAllocatorConfigCreator =
  GameBudgetAllocatorConfigCreator).TsEffectDynamicGroupConfigMap = new Map();
//# sourceMappingURL=GameBudgetAllocatorConfigCreator.js.map
