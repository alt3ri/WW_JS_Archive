"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ContinuousRingArea =
    exports.RingArea =
    exports.FishingQteRingInfo =
    exports.FishingQteGameInfo =
    exports.fixedCellIndex =
    exports.calculateCellSize =
    exports.FISHINGQTE_SINGLECELL_ANGLE =
    exports.FISHINGQTE_RING_ANGLE =
    exports.FISHINGQTE_RINGCELLCOUNT =
      void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
function calculateCellSize(e, t) {
  return e <= t ? t - e + 1 : exports.FISHINGQTE_RINGCELLCOUNT - e + t + 1;
}
function fixedCellIndex(e) {
  var t;
  return e > exports.FISHINGQTE_RINGCELLCOUNT
    ? 0 == (t = e % exports.FISHINGQTE_RINGCELLCOUNT)
      ? exports.FISHINGQTE_RINGCELLCOUNT
      : t
    : e <= 0
      ? e + exports.FISHINGQTE_RINGCELLCOUNT
      : e;
}
(exports.FISHINGQTE_RINGCELLCOUNT = 36),
  (exports.FISHINGQTE_RING_ANGLE = 360),
  (exports.FISHINGQTE_SINGLECELL_ANGLE =
    exports.FISHINGQTE_RING_ANGLE / exports.FISHINGQTE_RINGCELLCOUNT),
  (exports.calculateCellSize = calculateCellSize),
  (exports.fixedCellIndex = fixedCellIndex);
class FishingQteGameInfo {
  constructor() {
    (this.Ebl = void 0),
      (this.afl = 0),
      (this.CurrentScore = 0),
      (this.CurrentRound = 0),
      (this.MaxRound = 0),
      (this.CursorSpeed = 0),
      (this.RingSpeed = 0),
      (this.PerfectAppearRate = 0);
  }
  CreateRingInfo(e) {
    this.Ebl = new FishingQteRingInfo(e);
  }
  GetRingInfo() {
    return this.Ebl;
  }
  Clear() {
    this.Ebl?.Clear(),
      (this.Ebl = void 0),
      (this.afl = 0),
      (this.CurrentScore = 0),
      (this.CurrentRound = 0),
      (this.MaxRound = 0);
  }
  SetGameStage(e) {
    (this.afl = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnFishingQteStageUpdate,
        this.afl,
      );
  }
  GetGameStage() {
    return this.afl;
  }
  IsGamePause() {
    return 2 !== this.afl;
  }
  IsGameEnd() {
    return 4 <= this.afl;
  }
}
exports.FishingQteGameInfo = FishingQteGameInfo;
class FishingQteRingInfo {
  constructor(e) {
    (this.ArrowDirection = e),
      (this.CurrentArrowStayRelativeValidAreaIndex = -1),
      (this.CurrentArrowStayCellIndex = 0),
      (this.ValidAreas = []),
      (this.ft_ = new Map()),
      (this.Mbl = new Map()),
      (this.IsWholeRing = !0);
  }
  Clear() {
    (this.ValidAreas.length = 0), this.ft_.clear();
  }
  GetValidAreas() {
    return this.ValidAreas;
  }
  AddValidArea(e, t) {
    this.ValidAreas.push(new RingArea(e, t, this.ArrowDirection));
  }
  ClearValidAreas() {
    this.ValidAreas.length = 0;
  }
  GetQteAreas() {
    return this.ft_;
  }
  GetQteArea(e) {
    return this.ft_.get(e);
  }
  AddQteArea(e, t, s) {
    this.ft_.set(e, new ContinuousRingArea(e, t, s, this.ArrowDirection)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneGameplay",
          37,
          "[FishingQte] AddQteArea",
          ["Index", e],
          ["Start", t],
          ["End", s],
        );
  }
  RemoveQteArea(e) {
    this.ft_.delete(e);
  }
  GetPerfectAreas() {
    return this.Mbl;
  }
  GetPerfectArea(e) {
    return this.Mbl.get(e);
  }
  AddPerfectArea(e, t, s) {
    this.Mbl.set(e, new ContinuousRingArea(e, t, s, this.ArrowDirection)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneGameplay",
          37,
          "[FishingQte] AddPerfectArea",
          ["Index", e],
          ["Start", t],
          ["End", s],
        );
  }
  RemovePerfectArea(e) {
    this.Mbl.delete(e);
  }
  CheckInArea(e, t) {
    for (var [, s] of e) {
      var i = s.StartCellIndex,
        r = s.EndCellIndex;
      if (i <= r) {
        if (i <= t && t <= r) return s;
      } else if (
        (i <= t && t <= exports.FISHINGQTE_RINGCELLCOUNT) ||
        (1 <= t && t <= r)
      )
        return s;
    }
  }
  EnterNextValidArea() {
    var e = this.ValidAreas.length;
    if (e) {
      switch (this.ArrowDirection) {
        case 0:
          this.CurrentArrowStayRelativeValidAreaIndex++;
          break;
        case 1:
          this.CurrentArrowStayRelativeValidAreaIndex--;
      }
      this.CurrentArrowStayRelativeValidAreaIndex >= e
        ? (this.CurrentArrowStayRelativeValidAreaIndex = 0)
        : this.CurrentArrowStayRelativeValidAreaIndex < 0 &&
          (this.CurrentArrowStayRelativeValidAreaIndex = e - 1),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnFishingQteAreaChange,
          this.CurrentArrowStayRelativeValidAreaIndex,
        );
    }
  }
  OnArrowDirectionReverse() {
    switch (this.ArrowDirection) {
      case 0:
        this.ArrowDirection = 1;
        break;
      case 1:
        this.ArrowDirection = 0;
    }
    for (const t of this.ValidAreas) t.OnArrowDirectionReverse();
    for (var [, e] of this.ft_) e.OnArrowDirectionReverse();
  }
}
exports.FishingQteRingInfo = FishingQteRingInfo;
class RingArea {
  constructor(e, t, s) {
    (this.StartCellIndex = e),
      (this.EndCellIndex = t),
      (this.ArrowDirection = s);
  }
  OnArrowDirectionReverse() {
    switch (this.ArrowDirection) {
      case 0:
        this.ArrowDirection = 1;
        break;
      case 1:
        this.ArrowDirection = 0;
    }
  }
}
class ContinuousRingArea extends (exports.RingArea = RingArea) {
  constructor(e, t, s, i) {
    super(t, s, i),
      (this.ContinuousIndex = e),
      (this.StartCellIndex = t),
      (this.EndCellIndex = s),
      (this.ArrowDirection = i);
  }
}
exports.ContinuousRingArea = ContinuousRingArea;
//# sourceMappingURL=FishingQteDefine.js.map
