"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressDoubleDropChallengeItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  ButtonItem_1 = require("../../../../../Common/Button/ButtonItem"),
  SkipTaskManager_1 = require("../../../../../SkipInterface/SkipTaskManager"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil");
class ActivityRegressDoubleDropChallengeItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.EntryType = e),
      (this.p9t = void 0),
      (this.tWt = () => {
        var e = ModelManager_1.ModelManager.ActivityRegressModel.Grade,
          e =
            ConfigManager_1.ConfigManager.ActivityRegressConfig.GetDoubleDropConfig(
              e,
            );
        1 === this.EntryType
          ? SkipTaskManager_1.SkipTaskManager.RunByConfigId(
              e.WorldBossAccessPathId,
            )
          : 2 === this.EntryType &&
            SkipTaskManager_1.SkipTaskManager.RunByConfigId(e.WeekAccessPathId);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIText],
    ];
  }
  OnStart() {
    var e = this.GetItem(2);
    (this.p9t = new ButtonItem_1.ButtonItem(e)), this.p9t.SetFunction(this.tWt);
  }
  OnBeforeShow() {
    this.Ll1();
  }
  Ll1() {
    this.Hli(), this.lf1();
  }
  Hli() {
    var e,
      t =
        ConfigManager_1.ConfigManager.ActivityRegressConfig.GetDoubleDropConfig(
          ModelManager_1.ModelManager.ActivityRegressModel.Grade,
        ),
      i =
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.IsDoubleDropUnlock(
          this.EntryType,
        );
    let a = "";
    1 === this.EntryType &&
      ((e = t.BossUnLock),
      (e =
        ConfigManager_1.ConfigManager.ActivityRegressConfig.GetConditionGroup(
          e,
        )),
      (a = e?.HintText ?? "")),
      2 === this.EntryType &&
        ((e = t.WeekUnLock),
        (t =
          ConfigManager_1.ConfigManager.ActivityRegressConfig.GetConditionGroup(
            e,
          )),
        (a = t?.HintText ?? "")),
      i ||
        StringUtils_1.StringUtils.IsEmpty(a) ||
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), a),
      this.p9t.SetUiActive(i),
      this.GetItem(3).SetUIActive(!i);
  }
  lf1() {
    var e =
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.IsDoubleDropUnlock(
          this.EntryType,
        ),
      t =
        ModelManager_1.ModelManager.ActivityRegressModel.GetDoubleDropRestTimes(
          this.EntryType,
        ),
      i =
        ModelManager_1.ModelManager.ActivityRegressModel.GetDoubleDropMaxTimes(
          this.EntryType,
        ),
      a = this.GetText(6);
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      a,
      "Recall_double_reward_tips",
      e ? t : i,
      i,
    );
  }
}
exports.ActivityRegressDoubleDropChallengeItem =
  ActivityRegressDoubleDropChallengeItem;
//# sourceMappingURL=ActivityRegressDoubleDropChallengeItem.js.map
