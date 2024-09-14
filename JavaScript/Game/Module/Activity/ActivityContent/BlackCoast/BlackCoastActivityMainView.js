"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackCoastActivityMainView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CommonRewardPopup_1 = require("../../../Common/CommonRewardPopup"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  BlackCoastRewardPanel_1 = require("./BlackCoastRewardPanel"),
  BlackCoastStageItem_1 = require("./BlackCoastStageItem");
class BlackCoastActivityMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.lqe = void 0),
      (this.KTt = void 0),
      (this.S2t = void 0),
      (this.F9a = void 0),
      (this.V9a = () => {
        var t = new BlackCoastStageItem_1.BlackCoastStageItem();
        return (
          (t.OpenTaskView = this.H9a),
          (t.NewFlagRedDot = (t) => this.ActivityBaseData.HasNewStageFlag(t)),
          t
        );
      }),
      (this.j9a = (t) => {
        this.ActivityBaseData &&
          this.ActivityBaseData.Id === t &&
          this.KTt.RefreshLayout();
      }),
      (this.m7s = (t) => {
        this.S2t.Refresh(t);
      }),
      (this.AMo = () => {
        this.CloseMe();
      }),
      (this.H9a = (t) => {
        UiManager_1.UiManager.OpenView("BlackCoastActivityTaskView", [
          this.ActivityBaseData,
          t,
        ]);
      }),
      (this.W9a = () => {
        var t = {
          WeaponDataList: this.ActivityBaseData.GetPreviewWeaponDataList(),
          SelectedIndex: 0,
        };
        UiManager_1.UiManager.OpenView("WeaponPreviewView", t);
      }),
      (this.axt = () => {
        UiManager_1.UiManager.OpenView(
          "QuestView",
          this.ActivityBaseData.GetCurrentLockQuestId(),
        );
      }),
      (this.M7a = () => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          this.ActivityBaseData.GetProgressItemId,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIHorizontalLayout],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [1, this.W9a],
        [6, this.axt],
        [9, this.M7a],
      ]);
  }
  async OnBeforeStartAsync() {
    var t, e;
    (this.ActivityBaseData = this.OpenParam),
      this.ActivityBaseData
        ? ((t = []),
          (e = this.GetItem(5)),
          (this.KTt = new BlackCoastRewardPanel_1.BlackCoastRewardPanel(
            this.ActivityBaseData,
          )),
          t.push(this.KTt.CreateThenShowByActorAsync(e.GetOwner())),
          (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
          this.lqe.SetCloseCallBack(this.AMo),
          this.lqe.SetTitle(this.ActivityBaseData.GetTitle()),
          (this.S2t = new CommonRewardPopup_1.CommonRewardPopup(
            this.GetRootItem(),
          )),
          (this.F9a = new GenericLayout_1.GenericLayout(
            this.GetHorizontalLayout(7),
            this.V9a,
          )),
          await Promise.all(t))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Activity",
            38,
            "[BlackCoastActivity] 活动主页无数据",
          );
  }
  OnStart() {
    const t = this.GetTexture(2);
    t.SetUIActive(!1),
      this.SetItemIcon(
        t,
        this.ActivityBaseData.GetProgressItemId,
        void 0,
        () => {
          t.SetUIActive(!0);
        },
      );
  }
  OnBeforeShow() {
    ControllerHolder_1.ControllerHolder.ActivityController.CheckIsActivityClose(
      void 0,
      this.ActivityBaseData.Id,
    ),
      this.Q9a(),
      this.K9a(),
      this.GetButton(6).RootUIComp.SetUIActive(
        void 0 !== this.ActivityBaseData.GetCurrentLockQuestId(),
      );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshRewardPopUp,
      this.m7s,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.j9a,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshRewardPopUp,
      this.m7s,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.j9a,
      );
  }
  Q9a() {
    this.GetText(3).SetText(
      this.ActivityBaseData.GetProgressItemCount().toString() + "/",
    ),
      this.GetText(4).SetText(
        this.ActivityBaseData.GetProgressItemTotal().toString(),
      ),
      this.KTt.Refresh();
  }
  K9a() {
    this.F9a.RefreshByData(this.ActivityBaseData.GetAllStages());
  }
}
exports.BlackCoastActivityMainView = BlackCoastActivityMainView;
//# sourceMappingURL=BlackCoastActivityMainView.js.map
