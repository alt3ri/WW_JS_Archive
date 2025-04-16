"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingQteRingItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  LevelSequencePlayer_1 = require("../../../../Module/Common/LevelSequencePlayer"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  FishingQteDefine_1 = require("../../FishingQteDefine"),
  FishingQteRingBgItem_1 = require("./Ring/FishingQteRingBgItem"),
  FishingQteRingQteItem_1 = require("./Ring/FishingQteRingQteItem"),
  YAW_MAX_ANGLE = 2 * FishingQteDefine_1.FISHINGQTE_RING_ANGLE;
class FishingQteRingItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RingConfig = void 0),
      (this.GameInfo = void 0),
      (this.RingInfo = void 0),
      (this.RingBg = void 0),
      (this.RingQte = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.Yrn = void 0),
      (this.cce = Rotator_1.Rotator.Create()),
      (this.XZh = 0),
      (this.YZh = 0),
      (this.PeriodAlphaTotalTime = 0),
      (this.PeriodAlphaCurrentTime = 0),
      (this.RotateMode = 0);
  }
  Init(i, t) {
    (this.GameInfo = t),
      (this.RingConfig = i),
      (this.RingInfo = t.GetRingInfo());
    i =
      2 * this.RingConfig.HiddenInterval[0] + this.RingConfig.HiddenInterval[1];
    0 < i && (this.PeriodAlphaTotalTime = i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UITexture],
    ];
  }
  async OnBeforeStartAsync() {
    var i = [],
      t = this.GetItem(1),
      t =
        ((this.RingBg = new FishingQteRingBgItem_1.FishingQteRingBgItem(
          this.RingInfo,
          this.RingConfig,
        )),
        i.push(this.RingBg.CreateThenShowByActorAsync(t.GetOwner())),
        this.GetItem(2));
    (this.RingQte = new FishingQteRingQteItem_1.FishingQteRingQteItem(
      this.GameInfo,
      this.RingInfo,
      this.RingConfig,
    )),
      i.push(this.RingQte.CreateThenShowByActorAsync(t.GetOwner())),
      (this.Yrn = this.GetItem(0)),
      this.Yrn.SetUIRelativeRotation(Rotator_1.Rotator.Create().ToUeRotator()),
      await Promise.all(i);
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    );
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer?.Clear(), (this.LevelSequencePlayer = void 0);
  }
  InitRing() {
    this.RingInfo.ClearValidAreas(),
      this.RingBg.SpawnBgArea(),
      this.RingQte.InitAllQteAreas();
    var i = this.GameInfo.CursorSpeed,
      t = this.GameInfo.RingSpeed;
    0 < i && 0 < t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SceneGameplay",
          37,
          "[FishingQte] 速度配置错误,同时存在指针速度和转盘速度",
        )
      : this.Ot_(0 < i ? 0 : 1);
  }
  OnAreaClick(i, t) {
    switch (i) {
      case 0:
        this.RingBg.PlayAnim("Fail"), this.RingQte.PlayAnim("Fail");
        break;
      case 1:
        this.RingQte.PlayAnim("Success"), (this.PeriodAlphaCurrentTime = 0);
        break;
      case 2:
        this.RingQte.PlayAnim("PerfectQte"), (this.PeriodAlphaCurrentTime = 0);
    }
  }
  OnArrowStayAreaUpdate(i) {
    var t = this.RingInfo.GetValidAreas();
    if (!(i < 0 || i >= t.length)) {
      t = t[i];
      switch (
        ((this.XZh =
          -Math.max(t.StartCellIndex - 1, 0) *
          FishingQteDefine_1.FISHINGQTE_SINGLECELL_ANGLE),
        (this.YZh =
          -t.EndCellIndex * FishingQteDefine_1.FISHINGQTE_SINGLECELL_ANGLE),
        this.YZh >= this.XZh && (this.YZh -= 360),
        t.ArrowDirection)
      ) {
        case 0:
          this.cce.Yaw = this.XZh;
          break;
        case 1:
          this.cce.Yaw = this.YZh;
      }
      this.Yrn?.SetUIRelativeRotation(this.cce.ToUeRotator());
    }
  }
  OnTick(i) {
    if (!this.GameInfo.IsGamePause()) {
      var t = this.GameInfo.CursorSpeed,
        e = this.GameInfo.RingSpeed,
        t = 0 === this.RotateMode ? t : e,
        e = 0 === this.RingInfo.ArrowDirection ? -1 : 1,
        s = i / CommonDefine_1.MILLIONSECOND_PER_SECOND;
      switch (((this.cce.Yaw = this.Gt_(e, t, s)), this.RotateMode)) {
        case 0:
          this.Yrn?.SetUIRelativeRotation(this.cce.ToUeRotator()),
            (this.RingInfo.CurrentArrowStayCellIndex = this.Ft_());
          break;
        case 1:
          this.RingQte.GetRootItem().SetUIRelativeRotation(
            this.cce.ToUeRotator(),
          ),
            (this.RingInfo.CurrentArrowStayCellIndex =
              FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT - this.Ft_() + 1);
      }
      if (0 < this.PeriodAlphaTotalTime) {
        var h = this.Nt_(this.PeriodAlphaCurrentTime);
        for (const n of this.RingInfo.GetQteAreas().keys())
          this.RingQte.GetQteAreaTexture(n).SetAlpha(h);
        for (const r of this.RingInfo.GetPerfectAreas().keys())
          this.RingQte.GetPerfectAreaTexture(r).SetAlpha(h);
        (this.PeriodAlphaCurrentTime += i),
          this.PeriodAlphaCurrentTime >= this.PeriodAlphaTotalTime &&
            (this.PeriodAlphaCurrentTime = 0);
      }
    }
  }
  Gt_(i, t, e) {
    let s = this.cce.Yaw;
    return (
      this.RingInfo.IsWholeRing
        ? (s += i * (t * e))
        : ((s += i * (t * e)) < this.YZh &&
            ((s = this.YZh + 1), this.RingInfo.OnArrowDirectionReverse()),
          s > this.XZh &&
            ((s = this.XZh), this.RingInfo.OnArrowDirectionReverse())),
      0 < s && (s -= FishingQteDefine_1.FISHINGQTE_RING_ANGLE),
      s % YAW_MAX_ANGLE
    );
  }
  Ft_() {
    var i = Math.abs(this.cce.Yaw) % FishingQteDefine_1.FISHINGQTE_RING_ANGLE;
    return Math.floor(i / FishingQteDefine_1.FISHINGQTE_SINGLECELL_ANGLE) + 1;
  }
  Nt_(i) {
    var t = this.RingConfig.HiddenInterval[0],
      e = this.RingConfig.HiddenInterval[1],
      s = this.RingConfig.HiddenInterval[2],
      h = (e - s) / 2;
    return i < t
      ? 1
      : i < t + h
        ? 1 - (i - t) / h
        : i < t + h + s
          ? 0
          : i < t + e
            ? (i - t - h - s) / h
            : 1;
  }
  Ot_(i) {
    switch (((this.RotateMode = i), this.RotateMode)) {
      case 0:
        break;
      case 1:
        var t =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "T_ControlPointLock",
          );
        this.SetTextureByPath(t, this.GetTexture(3)),
          this.RingQte.GetRootItem().SetUIRelativeRotation(
            Rotator_1.Rotator.Create().ToUeRotator(),
          );
    }
  }
  SpawnContinuousArea(i, t = 1) {
    this.RingQte.SpawnContinuousArea(i, t);
  }
}
exports.FishingQteRingItem = FishingQteRingItem;
//# sourceMappingURL=FishingQteRingItem.js.map
