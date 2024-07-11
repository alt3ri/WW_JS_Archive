"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewRun = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ActivityController_1 = require("../../ActivityController");
const ActivitySubViewBase_1 = require("./ActivitySubViewBase");
class ActivitySubViewRun extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.bOe = void 0),
      (this.T4e = !1),
      (this.JGe = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this._Fe = () => {
        this.ActivityBaseData.GetPreGuideQuestFinishState()
          ? (ActivityController_1.ActivityController.RequestReadActivity(
              this.ActivityBaseData,
            ),
            ActivityController_1.ActivityController.OpenActivityContentView(
              this.ActivityBaseData,
            ))
          : UiManager_1.UiManager.OpenView(
              "QuestView",
              this.ActivityBaseData.GetUnFinishPreGuideQuestId(),
            );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIScrollViewWithScrollbarComponent],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIItem],
    ];
    this.BtnBindInfo = [
      [
        3,
        () => {
          this._Fe();
        },
      ],
    ];
  }
  OnStart() {
    const t = this.GetScrollViewWithScrollbar(4);
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(t, this.JGe);
  }
  OnRefreshView() {
    this.FNe(),
      this.mke(),
      this.mGe(),
      this.L4e(),
      this.BindRedPoint(),
      this.rFe(),
      this.D4e();
  }
  BindRedPoint() {
    this.T4e ||
      ((this.T4e = !0),
      RedDotController_1.RedDotController.BindRedDot(
        "CommonActivityPage",
        this.GetItem(6),
        void 0,
        this.ActivityBaseData.Id,
      ));
  }
  OnTimer(t) {
    this.FNe();
  }
  mGe() {
    this.GetText(0).SetText(this.ActivityBaseData.GetTitle());
  }
  L4e() {
    this.GetText(1).ShowTextNew(this.ActivityBaseData.LocalConfig.Desc),
      this.ActivityBaseData.IsUnLock() &&
      this.ActivityBaseData.GetPreGuideQuestFinishState()
        ? this.GetText(5).ShowTextNew("ReadyToFightText")
        : this.GetText(5).ShowTextNew("JumpToQuestText");
  }
  rFe() {
    this.GetButton(3).RootUIComp.SetUIActive(this.ActivityBaseData.IsUnLock());
  }
  mke() {
    const t = this.ActivityBaseData.GetPreviewReward();
    this.bOe.RefreshByData(t);
  }
  FNe() {
    const [t, i] = this.GetTimeVisibleAndRemainTime();
    this.GetText(2).SetUIActive(t), t && this.GetText(2).SetText(i);
  }
  D4e() {
    const t = this.GetText(7);
    const i =
      !this.ActivityBaseData.IsUnLock() ||
      !this.ActivityBaseData.GetPreGuideQuestFinishState();
    this.GetItem(8).SetUIActive(i),
      i && t.SetText(this.GetCurrentLockConditionText());
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "CommonActivityPage",
      this.GetItem(6),
      this.ActivityBaseData.Id,
    );
  }
  GetCurrentLockConditionText() {
    let t = super.GetCurrentLockConditionText();
    let i =
      t === "" ? t : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
    return (
      StringUtils_1.StringUtils.IsEmpty(i) &&
        ((t = this.ActivityBaseData.GetPreShowGuideQuestName()),
        (i = StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_ActivityNeedPreGiideQuest_Text",
          ),
          t,
        ))),
      i
    );
  }
}
exports.ActivitySubViewRun = ActivitySubViewRun;
// # sourceMappingURL=ActivitySubViewRun.js.map
