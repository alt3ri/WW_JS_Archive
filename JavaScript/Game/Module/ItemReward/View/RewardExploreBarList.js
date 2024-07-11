"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreBarList = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const TrainingItem_1 = require("../../TrainingDegree/TrainingItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreBarList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this._0i = void 0),
      (this.u0i = void 0),
      (this.Ygi = []);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ]),
      (this.BtnBindInfo = []);
  }
  OnStart() {
    (this.u0i = this.GetItem(0)),
      (this._0i = this.GetItem(1)),
      this._0i.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    (this.u0i = void 0), (this._0i = void 0), this.c0i();
  }
  Refresh(i, e) {
    const t = !StringUtils_1.StringUtils.IsEmpty(i);
    t && this.LBt(i), this.m0i(t), this.d0i(e);
  }
  d0i(i) {
    this.c0i();
    const e = this.GetItem(0);
    if (i && i.length !== 0) {
      for (const t of i) this.C0i(t);
      e.SetUIActive(!0);
    } else e.SetUIActive(!1);
  }
  LBt(i) {}
  m0i(i) {}
  C0i(i) {
    var e = LguiUtil_1.LguiUtil.CopyItem(this._0i, this.u0i);
    var e = new TrainingItem_1.TrainingItem(e);
    e.SetData(i.TrainingData), e.SetActive(!0), this.Ygi.push(e);
  }
  c0i() {
    for (const i of this.Ygi) i.Destroy();
    this.Ygi.length = 0;
  }
}
exports.RewardExploreBarList = RewardExploreBarList;
// # sourceMappingURL=RewardExploreBarList.js.map
