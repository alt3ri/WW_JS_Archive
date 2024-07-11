"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreTargetReachedList = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RewardExploreTargetReached_1 = require("./RewardExploreTargetReached");
class RewardExploreTargetReachedList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this._fi = void 0),
      (this.ufi = void 0),
      (this.Y0i = []);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    (this.ufi = this.GetItem(0)),
      (this._fi = this.GetItem(1)),
      this._fi.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    (this.ufi = void 0), (this._fi = void 0), this.cfi();
  }
  SetBarList(e) {
    this.cfi();
    var t = this.GetItem(0);
    if (e && 0 !== e.length) {
      for (const r of e) this.Cfi(r);
      t.SetUIActive(!0);
    } else t.SetUIActive(!1);
  }
  Cfi(e) {
    var t = LguiUtil_1.LguiUtil.DuplicateActor(this._fi.GetOwner(), this.ufi),
      t = new RewardExploreTargetReached_1.RewardExploreTargetReached(t);
    t.Refresh(e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Test", 5, e?.DescriptionTextId),
      t.SetActive(!0),
      this.Y0i.push(t);
  }
  cfi() {
    for (const e of this.Y0i) e.Destroy();
    this.Y0i.length = 0;
  }
}
exports.RewardExploreTargetReachedList = RewardExploreTargetReachedList;
//# sourceMappingURL=RewardExploreTargetReachedList.js.map
