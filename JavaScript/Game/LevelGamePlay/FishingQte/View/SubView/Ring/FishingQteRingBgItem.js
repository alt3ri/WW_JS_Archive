"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingQteRingBgItem = void 0);
const UE = require("ue"),
  Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
  LevelSequencePlayer_1 = require("../../../../../Module/Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../../../Module/Util/LguiUtil"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  FishingQteDefine_1 = require("../../../FishingQteDefine");
class FishingQteRingBgItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i) {
    super(), (this.RingInfo = e), (this.RingConfig = i), (this.BgItemList = []);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {}
  OnBeforeDestroy() {
    this.BgItemList.length = 0;
  }
  async SpawnBgArea() {
    const t = this.GetItem(0);
    if ((t.SetUIActive(!1), this.RingInfo.IsWholeRing))
      await (n = new FishingQteRingBgSingleItem(
        1,
        FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT,
        !0,
      )).CreateThenShowByActorAsync(t.GetOwner()),
        this.BgItemList.push(n),
        this.RingInfo.AddValidArea(
          1,
          FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT,
        );
    else {
      var i,
        s = [];
      for (const a of this.RingConfig.InvalidArea)
        Array.isArray(a)
          ? (i = a) && s.push([i[0], i[1]])
          : (i = a) && s.push([i.ArrayInt[0], i.ArrayInt[1]]);
      s.sort((e, i) => e[0] - i[0]);
      var n = s[s.length - 1][1];
      let e = (0, FishingQteDefine_1.fixedCellIndex)(n + 1);
      for (const g of s) {
        var h = g[0],
          r = g[1];
        this.RingInfo.AddValidArea(
          e,
          (0, FishingQteDefine_1.fixedCellIndex)(h - 1),
        ),
          (e = (0, FishingQteDefine_1.fixedCellIndex)(r + 1));
      }
      n = this.RingInfo.GetValidAreas();
      const o = [];
      n.forEach((e) => {
        var i = e.StartCellIndex,
          e = e.EndCellIndex,
          i = new FishingQteRingBgSingleItem(i, e, !1),
          e = LguiUtil_1.LguiUtil.CopyItem(t, this.RootItem);
        o.push(i.CreateThenShowByActorAsync(e.GetOwner())),
          this.BgItemList.push(i);
      }),
        await Promise.all(o);
    }
  }
  PlayAnim(i) {
    this.BgItemList.forEach((e) => {
      e.PlayAnim(i);
    });
  }
}
exports.FishingQteRingBgItem = FishingQteRingBgItem;
class FishingQteRingBgSingleItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i, t) {
    super(),
      (this.StartIndex = e),
      (this.EndIndex = i),
      (this.IsWholeRing = t),
      (this.LevelSequencePlayer = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    )),
      this.AU();
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer?.Clear(), (this.LevelSequencePlayer = void 0);
  }
  AU() {
    var e = this.GetTexture(0),
      i = this.GetTexture(1),
      t =
        Math.max(this.StartIndex - 1, 0) *
        FishingQteDefine_1.FISHINGQTE_SINGLECELL_ANGLE,
      s = Rotator_1.Rotator.Create(0, -t, 0).ToUeRotator(),
      s =
        (e.SetUIRelativeRotation(s),
        i.SetUIRelativeRotation(s),
        (0, FishingQteDefine_1.calculateCellSize)(
          this.StartIndex,
          this.EndIndex,
        ) / FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT),
      e = (e.SetFillAmount(s), i.SetFillAmount(s), this.GetItem(2)),
      i = this.GetItem(3);
    this.IsWholeRing
      ? (e.SetUIActive(!1), i.SetUIActive(!1))
      : (e.SetUIRelativeRotation(
          Rotator_1.Rotator.Create(0, 0.5 - t, 0).ToUeRotator(),
        ),
        e.SetUIActive(!0),
        e.SetAsLastHierarchy(),
        (s = this.EndIndex * FishingQteDefine_1.FISHINGQTE_SINGLECELL_ANGLE),
        i.SetUIRelativeRotation(
          Rotator_1.Rotator.Create(0, -s - 0.5, 0).ToUeRotator(),
        ),
        i.SetUIActive(!0),
        i.SetAsLastHierarchy());
  }
  PlayAnim(e) {
    this.LevelSequencePlayer.GetCurrentSequence() === e
      ? this.LevelSequencePlayer.ReplaySequenceByKey(e)
      : (this.LevelSequencePlayer.StopPlayingSequence(!1, !0),
        this.LevelSequencePlayer.PlayLevelSequenceByName(e, !1));
  }
}
//# sourceMappingURL=FishingQteRingBgItem.js.map
