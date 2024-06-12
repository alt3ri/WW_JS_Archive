
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ActivitySubViewRoleGuide=void 0;const UE=require("ue"),MultiTextLang_1=require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),StringUtils_1=require("../../../../../Core/Utils/StringUtils"),ModelManager_1=require("../../../../Manager/ModelManager"),UiManager_1=require("../../../../Ui/UiManager"),RoleController_1=require("../../../RoleUi/RoleController"),ScrollingTipsController_1=require("../../../ScrollingTips/ScrollingTipsController"),ActivitySubViewBase_1=require("../../View/SubView/ActivitySubViewBase"),ActivityRoleDescribeComponent_1=require("../UniversalComponents/ActivityRoleDescribeComponent"),ActivitySmallItemGrid_1=require("../UniversalComponents/ActivitySmallItemGrid"),ActivityDescriptionTypeB_1=require("../UniversalComponents/Content/ActivityDescriptionTypeB"),ActivityRewardList_1=require("../UniversalComponents/Content/ActivityRewardList"),ActivityFunctionalTypeA_1=require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),ActivityTitleTypeA_1=require("../UniversalComponents/Title/ActivityTitleTypeA");class ActivitySubViewRoleGuide extends ActivitySubViewBase_1.ActivitySubViewBase{constructor(){super(...arguments),this.ActivityBaseData=void 0,this.LNe=void 0,this.DNe=void 0,this.UNe=void 0,this.Dke=void 0,this.ANe=void 0,this.Rke=()=>{return new ActivitySmallItemGrid_1.ActivitySmallItemGrid},this.Uke=()=>{var i=this.ActivityBaseData.ShowQuestId;2===ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i)?UiManager_1.UiManager.OpenView("QuestView",i):(i=this.ActivityBaseData.RoleGuideConfig.ShowQuestGetWay,StringUtils_1.StringUtils.IsEmpty(i)||(i=MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i),StringUtils_1.StringUtils.IsEmpty(i))||ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(i))},this.Ake=()=>{var i=this.ActivityBaseData.RoleQuestId;2===ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i)&&UiManager_1.UiManager.OpenView("QuestView",i)},this.Pke=()=>{var i=[this.ActivityBaseData.RoleTrialId];RoleController_1.RoleController.OpenRoleMainView(1,0,i)}}OnRegisterComponent(){this.ComponentRegisterInfos=[[0,UE.UIItem],[1,UE.UIItem],[2,UE.UIItem],[3,UE.UIItem],[4,UE.UIItem],[5,UE.UIItem],[6,UE.UIItem],[7,UE.UIText],[8,UE.UIButtonComponent],[9,UE.UIItem],[10,UE.UIButtonComponent]],this.BtnBindInfo=[[8,this.Uke],[10,this.Pke]]}OnSetData(){}async OnBeforeStartAsync(){var i=this.GetItem(0),i=(this.LNe=new ActivityTitleTypeA_1.ActivityTitleTypeA,await this.LNe.CreateThenShowByActorAsync(i.GetOwner()),this.GetItem(1)),i=(this.DNe=new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB,await this.DNe.CreateThenShowByActorAsync(i.GetOwner()),this.GetItem(2)),i=(this.UNe=new ActivityRewardList_1.ActivityRewardList,await this.UNe.CreateThenShowByActorAsync(i.GetOwner()),this.GetItem(4)),i=(this.Dke=new ActivityRoleDescribeComponent_1.ActivityRoleDescribeComponent,await this.Dke.CreateThenShowByActorAsync(i.GetOwner()),this.GetItem(3)),i=(this.ANe=new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA,await this.ANe.CreateThenShowByActorAsync(i.GetOwner()),this.GetItem(9)),t=this.ActivityBaseData.GetRoleResourcePath();StringUtils_1.StringUtils.IsEmpty(t)||await this.LoadPrefabAsync(t,i)}OnStart(){var i=this.ActivityBaseData.LocalConfig,i=(this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),this.DNe.SetContentVisible(!StringUtils_1.StringUtils.IsEmpty(i?.Desc)),i?.Desc&&this.DNe.SetContentByTextId(i.Desc),this.DNe.SetTitleVisible(!StringUtils_1.StringUtils.IsEmpty(i?.DescTheme)),i?.DescTheme&&this.DNe.SetTitleByTextId(i.DescTheme),this.UNe.SetTitleByTextId("Activity_RoleGuideActivity_RewardDesc"),this.UNe.InitGridLayout(this.Rke),this.ANe.FunctionButton.BindCallback(this.Ake),MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CollectActivity_Button_ahead"));this.ANe.FunctionButton.SetText(i),this.Dke.Update(this.ActivityBaseData.RoleId),this.OnRefreshView()}OnRefreshView(){this.FNe(),this.xke(),this.jqe(),this._Oe()}OnTimer(i){this.FNe()}FNe(){var[i,t]=this.GetTimeVisibleAndRemainTime();this.LNe.SetTimeTextVisible(i),i&&this.LNe.SetTimeTextByText(t)}xke(){var i,t=this.ActivityBaseData?.ShowQuestId;t?(t=3!==ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t),i=ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.ActivityBaseData.RoleQuestId),t=t&&!(3===i),this.GetItem(6).SetUIActive(t),t&&(i=this.ActivityBaseData.RoleGuideConfig.ShowQuestTips,t=!StringUtils_1.StringUtils.IsEmpty(i),this.GetText(7).SetUIActive(t),t)&&this.GetText(7).ShowTextNew(i)):this.GetItem(6).SetUIActive(!1)}jqe(){var i=3===ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.ActivityBaseData.RoleQuestId),t=[];for(const s of this.ActivityBaseData.GetPreviewReward()){var e={Item:s,HasClaimed:i};t.push(e)}this.UNe.RefreshItemLayout(t)}_Oe(){var i,t=ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.ActivityBaseData.RoleQuestId),e=this.ActivityBaseData.IsUnLock(),t=3===t;e||(i=this.GetCurrentLockConditionText(),this.ANe.SetLockTextByTextId(i)),this.ANe.SetPanelConditionVisible(!e),this.ANe.FunctionButton.SetActive(e&&!t),this.GetItem(5)?.SetUIActive(e&&t)}}exports.ActivitySubViewRoleGuide=ActivitySubViewRoleGuide;
//# sourceMappingURL=ActivitySubViewRoleGuide.js.map