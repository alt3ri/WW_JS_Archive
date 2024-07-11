"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewRoleTrial = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const RoleController_1 = require("../../../RoleUi/RoleController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityRoleDescribeComponent_1 = require("../UniversalComponents/ActivityRoleDescribeComponent");
const ActivitySmallItemGrid_1 = require("../UniversalComponents/ActivitySmallItemGrid");
const ActivityDescriptionTypeB_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeB");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityRoleTrialController_1 = require("./ActivityRoleTrialController");
class ActivitySubViewRoleTrial extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.Dke = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.Nke = void 0),
      (this.CurrentRoleId = 0),
      (this.Oke = void 0),
      (this.kke = (t) => {
        t === this.ActivityBaseData.Id &&
          ((t = this.ActivityBaseData.RoleIdList),
          this.Nke.RefreshByData(t, () => {
            this.Fke(this.CurrentRoleId), this.Vke(this.CurrentRoleId);
          }));
      }),
      (this.Rke = () => {
        return new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
      }),
      (this.Hke = () => {
        const t = new RoleItem();
        return (t.ToggleCallBack = this.pqe), t;
      }),
      (this.pqe = (t, i) => {
        const e = this.ActivityBaseData.RoleIdList.indexOf(this.CurrentRoleId);
        this.Nke.GetLayoutItemByIndex(e)?.SetToggleState(!1),
          this.Vke(t),
          this.jke();
      }),
      (this.Pke = () => {
        var t =
          ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
            this.CurrentRoleId,
          );
        var t = t?.TrialRoleId ? t.TrialRoleId : 0;
        const i = this.ActivityBaseData.RoleTrialIdList;
        RoleController_1.RoleController.OpenRoleMainView(
          1,
          t,
          i,
          void 0,
          () => {
            this.ActivityBaseData.SetRoleTrialState(2);
          },
        );
      }),
      (this.Wke = () => {
        ActivityRoleTrialController_1.ActivityRoleTrialController.RequestRoleInstanceReward(
          this.CurrentRoleId,
        );
      }),
      (this.Kke = () => {
        let t;
        RoleController_1.RoleController.IsInRoleTrial()
          ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "TrialRoleDungeonsLimit",
            )
          : void 0 !==
              (t = this.ActivityBaseData.GetInstanceIdByRoleId(
                this.CurrentRoleId,
              )) &&
            (this.ActivityBaseData.SetRoleTrialState(3),
            ActivityRoleTrialController_1.ActivityRoleTrialController.EnterRoleTrialDungeonDirectly(
              t,
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
        [6, this.Pke],
        [11, this.Wke],
      ]);
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    var t = this.GetItem(3);
    var t =
      ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
      await this.LNe.CreateThenShowByActorAsync(t.GetOwner()),
      this.GetItem(4));
    var t =
      ((this.DNe = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB()),
      await this.DNe.CreateThenShowByActorAsync(t.GetOwner()),
      this.GetItem(7));
    var t =
      ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
      await this.UNe.CreateThenShowByActorAsync(t.GetOwner()),
      this.GetItem(5));
    var t =
      ((this.Dke =
        new ActivityRoleDescribeComponent_1.ActivityRoleDescribeComponent()),
      await this.Dke.CreateThenShowByActorAsync(t.GetOwner()),
      this.GetItem(8));
    (this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
      await this.ANe.CreateThenShowByActorAsync(t.GetOwner()),
      (this.Nke = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(2),
        this.Hke,
      )),
      (this.Oke = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnStart() {
    var t = this.ActivityBaseData.LocalConfig;
    var t =
      (this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
      this.FNe(),
      this.DNe.SetContentVisible(!StringUtils_1.StringUtils.IsEmpty(t?.Desc)),
      t?.Desc && this.DNe.SetContentByTextId(t.Desc),
      this.DNe.SetTitleVisible(
        !StringUtils_1.StringUtils.IsEmpty(t?.DescTheme),
      ),
      t?.DescTheme && this.DNe.SetTitleByTextId(t.DescTheme),
      this.UNe.SetTitleByTextId("CollectActivity_reward"),
      this.UNe.InitGridLayout(this.Rke),
      this.ANe.FunctionButton?.BindCallback(this.Kke),
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "CollectActivity_Button_ahead",
      ));
    var t =
      (this.ANe.FunctionButton.SetText(t), this.ActivityBaseData.RoleIdList);
    if (t.length !== 0) {
      const i =
        this.ActivityBaseData.CurrentRoleId === 0
          ? t[0]
          : this.ActivityBaseData.CurrentRoleId;
      this.Nke.RefreshByData(t, () => {
        this.Fke(i);
      });
    }
  }
  OnBeforeShow() {}
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.kke,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.kke,
    );
  }
  OnBeforeHide() {
    this.ActivityBaseData.IsRoleInstanceOn() ||
      this.ActivityBaseData.SetRoleTrialState(0);
  }
  OnBeforeDestroy() {
    this.ActivityBaseData.IsRoleInstanceOn() ||
      (this.ActivityBaseData.SetRoleTrialState(0), this.Qke(0)),
      this.Oke?.Clear();
  }
  OnRefreshView() {
    this.Xke(),
      this.FNe(),
      this.ActivityBaseData.SetRoleTrialState(1),
      this.ActivityBaseData.CurrentRoleId !== this.CurrentRoleId
        ? this.Fke(this.ActivityBaseData.CurrentRoleId)
        : this.jke();
  }
  Xke() {
    let t = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!t),
      this.ANe.FunctionButton.SetUiActive(t),
      t ||
        ((t = this.GetCurrentLockConditionText()),
        this.ANe.SetLockTextByTextId(t));
  }
  OnTimer(t) {
    this.FNe();
  }
  FNe() {
    const [t, i] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(t), t && this.LNe.SetTimeTextByText(i);
  }
  Qke(t) {
    (this.CurrentRoleId = t), (this.ActivityBaseData.CurrentRoleId = t);
  }
  Vke(t) {
    this.Qke(t);
    var i =
      ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
        t,
      );
    this.Dke.Update(t);
    const e = this.GetTexture(1);
    e.SetUIActive(!1),
      this.SetTextureByPath(i.RoleStand, e, void 0, () => {
        e.SetUIActive(!0);
      });
    let s;
    var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    i &&
      ((i = i.PartyId),
      (i = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(i)),
      StringUtils_1.StringUtils.IsEmpty(i?.Logo) ||
        ((s = this.GetTexture(0)), this.SetTextureByPath(i.Logo, s))),
      this.jqe(t);
  }
  jke() {
    this.Oke.GetCurrentSequence() === "Switch"
      ? this.Oke.ReplaySequenceByKey("Switch")
      : this.Oke.PlayLevelSequenceByName("Switch", !1);
  }
  jqe(t) {
    const i = this.ActivityBaseData.GetRewardDataByRoleId(t);
    var t =
      (this.UNe.SetItemLayoutVisible(void 0 !== i && i.length > 0),
      this.ActivityBaseData.GetRewardStateByRoleId(t));
    i && i.length > 0 && this.UNe.RefreshItemLayout(i),
      this.GetItem(9).SetUIActive(t === 2),
      this.GetItem(10).SetUIActive(t === 0),
      this.GetButton(11).RootUIComp.SetUIActive(t === 1);
  }
  Fke(t) {
    t = this.ActivityBaseData.RoleIdList.indexOf(t);
    t >= 0 && this.Nke.GetLayoutItemByIndex(t)?.SetToggleState(!0, !0);
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
      (this.$ke = () =>
        !this.CanToggleExecuteChange ||
        this.CanToggleExecuteChange(this.RoleId)),
      (this.Yke = () => {
        this.ToggleCallBack &&
          this.ToggleCallBack(this.RoleId, this.Toggle.GetToggleState() === 1);
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
      (this.BtnBindInfo = [[0, this.Yke]]);
  }
  OnStart() {
    (this.Toggle = this.GetExtendToggle(0)),
      this.Toggle &&
        (this.Toggle.CanExecuteChange.Unbind(),
        this.Toggle.CanExecuteChange.Bind(this.$ke));
  }
  Refresh(t) {
    this.RoleId = t;
    let i;
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      ActivityRoleTrialController_1.ActivityRoleTrialController
        .CurrentActivityId,
    );
    t &&
      ((i =
        ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
          this.RoleId,
        )),
      (i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
        i.TrialRoleId,
      )),
      this.SetRoleIcon(
        i.GetRoleConfig().Card,
        this.GetTexture(3),
        i.GetRoleId(),
      ),
      this.Jke(i.GetRoleConfig().QualityId),
      this.BNe(t));
  }
  Jke(t) {
    var i = this.GetSprite(1);
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      "SP_RoleIconANormal" + t,
    );
    var e = (this.SetSpriteByPath(e, i, !1), this.GetSprite(2));
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      "SP_RoleIconAHold" + t,
    );
    this.SetSpriteByPath(i, e, !1);
  }
  BNe(t) {
    t = t.GetRewardStateByRoleId(this.RoleId);
    this.GetItem(4).SetUIActive(t === 1);
  }
  SetToggleState(t, i = !1) {
    this.Toggle?.SetToggleState(t ? 1 : 0, i);
  }
}
// # sourceMappingURL=ActivitySubViewRoleTrial.js.map
