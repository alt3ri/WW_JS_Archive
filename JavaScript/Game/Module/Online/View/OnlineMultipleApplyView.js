"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineMultipleApplyView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  OnlineMultipleApplyItem_1 = require("./OnlineMultipleApplyItem");
class OnlineMultipleApplyView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.bNi = void 0),
      (this.oOi = () =>
        new OnlineMultipleApplyItem_1.OnlineMultipleApplyItem()),
      (this.rOi = () => {
        var e = ModelManager_1.ModelManager.OnlineModel.GetCurrentApplyList();
        e.length <= 0 &&
          UiManager_1.UiManager.CloseView("OnlineMultipleApplyView"),
          this.bNi.ReloadData(e);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.nOi();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshApply,
      this.rOi,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshApply,
      this.rOi,
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
    this.bNi && this.bNi.ClearGridProxies(),
      0 <
        ModelManager_1.ModelManager.OnlineModel.GetCurrentApplyList().length &&
        UiManager_1.UiManager.OpenView("OnlineApplyView"),
      (this.bNi = void 0);
  }
  RefreshLoopScrollView() {
    this.bNi.ReloadData(
      ModelManager_1.ModelManager.OnlineModel.GetCurrentApplyList(),
    );
  }
  nOi() {
    var e = this.GetLoopScrollViewComponent(0),
      i = this.GetItem(1).GetOwner();
    (this.bNi = new LoopScrollView_1.LoopScrollView(e, i, this.oOi)),
      this.RefreshLoopScrollView();
  }
}
exports.OnlineMultipleApplyView = OnlineMultipleApplyView;
//# sourceMappingURL=OnlineMultipleApplyView.js.map
