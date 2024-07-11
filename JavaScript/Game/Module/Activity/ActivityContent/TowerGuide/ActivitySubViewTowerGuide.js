"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewTowerGuide = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const RoleController_1 = require("../../../RoleUi/RoleController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityTowerGuideController_1 = require("./ActivityTowerGuideController");
const ActivityTowerGuideRewardGrid_1 = require("./ActivityTowerGuideRewardGrid");
class ActivitySubViewTowerGuide extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.LFe = 0),
      (this.ViewState = 0),
      (this.DFe = void 0),
      (this.mNe = void 0),
      (this.dNe = !0),
      (this.RFe = void 0),
      (this.UFe = void 0),
      (this.AFe = () => {
        const e =
          new ActivityTowerGuideRewardGrid_1.ActivityTowerGuideRewardGrid();
        return (
          e.BindOnCanExecuteChange(() => !1),
          e.BindOnExtendToggleClicked((e) => {
            e = e.Data;
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              e.Item[0].ItemId,
            );
          }),
          e
        );
      }),
      (this.wNe = (e) => {
        e === this.ActivityBaseData.Id && this.OnRefreshView();
      }),
      (this.Pke = () => {
        RoleController_1.RoleController.OpenRoleMainView(1, 0, [this.LFe]);
      }),
      (this.PFe = () => {
        this.ActivityBaseData.GetTowerProgressState(1) === 2 &&
          ActivityTowerGuideController_1.ActivityTowerGuideController.RequestTowerReward(
            1,
          );
      }),
      (this.xFe = () => {
        this.ActivityBaseData.GetTowerProgressState(2) === 2 &&
          ActivityTowerGuideController_1.ActivityTowerGuideController.RequestTowerReward(
            2,
          );
      }),
      (this.wFe = () => {
        let e;
        const i = this.ActivityBaseData.GetPreGuideQuestFinishState();
        i
          ? ((e = {
              MarkId: this.ActivityBaseData.MapMarkId,
              MarkType: 0,
              OpenAreaId: 0,
            }),
            WorldMapController_1.WorldMapController.OpenView(2, !1, e))
          : ((e = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
            UiManager_1.UiManager.OpenView("QuestView", e)),
          ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(
            this.ActivityBaseData,
            i ? 2 : 1,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIHorizontalLayout],
      [10, UE.UIItem],
      [11, UE.UIButtonComponent],
      [12, UE.UIButtonComponent],
      [20, UE.UIText],
      [13, UE.UIItem],
      [14, UE.UIText],
      [15, UE.UIItem],
      [16, UE.UIButtonComponent],
      [17, UE.UIText],
      [18, UE.UIText],
      [19, UE.UIText],
      [21, UE.UIItem],
      [22, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [5, this.Pke],
        [16, this.Pke],
        [6, this.PFe],
        [11, this.xFe],
        [12, this.wFe],
      ]);
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    (this.RFe = new TowerGuideProgress()),
      await this.RFe.CreateByActorAsync(this.GetItem(4).GetOwner()),
      (this.UFe = new TowerGuideProgress()),
      await this.UFe.CreateByActorAsync(this.GetItem(10).GetOwner()),
      (this.DFe = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(9),
        this.AFe,
      )),
      (this.mNe = this.GetText(22));
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
  OnStart() {
    this.BFe(), this.bFe(), this.OnRefreshView();
  }
  OnBeforeDestroy() {
    for (const e of this.DFe.GetLayoutItemList()) this.AddChild(e);
  }
  OnRefreshView() {
    const e = this.ActivityBaseData.GetViewState();
    this.fNe(), this.qFe(e);
  }
  BFe() {
    this.GetText(18).SetText(this.ActivityBaseData.GetTitle()),
      this.GetText(19).ShowTextNew(this.ActivityBaseData.LocalConfig.Desc);
  }
  bFe() {
    this.LFe = this.ActivityBaseData.TrialRoleId;
    const e = this.ActivityBaseData.GetTrialRoleData();
    e && this.GetText(17).SetText(e.GetName());
  }
  qFe(e) {
    let i;
    let t = (this.ViewState = e) === 0;
    const r = e === 1;
    var e = e === 2;
    let s =
      (this.GetItem(0).SetUIActive(t),
      this.GetItem(1).SetUIActive(t),
      this.GetItem(2).SetUIActive(t),
      this.GetItem(8).SetUIActive(t),
      this.GetItem(13).SetUIActive(t),
      t && this.GetText(14).ShowTextNew(this.GetCurrentLockConditionText()),
      this.ActivityBaseData.GetTowerProgressState(1));
    const h = this.ActivityBaseData.GetTowerProgressState(2);
    if (
      (this.GFe(t, h === 2),
      this.RFe.SetUiActive(s === 1),
      s === 1 &&
        (([t, i] = this.ActivityBaseData.GetTowerProgress(1)),
        this.RFe.Refresh(t, i)),
      this.GetItem(3).SetUIActive(s === 3),
      this.GetButton(6).RootUIComp.SetUIActive(s === 2),
      this.UFe.SetUiActive(h === 1),
      h === 1 &&
        (([t, i] = this.ActivityBaseData.GetTowerProgress(2)),
        this.UFe.Refresh(t, i)),
      this.GetItem(7).SetUIActive(h === 3),
      this.GetButton(11).RootUIComp.SetUIActive(h === 2),
      this.GetButton(12).RootUIComp.SetUIActive(r),
      r)
    ) {
      let e = "";
      s = this.ActivityBaseData.GetPreGuideQuestFinishState();
      (e = s ? "ReadyToFightText" : "JumpToQuestText"),
        this.GetText(20).ShowTextNew(e);
    }
    this.GetItem(15).SetUIActive(e);
  }
  OnTimer(e) {
    this.fNe();
  }
  pNe(e) {
    this.dNe !== e && ((this.dNe = e), this.GetItem(21).SetUIActive(e));
  }
  fNe() {
    const [e, i] = this.GetTimeVisibleAndRemainTime();
    this.pNe(e), e && this.mNe.SetText(i);
  }
  GFe(e, i) {
    const t =
      ConfigManager_1.ConfigManager.ActivityTowerGuideConfig.GetTowerGuideById(
        2,
      );
    if (t) {
      let r;
      let s;
      const h = [];
      for ([r, s] of t.RewardItem) {
        const o = [{ IncId: 0, ItemId: r }, s];
        h.push({ Item: o, IsLock: e, IsReceivableVisible: i });
      }
      this.DFe.RefreshByData(h);
    }
  }
}
exports.ActivitySubViewTowerGuide = ActivitySubViewTowerGuide;
class TowerGuideProgress extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  Refresh(e, i) {
    this.GetText(0).SetText(e.toString()),
      this.GetText(1).SetText("/" + i.toString());
  }
}
// # sourceMappingURL=ActivitySubViewTowerGuide.js.map
