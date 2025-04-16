"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreasureCompassUnit = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../Camera/CameraController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  HudUnitBase_1 = require("../HudUnitBase"),
  MAX_ARROW_COUNT = 5;
class TreasureCompassUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this.aHl = void 0),
      (this.kRe = Vector_1.Vector.Create()),
      (this.cie = Rotator_1.Rotator.Create()),
      (this.hHl = []),
      (this.Lrt = !0),
      (this.SPe = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnCreateAsync() {
    var e = [];
    for (let t = 0; t < MAX_ARROW_COUNT; t++) e.push(this.lHl());
    await Promise.all(e);
  }
  OnBeforeDestroy() {
    for (const t of this.hHl) t.Clean(), t.Destroy();
    (this.hHl.length = 0), this.SPe?.Clear(), (this.SPe = void 0);
  }
  async lHl() {
    var t = new TreasureCompassArrow();
    this.hHl.push(t), await t.CreateByResourceIdAsync("UiItem_ShipRingArrow");
  }
  OnStart() {
    super.OnStart(), (this.Lrt = !1), (this.aHl = this.GetItem(0));
    for (const t of this.hHl) t.GetRootItem().SetUIParent(this.aHl);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  SetActive(t) {
    t !== this.Lrt &&
      ((this.Lrt = t)
        ? (super.SetActive(!0),
          this.SPe?.StopCurrentSequence(),
          this.SPe?.PlaySequencePurely("Start", !1))
        : (this.SPe?.StopCurrentSequence(),
          this.SPe?.PlaySequenceAsync(
            "Close",
            new CustomPromise_1.CustomPromise(),
          ).then(() => {
            this.Lrt || super.SetActive(!1);
          })),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnTreasureCompassUnitVisibleChange,
        t,
      ));
  }
  InitHide() {
    super.SetActive(!1), (this.Lrt = !1);
  }
  RefreshCompass(e, s) {
    TreasureCompassUnit._Hl.Start();
    var i = e.length,
      r = this.hHl.length,
      o = void 0,
      h = void 0;
    let a = !1,
      n = -1;
    for (let t = 0; t < i; t++)
      if ((o = e[t]).IsEnableCompassTracking) {
        if ((n += 1) >= r) break;
        if (t >= MAX_ARROW_COUNT) {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Track",
              67,
              "[TreasureCompassUnit]箭头显示数量超过最大值, UI对象可能存在泄露",
            );
          break;
        }
        var u,
          h = this.hHl[n];
        o.IsNearbyTracking
          ? h.SetVisible(!1)
          : ((a = !0),
            o.Location.Subtraction(s, this.kRe),
            (u = MathUtils_1.MathUtils.GetAngleByVector2D(this.kRe)),
            (this.cie.Yaw =
              -u + CameraController_1.CameraController.CameraRotator.Yaw),
            h.SetRotation(this.cie.ToUeRotator()),
            o.DistSquared < o.HighlightRangeSquared
              ? (h.SetHighLight(!0), h.GetRootItem().SetAsLastHierarchy())
              : ((u =
                  1 -
                  (0.5 * (o.DistSquared - o.HighlightRangeSquared)) /
                    (o.RangeSquared - o.HighlightRangeSquared)),
                (u = MathUtils_1.MathUtils.Clamp(u, 0.5, 1)),
                h.SetArrowScale(u),
                h.SetHighLight(!1)),
            h.SetVisible(!0));
      }
    for (let t = (n = n < 0 ? 0 : n); t < r; t++) this.hHl[t].SetVisible(!1);
    a && !this.Lrt ? this.SetActive(!0) : !a && this.Lrt && this.SetActive(!1),
      TreasureCompassUnit._Hl.Stop();
  }
}
(exports.TreasureCompassUnit = TreasureCompassUnit)._Hl = Stats_1.Stat.Create(
  "TreasureCompassUnitRefresh",
);
class TreasureCompassArrow extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.eii = void 0),
      (this.RWl = void 0),
      (this.cHl = Vector_1.Vector.Create()),
      (this.wWl = !1),
      (this.Lrt = !0),
      (this.SPe = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    super.OnStart(),
      (this.Lrt = !1),
      this.RootItem?.SetUIActive(!1),
      (this.eii = this.GetItem(0)),
      this.eii?.SetUIActive(!0),
      (this.RWl = this.GetItem(1)),
      this.RWl?.SetUIActive(!1),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  Clean() {
    this.SPe?.Clear(), (this.SPe = void 0);
  }
  SetVisible(t) {
    t !== this.Lrt &&
      ((this.Lrt = t)
        ? (this.RootItem?.SetUIActive(!0),
          this.SPe?.StopCurrentSequence(),
          this.SPe?.PlaySequencePurely("Start", !1))
        : (this.SPe?.StopCurrentSequence(),
          this.SPe?.PlaySequenceAsync(
            "Close",
            new CustomPromise_1.CustomPromise(),
          ).then(() => {
            this.Lrt || this.RootItem?.SetUIActive(!1);
          })));
  }
  SetRotation(t) {
    this.RootItem?.SetUIRelativeRotation(t);
  }
  SetArrowScale(t) {
    (this.cHl.X = t),
      (this.cHl.Y = t),
      this.eii?.SetUIItemScale(this.cHl.ToUeVectorOld());
  }
  SetHighLight(t) {
    t !== this.wWl &&
      ((this.wWl = t),
      this.eii?.SetUIActive(!t),
      this.RWl?.SetUIActive(t),
      this.SPe?.StopCurrentSequence(),
      this.SPe?.PlaySequencePurely("Start", !1));
  }
}
//# sourceMappingURL=TreasureCompassUnit.js.map
