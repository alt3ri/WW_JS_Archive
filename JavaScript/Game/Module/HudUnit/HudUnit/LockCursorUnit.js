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
      (this.Fei = -1),
      (this.Cce = -0),
      (this.yPt = 0),
      (this.EPe = void 0),
      (this.Vei = !1);
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
    this.GetItem(1).SetUIActive(!0),
      this.GetItem(2).SetUIActive(!1),
      this.GetItem(5).SetUIActive(!1),
      this.SetBarPercent(1),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  Tick(t) {
    var e;
    this.Fei < 0 ||
      (this.Cce > this.Fei
        ? this.SetBarPercent(1)
        : ((e = this.Cce / this.Fei), this.SetBarPercent(e), (this.Cce += t)));
  }
  OnBeforeDestroy() {
    this.EPe.Clear(), (this.EPe = void 0);
  }
  Activate() {
    this.SetVisible(!0, 0);
  }
  Deactivate() {
    this.T_o(0), this.SetVisible(!1, 0);
  }
  SetActive(t) {
    t || this.DeactivateUnlockTimeDown(), super.SetActive(t);
  }
  ActivateUnlockTimeDown(t) {
    (this.Fei = t),
      (this.Cce = 0),
      this.GetItem(1).SetUIActive(!1),
      this.RefreshManualLockVisible();
  }
  DeactivateUnlockTimeDown() {
    (this.Fei = -1),
      (this.Cce = 0),
      this.GetItem(1).SetUIActive(!0),
      this.RefreshManualLockVisible(),
      this.SetBarPercent(1);
  }
  UpdateShowTargetState(t) {
    t = t?.Entity?.GetComponent(185);
    (this.Vei = t?.HasTag(-625862347) ?? !1), this.SetVisible(!this.Vei, 2);
  }
  RefreshManualLockVisible() {
    var t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        185,
      );
    let e = 3;
    this.Vei
      ? ((e = 0), this.Hei(!1, !1))
      : t.HasTag(-1150819426)
        ? ((e = 1), this.Hei(!0, !0))
        : ((t = t.HasTag(1260125908)) && (e = 2), this.Hei(t, !1)),
      this.T_o(e),
      this.jei(!this.Vei),
      this.GetItem(1).SetUIActive(!this.Vei),
      this.GetSprite(4).SetUIActive(!this.Vei);
  }
  T_o(t) {
    t !== this.yPt &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "[LockCursorUnit]UpdateLockState", [
          "",
          t,
        ]),
      0 === this.yPt
        ? (this.Ouo(), 2 === t && this.tbn())
        : 2 === this.yPt && this.ibn(),
      (this.yPt = t));
  }
  Hei(t, e) {
    var i = this.GetItem(2),
      s = this.GetItem(5);
    e
      ? (i.IsUIActiveSelf() !== t && i.SetUIActive(t),
        s.IsUIActiveSelf() && s.SetUIActive(!1))
      : (i.IsUIActiveSelf() && i.SetUIActive(!1),
        s.IsUIActiveSelf() !== t && s.SetUIActive(t));
  }
  jei(t) {
    var e = this.GetSprite(3);
    e.IsUIActiveSelf() !== t && e.SetUIActive(t);
  }
  SetBarPercent(t) {
    this.GetSprite(3).SetFillAmount(t);
  }
  GetUnlockTimeDown() {
    return this.Fei;
  }
  Ouo() {
    this.EPe.PlaySequencePurely("Start");
  }
  tbn() {
    this.EPe.PlaySequencePurely("Lock");
  }
  ibn() {
    this.EPe.PlaySequencePurely("Unlock");
  }
}
exports.LockCursorUnit = LockCursorUnit;
//# sourceMappingURL=LockCursorUnit.js.map
