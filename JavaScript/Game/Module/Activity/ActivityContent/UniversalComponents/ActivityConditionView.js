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
      (this.o8a = void 0),
      (this.n8a = () => new ActivityConditionItem());
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
    this.s8a();
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
      (i.HasPreOpenCondition()
        ? this.a8a(i.LocalConfig.Name, i.PreOpenConditionGroupId, !1)
        : this.a8a(i.LocalConfig.Name, i.ConditionGroupId, !0),
      (i =
        ModelManager_1.ModelManager.ActivityModel.GetActivityConditionData(i)),
      this.o8a?.RefreshByData(i));
  }
  s8a() {
    var i = this.GetLoopScrollViewComponent(2),
      t = this.GetItem(3);
    this.o8a = new LoopScrollView_1.LoopScrollView(i, t.GetOwner(), this.n8a);
  }
  a8a(i, t, e) {
    t =
      ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(t);
    let r = "";
    r = e
      ? t?.Relation
        ? "ActivityNotOpen_Tips02"
        : "ActivityNotOpen_Tips01"
      : t?.Relation
        ? "ActivityNotPreOpen_Tips02"
        : "ActivityNotPreOpen_Tips01";
    e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), r, e);
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
      n = 0 === i.AccessId,
      a = this.GetText(4);
    StringUtils_1.StringUtils.IsEmpty(i.ConditionTextId)
      ? a.SetText("")
      : a.ShowTextNew(i.ConditionTextId),
      a.SetChangeColor(r, a.changeColor),
      this.GetItem(0).SetUIActive(r),
      this.GetItem(1).SetUIActive(!r && s),
      this.GetItem(2).SetUIActive(!r && !s),
      this.GetItem(3).SetUIActive(!r),
      this.GetItem(6).SetUIActive(r),
      this.GetItem(7).SetUIActive(!r && n),
      this.GetButton(5).RootUIComp.SetUIActive(!r && !n && !o),
      this.GetButton(8).RootUIComp.SetUIActive(!r && !n && o);
  }
}
//# sourceMappingURL=ActivityConditionView.js.map
