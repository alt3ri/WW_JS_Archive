"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueGameInfo =
    exports.popupModelBaseGenerator =
    exports.MapGridData =
      void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  GridPathFinder_1 = require("./Utils/GridPathFinder/GridPathFinder"),
  GridPopupView_1 = require("./View/Popup/GridPopupView"),
  GridPopupViewModelBattle_1 = require("./View/Popup/GridPopupViewModelBattle"),
  GridPopupViewModelBlank_1 = require("./View/Popup/GridPopupViewModelBlank"),
  GridPopupViewModelBoss_1 = require("./View/Popup/GridPopupViewModelBoss"),
  GridPopupViewModelEvent_1 = require("./View/Popup/GridPopupViewModelEvent"),
  TYPE_EVENT_WEIGHT = 1e6;
function gridLocationToIndex(t, i, s) {
  return i * s + t;
}
function indexToGridLocation(t, i) {
  return { X: t % i, Y: Math.floor(t / i) };
}
function parseNumbers(t, i = "#") {
  t = t.split(i).map((t) => {
    t = Number(t);
    return isNaN(t) ? void 0 : t;
  });
  return t.some((t) => void 0 === t) ? [] : t;
}
function inAxisAlignedDiamond([t, i], s) {
  return (
    Math.abs(t - s.CenterX) / s.RadiusX + Math.abs(i - s.CenterY) / s.RadiusY <=
    1
  );
}
class MapGridData {
  constructor() {
    (this.GridId = 0),
      (this.GridIndex = 0),
      (this.GridTypeId = 0),
      (this.GroundPathIndex = 0),
      (this.ExtraPathIndex = -1),
      (this.GridEventId = 0),
      (this.GridEventType = 0),
      (this.EventType = -1),
      (this.Cost = 1),
      (this.WalkCost = 0),
      (this.EventCost = 0),
      (this.IsExplore = !1),
      (this.HasVision = !1),
      (this.IsBlock = !1),
      (this.Walkable = !0),
      (this.Lv = 0),
      (this.OccupiedEffectIdList = []),
      (this.RewardItemIdList = []),
      (this.ConditionInfo = void 0);
  }
  RefreshByServer(t) {
    (this.GridId = t.v9n),
      (this.WalkCost = t.N2s),
      (this.EventCost = t.wh1),
      (this.IsExplore = t.Tac),
      (this.HasVision = t.bac),
      (this.IsBlock = t._Bc),
      (this.Walkable = t.bac && !t._Bc),
      (this.GridTypeId = t.cBc),
      (this.GridEventId = t.J2s),
      (this.Lv = t.Ir1),
      (this.OccupiedEffectIdList = t.Tr1),
      (this.RewardItemIdList = t._v1),
      (this.ConditionInfo = t.cv1);
    t = ConfigManager_1.ConfigManager.MapRogueConfig.GetGridEventConfigById(
      this.GridEventId,
    );
    (this.EventType = t?.EventType ?? -1),
      (this.GridEventType = t?.ShowType ?? 0),
      (this.Cost = this.HasEvent() ? TYPE_EVENT_WEIGHT : 1);
  }
  HasEvent(t = this.HasVision) {
    return !!t && !this.IsExplore && 0 !== this.GridEventId;
  }
  IsValid() {
    return 0 !== this.GridId;
  }
  NeedTriggerEvent() {
    return !this.IsExplore && 0 !== this.GridEventId;
  }
  IsUnlock() {
    return (
      !this.ConditionInfo ||
      0 === this.ConditionInfo.s5n ||
      this.ConditionInfo.lMs >= this.ConditionInfo.j6n
    );
  }
}
exports.MapGridData = MapGridData;
const popupType2ModelBaseType = {
  [0]: GridPopupViewModelBlank_1.GridPopupViewModelBlank,
  1: GridPopupViewModelEvent_1.GridPopupViewModelEvent,
  2: GridPopupViewModelBattle_1.GridPopupViewModelBattle,
  3: GridPopupViewModelBoss_1.GridPopupViewModelBoss,
};
function popupModelBaseGenerator(t, i) {
  t = new popupType2ModelBaseType[t.GridEventType](t, i);
  return new GridPopupView_1.GridPopupView(t);
}
exports.popupModelBaseGenerator = popupModelBaseGenerator;
class MapRogueGameInfo {
  constructor() {
    (this.InstanceId = 0),
      (this.RandomSeed = 0),
      (this.Yzt = void 0),
      (this.zGc = void 0),
      (this.JGc = 0),
      (this.CurHoverIndex = -1),
      (this.CurSelectedIndex = -1),
      (this.x11 = 0),
      (this.MapGrids = []),
      (this.MapWidth = 0),
      (this.MapHeight = 0),
      (this.Center = { X: 0, Y: 0 }),
      (this.kr1 =
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "MapRogueRoleMoveSpeed",
        ) ?? 100),
      (this.AI1 =
        ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().FocusTime),
      (this.Or1 = 1),
      (this.xM1 = 1),
      (this.U11 = !1),
      (this.Qf1 =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "MapRogueLvItemId",
        ) ?? 0),
      (this.ACr = new Set()),
      (this.MS1 = new Set()),
      (this.PI1 = new Set()),
      (this.Path = []),
      (this.MoodMin = 0),
      (this.MoodMax = 0),
      (this.ZGc = 0),
      (this.gm1 = 0),
      (this.MoodItemId =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "MapRogueMoodItemId",
        ) ?? 0),
      (this.CurOp = void 0),
      (this.e2c = 0),
      (this.qr1 = 0),
      (this.Gr1 = 0),
      (this.Cm1 = []),
      (this.TriggerGuideEventOnFocusStart = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RogueMapMoveTweenStarOrEnd,
          !0,
        );
      }),
      (this.TriggerGuideEventOnFocusEnd = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RogueMapMoveTweenStarOrEnd,
          !1,
        );
      });
  }
  get TeamLv() {
    return this.Or1;
  }
  SetTeamLv(t, i) {
    var s = t - this.Or1;
    (this.Or1 = t),
      this.Yzt?.RefreshTeamLv(),
      i &&
        ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().ShowLvChangeEventType.includes(
          i,
        ) &&
        this.PushGetItemData(this.Qf1, s);
  }
  get TeamLvAnim() {
    var t = this.xM1;
    return (this.xM1 = this.Or1), t;
  }
  get InBattle() {
    return this.U11;
  }
  set InBattle(t) {
    this.U11 = t;
  }
  get PlayerGridIndex() {
    return this.x11;
  }
  set PlayerGridIndex(t) {
    (this.x11 = t),
      this.Yzt?.MapModule?.SetRolePos(this.PlayerGridIndex),
      this.ES1(this.PlayerGridIndex);
  }
  get CenterIndex() {
    return gridLocationToIndex(this.Center.X, this.Center.Y, this.MapWidth);
  }
  GetGridPos(t) {
    return indexToGridLocation(t, this.MapWidth);
  }
  GetGridIndex(t, i) {
    return gridLocationToIndex(t, i, this.MapWidth);
  }
  Refresh(t) {
    (this.InstanceId = t.InstanceId),
      (this.RandomSeed = t.RandomSeed),
      (this.MapGrids = t.MapGrids),
      (this.MapWidth = t.MapWidth),
      (this.MapHeight = t.MapHeight),
      (this.Center.X = Math.floor(this.MapWidth / 2)),
      (this.Center.Y = Math.floor(this.MapHeight / 2)),
      (this.x11 = t.PlayerGridIndex),
      (this.Or1 = t.TeamLv),
      (this.xM1 = t.TeamLv),
      (this.U11 = t.InBattle),
      (this.gm1 = t.MoodRuleId),
      (this.MoodMin = t.MoodMin),
      (this.MoodMax = t.MoodMax),
      (this.ZGc = t.InitMood);
    t = { Matrix: this.MapGrids, Width: this.MapWidth, Height: this.MapHeight };
    this.zGc = new GridPathFinder_1.GridPathFinder(t);
  }
  Clear() {
    (this.CurHoverIndex = -1),
      (this.CurSelectedIndex = -1),
      (this.ZGc = 0),
      (this.MapGrids.length = 0),
      (this.Path.length = 0),
      (this.zGc = void 0),
      (this.Cm1.length = 0);
  }
  BindView(t) {
    (this.Yzt = t), this.ES1(this.PlayerGridIndex);
  }
  get HasBindView() {
    return void 0 !== this.Yzt;
  }
  get GameStage() {
    return this.JGc;
  }
  set GameStage(t) {
    if (this.GameStage !== t) {
      var i = this.GameStage;
      switch ((this.JGc = t)) {
        case 1:
          this.Yzt?.MapModule?.ResetAllPath(),
            this.Yzt?.MapModule?.SetMapGridBgState(this.CurSelectedIndex, !1),
            (this.CurSelectedIndex = -1),
            (this.CurHoverIndex = -1),
            this.DI1(),
            this.SetInteractAvailable(1, !0);
          break;
        case 2:
          this.SetInteractAvailable(1, !1);
          break;
        case 3:
          this.Yzt?.MapModule?.RolePanel.SetRoleAnim("Run"),
            this.Yzt?.MapModule?.RolePanel.SetRolePosItemVisible(!1);
      }
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RogueBattle",
          37,
          "[MapRogue] GameStageChange",
          ["CurStage", this.JGc],
          ["LastStage", i],
        ),
        this.Yzt?.ChangeGameStagePerformance(i, this.JGc);
    }
  }
  get IsStageAvailable() {
    return 1 === this.GameStage;
  }
  SetInteractAvailable(t, i) {
    i ? this.ACr.delete(t) : this.ACr.add(t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RogueBattle",
          37,
          "[MapRogue] SetInteractAvailable",
          ["Tag", t],
          ["TagAvailable", i],
          ["Available", 0 === this.ACr.size],
        ),
      this.Yzt?.SetInteractAvailable(0 === this.ACr.size);
  }
  get CanInteract() {
    return 0 === this.ACr.size;
  }
  RefreshGrid(t, i) {
    t = this.MapGrids[t];
    this.zGc?.UpdateGrid(t),
      this.Yzt?.MapModule?.RefreshMapGrid(t),
      i &&
        (this.Yzt?.RefreshProgress(), t.IsExplore) &&
        ((i =
          ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig()).GridTakeTipsEventType.includes(
          t.EventType,
        ) &&
          ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueTipsView(
            0,
            "RogueRes_Event_Rewards_1",
          ),
        i.GridTakeSpineEventType.includes(t.EventType)) &&
        this.Yzt?.MapModule?.RolePanel.SetRoleAnim("Cheer", !1);
  }
  SetGridVisionProxy(t, i) {
    this.Yzt?.MapModule?.SetMapGridBgVision(t, i);
  }
  SetMapGridBgStateProxy(t, i, s) {
    this.Yzt?.MapModule?.SetMapGridBgState(t, i, s);
  }
  CanGridCheck(t) {
    return this.MapGrids[t].Walkable && t !== this.PlayerGridIndex;
  }
  c2c(t) {
    return 0 <= t.X && t.X < this.MapWidth && 0 <= t.Y && t.Y < this.MapHeight;
  }
  IS1(t) {
    var i = new Set(),
      t = this.GetGridPos(t);
    for (const s of [
      { X: t.X - 1, Y: t.Y },
      { X: t.X - 1, Y: t.Y + 1 },
      { X: t.X, Y: t.Y + 1 },
    ])
      this.c2c(s) && i.add(this.GetGridIndex(s.X, s.Y));
    return i;
  }
  DI1() {
    for (const t of this.PI1) this.Yzt?.MapModule?.SetPerspectiveMode(t, !1);
    this.PI1.clear();
  }
  UI1(t) {
    var t = this.IS1(t),
      i = new Set([...t].filter((t) => this.PI1.has(t)));
    for (const s of this.PI1)
      i.has(s) || this.Yzt?.MapModule?.SetPerspectiveMode(s, !1);
    for (const e of t)
      i.has(e) || this.Yzt?.MapModule?.SetPerspectiveMode(e, !0);
    this.PI1 = t;
  }
  ES1(t) {
    var t = this.IS1(t),
      i = new Set([...t].filter((t) => this.MS1.has(t)));
    for (const s of this.MS1)
      i.has(s) || this.Yzt?.MapModule?.SetPerspectiveMode(s, !1);
    for (const e of t)
      i.has(e) || this.Yzt?.MapModule?.SetPerspectiveMode(e, !0);
    this.MS1 = t;
  }
  IsPosInGridRange(t, i, s) {
    s = this.Yzt?.MapModule?.GetGridRangeInfo(s);
    return !!s && inAxisAlignedDiamond([t, i], s);
  }
  FocusOnGrid(t, i = !0) {
    this.Yzt?.MapModule?.FocusOnGrid(t, i);
  }
  get MoveState() {
    return this.CurSelectedIndex < 0
      ? 1
      : this.MapGrids[this.CurSelectedIndex].Walkable
        ? this.MapGrids[this.CurSelectedIndex].IsUnlock()
          ? 0 === this.Path.length
            ? 2
            : this.pm1(this.Path)
              ? 3
              : 0
          : 5
        : 4;
  }
  pm1(i) {
    for (let t = 0; t < i.length - 1; t++)
      if (this.MapGrids[i[t]].NeedTriggerEvent()) return !0;
    return !1;
  }
  HoverOnTarget(t) {
    this.HasBindView &&
      (this.CanGridCheck(t)
        ? ((this.CurHoverIndex = t), this.UI1(this.CurHoverIndex), this.t2c(t))
        : ((this.CurHoverIndex = -1),
          this.Yzt?.MapModule?.SetInteractState(!1, !1),
          this.ResetAllPath(),
          this.DI1()));
  }
  UnHoverOnTarget(t) {
    this.IsStageAvailable &&
      this.CurHoverIndex === t &&
      (this.CurHoverIndex = -1);
  }
  BlankPlaneEnter() {
    this.Yzt?.MapModule?.SetInteractState(!1, !1),
      (this.CurHoverIndex = -1),
      this.ResetAllPath(),
      this.DI1();
  }
  t2c(t, i = this.PlayerGridIndex) {
    var s;
    !this.MapGrids[t].IsUnlock() ||
    ((i = this.GetGridPos(i)),
    (s = this.GetGridPos(t)),
    0 === (i = this.zGc.FindPath(i, s)).length)
      ? (this.ResetAllPath(),
        this.Yzt?.MapModule?.SetInteractState(!1, !0, t),
        this.Yzt?.MapModule?.SetMapGridMoveEnable(t, !1))
      : this.pm1(i)
        ? (this.ResetAllPath(),
          (this.Path = i),
          this.Yzt?.MapModule?.SetInteractState(!1, !0, t),
          this.Yzt?.MapModule?.SetMapGridMoveEnable(t, !1))
        : ((this.CurSelectedIndex = i[i.length - 1]),
          this.Yzt?.MapModule?.SetInteractState(!0, !0, t),
          this.Yzt?.MapModule?.SetMapGridMoveEnable(this.CurSelectedIndex, !0),
          this.Yzt?.MapModule?.CreateAllMapGridPath(this.Path, i),
          (this.Path = i),
          this.PreviewMoodValueByPath());
  }
  async CreateGridPathAsync(t) {
    (this.CurSelectedIndex = t[t.length - 1]),
      this.Yzt?.MapModule?.SetMapGridMoveEnable(this.CurSelectedIndex, !0),
      this.Yzt?.MapModule?.SetMapGridBgState(this.CurSelectedIndex, !0),
      this.Yzt?.MapModule?.FocusOnGrid(this.CurSelectedIndex, !0),
      await this.Yzt?.MapModule?.CreateAllMapGridPathAsync(this.Path, t),
      (this.Path = t),
      this.PreviewMoodValueByPath();
  }
  ResetAllPath() {
    for (const t of this.Path) this.i2c(t);
    (this.Path.length = 0), this.Yzt?.MoodBar?.ClosePreviewValue();
  }
  i2c(t) {
    this.Yzt?.MapModule?.ResetPath(t);
  }
  SetMood(t, i, s, e) {
    var h = t - this.ZGc;
    (this.ZGc = t),
      void 0 !== s &&
        void 0 !== e &&
        ((this.MoodMin = s),
        (this.MoodMax = e),
        this.Yzt?.MoodBar?.SetLimit(this.MoodMin, this.MoodMax)),
      this.Yzt?.MoodBar?.SetCurrentValue(t),
      i &&
        ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().ShowMoodChangeEventType.includes(
          i,
        ) &&
        this.PushGetItemData(this.MoodItemId, h);
  }
  get Mood() {
    return this.ZGc;
  }
  set MoodRuleId(t) {
    if (this.gm1 !== t) {
      this.gm1 = t;
      var i = ConfigManager_1.ConfigManager.MapRogueConfig.GetMoodRuleById(t);
      if (i)
        switch (
          (this.Yzt?.MoodBar?.SetMoodRuleId(t),
          this.Yzt?.RefreshMoodMusicState(),
          i.Type)
        ) {
          case 1:
            ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueTipsView(
              0,
              i.FloatTips,
            );
            break;
          case 2:
            ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueTipsView(
              1,
              i.FloatTips,
            );
        }
    }
  }
  get MoodRuleId() {
    return this.gm1;
  }
  PreviewMoodValueByPath() {
    let i = 0;
    for (let t = 1; t < this.Path.length; t++) {
      var s = this.MapGrids[this.Path[t]];
      i -= s.WalkCost;
    }
    this.Yzt?.MoodBar?.ShowPreviewValue(i);
  }
  OnTick(t) {
    3 === this.GameStage &&
      ((this.e2c += t),
      this.e2c < this.kr1
        ? ((t = this.e2c / this.kr1),
          this.Yzt?.MapModule?.SetRolePosByGrid(t, this.qr1, this.Gr1))
        : (this.Yzt?.MapModule?.SetRolePosByGrid(1, this.qr1, this.Gr1),
          this.CurOp?.Execute(this)));
  }
  OnCheck(t) {
    var i;
    this.IsStageAvailable &&
      ((this.CurSelectedIndex = t),
      1 === (i = this.MoveState) || 4 === i
        ? (this.CurSelectedIndex = -1)
        : (this.CurHoverIndex < 0 && this.t2c(t),
          this.Yzt?.MapModule?.FocusOnGrid(this.CurSelectedIndex),
          (this.GameStage = 2),
          (i = this.MapGrids[this.CurSelectedIndex]),
          this.Yzt?.OpenPopupView(i)));
  }
  OnMove(t = this.CurHoverIndex) {
    this.IsStageAvailable &&
      ((this.CurSelectedIndex = t),
      0 !== this.MoveState
        ? (this.CurSelectedIndex = -1)
        : (this.Yzt?.MapModule?.SetMapGridBgState(this.CurSelectedIndex, !0),
          this.RequestMove()));
  }
  RequestMove() {
    (this.GameStage = 2),
      ControllerHolder_1.ControllerHolder.MapRogueController.RequestMove(
        this.Path.slice(1),
        (t) => {
          t || (this.GameStage = 1);
        },
      );
  }
  MoveOneStep(t, i) {
    this.i2c(i),
      (this.e2c = 0),
      (this.qr1 = t),
      (this.Gr1 = i),
      this.Yzt?.MapModule?.RolePanel.SetRoleDirection(t < i),
      this.ES1(i);
  }
  EndMove() {
    (this.CurOp = void 0),
      (this.Path.length = 0),
      this.Yzt?.MapModule?.RolePanel.SetRoleAnim("Idle"),
      this.Yzt?.MapModule?.RolePanel.SetRolePosItemVisible(!0);
  }
  async TeleportFlow(t, i) {
    this.SetInteractAvailable(2, !1);
    for (const e of i) this.SetGridVisionProxy(e, !0);
    this.Yzt?.MapModule?.RolePanel.SetRolePosItemVisible(!1),
      await this.Yzt.MapModule.PlaySequence("Disappear"),
      this.Yzt?.MapModule?.SetRolePos(t),
      this.Yzt?.MapModule?.FocusOnGrid(t);
    const s = new CustomPromise_1.CustomPromise();
    TimerSystem_1.TimerSystem.Delay(() => {
      s.SetResult();
    }, this.AI1),
      await s.Promise,
      this.Yzt?.MapModule?.RolePanel.SetRolePosItemVisible(!0),
      this.ES1(t),
      await this.Yzt.MapModule.PlaySequence("Appear"),
      this.SetInteractAvailable(2, !0);
  }
  RoleAnimProxy(t, i = !0) {
    this.Yzt?.MapModule?.RolePanel.SetRoleAnim(t, i);
  }
  PushGetItemData(t, i) {
    0 !== i && this.Cm1.push({ ItemId: t, ChangeCount: i });
  }
  ShiftGetItemData() {
    return this.Cm1.shift();
  }
  IsGetItemDataEmpty() {
    return 0 === this.Cm1.length;
  }
  ExplorationCurrentProgress() {
    var t = ConfigManager_1.ConfigManager.MapRogueConfig.GetExploreByInstId(
      this.InstanceId,
    );
    if (!t) return 0;
    var i,
      s = new Map();
    for (const a of this.MapGrids)
      a.EventType <= 0 ||
        (a.IsExplore &&
          ((i = s.get(a.EventType) ?? 0), s.set(a.EventType, i + 1)));
    let e = 0,
      h = 0;
    for (const n of t.FinishCountType) {
      var [r, o] = parseNumbers(n),
        r = s.get(r) ?? 0;
      (e += r), (h += o);
    }
    return Math.ceil((e / h) * 100);
  }
  GetAllExplorationData() {
    var e = [],
      h = ConfigManager_1.ConfigManager.MapRogueConfig.GetExploreByInstId(
        this.InstanceId,
      );
    if (h) {
      let t = 0;
      var r,
        o = new Map(),
        a = h.ScoreMap;
      for (const g of this.MapGrids)
        g.EventType <= 0 ||
          (g.IsExplore &&
            ((r = o.get(g.EventType) ?? 0), o.set(g.EventType, r + 1)),
          (r = a.get(g.EventType)),
          g.IsExplore && r && (t += r));
      var n = { TitleId: "RogueResExplore_1", ValueTxt: t.toString() };
      e.push(n);
      let i = 0,
        s = 0;
      for (const _ of h.FinishCountType) {
        var [d, u] = parseNumbers(_),
          d = o.get(d) ?? 0;
        (i += d), (s += u);
      }
      n = Math.ceil((i / s) * 100);
      e.push({ TitleId: "RogueResExplore_2", ValueTxt: n + "%" });
      for (let t = 0; t < h.CountTypeA.length; t++) {
        var [p, l] = parseNumbers(h.CountTypeA[t]),
          p = o.get(p) ?? 0,
          p = { TitleId: h.DescA.at(t) ?? "", ValueTxt: p + "/" + l };
        e.push(p);
      }
      for (let t = 0; t < h.CountTypeB.length; t++) {
        var v = h.CountTypeB[t],
          v = o.get(v) ?? 0,
          v = { TitleId: h.DescB.at(t) ?? "", ValueTxt: v.toString() };
        e.push(v);
      }
    }
    return e;
  }
}
exports.MapRogueGameInfo = MapRogueGameInfo;
//# sourceMappingURL=MapRogueDefine.js.map
