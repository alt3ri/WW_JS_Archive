"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingRiskInstanceView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  MowingRiskInstanceDetailView_1 = require("./MowingRiskInstanceDetailView");
class MowingRiskInstanceView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.e8a = void 0),
      (this.t8a = () => {
        UiManager_1.UiManager.OpenView("MowingBuffView", 0);
      }),
      (this.i8a = () => {
        UiManager_1.UiManager.OpenView(
          "ActivityRewardPopUpView",
          ModelManager_1.ModelManager.MowingRiskModel.BuildActivityRewardViewData(),
        );
      });
  }
  get ResourceId() {
    return ModelManager_1.ModelManager.MowingRiskModel
      .InstanceSubViewResourceId;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [4, this.t8a],
        [6, this.i8a],
      ]);
  }
  async OnBeforeStartAsync() {
    await this.r8a(),
      RedDotController_1.RedDotController.BindRedDot(
        "RedDotMowingRiskBuffAll",
        this.GetItem(5),
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "RedDotMowingRiskReward",
        this.GetItem(7),
      );
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "RedDotMowingRiskBuffAll",
      this.GetItem(5),
    ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "RedDotMowingRiskReward",
        this.GetItem(7),
      );
  }
  OnStart() {
    this.o8a(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MowingRiskOnRefreshRewardRedDot,
      );
  }
  async RefreshExternalAsync() {
    var e = ModelManager_1.ModelManager.MowingRiskModel,
      i = e.BuildInstanceDetailDataByInstanceId(e.CurrentInstanceId),
      i =
        (await this.e8a.RefreshExternalByDataAsync(i),
        e.BuildInstanceRecommendDataByInstanceId(e.CurrentInstanceId));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.TextId, i.TextArgs),
      this.GetText(8)?.SetText(e.BuildInstanceTotalScore());
  }
  RefreshOnTick() {
    var e = ModelManager_1.ModelManager.MowingRiskModel,
      e = e.BuildInstanceDetailLockDataByInstanceId(e.CurrentInstanceId);
    this.e8a.RefreshLockItemExternalByData(e);
  }
  async r8a() {
    var e = new MowingRiskInstanceDetailView_1.MowingRiskInstanceDetailView();
    await e.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      (this.e8a = e);
  }
  o8a() {
    this.GetItem(1)?.SetUIActive(!1), this.GetItem(2)?.SetUIActive(!0);
  }
}
exports.MowingRiskInstanceView = MowingRiskInstanceView;
//# sourceMappingURL=MowingRiskInstanceView.js.map
