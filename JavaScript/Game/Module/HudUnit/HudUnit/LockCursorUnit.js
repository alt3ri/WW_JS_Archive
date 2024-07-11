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
      (this.Vti = !1);
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
    t || this.DeactivateUnlockTimeDown(), super.SetActive(t);
  }
  ActivateUnlockTimeDown(t) {
    (this.Fti = t),
      (this.Cce = 0),
      this.GetItem(1).SetUIActive(!1),
      this.RefreshManualLockVisible();
  }
  DeactivateUnlockTimeDown() {
    (this.Fti = -1),
      (this.Cce = 0),
      this.GetItem(1).SetUIActive(!0),
      this.RefreshManualLockVisible(),
      this.SetBarPercent(1);
  }
  UpdateShowTargetState(t) {
    t = t?.Entity?.GetComponent(188);
    (this.Vti = t?.HasTag(-625862347) ?? !1), this.SetVisible(!this.Vti, 2);
  }
  RefreshManualLockVisible() {
    var t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        188,
      );
    let e = 3;
    this.Vti
      ? ((e = 0), this.Hti(!1, !1))
      : t.HasTag(-1150819426)
        ? ((e = 1), this.Hti(!0, !0))
        : ((t = t.HasTag(1260125908)) && (e = 2), this.Hti(t, !1)),
      this.Euo(e),
      this.jti(!this.Vti),
      this.GetItem(1).SetUIActive(!this.Vti),
      this.GetSprite(4).SetUIActive(!this.Vti);
  }
  Euo(t) {
    t !== this.Dxt &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "[LockCursorUnit]UpdateLockState", [
          "",
          t,
        ]),
      0 === this.Dxt
        ? (this.bco(), 2 === t && this.jGn())
        : 2 === this.Dxt && this.WGn(),
      (this.Dxt = t));
  }
  Hti(t, e) {
    var i = this.GetItem(2),
      s = this.GetItem(5);
    e
      ? (i.IsUIActiveSelf() !== t && i.SetUIActive(t),
        s.IsUIActiveSelf() && s.SetUIActive(!1))
      : (i.IsUIActiveSelf() && i.SetUIActive(!1),
        s.IsUIActiveSelf() !== t && s.SetUIActive(t));
  }
  jti(t) {
    var e = this.GetSprite(3);
    e.IsUIActiveSelf() !== t && e.SetUIActive(t);
  }
  SetBarPercent(t) {
    this.GetSprite(3).SetFillAmount(t);
  }
  GetUnlockTimeDown() {
    return this.Fti;
  }
  bco() {
    this.SPe.PlaySequencePurely("Start");
  }
  jGn() {
    this.SPe.PlaySequencePurely("Lock");
  }
  WGn() {
    this.SPe.PlaySequencePurely("Unlock");
  }
}
exports.LockCursorUnit = LockCursorUnit;
//# sourceMappingURL=LockCursorUnit.js.map
