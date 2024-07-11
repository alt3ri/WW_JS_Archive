"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewRoleTrial = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  RoleController_1 = require("../../../RoleUi/RoleController"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityRoleDescribeComponent_1 = require("../UniversalComponents/ActivityRoleDescribeComponent"),
  ActivitySmallItemGrid_1 = require("../UniversalComponents/ActivitySmallItemGrid"),
  ActivityDescriptionTypeB_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeB"),
  ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
  ActivityRoleTrialController_1 = require("./ActivityRoleTrialController");
class ActivitySubViewRoleTrial extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.j2e = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.tFe = void 0),
      (this.CurrentRoleId = 0),
      (this.iFe = void 0),
      (this.oFe = (i) => {
        i === this.ActivityBaseData.Id &&
          ((i = this.ActivityBaseData.RoleIdList),
          this.tFe.RefreshByData(i, () => {
            this.rFe(this.CurrentRoleId), this.Ake(this.CurrentRoleId);
          }));
      }),
      (this.W2e = () => {
        return new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
      }),
      (this.nFe = () => {
        var i = new RoleItem();
        return (i.ToggleCallBack = this.pqe), i;
      }),
      (this.pqe = (i, t) => {
        var e = this.ActivityBaseData.RoleIdList.indexOf(this.CurrentRoleId);
        this.tFe.GetLayoutItemByIndex(e)?.SetToggleState(!1),
          this.Ake(i),
          this.sFe();
      }),
      (this.X2e = () => {
        var i =
            ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
              this.CurrentRoleId,
            ),
          i = i?.TrialRoleId ? i.TrialRoleId : 0,
          t = this.ActivityBaseData.RoleTrialIdList;
        RoleController_1.RoleController.OpenRoleMainView(
          1,
          i,
          t,
          void 0,
          () => {
            this.ActivityBaseData.SetRoleTrialState(2);
          },
        );
      }),
      (this.aFe = () => {
        ActivityRoleTrialController_1.ActivityRoleTrialController.RequestRoleInstanceReward(
          this.CurrentRoleId,
        );
      }),
      (this.hFe = () => {
        var i;
        RoleController_1.RoleController.IsInRoleTrial()
          ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "TrialRoleDungeonsLimit",
            )
          : void 0 !==
              (i = this.ActivityBaseData.GetInstanceIdByRoleId(
                this.CurrentRoleId,
              )) &&
            (this.ActivityBaseData.SetRoleTrialState(3),
            ActivityRoleTrialController_1.ActivityRoleTrialController.EnterRoleTrialDungeonDirectly(
              i,
            ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [6, this.X2e],
        [11, this.aFe],
      ]);
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    var i = this.GetItem(3),
      i =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        await this.LNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.GetItem(4)),
      i =
        ((this.DNe = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB()),
        await this.DNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.GetItem(7)),
      i =
        ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
        await this.UNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.GetItem(5)),
      i =
        ((this.j2e =
          new ActivityRoleDescribeComponent_1.ActivityRoleDescribeComponent()),
        await this.j2e.CreateThenShowByActorAsync(i.GetOwner()),
        this.GetItem(8));
    (this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
      await this.ANe.CreateThenShowByActorAsync(i.GetOwner()),
      (this.tFe = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(2),
        this.nFe,
      )),
      (this.iFe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnStart() {
    var i = this.ActivityBaseData.LocalConfig,
      i =
        (this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
        this.LNe.SetSubTitleVisible(
          !StringUtils_1.StringUtils.IsEmpty(i?.DescTheme),
        ),
        i?.DescTheme && this.LNe.SetSubTitleByTextId(i.DescTheme),
        this.FNe(),
        this.DNe.SetContentVisible(!StringUtils_1.StringUtils.IsEmpty(i?.Desc)),
        i?.Desc && this.DNe.SetContentByTextId(i.Desc),
        this.UNe.SetTitleByTextId("CollectActivity_reward"),
        this.UNe.InitGridLayout(this.W2e),
        this.ANe.FunctionButton?.BindCallback(this.hFe),
        this.ActivityBaseData.RoleIdList);
    if (0 !== i.length) {
      const t =
        0 === this.ActivityBaseData.CurrentRoleId
          ? i[0]
          : this.ActivityBaseData.CurrentRoleId;
      this.tFe.RefreshByData(i, () => {
        this.rFe(t);
      });
    }
  }
  OnBeforeShow() {}
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.oFe,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.oFe,
    );
  }
  OnBeforeHide() {
    this.ActivityBaseData.IsRoleInstanceOn() ||
      this.ActivityBaseData.SetRoleTrialState(0);
  }
  OnBeforeDestroy() {
    this.ActivityBaseData.IsRoleInstanceOn() ||
      (this.ActivityBaseData.SetRoleTrialState(0), this.lFe(0)),
      this.iFe?.Clear();
  }
  OnRefreshView() {
    this._Fe(),
      this.FNe(),
      this.ActivityBaseData.SetRoleTrialState(1),
      this.ActivityBaseData.CurrentRoleId !== this.CurrentRoleId
        ? this.rFe(this.ActivityBaseData.CurrentRoleId)
        : this.sFe();
  }
  _Fe() {
    var i = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!i),
      this.ANe.FunctionButton.SetUiActive(i),
      i ||
        ((i = this.GetCurrentLockConditionText()),
        this.ANe.SetLockTextByTextId(i));
  }
  OnTimer(i) {
    this.FNe();
  }
  FNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i), i && this.LNe.SetTimeTextByText(t);
  }
  lFe(i) {
    (this.CurrentRoleId = i), (this.ActivityBaseData.CurrentRoleId = i);
  }
  Ake(i) {
    this.lFe(i);
    var t =
      ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
        i,
      );
    this.j2e.Update(i);
    const e = this.GetTexture(1);
    e.SetUIActive(!1),
      this.SetTextureByPath(t.RoleStand, e, void 0, () => {
        e.SetUIActive(!0);
      });
    var s,
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
    t &&
      ((t = t.PartyId),
      (t = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(t)),
      StringUtils_1.StringUtils.IsEmpty(t?.Logo) ||
        ((s = this.GetTexture(0)), this.SetTextureByPath(t.Logo, s))),
      this.jqe(i);
  }
  sFe() {
    "Switch" === this.iFe.GetCurrentSequence()
      ? this.iFe.ReplaySequenceByKey("Switch")
      : this.iFe.PlayLevelSequenceByName("Switch", !1);
  }
  jqe(i) {
    var t = this.ActivityBaseData.GetRewardDataByRoleId(i),
      i =
        (this.UNe.SetItemLayoutVisible(void 0 !== t && 0 < t.length),
        this.ActivityBaseData.GetRewardStateByRoleId(i));
    t && 0 < t.length && this.UNe.RefreshItemLayout(t),
      this.GetItem(9).SetUIActive(2 === i),
      this.GetItem(10).SetUIActive(0 === i),
      this.GetButton(11).RootUIComp.SetUIActive(1 === i);
  }
  rFe(i) {
    i = this.ActivityBaseData.RoleIdList.indexOf(i);
    0 <= i && this.tFe.GetLayoutItemByIndex(i)?.SetToggleState(!0, !0);
  }
}
exports.ActivitySubViewRoleTrial = ActivitySubViewRoleTrial;
class RoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.RoleId = 0),
      (this.Toggle = void 0),
      (this.CanToggleExecuteChange = void 0),
      (this.ToggleCallBack = void 0),
      (this.uFe = () =>
        !this.CanToggleExecuteChange ||
        this.CanToggleExecuteChange(this.RoleId)),
      (this.cFe = () => {
        this.ToggleCallBack &&
          this.ToggleCallBack(this.RoleId, 1 === this.Toggle.GetToggleState());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UITexture],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.cFe]]);
  }
  OnStart() {
    (this.Toggle = this.GetExtendToggle(0)),
      this.Toggle &&
        (this.Toggle.CanExecuteChange.Unbind(),
        this.Toggle.CanExecuteChange.Bind(this.uFe));
  }
  Refresh(i) {
    this.RoleId = i;
    var t,
      i = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
        ActivityRoleTrialController_1.ActivityRoleTrialController
          .CurrentActivityId,
      );
    i &&
      ((t =
        ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
          this.RoleId,
        )),
      (t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
        t.TrialRoleId,
      )),
      this.SetRoleIcon(
        t.GetRoleConfig().Card,
        this.GetTexture(3),
        t.GetRoleId(),
      ),
      this.mFe(t.GetRoleConfig().QualityId),
      this.BNe(i));
  }
  mFe(i) {
    var t = this.GetSprite(1),
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_RoleIconANormal" + i,
      ),
      e = (this.SetSpriteByPath(e, t, !1), this.GetSprite(2)),
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_RoleIconAHold" + i,
      );
    this.SetSpriteByPath(t, e, !1);
  }
  BNe(i) {
    i = i.GetRewardStateByRoleId(this.RoleId);
    this.GetItem(4).SetUIActive(1 === i);
  }
  SetToggleState(i, t = !1) {
    this.Toggle?.SetToggleState(i ? 1 : 0, t);
  }
}
//# sourceMappingURL=ActivitySubViewRoleTrial.js.map
