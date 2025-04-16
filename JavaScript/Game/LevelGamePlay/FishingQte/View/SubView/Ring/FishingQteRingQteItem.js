"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingQteRingQteItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  LevelSequencePlayer_1 = require("../../../../../Module/Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../../../Module/Util/LguiUtil"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  FishingQteDefine_1 = require("../../../FishingQteDefine");
class FishingQteRingQteItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, i) {
    super(),
      (this.GameInfo = t),
      (this.RingInfo = e),
      (this.RingConfig = i),
      (this.$t_ = void 0),
      (this.y7_ = new Map()),
      (this.Qfl = new Map()),
      (this.jfl = []);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    (this.$t_ = this.GetItem(0)), this.$t_.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    (this.$t_ = void 0),
      this.y7_.clear(),
      this.Qfl.clear(),
      (this.jfl.length = 0);
  }
  Yt_(t) {
    let e = 3;
    return (e = 2 === t.length ? this.rvl(t[0], t[1]) : e);
  }
  rvl(t, e) {
    return Math.min(
      e,
      Math.floor(MathUtils_1.MathUtils.GetRandomRange(t, e + 1)),
    );
  }
  ResetArea(t, e) {
    switch (e) {
      case 1:
        this.RingInfo.RemoveQteArea(t);
        var i = this.y7_.get(t);
        i && (i.SetUiActive(!1), this.jfl.push(i), this.y7_.delete(t));
        break;
      case 2:
        this.RingInfo.RemovePerfectArea(t);
        i = this.Qfl.get(t);
        i && (i.SetUiActive(!1), this.jfl.push(i), this.Qfl.delete(t));
    }
  }
  ResetAreaInLink(t, e) {
    switch (e) {
      case 1:
        this.ResetArea(t, 1), this.Qfl.has(t) && this.ResetArea(t, 2);
        break;
      case 2:
        this.ResetArea(t, 2), this.ResetArea(t, 1);
    }
  }
  ResetAllArea() {
    for (const t of this.y7_.keys()) this.ResetArea(t, 1);
    for (const e of this.Qfl.keys()) this.ResetArea(e, 2);
  }
  async zt_(t, e, i, s) {
    let h = this.jfl.pop();
    h ||
      ((h = new FishingQteRingQteSingleItem()),
      (n = LguiUtil_1.LguiUtil.CopyItem(this.$t_, this.RootItem)),
      await h.CreateByActorAsync(n.GetOwner()));
    var r = (0, FishingQteDefine_1.fixedCellIndex)(i),
      a = (0, FishingQteDefine_1.fixedCellIndex)(r + s - 1),
      n = (r - 1) * FishingQteDefine_1.FISHINGQTE_SINGLECELL_ANGLE;
    switch (
      (h.SetRotation(-n),
      h.SetFill(s / FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT),
      h.SetType(e),
      e)
    ) {
      case 1:
        this.RingInfo.AddQteArea(t, r, a), this.y7_.set(t, h);
        break;
      case 2:
        this.RingInfo.AddPerfectArea(t, r, a),
          this.Qfl.set(t, h),
          h.GetRootItem().SetAsLastHierarchy();
    }
    h.SetUiActive(!0);
  }
  async S7_(e, i, s) {
    if (
      (await this.zt_(e, 1, i, s),
      this.rvl(0, 100) <= this.GameInfo.PerfectAppearRate)
    ) {
      var s = Math.min(s, this.RingConfig.PerfectSize),
        h = i,
        r = (i + s) % FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT;
      let t = i;
      (t =
        h <= r
          ? this.rvl(h, r - s + 1)
          : this.rvl(h, h + s - 1 - s + 1) %
            FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT),
        await this.zt_(e, 2, t, s);
    }
  }
  SpawnAreaAtValidArea(t, e) {
    var i = e.StartCellIndex,
      e = e.EndCellIndex,
      s = (0, FishingQteDefine_1.calculateCellSize)(i, e),
      h = this.Yt_(this.RingConfig.RandomArea);
    s <= h
      ? this.S7_(t, i, s)
      : i <= e
        ? ((e = this.rvl(i, e - h + 1)), this.S7_(t, e, h))
        : ((e =
            this.rvl(i, i + s - 1 - h + 1) %
            FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT),
          this.S7_(t, e, h));
  }
  Jt_() {
    var t = this.RingInfo.GetQteAreas().get(0)?.StartCellIndex ?? 0,
      e =
        (this.ResetAllArea(),
        FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT /
          this.RingConfig.MultiBoxGroup);
    if (Number.isInteger(e)) {
      var i,
        s = this.RingConfig.MultiBoxGroup,
        h = this.rvl(1, FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT);
      if (1 === s && t)
        (i = this.Yt_(this.RingConfig.RandomArea)),
          (t =
            (t + FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT / 2) %
            FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT),
          this.S7_(0, t, i);
      else
        for (let t = 0; t < s; t++) {
          var r = this.Yt_(this.RingConfig.RandomArea),
            a = t * e + h + 1;
          this.S7_(t, a, r);
        }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SceneGameplay",
          37,
          "[FishingQte]格子扩展配置有误：不可被等分",
          ["配置组数", this.RingConfig.MultiBoxGroup],
        );
  }
  Zt_() {
    this.ResetAllArea();
    var e = this.RingInfo.GetValidAreas();
    for (let t = 0; t < e.length; t++) this.SpawnAreaAtValidArea(t, e[t]);
  }
  InitAllQteAreas() {
    this.RingInfo.IsWholeRing ? this.Jt_() : this.Zt_();
  }
  SpawnContinuousArea(t, e = 1) {
    if (this.RingInfo.IsWholeRing)
      switch (this.RingConfig.RefreshType) {
        case 0:
          break;
        case 1:
          this.Jt_();
          break;
        case 2:
          this.ResetAreaInLink(t, e),
            0 === this.RingInfo.GetQteAreas().size && this.Jt_();
      }
    else {
      var i = this.RingInfo.GetValidAreas();
      this.ResetAreaInLink(t, e), this.SpawnAreaAtValidArea(t, i[t]);
    }
  }
  GetQteAreaTexture(t) {
    return this.y7_.get(t).GetRootItem();
  }
  GetPerfectAreaTexture(t) {
    return this.Qfl.get(t).GetRootItem();
  }
  PlayAnim(t) {
    switch (t) {
      case "Fail":
        for (const e of this.y7_.values()) e.PlayAnim(t);
        for (const i of this.Qfl.values()) i.PlayAnim(t);
        break;
      case "Success":
        for (const s of this.y7_.values()) s.PlayAnim(t);
        break;
      case "PerfectQte":
        for (const h of this.Qfl.values()) h.PlayAnim(t);
    }
  }
}
exports.FishingQteRingQteItem = FishingQteRingQteItem;
class FishingQteRingQteSingleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.awl = new UE.FName("Progress")),
      (this.LevelSequencePlayer = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UITexture],
      [4, UE.UITexture],
    ];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    );
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer?.Clear(),
      (this.LevelSequencePlayer = void 0),
      (this.awl = void 0);
  }
  Cc_() {
    var t = [];
    return (
      t.push(this.GetTexture(0)),
      t.push(this.GetTexture(1)),
      t.push(this.GetTexture(2)),
      t.push(this.GetTexture(3)),
      t.push(this.GetTexture(4)),
      t
    );
  }
  SetRotation(t) {
    for (const e of this.Cc_())
      e.SetUIRelativeRotation(Rotator_1.Rotator.Create(0, t, 0).ToUeRotator());
  }
  SetType(t) {
    switch (t) {
      case 1:
        this.GetTexture(0).SetUIActive(!0), this.GetTexture(3).SetUIActive(!1);
        break;
      case 2:
        this.GetTexture(0).SetUIActive(!1), this.GetTexture(3).SetUIActive(!0);
    }
  }
  SetFill(t) {
    for (const e of this.Cc_())
      e.SetFillAmount(t), e.SetCustomMaterialScalarParameter(this.awl, t);
  }
  PlayAnim(t) {
    this.LevelSequencePlayer.GetCurrentSequence() === t
      ? this.LevelSequencePlayer.ReplaySequenceByKey(t)
      : (this.LevelSequencePlayer.StopPlayingSequence(!1, !0),
        this.LevelSequencePlayer.PlayLevelSequenceByName(t, !1));
  }
}
//# sourceMappingURL=FishingQteRingQteItem.js.map
