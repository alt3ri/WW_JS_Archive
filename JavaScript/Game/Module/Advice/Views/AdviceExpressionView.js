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
      (this.$9e = void 0),
      (this.Y9e = void 0),
      (this._Fe = () => {
        (ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId =
          ModelManager_1.ModelManager.AdviceModel.PreSelectExpressionId),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSelectAdviceExpression,
          ),
          this.CloseMe();
      }),
      (this.J9e = () => {
        this.CloseMe();
      }),
      (this.z9e = () => {
        return new AdviceExpressionItem_1.AdviceExpressionItem();
      }),
      (this.fqe = (e, i) => {
        return new AdviceExpressionSwitchItem_1.AdviceExpressionSwitchItem();
      }),
      (this.pqe = (e) => {
        this.Z9e(e);
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
        [4, this.J9e],
        [5, this._Fe],
      ]);
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(1).GetOwner(),
      i =
        ((this.$9e = new LoopScrollView_1.LoopScrollView(
          this.GetLoopScrollViewComponent(0),
          e,
          this.z9e,
        )),
        (this.Y9e = new TabComponent_1.TabComponent(
          this.GetHorizontalLayout(2).GetRootComponent(),
          this.fqe,
          this.pqe,
          this.GetItem(3),
        )),
        (ModelManager_1.ModelManager.AdviceModel.PreSelectExpressionId =
          ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId),
        ConfigManager_1.ConfigManager.ChatConfig.GetAllExpressionGroupConfig()),
      e = i.length,
      t = (await this.Y9e.RefreshTabItemByLengthAsync(e), this.e7e());
    let r = 0;
    for (let e = 0; e < i.length; e++)
      if (i[e].Id === t) {
        r = e;
        break;
      }
    this.t7e(), this.Y9e.SelectToggleByIndex(r), this.Z9e(i[r].Id);
  }
  Z9e(e) {
    e =
      ConfigManager_1.ConfigManager.ChatConfig.GetAllExpressionConfigByGroupId(
        e,
      );
    this.$9e.ReloadData(e);
  }
  e7e() {
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
  t7e() {
    var e,
      i,
      t =
        ConfigManager_1.ConfigManager.ChatConfig.GetAllExpressionGroupConfig();
    for ([e, i] of this.Y9e.GetTabItemMap()) i.UpdateView(t[e].Id);
  }
  OnBeforeDestroy() {
    this.$9e.ClearGridProxies(), this.Y9e.Destroy();
  }
}
exports.AdviceExpressionView = AdviceExpressionView;
//# sourceMappingURL=AdviceExpressionView.js.map
