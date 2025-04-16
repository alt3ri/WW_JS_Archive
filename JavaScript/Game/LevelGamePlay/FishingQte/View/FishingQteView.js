"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingQteView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  FishingFullTipItem_1 = require("../../../Module/Activity/ActivityContent/Fishing/Dockyard/Tips/FishingFullTipItem"),
  LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer"),
  GenericLayout_1 = require("../../../Module/Util/Layout/GenericLayout"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  FishingQteController_1 = require("../FishingQteController"),
  FishingButtonItem_1 = require("./SubView/Fish/FishingButtonItem"),
  FishingCabinItem_1 = require("./SubView/Fish/FishingCabinItem"),
  FishingGetScrollItem_1 = require("./SubView/Fish/FishingGetScrollItem"),
  FishingRoundItem_1 = require("./SubView/Fish/FishingRoundItem"),
  FishingTagItem_1 = require("./SubView/Fish/FishingTagItem"),
  FishingProgressItem_1 = require("./SubView/FishingProgressItem"),
  FishingQteRingItem_1 = require("./SubView/FishingQteRingItem"),
  FishingQteTipsItem_1 = require("./SubView/FishingQteTipsItem"),
  ANIM_FISHING_SUCCESS = "FishSuccess",
  ANIM_QTE_SUCCESS = "QteSuccess",
  ANIM_QTE_PERFECT = "PerfectQte",
  ANIM_QTE_FAIL = "QteFail";
class FishingQteView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.GameInfo = void 0),
      (this.GameConfig = void 0),
      (this.lqe = void 0),
      (this.It_ = void 0),
      (this.Tt_ = void 0),
      (this.p4e = void 0),
      (this.bt_ = void 0),
      (this.Lt_ = void 0),
      (this.hfl = void 0),
      (this.aHl = void 0),
      (this.wP_ = void 0),
      (this.uO_ = void 0),
      (this.SPe = void 0),
      (this.HDe = void 0),
      (this.dO_ = () => {
        return new FishingRoundItem_1.FishingRoundItem();
      }),
      (this.At_ = (i) => {
        this.aHl.OnArrowStayAreaUpdate(i);
      }),
      (this.gfl = (i) => {
        switch (i) {
          case 2:
            break;
          case 3:
            this.p4e.SetPause(!0);
            break;
          case 5:
            var e =
              ModelManager_1.ModelManager.FishingQteModel.GetTempGetDataList();
            FishingQteController_1.FishingQteController.OpenFishingSuccessView(
              e,
              (i) => {
                i &&
                  (ModelManager_1.ModelManager.FishingQteModel.GameInfo.SetGameStage(
                    6,
                  ),
                  this.CloseMe());
              },
            );
            break;
          case 7:
            this.OnExit();
        }
      }),
      (this.OnExit = () => {
        this.CloseMe();
      }),
      (this.Rt_ = () => {
        2 === this.GameInfo.GetGameStage() && this.GameInfo.SetGameStage(3),
          ControllerHolder_1.ControllerHolder.FishingController.OpenDockyardWareHouseView(
            !0,
          );
      }),
      (this._5e = () => {
        2 === this.GameInfo.GetGameStage() && this.GameInfo.SetGameStage(3),
          UiManager_1.UiManager.OpenView("FishingQtePauseView");
      }),
      (this.xt_ = () => {
        var i, e, t;
        this.GameInfo.IsGamePause() && !this.GameInfo.IsGameEnd()
          ? this.v7_()
          : ((e = (i = this.GameInfo.GetRingInfo()).CurrentArrowStayCellIndex),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "SceneGameplay",
                37,
                "[FishingQte] QteButton OnClick",
                ["CellIndex", e],
              ),
            (t = i.CheckInArea(i.GetPerfectAreas(), e))
              ? this.Ufl(2, t)
              : (t = i.CheckInArea(i.GetQteAreas(), e))
                ? this.Ufl(1, t)
                : this.Ufl(0, void 0));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var i, e;
    (this.GameConfig = ModelManager_1.ModelManager.FishingQteModel.GameConfig),
      (this.GameInfo = ModelManager_1.ModelManager.FishingQteModel.GameInfo),
      this.GameConfig && this.GameInfo
        ? ((i = []),
          (e = this.GetItem(0)),
          (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
          i.push(this.lqe.CreateThenShowByActorAsync(e.GetOwner())),
          this.lqe.SetCloseCallBack(this._5e),
          (e = this.GetItem(7)),
          (this.It_ = new FishingTagItem_1.FishingTagItem()),
          i.push(this.It_.CreateByActorAsync(e.GetOwner())),
          (e = this.GetItem(6)),
          (this.Tt_ = new FishingCabinItem_1.FishingCabinItem()),
          i.push(this.Tt_.CreateThenShowByActorAsync(e.GetOwner())),
          this.Tt_.SetFunction(this.Rt_),
          (e = this.GetItem(5)),
          (this.p4e = new FishingButtonItem_1.FishingButtonItem()),
          i.push(this.p4e.CreateThenShowByActorAsync(e.GetOwner())),
          this.p4e.SetFunction(this.xt_),
          (this.uO_ = new GenericLayout_1.GenericLayout(
            this.GetHorizontalLayout(1),
            this.dO_,
          )),
          i.push(this.Pt_()),
          i.push(this.wt_()),
          i.push(this.Ut_()),
          i.push(this.yfl()),
          i.push(this.AP_()),
          (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(
            this.RootItem,
          )),
          await Promise.all(i))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("SceneGameplay", 37, "[FishingQte] 缺少玩法配置");
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnFishingQteStageUpdate,
      this.gfl,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFishingQteAreaChange,
        this.At_,
      ),
      this.AU();
  }
  AU() {
    this.GameInfo.SetGameStage(1),
      this.It_.Refresh(
        ModelManager_1.ModelManager.FishingQteModel.CurrentFishingPointConfigId,
      ),
      this.Dt_(),
      this.aHl.InitRing(),
      this.GameInfo.GetRingInfo().EnterNextValidArea(),
      this.p4e.SetPauseWithoutAnim(!1),
      this.uO_.RefreshByData(new Array(this.GameInfo.MaxRound).fill(0)),
      this.UiViewSequence.AddSequenceFinishEvent("Start", () => {
        this.mO_();
      });
  }
  OnBeforeShow() {
    this.Tt_.RefreshCabin();
  }
  OnAfterShow() {}
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnFishingQteStageUpdate,
      this.gfl,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFishingQteAreaChange,
        this.At_,
      ),
      this.SPe?.Clear(),
      (this.SPe = void 0);
  }
  OnAfterDestroy() {
    this.HDe && this.HDe();
  }
  OnTick(i) {
    this.hfl.OnTick(i),
      this.aHl.OnTick(i),
      this.p4e.OnTick(i),
      this.Lt_.OnTick(i),
      this.GameInfo.IsGamePause() ||
        ((i = i / CommonDefine_1.MILLIONSECOND_PER_SECOND),
        (this.GameInfo.CurrentScore +=
          ModelManager_1.ModelManager.FishingQteModel.ScoreUp * i),
        this.GameInfo.CurrentScore >= this.GameConfig.MaxScore &&
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnFishingQteScoreReachedMaximum,
          ),
          this.Bt_()));
  }
  Bt_() {
    ModelManager_1.ModelManager.FishingQteModel.EnterNextRound(),
      this.Gti(ANIM_FISHING_SUCCESS),
      this.hfl.EnterNextRound(),
      this.Dt_();
    var i =
      ModelManager_1.ModelManager.FishingQteModel
        .CurrentFishingPointCreatureDataId;
    FishingQteController_1.FishingQteController.FishingGetRequest(i, (i, e) => {
      i
        ? this.GameInfo.CurrentRound === this.GameInfo.MaxRound
          ? this.fO_(e)
          : this.bt_.ShowTip(3, e.toString())
        : (this.GameInfo.SetGameStage(3), this.CloseMe());
    });
  }
  async Pt_() {
    var i = this.GetItem(10);
    (this.bt_ = new FishingQteTipsItem_1.FishingQteTipsItem()),
      await this.bt_.CreateByActorAsync(i.GetOwner());
  }
  async wt_() {
    this.Lt_ = new FishingGetScrollItem_1.FishingGetScrollItem();
    var i = this.GetItem(8);
    await this.Lt_.CreateThenShowByResourceIdAsync(
      "UiItem_NavigationTipReward",
      i,
    );
  }
  async Ut_() {
    var i = this.GetItem(3);
    (this.aHl = new FishingQteRingItem_1.FishingQteRingItem()),
      this.aHl.Init(this.GameConfig, this.GameInfo),
      await this.aHl.CreateThenShowByActorAsync(i.GetOwner());
  }
  async yfl() {
    var i = this.GetItem(4);
    (this.hfl = new FishingProgressItem_1.FishingProgressItem()),
      this.hfl.Init(this.GameConfig, this.GameInfo),
      await this.hfl.CreateThenShowByActorAsync(i.GetOwner());
  }
  async AP_() {
    (this.wP_ = new FishingFullTipItem_1.FishingFullTipItem()),
      await this.wP_.CreateByResourceIdAsync(
        "UiItem_NavigationFullTip",
        this.RootItem,
      );
  }
  mO_() {
    this.wP_.SetTxtInfo("Fishing_QTE_Start"),
      this.wP_.PlayTipSequence(
        () => {
          this.GameInfo.SetGameStage(2);
        },
        "Start",
        !0,
      );
  }
  v7_() {
    this.p4e.SetPause(!1),
      this.wP_.SetTxtInfo("Fishing_QTE_Start"),
      this.wP_.PlayTipSequence(
        () => {
          this.GameInfo.SetGameStage(2);
        },
        "Start",
        !0,
      );
  }
  fO_(i) {
    const e = () => {
      this.GameInfo.SetGameStage(5),
        UiLayer_1.UiLayer.SetShowMaskLayer("FishingQteAnimEnd.Start", !1);
    };
    UiLayer_1.UiLayer.SetShowMaskLayer("FishingQteAnimEnd.Start", !0),
      this.bt_.ShowTip(3, i.toString(), () => {
        this.wP_.SetTxtInfo("Fishing_QTE_Finish"), this.wP_.PlayTipSequence(e);
      });
  }
  Ufl(i, e) {
    switch (
      (this.p4e.SetForbiddenStart(this.GameConfig.HitColdTime),
      this.aHl.OnAreaClick(i, e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneGameplay",
          37,
          "[FishingQte] OnAreaClick",
          ["Type", i],
          ["Index", e?.ContinuousIndex ?? -1],
        ),
      i)
    ) {
      case 2:
        this.hfl.StartAnimProgress(),
          this.Gti(ANIM_QTE_PERFECT),
          ModelManager_1.ModelManager.FishingQteModel.OnPerfectOn();
        var t = this.GameInfo.GetRingInfo();
        t.IsWholeRing || t.EnterNextValidArea(),
          this.aHl.SpawnContinuousArea(e.ContinuousIndex, 2),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.FishingQteBtnHitValidArea,
            !0,
          );
        break;
      case 1:
        this.hfl.StartAnimProgress(),
          this.Gti(ANIM_QTE_SUCCESS),
          ModelManager_1.ModelManager.FishingQteModel.OnQteOn();
        t = this.GameInfo.GetRingInfo();
        t.IsWholeRing || t.EnterNextValidArea(),
          this.aHl.SpawnContinuousArea(e.ContinuousIndex, 1),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.FishingQteBtnHitValidArea,
            !0,
          );
        break;
      case 0:
        this.Gti(ANIM_QTE_FAIL),
          ModelManager_1.ModelManager.FishingQteModel.OnMissOn(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.FishingQteBtnHitValidArea,
            !1,
          );
    }
  }
  Gti(i) {
    this.SPe.GetCurrentSequence() === i
      ? this.SPe.ReplaySequenceByKey(i)
      : (this.SPe.StopPlayingSequence(!1, !0),
        this.SPe.PlayLevelSequenceByName(i, !1));
  }
  Dt_() {
    var i = this.GameInfo.CurrentRound,
      e = this.GameInfo.MaxRound;
    this.uO_
      .GetLayoutItemByIndex(e - i)
      ?.ShowIcon(
        ModelManager_1.ModelManager.FishingQteModel.CurrentFishingIconType,
      );
  }
}
exports.FishingQteView = FishingQteView;
//# sourceMappingURL=FishingQteView.js.map
