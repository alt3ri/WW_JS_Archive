"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewLongShan = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const LongShanStageById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanStageById");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
const ActivityLongShanController_1 = require("./ActivityLongShanController");
const LongShanStageItem_1 = require("./LongShanStageItem");
class ActivitySubViewLongShan extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.CommonInfoPanel = void 0),
      (this.StageItems = void 0),
      (this.SGn = !1),
      (this.UOe = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SetActivityViewState,
          !1,
          0,
        );
      }),
      (this.AOe = () => {
        this.StageItems?.forEach((t) => {
          t.RefreshState();
        }),
          this.GetButton(3).RootUIComp.SetUIActive(
            this.ActivityBaseData.StageIds.findIndex(
              (t) => void 0 === this.ActivityBaseData.GetStageInfoById(t),
            ) >= 0,
          ),
          this.BNe();
      }),
      (this.POe = () => {
        if (this.ActivityBaseData && this.ActivityBaseData.StageIds) {
          let t = void 0;
          for (const i of this.ActivityBaseData.StageIds)
            if (!this.ActivityBaseData?.GetStageInfoById(i)) {
              const e =
                LongShanStageById_1.configLongShanStageById.GetConfig(i);
              t = e?.QuestionId;
              break;
            }
          UiManager_1.UiManager.OpenView("QuestView", t);
        }
      }),
      (this.wOe = (t) => {
        ActivityLongShanController_1.ActivityLongShanController.GetActivityData().GetStageInfoById(
          t,
        )
          ? ((this.SGn = !0), UiManager_1.UiManager.OpenView("LongShanView", t))
          : ActivityLongShanController_1.ActivityLongShanController.ShowUnlockTip(
              t,
            );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.POe]]);
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    (this.CommonInfoPanel =
      new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo()),
      this.CommonInfoPanel.SetData(this.ActivityBaseData),
      this.AddChild(this.CommonInfoPanel);
    const t = [
      this.CommonInfoPanel.OnlyCreateByActorAsync(this.GetItem(2).GetOwner()),
    ];
    this.StageItems = [];
    for (const i of this.ActivityBaseData.StageIds) {
      const e = new LongShanStageItem_1.LongShanStageItem(i);
      (e.OnClickStageDetail = this.wOe),
        this.AddChild(e),
        t.push(
          e.OnlyCreateByActorAsync(
            this.GetItem(4 + this.StageItems.length).GetOwner(),
          ),
        ),
        this.StageItems.push(e);
    }
    await Promise.all(t);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LongShanUpdate,
      this.AOe,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LongShanUpdate,
      this.AOe,
    );
  }
  OnStart() {
    this.FNe();
  }
  OnBeforeShow() {
    this.CommonInfoPanel?.SetBtnText("LongShanStage_Join"),
      this.CommonInfoPanel?.SetClickFunc(this.UOe),
      this.BNe();
  }
  async OnBeforeHideSelfAsync() {
    this.SGn &&
      (await this.LevelSequencePlayer.PlaySequenceAsync(
        "TransOut",
        new CustomPromise_1.CustomPromise(),
        !0,
      ));
  }
  OnTimer(t) {
    this.FNe();
  }
  OnRefreshView() {
    this.FNe(),
      this.CommonInfoPanel?.OnRefreshView(),
      this.AOe(),
      this.SGn &&
        (this.LevelSequencePlayer.PlayLevelSequenceByName("TransIn", !0),
        (this.SGn = !1));
  }
  OnCommonViewStateChange(t) {
    this.PlaySubViewSequence(t ? "SwitchOut" : "SwitchIn", !0);
  }
  OnSequenceStart(t) {
    t === "Start" || t === "SwitchOut"
      ? this.Bxn(!1)
      : t === "SwitchIn" && this.Bxn(!0);
  }
  Bxn(t) {
    if ((this.GetButton(3)?.SetSelfInteractive(t), this.StageItems))
      for (const e of this.StageItems) e.SetButtonInteractive(t);
  }
  FNe() {
    const [t, e] = this.GetTimeVisibleAndRemainTime();
    this.GetText(1).SetUIActive(t), t && this.GetText(1).SetText(e);
  }
  BNe() {
    const t =
      ActivityLongShanController_1.ActivityLongShanController.GetActivityData().CheckAnyStageRed();
    this.CommonInfoPanel?.SetFunctionRedDotVisible(t);
  }
}
exports.ActivitySubViewLongShan = ActivitySubViewLongShan;
// # sourceMappingURL=ActivitySubViewLongShan.js.map
