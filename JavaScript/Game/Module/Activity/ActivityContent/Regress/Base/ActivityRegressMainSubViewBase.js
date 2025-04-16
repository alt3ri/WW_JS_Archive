"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressMainSubViewBase = void 0);
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
class ActivityRegressMainSubViewBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.PassRecallBaseCallBack = void 0),
      (this.SequencePlayer = void 0);
  }
  OnStart() {
    var e = this.GetRootItem();
    this.SequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(e);
  }
  BindPassRecallBaseCallBack(e) {
    this.PassRecallBaseCallBack = e;
  }
  UnBindPassRecallBaseCallBack() {
    this.PassRecallBaseCallBack = void 0;
  }
  InvokePassRecallBaseCallBack(e, s) {
    this.PassRecallBaseCallBack?.(e, s);
  }
  Update(e = 0) {
    this.OnUpdate(e);
  }
  OnUpdate(e) {}
  OnBeforeShow() {
    this.SequencePlayer.StopSequenceByKey("Start");
    var e = new CustomPromise_1.CustomPromise();
    this.SequencePlayer.PlaySequenceAsync("Start", e);
  }
  OnParentShow() {
    this.SequencePlayer.StopSequenceByKey("Start");
    var e = new CustomPromise_1.CustomPromise();
    this.SequencePlayer.PlaySequenceAsync("Start", e);
  }
}
exports.ActivityRegressMainSubViewBase = ActivityRegressMainSubViewBase;
//# sourceMappingURL=ActivityRegressMainSubViewBase.js.map
