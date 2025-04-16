"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StrengthItemBase = void 0);
const Stats_1 = require("../../../../../Core/Common/Stats"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  BattleUiTweenAnimPlayer_1 = require("../../../BattleUi/Views/BattleUiTweenAnimPlayer");
class StrengthItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.IsAfterStart = !1),
      (this.RoleData = void 0),
      (this.UiVisibleChanged = void 0),
      (this.TagTaskList = []),
      (this.TweenAnimPlayer =
        new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer());
  }
  Init(t, e, s) {
    (this.RoleData = e),
      (this.UiVisibleChanged = s),
      this.InitAsync(t).catch(() => {});
  }
  async InitAsync(t) {
    await this.CreateByResourceIdAsync(this.GetResourceId(), t);
  }
  GetResourceId() {
    return "UiItem_Endurance";
  }
  OnStart() {
    (this.IsAfterStart = !0),
      this.OnAddEvents(),
      this.OnAddEntityEvents(),
      this.OnRefreshRoleData();
  }
  OnBeforeShow() {
    this.UiVisibleChanged?.(!0);
  }
  OnAfterHide() {
    this.UiVisibleChanged?.(!1);
  }
  OnBeforeDestroy() {
    this.OnRemoveEvents(),
      this.RefreshRoleData(void 0),
      (this.IsAfterStart = !1),
      super.OnBeforeDestroy();
  }
  RefreshRoleData(t) {
    this.RoleData !== t &&
      (this.ClearTagTask(),
      this.OnRemoveEntityEvents(),
      (this.RoleData = t),
      this.IsAfterStart) &&
      (this.OnAddEntityEvents(), this.OnRefreshRoleData());
  }
  Tick(t) {}
  GetUiVisible() {
    return this.IsShowing || this.IsShow;
  }
  OnAddEvents() {}
  OnRemoveEvents() {}
  OnAddEntityEvents() {}
  OnRemoveEntityEvents() {}
  OnRefreshRoleData() {}
  ListenForTagAddOrRemove(t, e, s) {
    t = t.ListenForTagAddOrRemove(e, s, StrengthItemBase.SYe);
    t && this.TagTaskList.push(t);
  }
  ClearTagTask() {
    for (const t of this.TagTaskList) t.EndTask();
    this.TagTaskList.length = 0;
  }
  InitTweenAnim(t) {
    this.TweenAnimPlayer.InitTweenAnim(t, this.GetItem(t));
  }
  PlayTweenAnim(t) {
    this.TweenAnimPlayer.PlayTweenAnim(t);
  }
  StopTweenAnim(t) {
    this.TweenAnimPlayer.StopTweenAnim(t);
  }
}
(exports.StrengthItemBase = StrengthItemBase).SYe = Stats_1.Stat.Create(
  "[StrengthItem]ListenTag",
);
//# sourceMappingURL=StrengthItemBase.js.map
