"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityConditionView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
class ActivityConditionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.LOe = 0),
      (this.T4a = void 0),
      (this.L4a = () => new ActivityConditionItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UILoopScrollViewComponent],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    this.D4a();
    var i = this.OpenParam;
    (this.LOe = i.ActivityId),
      this.LOe &&
        (i = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
          this.LOe,
        )) &&
        ModelManager_1.ModelManager.ActivityModel.SendActivityLockConditionLogData(
          i,
        );
  }
  OnBeforeShow() {
    var i = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LOe);
    i &&
      (this.A4a(i.LocalConfig.Name, i.ConditionGroupId),
      (i =
        ModelManager_1.ModelManager.ActivityModel.GetActivityConditionData(i)),
      this.T4a?.RefreshByData(i));
  }
  D4a() {
    var i = this.GetLoopScrollViewComponent(2),
      t = this.GetItem(3);
    this.T4a = new LoopScrollView_1.LoopScrollView(i, t.GetOwner(), this.L4a);
  }
  A4a(i, t) {
    (t = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(
      t,
    )?.Relation
      ? "ActivityNotOpen_Tips02"
      : "ActivityNotOpen_Tips01"),
      (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, i);
  }
}
exports.ActivityConditionView = ActivityConditionView;
class ActivityConditionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.$3e = () => {
        this.Pe?.AccessId &&
          SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Pe.AccessId);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [5, this.$3e],
        [8, this.$3e],
      ]);
  }
  Refresh(i, t, e) {
    var r = (this.Pe = i).IsFinished,
      s = 7 === i.AccessType,
      o = 16 === i.AccessType,
      a = 0 === i.AccessId,
      n = this.GetText(4);
    StringUtils_1.StringUtils.IsEmpty(i.ConditionTextId)
      ? n.SetText("")
      : n.ShowTextNew(i.ConditionTextId),
      n.SetChangeColor(r, n.changeColor),
      this.GetItem(0).SetUIActive(r),
      this.GetItem(1).SetUIActive(!r && s),
      this.GetItem(2).SetUIActive(!r && !s),
      this.GetItem(3).SetUIActive(!r),
      this.GetItem(6).SetUIActive(r),
      this.GetItem(7).SetUIActive(!r && a),
      this.GetButton(5).RootUIComp.SetUIActive(!r && !a && !o),
      this.GetButton(8).RootUIComp.SetUIActive(!r && !a && o);
  }
}
//# sourceMappingURL=ActivityConditionView.js.map
