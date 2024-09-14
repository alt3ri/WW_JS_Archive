"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteComponentBase =
    exports.exploreRouletteMap =
    exports.functionRouletteMap =
      void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RouletteDefine_1 = require("../Data/RouletteDefine"),
  RouletteGridData_1 = require("../RouletteGrid/RouletteGridData");
(exports.functionRouletteMap = [
  [[1], 11, 1],
  [[2], 4, 1],
  [[3], 5, 1],
  [[4], 6, 1],
  [[5], 7, 1],
  [[6], 8, 1],
  [[7], 9, 1],
  [[8], 10, 1],
]),
  (exports.exploreRouletteMap = [
    [[2], 4, 0],
    [[3], 5, 0],
    [[4], 6, 0],
    [[5], 7, 0],
    [[6], 8, 0],
    [[7], 9, 0],
    [[1, 8], 12, 2],
  ]);
class RouletteComponentBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.v0o = void 0),
      (this.Angle = -1),
      (this.AreaIndex = 0),
      (this.cie = new UE.Rotator(0, 0, 0)),
      (this.CurrentGridIndex = -1),
      (this.CurrentEquipGridIndex = -1),
      (this.IsEmptyChoose = !0),
      (this.RouletteGridList = []),
      (this.AreaIndexToGridIndex = new Map()),
      (this.ToggleEventList = []);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
    ];
  }
  OnStart() {
    this.GetItem(2).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!1),
      (this.v0o = this.GetItem(2));
  }
  OnBeforeDestroy() {
    (this.v0o = void 0),
      (this.cie = void 0),
      this.M0o(),
      this.AreaIndexToGridIndex.clear(),
      (this.AreaIndexToGridIndex = void 0),
      (this.ToggleEventList = []);
  }
  Reset() {
    (this.AreaIndex = 0), (this.Angle = -1), this.RefreshRouletteComponent();
  }
  E0o() {
    this.M0o();
    var t = this.GetRouletteInfoMap();
    let e = 0;
    var i = new Map([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
    for (const a of t) {
      for (const u of a[0]) this.AreaIndexToGridIndex.set(u, e);
      var s = a[1],
        r = a[2],
        h = i.get(r),
        o = ModelManager_1.ModelManager.RouletteModel.CreateGridData(h, r),
        s =
          ((o.GridIndex = e),
          (o.DataIndex = h),
          (o.GridType = r),
          this.GetItem(s)),
        n = new RouletteGridData_1.rouletteGridGenerator[r](),
        s = (n.SetRootActor(s.GetOwner(), !0), this.GridDataDecorator(o)),
        o = (n.RefreshGrid(s), this.IsCurrentEquippedId(s));
      o && (this.CurrentEquipGridIndex = s.GridIndex),
        n.SetGridEquipped(o),
        this.InitGridEvent(n),
        this.RouletteGridList.push(n),
        i.set(r, h + 1),
        e++;
    }
  }
  GetRouletteInfoMap() {}
  InitGridEvent(t) {
    for (const e of this.ToggleEventList) t.AddToggleStateChangeEvent(e);
  }
  GridDataDecorator(t) {
    return (t.State = this.JudgeGridStateByData(t.Id, t.GridType)), t;
  }
  AddAllGridToggleEvent(t) {
    this.ToggleEventList.push(t);
  }
  AddAllGridToggleCanExecuteChangeEvent(t) {
    for (const e of this.RouletteGridList) e.BindOnCanToggleExecuteChange(t);
  }
  IsCurrentEquippedId(t) {
    return !1;
  }
  JudgeGridStateByData(t, e) {
    return 1;
  }
  M0o() {
    for (const t of this.RouletteGridList)
      t.SetGridEquipped(!1), t.SetGridToggleState(!1);
    this.RouletteGridList = [];
  }
  GamepadReturnEmptyGrid() {}
  RefreshCurrentGridIndex(t) {
    this.AreaIndex = t;
    t = this.AreaIndexToGridIndex.get(this.AreaIndex);
    void 0 !== t
      ? ((this.CurrentGridIndex = t), (this.IsEmptyChoose = !1))
      : Info_1.Info.IsInGamepad()
        ? this.GamepadReturnEmptyGrid()
        : ((this.CurrentGridIndex = -1), (this.IsEmptyChoose = !0));
  }
  OnEmitCurrentGridSelectOn() {
    this.GetCurrentGrid()?.SelectOnGrid(!0);
  }
  GetCurrentGrid() {
    if (-1 !== this.CurrentGridIndex)
      return this.RouletteGridList[this.CurrentGridIndex];
  }
  SetAllGridToggleSelfInteractive(t) {
    for (const e of this.RouletteGridList) e.SetToggleSelfInteractive(t);
  }
  TryEmitCurrentGridSelectOn() {
    this.OnEmitCurrentGridSelectOn();
  }
  GetCurrentIndexAndAngle() {
    return [this.AreaIndex, this.Angle];
  }
  RefreshRouletteComponent() {
    this.RefreshCurrentShowName(), this.RefreshTips();
  }
  Refresh(t, e) {
    var i, s;
    void 0 !== t &&
      this.AreaIndex !== t &&
      ((i = 0 === this.AreaIndex),
      (s =
        (this.AreaIndexToGridIndex.get(this.AreaIndex) ?? -1) !==
        (this.AreaIndexToGridIndex.get(t) ?? -1)),
      !i && s && this.SetCurrentToggleState(!1),
      this.RefreshCurrentGridIndex(t),
      !this.IsEmptyChoose && s && this.SetCurrentToggleState(!0),
      this.RefreshCurrentShowName(),
      (i || this.IsEmptyChoose) && this.SetRingVisible(!this.IsEmptyChoose),
      this.RefreshTips()),
      void 0 !== e &&
        this.Angle !== e &&
        ((this.Angle = e), this.IsEmptyChoose || this.S0o(this.Angle));
  }
  SetCurrentToggleState(t) {}
  S0o(t) {
    (this.cie.Yaw = t), this.v0o.SetUIRelativeRotation(this.cie);
  }
  SetRingVisible(t) {
    this.v0o.SetUIActive(t);
  }
  RefreshCurrentShowName() {
    var t =
      this.GetCurrentGrid()?.Data?.Name ?? RouletteDefine_1.ROULETTE_TEXT_EMPTY;
    this.RefreshName(t);
  }
  RefreshName(t) {
    this.GetText(0).ShowTextNew(t);
  }
  SetNameVisible(t) {
    this.GetText(0).SetUIActive(t);
  }
  RefreshTips() {}
  RefreshTipsByText(t, e = 0) {
    var i;
    void 0 !== t &&
      ((i = this.GetText(1)), LguiUtil_1.LguiUtil.SetLocalTextNew(i, t));
  }
  SetTipsActive(t) {
    this.GetText(1).SetUIActive(t);
  }
  RefreshRouletteType() {
    this.RefreshRouletteItem(), this.Reset(), this.E0o();
  }
  RefreshRouletteItem() {}
  RefreshRoulettePlatformType() {
    this.Reset();
  }
  RefreshRouletteInputType() {
    this.Reset();
  }
}
exports.RouletteComponentBase = RouletteComponentBase;
//# sourceMappingURL=RouletteComponent.js.map
