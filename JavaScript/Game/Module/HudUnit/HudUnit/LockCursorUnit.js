"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LockCursorUnit = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  HudUnitBase_1 = require("../HudUnitBase");
class LockCursorUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this.Fti = -1),
      (this.Cce = -0),
      (this.Dxt = 0),
      (this.SPe = void 0),
      (this.Vti = !1),
      (this.e6a = 0),
      (this.t6a = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    this.RootItem.SetAnchorAlign(2, 2),
      this.GetItem(1).SetUIActive(!0),
      this.GetItem(2).SetUIActive(!1),
      this.GetItem(5).SetUIActive(!1),
      this.SetBarPercent(1),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  Tick(t) {
    var e;
    this.Fti < 0 ||
      (this.Cce > this.Fti
        ? this.SetBarPercent(1)
        : ((e = this.Cce / this.Fti), this.SetBarPercent(e), (this.Cce += t)));
  }
  OnBeforeDestroy() {
    this.SPe.Clear(), (this.SPe = void 0);
  }
  Activate() {
    this.SetVisible(!0, 0);
  }
  Deactivate() {
    this.Euo(0), this.SetVisible(!1, 0);
  }
  SetActive(t) {
    t || this.DeactivateUnlockTimeDown(),
      this.jti(!this.Vti),
      this.GetItem(1).SetUIActive(!this.Vti),
      this.GetSprite(4).SetUIActive(!this.Vti),
      super.SetActive(t);
  }
  IsForceLockState() {
    return 1 === this.Dxt;
  }
  ActivateUnlockTimeDown(t) {
    (this.Fti = t), (this.Cce = 0);
  }
  DeactivateUnlockTimeDown() {
    (this.Fti = -1), (this.Cce = 0), this.SetBarPercent(1);
  }
  Refresh(t, e, i) {
    var s = t?.Entity?.Id ?? 0,
      s = ((this.e6a = s), t?.Entity?.GetComponent(203)),
      t =
        ((this.Vti = s?.HasTag(-625862347) ?? !1),
        this.SetVisible(!this.Vti, 2),
        this.wke(e, i));
    this.i6a(t), this.Euo(t);
  }
  wke(t, e) {
    return this.Vti
      ? 0
      : e
        ? t?.Valid
          ? (e = t.Entity.GetComponent(203)).HasTag(-1150819426)
            ? 1
            : e.HasTag(1260125908)
              ? 2
              : 3
          : 0
        : 3;
  }
  i6a(t) {
    1 === t &&
      (t !== this.Dxt
        ? (this.r6a(), (this.t6a = this.e6a))
        : this.t6a !== this.e6a && ((this.t6a = this.e6a), this.o6a()));
  }
  Euo(t) {
    if (t !== this.Dxt) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "[LockCursorUnit]UpdateLockState", [
          "",
          t,
        ]),
        0 === this.Dxt ? this.bco() : 2 === this.Dxt && this.eOn(),
        2 === t && this.ZGn(),
        (this.Dxt = t);
      var e = this.GetItem(2),
        i = this.GetItem(5);
      switch (t) {
        case 1:
          e.SetUIActive(!0), i.SetUIActive(!1);
          break;
        case 2:
          e.SetUIActive(!1), i.SetUIActive(!0);
          break;
        default:
          e.SetUIActive(!1), i.SetUIActive(!1);
      }
    }
  }
  jti(t) {
    var e = this.GetSprite(3);
    e.IsUIActiveSelf() !== t && e.SetUIActive(t);
  }
  SetBarPercent(t) {
    this.GetSprite(3).SetFillAmount(t);
  }
  bco() {
    this.SPe.PlaySequencePurely("Start");
  }
  ZGn() {
    this.SPe.PlaySequencePurely("Lock");
  }
  eOn() {
    this.SPe.PlaySequencePurely("Unlock");
  }
  r6a() {
    ModelManager_1.ModelManager.BattleUiModel.AudioData?.PlayAudio(2, 17);
  }
  o6a() {
    ModelManager_1.ModelManager.BattleUiModel.AudioData?.PlayAudio(3, 17);
  }
}
exports.LockCursorUnit = LockCursorUnit;
//# sourceMappingURL=LockCursorUnit.js.map
