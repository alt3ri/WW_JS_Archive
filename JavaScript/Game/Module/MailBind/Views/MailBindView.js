"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MailBindView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  KuroSdkController_1 = require("../../../KuroSdk/KuroSdkController"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Title/ActivityTitleTypeA"),
  HelpController_1 = require("../../Help/HelpController"),
  MailBindController_1 = require("../MailBindController");
class MailBindView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.lqe = void 0),
      (this.KZs = !1),
      (this.ail = () => {
        MailBindController_1.MailBindController.MailBindRequest(),
          this.KZs
            ? KuroSdkController_1.KuroSdkController.PostKuroSdkEvent(13)
            : ControllerHolder_1.ControllerHolder.ChannelController.OpenKuroStreet(),
          MailBindController_1.MailBindController.RecordMailBindJumpToWebView();
      }),
      (this.B6e = () => {
        this.CloseMe();
      }),
      (this.Nwn = () => {
        MailBindController_1.MailBindController.MailBindRewardRequest();
      }),
      (this.lil = () => {
        var i = this.KZs ? "Mail_Activity_HelpId02" : "Mail_Activity_HelpId01",
          i = CommonParamById_1.configCommonParamById.GetIntConfig(i);
        HelpController_1.HelpController.OpenHelpById(i);
      }),
      (this.oil = () => {
        this.Refresh();
      });
  }
  async OnCreateAsync() {
    await MailBindController_1.MailBindController.MailBindInfoRequestAsync();
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[7, this.Nwn]]);
  }
  async OnBeforeStartAsync() {
    void 0 === this.OpenParam &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("Activity", 43, "邮箱绑定界面必须传入参数"),
      (this.KZs = this.OpenParam);
    var i = this.GetItem(0),
      t =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        this.GetItem(1)),
      e =
        ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
        this.GetItem(2)),
      n =
        ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
        this.GetItem(3));
    (this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(void 0)),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(4))),
      await Promise.all([
        this.LNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.DNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.UNe.CreateThenShowByActorAsync(e.GetOwner()),
        this.ANe.CreateThenShowByActorAsync(n.GetOwner()),
      ]);
  }
  OnStart() {
    var i = this.KZs
        ? "Mail_Activity_Function_Entry02"
        : "Mail_Activity_Function_Entry01",
      i =
        (this.lqe.SetTitleByTextIdAndArgNew(i),
        this.lqe.SetCloseCallBack(this.B6e),
        this.lqe?.SetHelpCallBack(this.lil),
        this.KZs ? "SP_MailBindIcon" : "SP_KuroStreetIcon"),
      i =
        (this.lqe.SetTitleIconByResourceId(i),
        this.KZs ? "Mail_Activity_Title02" : "Mail_Activity_Title"),
      i =
        (this.LNe.SetTitleByTextId(i),
        this.LNe.SetSubTitleVisible(!1),
        this.KZs ? "Mail_Activity_Desc02" : "Mail_Activity_Desc01"),
      i =
        (this.DNe.SetContentByTextId(i),
        CommonParamById_1.configCommonParamById.GetIntConfig("MailBindReward")),
      i =
        ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
          i,
        ),
      i =
        (this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
        this.UNe.RefreshItemLayout(i),
        this.KZs ? "Mail_Activity_Binding" : "Mail_Activity_Login"),
      i =
        (this.ANe.FunctionButton.SetFunction(this.ail),
        this.ANe.FunctionButton.SetLocalTextNew(i),
        this.KZs ? "Mail_Activity_Finish02" : "Mail_Activity_Finish01");
    this.ANe.SetActivateTextByTextId(i),
      MailBindController_1.MailBindController.RecordMailBindNextShowRedDotTime();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnMailBindInfoNotify,
      this.oil,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnMailBindInfoNotify,
      this.oil,
    );
  }
  OnBeforeShow() {
    this.Refresh();
  }
  Refresh() {
    this.FNe(), this._Oe();
  }
  FNe() {
    var i = ModelManager_1.ModelManager.MailBindModel,
      t = this.KZs && i.GetIsReward();
    this.LNe.SetTimeTextVisible(t),
      t &&
        ((t = i.GetRemainTimeText(i.GetCloseTime()) ?? ""),
        this.LNe.SetTimeTextByText(t));
  }
  _Oe() {
    var i = ModelManager_1.ModelManager.MailBindModel.GetState();
    this.GetItem(6)?.SetUIActive(0 === i),
      this.GetButton(7)?.RootUIComp.SetUIActive(1 === i),
      this.GetItem(5)?.SetUIActive(2 === i),
      this.ANe.SetLockConditionButtonVisible(!1),
      this.ANe.SetActivatePanelConditionVisible(0 !== i),
      this.ANe.FunctionButton?.SetUiActive(0 === i);
  }
}
exports.MailBindView = MailBindView;
//# sourceMappingURL=MailBindView.js.map
