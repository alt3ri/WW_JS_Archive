"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleVisibleChildView = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  VisibleStateUtil_1 = require("../../VisibleStateUtil"),
  BattleChildView_1 = require("./BattleChildView");
class BattleVisibleChildView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.ChildViewData = void 0),
      (this.ChildType = 0),
      (this.BaseVisible = !1),
      (this.IsEnable = !1),
      (this.InnerVisibleState = 0),
      (this.iJe = () => {
        this.oJe();
      });
  }
  InitChildType(i = 0) {
    (this.ChildType = i),
      (this.ChildViewData =
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData),
      (this.BaseVisible = this.ChildViewData.GetChildVisible(i)),
      (this.InnerVisibleState = 1),
      this.ChildViewData.AddCallback(i, this.iJe);
  }
  ShowBattleVisibleChildView() {
    (this.IsEnable = !0), this.rJe(0, !0);
    var i = this.GetVisible();
    this.SetActive(i), i && this.OnShowBattleChildView();
  }
  HideBattleVisibleChildView() {
    this.IsEnable = !1;
    var i = this.GetVisible();
    this.rJe(0, !1),
      this.SetActive(this.GetVisible()),
      i && this.OnHideBattleChildView();
  }
  Reset() {
    this.rJe(0, !1),
      this.ChildViewData &&
        (this.ChildViewData.RemoveCallback(this.ChildType, this.iJe),
        (this.ChildViewData = void 0)),
      super.Reset();
  }
  SetActive(i) {
    this.GetVisible() !== i
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Battle",
          18,
          "战斗子界面不要直接调用SetActive, 请调用SetVisible",
        )
      : super.SetActive(i);
  }
  oJe() {
    var i = this.GetVisible();
    (this.BaseVisible = this.ChildViewData.GetChildVisible(this.ChildType)),
      this.nJe(i);
  }
  SetVisible(i, t) {
    var e = this.GetVisible();
    this.rJe(i, t), this.nJe(e);
  }
  nJe(i) {
    this.IsEnable &&
      i !== (i = this.GetVisible()) &&
      (this.SetActive(i),
      i ? this.OnShowBattleChildView() : this.OnHideBattleChildView());
  }
  rJe(i, t) {
    this.InnerVisibleState = VisibleStateUtil_1.VisibleStateUtil.SetVisible(
      this.InnerVisibleState,
      t,
      i,
    );
  }
  GetVisible() {
    return this.BaseVisible && 0 === this.InnerVisibleState;
  }
  OnShowBattleChildView() {}
  OnHideBattleChildView() {}
}
exports.BattleVisibleChildView = BattleVisibleChildView;
//# sourceMappingURL=BattleVisibleChildView.js.map
