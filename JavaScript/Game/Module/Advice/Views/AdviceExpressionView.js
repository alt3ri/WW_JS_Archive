"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceExpressionView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  TabComponent_1 = require("../../Common/TabComponent/TabComponent"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  AdviceExpressionItem_1 = require("./AdviceExpressionItem"),
  AdviceExpressionSwitchItem_1 = require("./AdviceExpressionSwitchItem");
class AdviceExpressionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lHe = void 0),
      (this._He = void 0),
      (this.L3e = () => {
        (ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId =
          ModelManager_1.ModelManager.AdviceModel.PreSelectExpressionId),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSelectAdviceExpression,
          ),
          this.CloseMe();
      }),
      (this.uHe = () => {
        this.CloseMe();
      }),
      (this.cHe = () => {
        return new AdviceExpressionItem_1.AdviceExpressionItem();
      }),
      (this.fqe = (e, i) => {
        return new AdviceExpressionSwitchItem_1.AdviceExpressionSwitchItem();
      }),
      (this.pqe = (e) => {
        this.mHe(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [4, this.uHe],
        [5, this.L3e],
      ]);
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(1).GetOwner(),
      i =
        ((this.lHe = new LoopScrollView_1.LoopScrollView(
          this.GetLoopScrollViewComponent(0),
          e,
          this.cHe,
        )),
        (this._He = new TabComponent_1.TabComponent(
          this.GetHorizontalLayout(2).GetRootComponent(),
          this.fqe,
          this.pqe,
          this.GetItem(3),
        )),
        (ModelManager_1.ModelManager.AdviceModel.PreSelectExpressionId =
          ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId),
        ConfigManager_1.ConfigManager.ChatConfig.GetAllExpressionGroupConfig()),
      e = i.length,
      t = (await this._He.RefreshTabItemByLengthAsync(e), this.dHe());
    let r = 0;
    for (let e = 0; e < i.length; e++)
      if (i[e].Id === t) {
        r = e;
        break;
      }
    this.CHe(), this._He.SelectToggleByIndex(r), this.mHe(i[r].Id);
  }
  mHe(e) {
    e =
      ConfigManager_1.ConfigManager.ChatConfig.GetAllExpressionConfigByGroupId(
        e,
      );
    this.lHe.ReloadData(e);
  }
  dHe() {
    let i = 0;
    var t = ConfigManager_1.ConfigManager.ChatConfig.GetAllExpressionConfig();
    for (let e = 0; e < t.length; e++)
      if (
        t[e].Id ===
        ModelManager_1.ModelManager.AdviceModel.PreSelectExpressionId
      ) {
        i = t[e].GroupId;
        break;
      }
    return i;
  }
  CHe() {
    var e,
      i,
      t =
        ConfigManager_1.ConfigManager.ChatConfig.GetAllExpressionGroupConfig();
    for ([e, i] of this._He.GetTabItemMap()) i.UpdateView(t[e].Id);
  }
  OnBeforeDestroy() {
    this.lHe.ClearGridProxies(), this._He.Destroy();
  }
}
exports.AdviceExpressionView = AdviceExpressionView;
//# sourceMappingURL=AdviceExpressionView.js.map
