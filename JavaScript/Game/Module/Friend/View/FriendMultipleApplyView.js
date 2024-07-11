"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendMultipleApplyView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  FriendMultipleApplyItem_1 = require("./FriendMultipleApplyItem");
class FriendMultipleApplyView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.bNi = void 0),
      (this.Rta = void 0),
      (this.oOi = () =>
        new FriendMultipleApplyItem_1.FriendMultipleApplyItem()),
      (this.rOi = () => {
        this.Rta.length <= 0 &&
          UiManager_1.UiManager.CloseView("FriendMultipleApplyView"),
          this.bNi.RefreshByData(this.Rta);
      }),
      (this.Xua = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    (this.Rta = this.OpenParam), this.nOi();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
      this.rOi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FriendOnMultiItemAction,
        this.Xua,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
      this.rOi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FriendOnMultiItemAction,
        this.Xua,
      );
  }
  OnTick(e) {
    if (!(this.bNi.Iei < 0)) {
      var i = this.bNi.GetDisplayGridNum();
      for (let e = this.bNi.Iei; e < i; e++)
        this.bNi.UnsafeGetGridProxy(e)?.UpdateCountDownProgressBar();
    }
  }
  OnBeforeDestroy() {
    this.bNi && this.bNi.ClearGridProxies(), (this.bNi = void 0);
  }
  RefreshLoopScrollView() {
    this.bNi.RefreshByData(this.Rta);
  }
  nOi() {
    var e = this.GetLoopScrollViewComponent(0),
      i = this.GetItem(1).GetOwner();
    (this.bNi = new LoopScrollView_1.LoopScrollView(e, i, this.oOi)),
      this.RefreshLoopScrollView();
  }
}
exports.FriendMultipleApplyView = FriendMultipleApplyView;
//# sourceMappingURL=FriendMultipleApplyView.js.map
