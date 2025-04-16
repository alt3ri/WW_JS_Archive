"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterDetectView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ConditionGroupById_1 = require("../../../../Core/Define/ConfigQuery/ConditionGroupById"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TextById_1 = require("../../../../Core/Define/ConfigQuery/TextById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  HelpController_1 = require("../../Help/HelpController"),
  UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  AdventureGuideController_1 = require("../AdventureGuideController"),
  MonsterDetectItem_1 = require("./MonsterDetectItem"),
  MONSTER_HELP = 17,
  LEFT_TIME_HELP = 72;
class MonsterDetectView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.O6e = void 0),
      (this.k6e = void 0),
      (this.H3e = void 0),
      (this.F6e = 0),
      (this.V6e = void 0),
      (this.H6e = void 0),
      (this.j6e = void 0),
      (this.W6e = -1),
      (this.K6e = void 0),
      (this.Q6e = void 0),
      (this.X6e = !0),
      (this.L6e = 0),
      (this.$6e = void 0),
      (this.SPe = void 0),
      (this.Anl = !1),
      (this.xnl = 0),
      (this.YVe = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.Y6e = () => {
        this.J6e();
      }),
      (this.RefreshByDetectingId = (e, i) => {
        this.H6e && this.H6e !== i && this.H6e.SetToggleState(0),
          this.SPe?.StopCurrentSequence(!1, !0),
          this.SPe?.PlayLevelSequenceByName("Switch"),
          (ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId =
            e),
          (this.H6e = i),
          (this.F6e = e);
        var i =
            ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(
              e,
            ),
          t =
            ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
              i.Conf.MonsterInfoId,
            ).Name,
          r = {
            Data: [{ IncId: 0, ItemId: i.Conf.MonsterInfoId }, 1],
            Type: 3,
            BottomText: "",
            IsNotFoundVisible: i.IsLock,
            IsSelectedFlag: !1,
            MonsterId: i.Conf.MonsterInfoId,
            IsQualityHidden: !0,
            IconHidden: i.IsLock,
          },
          r =
            (this.$6e?.Apply(r),
            this.$6e?.SetToggleInteractive(!1),
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              TextById_1.configTextById.GetConfig(
                AdventureGuideController_1.DETECT,
              ).Text,
            )),
          r =
            (this.j6e.SetText(r),
            i.IsLock
              ? (LguiUtil_1.LguiUtil.SetLocalText(
                  this.GetText(4),
                  AdventureGuideController_1.UNKNOWNTEXT,
                ),
                LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(5),
                  i.Conf.AttributesDescriptionLock,
                ))
              : (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t),
                LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(5),
                  i.Conf.AttributesDescriptionUnlock,
                ),
                this.J6e()),
            ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(
              i.Conf.DangerType,
            )),
          t =
            (LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(11),
              ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataTextById(
                i.Conf.DangerType,
              ),
            ),
            this.SetSpriteByPath(r.Icon, this.GetSprite(6), !1),
            i.Conf.ShowReward
              ? (this.GetItem(9).SetUIActive(!0),
                this.z6e(i.Conf.ShowReward, !1))
              : this.GetItem(9).SetUIActive(!1),
            ControllerHolder_1.ControllerHolder.AdventureGuideController.NormalMonsterManualInfoRequest(
              e,
            ),
            CommonParamById_1.configCommonParamById.GetIntArrayConfig(
              "CanUpAbsorbDangerTypeList",
            )),
          r = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
            "CanUpAbsorbTypeDescription2List",
          ),
          e =
            t.includes(i.Conf.DangerType) &&
            r.includes(i.Conf.TypeDescription2);
        this.GetText(15)?.SetUIActive(e),
          this.GetButton(16)?.RootUIComp.SetUIActive(e);
      }),
      (this.Z6e = (e) => {
        var i = new Array();
        for (const t of e) i.push(t);
        this.e8e(i);
      }),
      (this.t8e = () => {
        var e;
        Time_1.Time.Now - this.L6e <= TimeUtil_1.TimeUtil.InverseMillisecond ||
          ((this.L6e = Time_1.Time.Now),
          ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
            ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "DungeonDetection",
              )
            : ((e = this.GetCurrentId()),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("AdventureGuide", 5, "手动探测怪物", [
                  "探测Id",
                  e,
                ]),
              ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(
                !0,
              ),
              ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(
                Protocol_1.Aki.Protocol.r8n.Proto_NormalMonster,
                [],
                this.F6e,
              )));
      }),
      (this.i8e = () => {
        HelpController_1.HelpController.OpenHelpById(LEFT_TIME_HELP);
      }),
      (this.Pnl = () => {
        this.wnl(), this.O6e?.SetAnimFinishDelegate(void 0);
      });
  }
  GetCurrentId() {
    return this.F6e;
  }
  GetCurrentToggle() {
    return this.H6e;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UISprite],
      [7, UE.UILoopScrollViewComponent],
      [8, UE.UIScrollViewWithScrollbarComponent],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UIText],
      [12, UE.UIText],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIText],
      [16, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [1, this.t8e],
        [16, this.i8e],
      ]);
  }
  OnStart() {
    (this.O6e = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(7),
      this.GetItem(2).GetOwner(),
      () => {
        var e = new MonsterDetectItem_1.MonsterDetectItem();
        return e.BindCallback(this.RefreshByDetectingId), e;
      },
    )),
      this.O6e.SetAnimFinishDelegate(this.Pnl),
      (this.$6e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      this.$6e.Initialize(this.GetItem(14).GetOwner()),
      (this.k6e = new Array()),
      (this.H3e = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(8),
        this.YVe,
      )),
      (this.V6e = new FilterSortEntrance_1.FilterSortEntrance(
        this.GetItem(0),
        this.Z6e,
      )),
      (this.j6e = this.GetText(10)),
      this.j6e.OnSelfLanguageChange.Bind(this.Y6e),
      (this.Q6e = this.GetButton(1)),
      (this.F6e =
        ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingMonsterConfId()),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
    var e =
      ModelManager_1.ModelManager.CalabashModel.GetLeftIntensifyCaptureGuarantee();
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(15),
      "UpAbsorptionTimeWithTagText",
      e,
    ),
      this.Bnl();
  }
  Bnl() {
    var e = this.ExtraParams,
      e =
        "MonsterDetectView" === e.OpenTabViewName
          ? Number(e.OpenParam)
          : void 0;
    void 0 !== e && 0 < e && (this.Anl = !0);
  }
  wnl() {
    var e;
    this.Anl &&
      ((this.Anl = !1), (e = this.O6e.UnsafeGetGridProxy(this.xnl))) &&
      UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(
        e.GetToggleItem(),
      );
  }
  OnBeforeShow() {
    var e = this.ExtraParams,
      e =
        "MonsterDetectView" === e.OpenTabViewName
          ? Number(e.OpenParam)
          : void 0;
    let i = void 0;
    void 0 !== e && (0 < e ? (i = Number(e)) : (this.K6e = -Number(e))),
      (this.W6e = i),
      (ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId = i),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("AdventureGuide", 27, "当前拾音辑录默认选择怪物", [
          "id",
          i,
        ]),
      this.V6e.UpdateData(
        16,
        Array.from(
          ModelManager_1.ModelManager.AdventureGuideModel.GetAllDetectMonsters().values(),
        ),
      ),
      this.SPe?.StopCurrentSequence(),
      this.SPe?.PlayLevelSequenceByName("Start"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AdventureHelpBtn,
        MONSTER_HELP,
      );
  }
  OnBeforeDestroy() {
    (this.H3e = void 0),
      this.O6e && (this.O6e.ClearGridProxies(), (this.O6e = void 0)),
      this.j6e.OnSelfLanguageChange.Unbind(),
      this.SPe?.Clear(),
      (this.SPe = void 0);
  }
  e8e(e) {
    this.k6e.length = 0;
    for (const i of e)
      this.k6e.push(i),
        -1 !== this.W6e && this.W6e === i.Conf.Id && (this.W6e = -1);
    ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId ||
      ((e = this.o8e()),
      (ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId = e));
    this.O6e.RefreshByData(
      this.k6e,
      !1,
      () => {
        this.JumpToTarget(
          ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId,
        );
      },
      !0,
    );
  }
  o8e() {
    var e = this.K6e;
    if (((this.K6e = void 0), this.k6e.length <= 0)) return -1;
    var i = this.k6e[0].Conf.Id;
    if (void 0 !== e)
      for (const t of this.k6e)
        if (!t.IsLock && t.Conf.DangerType === e) return t.Conf.Id;
    return i;
  }
  J6e() {
    var e,
      i,
      t = this.GetCurrentId();
    t &&
      (t =
        ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(
          t,
        )) &&
      (this.GetItem(13).SetUIActive(t.IsLock),
      (e = this.GetText(12)),
      t.IsLock
        ? (i = t.Conf.LockCon) &&
          ((i = ConditionGroupById_1.configConditionGroupById.GetConfig(i)),
          LguiUtil_1.LguiUtil.SetLocalTextNew(e, i.HintText))
        : (this.Q6e.RootUIComp.SetUIActive(!0),
          t.IsLock ||
            this.X6e ||
            (this.Q6e.SetSelfInteractive(!0), (this.X6e = !0))));
  }
  Tick(e) {
    this.J6e();
  }
  z6e(e, i) {
    var t =
        ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(e),
      r = new Array();
    for (const s of t.keys()) {
      var o = [{ IncId: 0, ItemId: s }, t.get(s)];
      r.push(o);
    }
    this.H3e.RefreshByData(r);
  }
  JumpToTarget(e) {
    let i = 0,
      t = !1;
    for (const r of this.k6e) {
      if (e === r.Conf.Id) {
        this.O6e.DeselectCurrentGridProxy(),
          this.O6e.ScrollToGridIndex(i, !0),
          this.O6e.SelectGridProxy(i),
          (t = !0);
        break;
      }
      i++;
    }
    (this.xnl = i),
      t ||
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("AdventureGuide", 27, "找不到拾音辑录跳转Target", [
            "target",
            e,
          ]));
  }
}
exports.MonsterDetectView = MonsterDetectView;
//# sourceMappingURL=MonsterDetectView.js.map
