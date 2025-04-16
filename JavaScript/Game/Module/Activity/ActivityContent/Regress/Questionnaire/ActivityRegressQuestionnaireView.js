"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressQuestionnaireView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  ActivityControllerHolder_1 = require("../../../ActivityControllerHolder"),
  RegressDefine_1 = require("../Base/RegressDefine"),
  ActivityRegressHelper_1 = require("../Misc/ActivityRegressHelper"),
  ActivityRegressQuestionnaireLayoutItem_1 = require("./ActivityRegressQuestionnaireLayoutItem");
class ActivityRegressQuestionnaireView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.gl1 = void 0),
      (this.Cl1 = void 0),
      (this.pl1 = () =>
        new ActivityRegressQuestionnaireLayoutItem_1.ActivityRegressQuestionnaireLayoutItem()),
      (this.Sl1 = () => {
        var e =
            ModelManager_1.ModelManager.ActivityRegressModel.GetRegressQuestionnaireRewardDataList(
              RegressDefine_1.ERegressQuestionnaireType.Type1,
            ),
          e =
            (this.gl1.RefreshByData(e),
            ModelManager_1.ModelManager.ActivityRegressModel.GetRegressQuestionnaireRewardDataList(
              RegressDefine_1.ERegressQuestionnaireType.Type2,
            ));
        this.Cl1.RefreshByData(e),
          this.GetItem(6).SetUIActive(
            ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.IsQuestionnaireUnlock(
              RegressDefine_1.ERegressQuestionnaireType.Type2,
            ),
          );
      }),
      (this.vl1 = () => {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.OpenQuestionnaire(
          RegressDefine_1.ERegressQuestionnaireType.Type1,
        );
        var e =
          ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestionnaireConfig(
            RegressDefine_1.ERegressQuestionnaireType.Type1,
          );
        0 ===
          ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetQuestionnaireRewardState(
            e.Id,
          ) &&
          (ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestQuestionOpen(
            RegressDefine_1.ERegressQuestionnaireType.Type1,
          ),
          ActivityRegressHelper_1.ActivityRegressHelper.ReportRegressLog1061(
            e.QuestionnaireId,
          ));
      }),
      (this.yl1 = () => {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.OpenQuestionnaire(
          RegressDefine_1.ERegressQuestionnaireType.Type2,
        );
        var e =
          ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestionnaireConfig(
            RegressDefine_1.ERegressQuestionnaireType.Type2,
          );
        0 ===
          ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetQuestionnaireRewardState(
            e.Id,
          ) &&
          (ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestQuestionOpen(
            RegressDefine_1.ERegressQuestionnaireType.Type2,
          ),
          ActivityRegressHelper_1.ActivityRegressHelper.ReportRegressLog1061(
            e.QuestionnaireId,
          ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [2, this.vl1],
        [5, this.yl1],
      ]);
  }
  OnStart() {
    (this.gl1 = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(0),
      this.pl1,
    )),
      (this.Cl1 = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(3),
        this.pl1,
      ));
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.SetQuestionnaireRedDotChecked(),
      this.Sl1();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RecallActivityInfoUpdate,
      this.Sl1,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RecallActivityInfoUpdate,
      this.Sl1,
    );
  }
  OnBeforeDestroy() {
    this.gl1.ClearChildren(), this.Cl1.ClearChildren();
  }
}
exports.ActivityRegressQuestionnaireView = ActivityRegressQuestionnaireView;
//# sourceMappingURL=ActivityRegressQuestionnaireView.js.map
