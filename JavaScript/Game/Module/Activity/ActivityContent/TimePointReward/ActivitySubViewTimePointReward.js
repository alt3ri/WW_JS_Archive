"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewTimePointReward = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
  ActivityTimePointRewardController_1 = require("./ActivityTimePointRewardController"),
  TimePointRewardItem_1 = require("./TimePointRewardItem");
class ActivitySubViewTimePointReward extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityTimePointRewardData = void 0),
      (this.LNe = void 0),
      (this.Tei = void 0),
      (this.iJs = void 0),
      (this.sGe = () => {
        var e = new TimePointRewardItem_1.TimePointRewardItem();
        return (e.OnClickToGet = this.rJs), e;
      }),
      (this.wNe = (e) => {
        this.ActivityBaseData.Id === e && this.Z3e();
      }),
      (this.rJs = (e) => {
        ActivityTimePointRewardController_1.ActivityTimePointRewardController.GetRewardById(
          this.ActivityTimePointRewardData.Id,
          e,
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  OnSetData() {
    this.ActivityTimePointRewardData = this.ActivityBaseData;
  }
  async OnBeforeStartAsync() {
    var e = [],
      i = this.GetItem(0),
      i =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        e.push(this.LNe.CreateThenShowByActorAsync(i.GetOwner())),
        (this.Tei = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(2),
          this.sGe,
        )),
        ConfigManager_1.ConfigManager.ActivityTimePointRewardConfig.GetConfigByActivityId(
          this.ActivityBaseData.Id,
        ));
    (this.iJs = new UiPanelBase_1.UiPanelBase()),
      e.push(
        this.iJs.CreateThenShowByResourceIdAsync(i.UiPrefab, this.GetItem(4)),
      ),
      this.AddChild(this.iJs),
      await Promise.all(e);
  }
  OnStart() {
    var e = this.ActivityTimePointRewardData.LocalConfig,
      i =
        (this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
        !StringUtils_1.StringUtils.IsEmpty(e?.DescTheme)),
      i =
        (this.LNe.SetSubTitleVisible(i),
        i && this.LNe.SetSubTitleByTextId(e.DescTheme),
        this.GetText(1)),
      t = !StringUtils_1.StringUtils.IsEmpty(e?.Desc);
    i.SetUIActive(t), t && i.ShowTextNew(e.Desc);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.wNe,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.wNe,
    );
  }
  async OnBeforeShowSelfAsync() {
    await this.Z3e();
  }
  async Z3e() {
    var e = this.ActivityTimePointRewardData.GetRewardDataList();
    await this.Tei.RefreshByDataAsync(e);
  }
  OnTimer(e) {
    this.FNe();
  }
  FNe() {
    var [e, i] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(e), e && this.LNe.SetTimeTextByText(i);
  }
}
exports.ActivitySubViewTimePointReward = ActivitySubViewTimePointReward;
//# sourceMappingURL=ActivitySubViewTimePointReward.js.map
