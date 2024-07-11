"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FragmentMemorySubView = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const FragmentMemoryData_1 = require("../../../FragmentMemory/FragmentMemoryData");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const HIDEVIEW01DELAY = 600;
const HIDEVIEWDELAY = 600;
const FRAGMENTMEMORYMASK = "FragmentMemoryMask";
const START01 = "Start01";
class FragmentMemorySubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.pUn = void 0),
      (this.vUn = void 0),
      (this.MUn = () => {
        if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
          var e =
            ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryActivityById(
              this.ActivityBaseData.Id,
            );
          const t =
            ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(
              e.TopicId,
            );
          this.LevelSequencePlayer?.PlaySequencePurely("HideView01"),
            UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, !0),
            TimerSystem_1.TimerSystem.Delay(() => {
              ModelManager_1.ModelManager.FragmentMemoryModel.MemoryFragmentMainViewTryPlayAnimation =
                "Start02";
              const e =
                new FragmentMemoryData_1.FragmentMemoryMainViewOpenData();
              (e.FragmentMemoryTopicData = t),
                UiManager_1.UiManager.OpenView("MemoryFragmentMainView", e),
                UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, !1);
            }, HIDEVIEW01DELAY);
        } else
          (e = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
            UiManager_1.UiManager.OpenView("QuestView", e),
            ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(
              this.ActivityBaseData,
              1,
            );
      }),
      (this.SUn = () => {
        const e =
          ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryActivityById(
            this.ActivityBaseData.Id,
          );
        this.LevelSequencePlayer?.PlaySequencePurely("HideView02"),
          UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, !0),
          TimerSystem_1.TimerSystem.Delay(() => {
            UiManager_1.UiManager.OpenView("MemoryDetailView", e?.TopicId),
              UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, !1);
          }, HIDEVIEWDELAY);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    const e = this.GetItem(0);
    const t =
      ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
      this.GetItem(1));
    const i =
      ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
      this.GetItem(2));
    const r =
      ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
      this.GetItem(3));
    (this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
      await Promise.all([
        this.LNe.CreateThenShowByActorAsync(e.GetOwner()),
        this.DNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.UNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.ANe.CreateThenShowByActorAsync(r.GetOwner()),
      ]),
      (this.pUn = new ButtonItem_1.ButtonItem(this.GetItem(4))),
      (this.vUn = new ButtonItem_1.ButtonItem(this.GetItem(5))),
      this.pUn.SetFunction(this.MUn),
      this.vUn.SetFunction(this.SUn);
  }
  OnSequenceClose(e) {}
  OnStart() {}
  OnBeforeShow() {
    this.x6e(), this.Jwn();
  }
  OnBeforeHide() {
    (ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation =
      ""),
      this.ILn();
  }
  OnRefreshView() {
    this.ActivityBaseData.LocalConfig &&
      (this.Pqe(),
      this.mGe(),
      this.jqe(),
      this.VNe(),
      this._Oe(),
      this.ZGe(),
      this.$wn(),
      this.Ywn(),
      this.Jwn(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.ActivityBaseData.Id,
      ));
  }
  Jwn() {
    StringUtils_1.StringUtils.IsEmpty(
      ModelManager_1.ModelManager.FragmentMemoryModel
        .ActivitySubViewTryPlayAnimation,
    )
      ? this.LevelSequencePlayer?.GetCurrentSequence() === START01
        ? (this.LevelSequencePlayer?.StopSequenceByKey(START01),
          this.LevelSequencePlayer?.ReplaySequenceByKey(START01))
        : this.LevelSequencePlayer?.PlaySequencePurely(START01)
      : (this.LevelSequencePlayer?.PlaySequencePurely(
          ModelManager_1.ModelManager.FragmentMemoryModel
            .ActivitySubViewTryPlayAnimation,
        ),
        (ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation =
          ""));
  }
  x6e() {
    this.pUn?.UnBindRedDot(), this.pUn?.BindRedDot("FragmentMemoryEntrance");
  }
  ILn() {
    this.pUn?.UnBindRedDot();
  }
  _Oe() {
    const e = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!e),
      e ||
        this.ANe.SetLockTextByText(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            this.GetCurrentLockConditionText(),
          ),
        );
  }
  ZGe() {
    const e = this.ActivityBaseData.IsUnLock();
    this.pUn.SetActive(e), this.vUn.SetActive(e);
  }
  mGe() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    const [e, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(e), e && this.LNe.SetTimeTextByText(t);
  }
  OnTimer(e) {
    this.mGe();
  }
  Pqe() {
    var e = this.ActivityBaseData.LocalConfig;
    const t = e.DescTheme;
    var e = e.Desc;
    const i = !StringUtils_1.StringUtils.IsEmpty(t);
    this.DNe.SetTitleVisible(i),
      i && this.DNe.SetTitleByTextId(t),
      this.DNe.SetContentByTextId(e);
  }
  jqe() {
    const e = this.ActivityBaseData.GetPreviewReward();
    this.UNe.SetTitleByTextId("FragmentMemoryCollectReward"),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(e);
  }
  VNe() {
    const e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      "FragmentMemoryEnterText",
    );
    this.ANe.FunctionButton.SetText(e);
  }
  $wn() {
    const e = this.ActivityBaseData.IsUnLock();
    this.pUn?.SetActive(e);
  }
  Ywn() {
    const e = this.ActivityBaseData.GetPreGuideQuestFinishState();
    const t = this.ActivityBaseData.IsUnLock();
    this.vUn?.SetActive(t && e);
  }
}
exports.FragmentMemorySubView = FragmentMemorySubView;
// # sourceMappingURL=FragmentMemorySubView.js.map
