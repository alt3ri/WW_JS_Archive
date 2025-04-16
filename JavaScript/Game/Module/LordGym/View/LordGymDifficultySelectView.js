"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymDifficultySelectView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  LordGymEntranceById_1 = require("../../../../Core/Define/ConfigQuery/LordGymEntranceById"),
  LordGymEntranceSetById_1 = require("../../../../Core/Define/ConfigQuery/LordGymEntranceSetById"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  HelpController_1 = require("../../Help/HelpController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  LordGymController_1 = require("../LordGymController"),
  LordGymDifficultyItem_1 = require("./LordGymDifficultyItem");
class LordGymDifficultySelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.Gxl = 0),
      (this.jSi = 0),
      (this.WSi = void 0),
      (this.kxl = void 0),
      (this.bOe = void 0),
      (this.Oxl = 0),
      (this.AMo = () => {
        this.CloseMe();
      }),
      (this.dpt = () => {
        var e = LordGymEntranceSetById_1.configLordGymEntranceSetById.GetConfig(
          this.Gxl,
        ).HelpId;
        HelpController_1.HelpController.OpenHelpById(e);
      }),
      (this.Nxl = () => {
        var e = new LordGymDifficultyItem_1.LordGymDifficultyItem();
        return (
          (e.OnToggleClick = this.Fxl),
          (e.CanExecuteChangeCallBack = this.Vxl),
          e
        );
      }),
      (this.rOe = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.Hxl = () => {
        var e;
        LordGymController_1.LordGymController.IsInEntranceEntity()
          ? ((e = this.kxl.GetSelectedGridIndex()),
            (e = this.WSi[e]),
            LordGymController_1.LordGymController.LordGymBeginRequest(e).then(
              (e) => {
                e && UiManager_1.UiManager.ResetToBattleView();
              },
            ))
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "LordGymOpen_ErrorTipText",
            );
      }),
      (this.qPl = () => {
        UiManager_1.UiManager.OpenView("LordGymChallengeRecordView", this.jSi);
      }),
      (this.Vxl = (e) => e !== this.kxl.GetSelectedGridIndex()),
      (this.Fxl = (e) => {
        this.Vxl(e) && this.SelectLordDifficultyByIndex(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIScrollViewWithScrollbarComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIButtonComponent],
      [11, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UIText],
      [14, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [10, this.Hxl],
        [7, this.qPl],
        [14, this.AMo],
      ]);
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    e
      ? ((this.Gxl = e.LordEntranceSetId),
        (this.jSi = e.LordEntranceId),
        LordGymEntranceSetById_1.configLordGymEntranceSetById.GetConfig(
          this.Gxl,
        ) &&
          ((this.WSi =
            ModelManager_1.ModelManager.LordGymModel.GetLordGymEntranceList(
              this.jSi,
            )),
          this.WSi) &&
          ((this.kxl = new LoopScrollView_1.LoopScrollView(
            this.GetLoopScrollViewComponent(1),
            this.GetItem(2).GetOwner(),
            this.Nxl,
            !0,
          )),
          (this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(
            this.GetScrollViewWithScrollbar(6),
            this.rOe,
          )),
          (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
          await Promise.all([
            this.kxl?.RefreshByDataAsync(this.WSi),
            this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
          ]),
          (e = LordGymEntranceById_1.configLordGymEntranceById.GetConfig(
            this.jSi,
          )),
          this.lqe.SetTitleByTextIdAndArgNew(e.EntranceTitle),
          this.lqe.SetHelpCallBack(this.dpt),
          this.nyi()))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelPlay",
          43,
          "领主道馆打开错误, ILordGymDifficultySelectViewParam为空",
        );
  }
  OnHandleLoadScene() {
    ControllerHolder_1.ControllerHolder.LordGymController.CreateLordModelByEntranceId(
      this.jSi,
    );
  }
  OnHandleReleaseScene() {
    UiSceneManager_1.UiSceneManager.DestroyLordSkeletalHandle();
  }
  nyi() {
    if (this.WSi && 0 !== this.WSi.length) {
      let i = 0;
      var t = ModelManager_1.ModelManager.LordGymModel;
      for (let e = 0; e < this.WSi.length; e++) {
        var r = this.WSi[e];
        t.GetLordGymIsUnLock(r) && t.GetLastGymFinish(r) && e >= i && (i = e);
      }
      this.SelectLordDifficultyByIndex(i);
    }
  }
  SelectLordDifficultyByIndex(e) {
    this.kxl?.SelectGridProxy(e),
      (this.Oxl = this.WSi[e]),
      this.RefreshDetail();
  }
  RefreshDetail() {
    var e = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(
        this.Oxl,
      ),
      i =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(4),
          "Text_InstanceDungeonRecommendLevel_Text",
          e.MonsterLevel.toString(),
        ),
        e.RewardId),
      i =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
          i,
        );
    const t = ModelManager_1.ModelManager.LordGymModel?.GetLordGymIsFinish(
      this.Oxl,
    );
    this.bOe.RefreshByData(i, () => {
      for (const e of this.bOe.GetScrollItemList()) e.SetReceivedVisible(t);
    }),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.PlayDescription),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.NewGymTitle);
    var i = ModelManager_1.ModelManager.LordGymModel.LordGymRecord.get(
        this.Oxl,
      ),
      i =
        (void 0 !== i
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(8),
              "BestPassTime",
              TimeUtil_1.TimeUtil.GetTimeString(i.Qxs),
            )
          : LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(8),
              "NoPassRecord",
            ),
        !ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(this.Oxl)),
      r = ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(this.Oxl),
      o =
        e.MonsterLevel >
        ModelManager_1.ModelManager.EditFormationModel.GetFormationAverageLevel();
    this.GetItem(12).SetUIActive(i || !r),
      this.GetItem(9).SetUIActive(o && !i && r),
      this.GetButton(10).RootUIComp.SetUIActive(!(i || !r)),
      i
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(13),
            e.LockDescription,
          )
        : r
          ? o &&
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(13),
              "LordGymLowLevel",
            )
          : LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(13),
              "LordGymLockTips",
            ),
      t
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(11),
            "Text_ButtonTextChallengeOneMore_Text",
          )
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(11),
            "Text_StartBattle_Text",
          );
  }
}
exports.LordGymDifficultySelectView = LordGymDifficultySelectView;
//# sourceMappingURL=LordGymDifficultySelectView.js.map
