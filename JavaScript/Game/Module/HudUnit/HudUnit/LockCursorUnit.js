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
      (this.I3a = 0),
      (this.T3a = 0);
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
    var i;
    this.Fti < 0 ||
      (this.Cce > this.Fti
        ? this.SetBarPercent(1)
        : ((i = this.Cce / this.Fti), this.SetBarPercent(i), (this.Cce += t)));
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
    var i = t?.Entity?.Id ?? 0,
      i = (this.I3a !== i && (this.I3a = i), t?.Entity?.GetComponent(190));
    (this.Vti = i?.HasTag(-625862347) ?? !1), this.SetVisible(!this.Vti, 2);
  }
  RefreshManualLockVisible() {
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (i?.Valid) {
      var i = i.Entity.GetComponent(190);
      let t = 3;
      this.Vti
        ? ((t = 0), this.Hti(!1, !1))
        : i.HasTag(-1150819426)
          ? ((t = 1), this.Hti(!0, !0))
          : ((i = i.HasTag(1260125908)) && (t = 2), this.Hti(i, !1)),
        this.L3a(t),
        this.Euo(t),
        this.jti(!this.Vti),
        this.GetItem(1).SetUIActive(!this.Vti),
        this.GetSprite(4).SetUIActive(!this.Vti);
    }
  }
  L3a(t) {
    1 === t &&
      (t !== this.Dxt
        ? (this.D3a(), (this.T3a = this.I3a))
        : this.T3a !== this.I3a && ((this.T3a = this.I3a), this.A3a()));
  }
  Euo(t) {
    t !== this.Dxt &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "[LockCursorUnit]UpdateLockState", [
          "",
          t,
        ]),
      0 === this.Dxt
        ? (this.bco(), 2 === t && this.ZGn())
        : 2 === this.Dxt && this.eOn(),
      (this.Dxt = t));
  }
  Hti(t, i) {
    var e = this.GetItem(2),
      s = this.GetItem(5);
    i
      ? (e.IsUIActiveSelf() !== t && e.SetUIActive(t),
        s.IsUIActiveSelf() && s.SetUIActive(!1))
      : (e.IsUIActiveSelf() && e.SetUIActive(!1),
        s.IsUIActiveSelf() !== t && s.SetUIActive(t));
  }
  jti(t) {
    var i = this.GetSprite(3);
    i.IsUIActiveSelf() !== t && i.SetUIActive(t);
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
  ZGn() {
    this.SPe.PlaySequencePurely("Lock");
  }
  eOn() {
    this.SPe.PlaySequencePurely("Unlock");
  }
  D3a() {
    ModelManager_1.ModelManager.BattleUiModel.AudioData?.PlayAudio(2, 17);
  }
  A3a() {
    ModelManager_1.ModelManager.BattleUiModel.AudioData?.PlayAudio(3, 17);
  }
}
exports.LockCursorUnit = LockCursorUnit;
//# sourceMappingURL=LockCursorUnit.js.map
