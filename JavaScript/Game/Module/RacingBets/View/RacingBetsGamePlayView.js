"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsGamePlayView = void 0);
const UE = require("ue"),
  Time_1 = require("../../../../Core/Common/Time"),
  ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  CameraController_1 = require("../../../Camera/CameraController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiCameraAnimationController_1 = require("../../UiCameraAnimation/UiCameraAnimationController"),
  UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  RacingBetsController_1 = require("../RacingBetsController"),
  RacingBetsDefine_1 = require("../RacingBetsDefine"),
  RacingBetsBulletScreenPanel_1 = require("./Item/RacingBetsBulletScreenPanel"),
  RacingBetsDangoDiceItem_1 = require("./Item/RacingBetsDangoDiceItem"),
  RacingBetsDangoOrderItem_1 = require("./Item/RacingBetsDangoOrderItem"),
  RacingBetsDangoRankPanel_1 = require("./Item/RacingBetsDangoRankPanel"),
  RacingBetsIconBulletScreenItem_1 = require("./Item/RacingBetsIconBulletScreenItem"),
  RacingBetsTextBulletScreenItem_1 = require("./Item/RacingBetsTextBulletScreenItem"),
  DANGO_ORDER_ITEM_START_INDEX = 24,
  DANGO_ORDER_ITEM_COUNT = 6,
  DANGO_DICE_ITEM_START_INDEX = 37,
  DANGO_DICE_ITEM_COUNT = 6;
class RacingBetsGamePlayView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Wm1 = !1),
      (this.Qm1 = !1),
      (this.iE1 = !1),
      (this.Km1 = 0),
      (this.Xm1 = 0),
      (this.Wg1 = 0),
      (this.TE1 = !1),
      (this.Qg1 = []),
      (this.ke1 = void 0),
      (this.MBc = []),
      (this.Gv1 = void 0),
      (this.oFc = void 0),
      (this.nFc = void 0),
      (this.oy1 = []),
      (this.NS1 = []),
      (this.sFc = () => {
        var e =
          new RacingBetsIconBulletScreenItem_1.RacingBetsIconBulletScreenItem();
        return e.BindClickBulletScreenCallBack(this.Ym1), e;
      }),
      (this.aFc = () => {
        var e =
          new RacingBetsTextBulletScreenItem_1.RacingBetsTextBulletScreenItem();
        return e.BindClickBulletScreenCallBack(this.Ym1), e;
      }),
      (this.ny1 = (e, i, t) => {
        this.sy1(e, i, t);
      }),
      (this.ay1 = (e, i) => {
        this.hy1(e, i);
      }),
      (this.Oe1 = (e, i) => {
        this.ke1.PushBulletScreen(e, i);
      }),
      (this.do1 = (e) => {
        this.Fv1(e);
      }),
      (this.mmo = (e) => {
        "RacingBetsGamePlayView" === e.ViewName &&
          UiCameraAnimationController_1.UiCameraAnimationController.ExitUiCameraMode();
      }),
      (this.BBc = (e) => {
        this.ke1.SetActive(1 !== e);
      }),
      (this.zm1 = () => {
        var e = !this.Qm1;
        this.GetButton(30).RootUIComp.SetUIActive(e),
          this.HI1(e),
          this.$I1(!1),
          this.WI1(!1);
      }),
      (this.Jm1 = () => {
        var e = !this.Wm1;
        this.GetButton(30).RootUIComp.SetUIActive(e),
          this.WI1(e),
          this.$I1(!1),
          this.HI1(!1);
      }),
      (this.Zm1 = (e) => {
        this.GetExtendToggle(9).SetToggleStateForce(1);
        this.GetExtendToggle(10).SetToggleStateForce(0);
        var i =
          ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreen(
            2,
          );
        this.nFc.RefreshByData(i);
      }),
      (this.cFc = (e) => {
        this.GetExtendToggle(9).SetToggleStateForce(0);
        this.GetExtendToggle(10).SetToggleStateForce(1);
        var i =
          ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreen(
            3,
          );
        this.nFc.RefreshByData(i);
      }),
      (this.Jg1 = () => {
        this.Wg1 = (this.Wg1 + 1) % this.Qg1.length;
        var e = this.Qg1[this.Wg1];
        ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(
          e,
        ),
          this.GetText(23).SetText("×" + e.toFixed(1));
      }),
      (this.rE1 = () => {
        this.$I1(!1),
          this.HI1(!1),
          this.WI1(!1),
          this.GetButton(30).RootUIComp.SetUIActive(!1);
      }),
      (this.oE1 = (e) => {
        e = Math.floor(e);
        ModelManager_1.ModelManager.RacingBetsModel.SetRacingBetsBulletScreenAlpha(
          e,
        ),
          this.GetText(33).SetText(e + "%"),
          this.ke1.GetRootItem().SetAlpha(e / 100);
      }),
      (this.nE1 = () => {
        var e = !this.iE1;
        this.GetButton(30).RootUIComp.SetUIActive(e),
          this.$I1(e),
          this.HI1(!1),
          this.WI1(!1);
      }),
      (this.sE1 = (e) => {
        ModelManager_1.ModelManager.RacingBetsModel.SetRacingBetsBulletScreenShowType(
          2,
        ),
          this.ke1.SetBulletScreenShowType(2),
          this.GetExtendToggle(36).SetToggleStateForce(0);
      }),
      (this.aE1 = (e) => {
        ModelManager_1.ModelManager.RacingBetsModel.SetRacingBetsBulletScreenShowType(
          1,
        ),
          this.ke1.SetBulletScreenShowType(1),
          this.GetExtendToggle(35).SetToggleStateForce(0);
      }),
      (this.lyt = () => {
        var e;
        this.TE1
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "Dango_InGame_ExitError",
            )
          : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              308,
            )).FunctionMap.set(2, () => {
              ModelManager_1.ModelManager.RacingBetsModel.RacingBetsAbortDungeon(),
                (this.TE1 = !0);
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            ));
      }),
      (this.qBc = () => {
        UiManager_1.UiManager.OpenView("RacingBetsDangoSkillView", this.MBc);
      }),
      (this.Ym1 = (e) => {
        this.Xm1 > TimeUtil_1.TimeUtil.GetServerTimeStamp()
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "Dango_BulletChat_SendError",
            )
          : ((this.Xm1 = TimeUtil_1.TimeUtil.GetServerTimeStamp() + this.Km1),
            RacingBetsController_1.RacingBetsController.RacingBetsBulletScreenRequest(
              e.Id,
            ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIExtendToggle],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
      [9, UE.UIExtendToggle],
      [10, UE.UIExtendToggle],
      [12, UE.UIScrollViewWithScrollbarComponent],
      [11, UE.UIScrollViewWithScrollbarComponent],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UITexture],
      [16, UE.UIItem],
      [17, UE.UIHorizontalLayout],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIText],
      [21, UE.UIHorizontalLayout],
      [22, UE.UIButtonComponent],
      [23, UE.UIText],
      [24, UE.UIItem],
      [25, UE.UIItem],
      [26, UE.UIItem],
      [27, UE.UIItem],
      [28, UE.UIItem],
      [29, UE.UIItem],
      [30, UE.UIButtonComponent],
      [31, UE.UIButtonComponent],
      [32, UE.UIItem],
      [33, UE.UIText],
      [34, UE.UISliderComponent],
      [35, UE.UIExtendToggle],
      [36, UE.UIExtendToggle],
      [37, UE.UIItem],
      [38, UE.UIItem],
      [39, UE.UIItem],
      [40, UE.UIItem],
      [41, UE.UIItem],
      [42, UE.UIItem],
      [43, UE.UISprite],
    ]),
      (this.BtnBindInfo = [
        [2, this.BBc],
        [3, this.zm1],
        [4, this.Jm1],
        [6, this.lyt],
        [7, this.qBc],
        [9, this.Zm1],
        [10, this.cFc],
        [22, this.Jg1],
        [30, this.rE1],
        [31, this.nE1],
        [34, this.oE1],
        [35, this.sE1],
        [36, this.aE1],
      ]);
  }
  async OnBeforeStartAsync() {
    var e = [],
      i =
        ((this.MBc =
          ModelManager_1.ModelManager.RacingBetsModel.GetDungeonDangoList()),
        (this.Gv1 = new RacingBetsDangoRankPanel_1.RacingBetsDangoRankPanel()),
        await this.Gv1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
        await this.Gv1.InitAsync(this.MBc),
        (this.oFc = new GenericScrollViewNew_1.GenericScrollViewNew(
          this.GetScrollViewWithScrollbar(12),
          this.sFc,
        )),
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreen(
          1,
        )),
      i =
        (e.push(this.oFc.RefreshByDataAsync(i)),
        (this.nFc = new GenericScrollViewNew_1.GenericScrollViewNew(
          this.GetScrollViewWithScrollbar(11),
          this.aFc,
        )),
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreen(
          2,
        ));
    e.push(this.nFc.RefreshByDataAsync(i)),
      (this.ke1 =
        new RacingBetsBulletScreenPanel_1.RacingBetsBulletScreenPanel()),
      e.push(this.ke1.CreateThenShowByActorAsync(this.GetItem(14).GetOwner())),
      e.push(this.ly1()),
      e.push(this.VS1()),
      await Promise.all(e),
      (this.Km1 = CommonParamById_1.configCommonParamById.GetIntConfig(
        "DangoRaceBulletChatCoolDown",
      )),
      (this.Qg1 = ConfigCommon_1.ConfigCommon.ToList(
        CommonParamById_1.configCommonParamById.GetIntArrayConfig(
          "DangoRaceReplaySpeed",
        ),
      )),
      this.hE1(),
      this.Hqe();
  }
  async ly1() {
    var i = [];
    for (let e = 0; e < DANGO_ORDER_ITEM_COUNT; e++) {
      var t = this.GetItem(DANGO_ORDER_ITEM_START_INDEX + e),
        s = new RacingBetsDangoOrderItem_1.RacingBetsDangoOrderItem();
      i.push(s.CreateThenShowByActorAsync(t.GetOwner())), this.oy1.push(s);
    }
    await Promise.all(i);
  }
  async VS1() {
    var i = [];
    for (let e = 0; e < DANGO_DICE_ITEM_COUNT; e++) {
      var t = this.GetItem(DANGO_DICE_ITEM_START_INDEX + e),
        s = new RacingBetsDangoDiceItem_1.RacingBetsDangoDiceItem();
      i.push(s.CreateThenShowByActorAsync(t.GetOwner())), this.NS1.push(s);
    }
    await Promise.all(i);
  }
  hE1() {
    (this.Wm1 = !1),
      (this.Qm1 = !1),
      (this.iE1 = !1),
      this.GetItem(5).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1),
      this.GetItem(32).SetUIActive(!1),
      this.GetButton(30).RootUIComp.SetUIActive(!1);
    var e =
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreenAlpha(),
      i = this.GetSlider(34),
      i =
        ((i.MaxValue = RacingBetsDefine_1.RACING_BETS_BULLET_SCREEN_MAX_ALPHA),
        (i.MinValue = RacingBetsDefine_1.RACING_BETS_BULLET_SCREEN_MIN_ALPHA),
        (i.Value = e),
        this.ke1.GetRootItem().SetAlpha(e / 100),
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreenShowType()),
      t = 2 === i,
      s = this.GetExtendToggle(35),
      n = this.GetExtendToggle(36);
    s.SetToggleStateForce(t ? 1 : 0),
      (s.bLockStateOnSelect = !0),
      n.SetToggleStateForce(t ? 0 : 1),
      (n.bLockStateOnSelect = !0),
      this.ke1.SetBulletScreenShowType(i),
      this.GetText(33).SetText(e + "%");
  }
  Hqe() {
    var e = ModelManager_1.ModelManager.RacingBetsModel.IsReplayDungeon;
    this.GetItem(13).SetUIActive(!1),
      this.GetExtendToggle(9).SetToggleStateForce(1),
      this.GetExtendToggle(10).SetToggleStateForce(0),
      (this.Wm1 = !1),
      (this.Qm1 = !1),
      this.GetItem(5).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1),
      this.GetButton(22).RootUIComp.SetUIActive(e);
    const i = this.GetSprite(43);
    i.SetUIActive(!1);
    var t = e ? "SP_RaceScheduleTitleBgRec" : "SP_RaceScheduleTitleBg",
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetSpriteByPath(t, i, !1, void 0, (e) => {
      i.SetUIActive(e);
    }),
      e &&
        ((t = this.Qg1[this.Wg1]),
        ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(
          t,
        ),
        this.GetText(23).SetText("×" + t.toFixed(1)));
  }
  _y1(i) {
    for (let e = 0; e < i.length; e++)
      this.oy1[e].Refresh(i[e]), this.oy1[e].SetActive(!0);
    if (this.oy1.length > i.length)
      for (let e = i.length; e < this.oy1.length; e++)
        this.oy1[e].SetActive(!1);
  }
  jS1(i) {
    for (let e = 0; e < i.length; e++) this.NS1[e].Refresh(i[e]);
    if (this.NS1.length > i.length)
      for (let e = i.length; e < this.NS1.length; e++)
        this.NS1[e].SetActive(!1);
  }
  $I1(e) {
    this.iE1 !== e &&
      ((this.iE1 = e)
        ? (this.UiViewSequence.HasSequenceNameInPlaying("FuncHide03") &&
            this.UiViewSequence.StopSequenceByKey("FuncHide03"),
          this.PlaySequence("FuncShow03"))
        : (this.UiViewSequence.HasSequenceNameInPlaying("FuncShow03") &&
            this.UiViewSequence.StopSequenceByKey("FuncShow03"),
          this.PlaySequence("FuncHide03")));
  }
  HI1(e) {
    this.Qm1 !== e &&
      ((this.Qm1 = e)
        ? (this.UiViewSequence.HasSequenceNameInPlaying("FuncHide02") &&
            this.UiViewSequence.StopSequenceByKey("FuncHide02"),
          this.PlaySequence("FuncShow02"))
        : (this.UiViewSequence.HasSequenceNameInPlaying("FuncShow02") &&
            this.UiViewSequence.StopSequenceByKey("FuncShow02"),
          this.PlaySequence("FuncHide02")));
  }
  WI1(e) {
    this.Wm1 !== e &&
      ((this.Wm1 = e)
        ? (this.UiViewSequence.HasSequenceNameInPlaying("FuncHide01") &&
            this.UiViewSequence.StopSequenceByKey("FuncHide01"),
          this.PlaySequence("FuncShow01"))
        : (this.UiViewSequence.HasSequenceNameInPlaying("FuncShow01") &&
            this.UiViewSequence.StopSequenceByKey("FuncShow01"),
          this.PlaySequence("FuncHide01")));
  }
  PushCameraHandle(e, i, t) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(
      e,
      i,
      !0,
    );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRacingBetsDiceAnim,
      this.ay1,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRacingBetsDangoOrderRefresh,
        this.ny1,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRacingBetsPushBulletScreen,
        this.Oe1,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRacingBetsDungeonDangoRankChange,
        this.do1,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this.mmo,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRacingBetsDiceAnim,
      this.ay1,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRacingBetsDangoOrderRefresh,
        this.ny1,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRacingBetsPushBulletScreen,
        this.Oe1,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRacingBetsDungeonDangoRankChange,
        this.do1,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this.mmo,
      );
  }
  PopCameraHandle(e, i, t, s) {
    UiCameraAnimationController_1.UiCameraAnimationController.DeepCopyCamera(
      CameraController_1.CameraController.FreeCamera.DisplayComponent
        .CameraActor,
    ),
      CameraController_1.CameraController.SetViewTarget(
        UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera?.GetCameraActor(),
        "RacingBetsGamePlayView",
      ),
      UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(
        e,
        i,
        t,
        s,
      );
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(1);
  }
  async sy1(e, i, t) {
    this.GetText(20).SetText(e.toString().padStart(2, "0")),
      this._y1(i),
      this.GetItem(18).SetUIActive(!0),
      i.length === RacingBetsDefine_1.RACING_BETS_FOUR_DANGO
        ? await this.PlaySequenceAsync(
            "OrderInB",
            !1,
            !1,
            Time_1.Time.TimeDilation,
          )
        : await this.PlaySequenceAsync(
            "OrderInA",
            !1,
            !1,
            Time_1.Time.TimeDilation,
          ),
      this.GetItem(18).SetUIActive(!1),
      this.jS1(i),
      t.SetResult(void 0);
  }
  async hy1(e, i) {
    var t = [];
    t.push(
      this.PlaySequenceAsync("DiceAnim", !1, !1, Time_1.Time.TimeDilation),
    ),
      e === RacingBetsDefine_1.RACING_BETS_FOUR_DANGO
        ? t.push(
            this.PlaySequenceAsync(
              "OrderOutB",
              !1,
              !1,
              Time_1.Time.TimeDilation,
            ),
          )
        : t.push(
            this.PlaySequenceAsync(
              "OrderOutA",
              !1,
              !1,
              Time_1.Time.TimeDilation,
            ),
          ),
      await Promise.all(t),
      i.SetResult(void 0);
  }
  async Fv1(e) {
    await this.Gv1.RefreshRankItemAsync(), e.SetResult(void 0);
  }
}
exports.RacingBetsGamePlayView = RacingBetsGamePlayView;
//# sourceMappingURL=RacingBetsGamePlayView.js.map
