"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteComponentBase =
    exports.exploreRouletteMap =
    exports.functionRouletteMap =
      void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RouletteDefine_1 = require("../Data/RouletteDefine");
const RouletteGridData_1 = require("../RouletteGrid/RouletteGridData");
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
      (this.InputControllerType = 0),
      (this.Ego = void 0),
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
      (this.Ego = this.GetItem(2));
  }
  OnBeforeDestroy() {
    (this.Ego = void 0),
      (this.cie = void 0),
      this.ygo(),
      this.AreaIndexToGridIndex.clear(),
      (this.AreaIndexToGridIndex = void 0),
      (this.ToggleEventList = []);
  }
  Reset() {
    this.Refresh(0, -1), this.RefreshRouletteComponent();
  }
  Igo() {
    this.ygo();
    const t = this.GetRouletteInfoMap();
    let e = 0;
    const i = new Map([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
    for (const a of t) {
      for (const u of a[0]) this.AreaIndexToGridIndex.set(u, e);
      var s = a[1];
      const r = a[2];
      const h = i.get(r);
      var o = ModelManager_1.ModelManager.RouletteModel.CreateGridData(h, r);
      var s =
        ((o.GridIndex = e),
        (o.DataIndex = h),
        (o.GridType = r),
        this.GetItem(s));
      const n = new RouletteGridData_1.rouletteGridGenerator[r]();
      var s = (n.SetRootActor(s.GetOwner(), !0), this.GridDataDecorator(o));
      var o = (n.RefreshGrid(s), this.IsCurrentEquippedId(s));
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
  ygo() {
    for (const t of this.RouletteGridList)
      t.SetGridEquipped(!1), t.SetGridToggleState(!1);
    this.RouletteGridList = [];
  }
  RefreshCurrentGridIndex(t) {
    this.AreaIndex = t;
    t = this.AreaIndexToGridIndex.get(this.AreaIndex);
    this.CurrentGridIndex = t ?? -1;
  }
  OnEmitCurrentGridSelectOn(t) {
    this.GetCurrentGrid()?.SelectOnGrid(!0);
  }
  GetCurrentGrid() {
    if (this.CurrentGridIndex !== -1)
      return this.RouletteGridList[this.CurrentGridIndex];
  }
  SetAllGridToggleSelfInteractive(t) {
    for (const e of this.RouletteGridList) e.SetToggleSelfInteractive(t);
  }
  EmitCurrentGridSelectOn(t) {
    this.OnEmitCurrentGridSelectOn(t);
  }
  GetCurrentIndexAndAngle() {
    return [this.AreaIndex, this.Angle];
  }
  RefreshRouletteComponent() {
    this.RefreshCurrentShowName(), this.RefreshTips();
  }
  Refresh(t, e) {
    let i, s, r;
    void 0 !== t &&
      this.AreaIndex !== t &&
      ((i = this.AreaIndex === 0),
      (s = t === 0),
      (r =
        (this.AreaIndexToGridIndex.get(this.AreaIndex) ?? -1) !==
        (this.AreaIndexToGridIndex.get(t) ?? -1)),
      (this.IsEmptyChoose = s),
      !i && r && this.SetCurrentToggleState(!1),
      this.RefreshCurrentGridIndex(t),
      !s && r && this.SetCurrentToggleState(!0),
      this.RefreshCurrentShowName(),
      (i || s) && this.SetRingVisible(!s),
      this.RefreshTips()),
      void 0 !== e &&
        this.Angle !== e &&
        ((this.Angle = e), this.IsEmptyChoose || this.Tgo(this.Angle));
  }
  SetCurrentToggleState(t) {}
  Tgo(t) {
    (this.cie.Yaw = t), this.Ego.SetUIRelativeRotation(this.cie);
  }
  SetRingVisible(t) {
    this.Ego.SetUIActive(t);
  }
  RefreshCurrentShowName() {
    const t =
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
  RefreshTipsByText(t, e = !1) {
    let i;
    void 0 !== t &&
      ((i = this.GetText(1)).ShowTextNew(t), e) &&
      LguiUtil_1.LguiUtil.ReplaceWildCard(i);
  }
  SetTipsActive(t) {
    this.GetText(1).SetUIActive(t);
  }
  RefreshRouletteType() {
    this.RefreshRouletteItem(),
      (this.CurrentGridIndex = -1),
      this.Reset(),
      this.Igo();
  }
  RefreshRouletteItem() {}
  RefreshRoulettePlatformType(t) {
    this.Reset();
  }
  RefreshRouletteInputType(t) {
    (this.InputControllerType = t), this.Reset();
  }
}
exports.RouletteComponentBase = RouletteComponentBase;
// # sourceMappingURL=RouletteComponent.js.map
