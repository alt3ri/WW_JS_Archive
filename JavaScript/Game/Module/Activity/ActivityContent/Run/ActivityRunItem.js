"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRunItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  ActivityRunController_1 = require("./ActivityRunController");
class ActivityRunItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.bOe = void 0),
      (this.HFe = 0),
      (this.r3e = (e) => {
        e === this.HFe && this.n3e();
      }),
      (this.JGe = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.s3e = () => {
        var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
          ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
        ).GetScoreIndex(this.HFe);
        ActivityRunController_1.ActivityRunController.RequestTakeChallengeReward(
          ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
          e,
        );
      });
  }
  GetKey(e, t) {}
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[4, this.s3e]]);
  }
  OnStart() {
    var e = this.GetScrollViewWithScrollbar(1);
    (this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(e, () =>
      this.JGe(),
    )),
      this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnGetRunActivityReward,
      this.r3e,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnGetRunActivityReward,
      this.r3e,
    );
  }
  OnSelected(e) {}
  OnDeselected(e) {}
  Refresh(e, t, i) {
    (this.HFe = e), this.mGe(), this.jqe(), this.n3e();
  }
  Clear() {}
  mGe() {
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(0),
      "ActivityRunPointNeed",
      this.HFe.toString(),
    );
  }
  jqe() {
    var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
        ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
      ),
      t = e.GetScoreIndex(this.HFe),
      e = e.GetScoreIndexPreviewItem(t);
    this.bOe.RefreshByData(e);
  }
  n3e() {
    var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
        ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
      ),
      e = e.GetScoreIndexCannotGetReward(e.GetScoreIndex(this.HFe));
    this.GetText(2).SetUIActive(!1),
      this.GetButton(4).RootUIComp.SetUIActive(!1),
      this.GetItem(5).SetUIActive(!1),
      this.GetSprite(3).SetUIActive(!1),
      0 === e
        ? this.GetText(2).SetUIActive(!0)
        : 1 === e
          ? (this.GetItem(5).SetUIActive(!0),
            this.GetButton(4).RootUIComp.SetUIActive(!0))
          : 2 === e && this.GetSprite(3).SetUIActive(!0);
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
  }
}
exports.ActivityRunItem = ActivityRunItem;
//# sourceMappingURL=ActivityRunItem.js.map
