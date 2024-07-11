"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRunItem = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ActivityRunController_1 = require("./ActivityRunController");
class ActivityRunItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.bOe = void 0),
      (this.D2e = 0),
      (this.V2e = (e) => {
        e === this.D2e && this.H2e();
      }),
      (this.JGe = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.j2e = () => {
        const e =
          ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
            ModelManager_1.ModelManager.ActivityRunModel
              .CurrentSelectChallengeId,
          ).GetScoreIndex(this.D2e);
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
      (this.BtnBindInfo = [[4, this.j2e]]);
  }
  OnStart() {
    const e = this.GetScrollViewWithScrollbar(1);
    (this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(e, () =>
      this.JGe(),
    )),
      this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnGetRunActivityReward,
      this.V2e,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnGetRunActivityReward,
      this.V2e,
    );
  }
  OnSelected(e) {}
  OnDeselected(e) {}
  Refresh(e, t, i) {
    (this.D2e = e), this.mGe(), this.jqe(), this.H2e();
  }
  Clear() {}
  mGe() {
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(0),
      "ActivityRunPointNeed",
      this.D2e.toString(),
    );
  }
  jqe() {
    var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
      ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
    );
    const t = e.GetScoreIndex(this.D2e);
    var e = e.GetScoreIndexPreviewItem(t);
    this.bOe.RefreshByData(e);
  }
  H2e() {
    var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
      ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
    );
    var e = e.GetScoreIndexCannotGetReward(e.GetScoreIndex(this.D2e));
    this.GetText(2).SetUIActive(!1),
      this.GetButton(4).RootUIComp.SetUIActive(!1),
      this.GetItem(5).SetUIActive(!1),
      this.GetSprite(3).SetUIActive(!1),
      e === 0
        ? this.GetText(2).SetUIActive(!0)
        : e === 1
          ? (this.GetItem(5).SetUIActive(!0),
            this.GetButton(4).RootUIComp.SetUIActive(!0))
          : e === 2 && this.GetSprite(3).SetUIActive(!0);
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
  }
}
exports.ActivityRunItem = ActivityRunItem;
// # sourceMappingURL=ActivityRunItem.js.map
