"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterDetectView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
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
      (this.YVe = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.Y6e = () => {
        this.J6e();
      }),
      (this.RefreshByDetectingId = (e, t) => {
        this.H6e && this.H6e !== t && this.H6e.SetToggleState(0),
          this.SPe?.StopCurrentSequence(!1, !0),
          this.SPe?.PlayLevelSequenceByName("Switch"),
          (ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId =
            e),
          (this.H6e = t),
          (this.F6e = e);
        var t =
            ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(
              e,
            ),
          i =
            ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
              t.Conf.MonsterInfoId,
            ).Name,
          r = {
            Data: [{ IncId: 0, ItemId: t.Conf.MonsterInfoId }, 1],
            Type: 3,
            BottomText: "",
            IsNotFoundVisible: t.IsLock,
            IsSelectedFlag: !1,
            MonsterId: t.Conf.MonsterInfoId,
            IsQualityHidden: !0,
            IconHidden: t.IsLock,
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
            t.IsLock
              ? (LguiUtil_1.LguiUtil.SetLocalText(
                  this.GetText(4),
                  AdventureGuideController_1.UNKNOWNTEXT,
                ),
                LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(5),
                  t.Conf.AttributesDescriptionLock,
                ))
              : (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i),
                LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(5),
                  t.Conf.AttributesDescriptionUnlock,
                ),
                this.J6e()),
            ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(
              t.Conf.DangerType,
            ));
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(11),
          ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataTextById(
            t.Conf.DangerType,
          ),
        ),
          this.SetSpriteByPath(r.Icon, this.GetSprite(6), !1),
          t.Conf.ShowReward
            ? (this.GetItem(9).SetUIActive(!0), this.z6e(t.Conf.ShowReward, !1))
            : this.GetItem(9).SetUIActive(!1),
          ControllerHolder_1.ControllerHolder.AdventureGuideController.NormalMonsterManualInfoRequest(
            e,
          );
      }),
      (this.Z6e = (e) => {
        var t = new Array();
        for (const i of e) t.push(i);
        this.e8e(t);
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
    );
  }
  OnBeforeShow() {
    var e = this.ExtraParams,
      e = "MonsterDetectView" === e[0] ? e[1] : void 0;
    let t = void 0;
    void 0 !== e && (0 < e ? (t = Number(e)) : (this.K6e = -Number(e))),
      (this.W6e = t),
      (ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId = t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("AdventureGuide", 28, "当前拾音辑录默认选择怪物", [
          "id",
          t,
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
    for (const t of e)
      this.k6e.push(t),
        -1 !== this.W6e && this.W6e === t.Conf.Id && (this.W6e = -1);
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
    var e = this.K6e,
      t = ((this.K6e = void 0), this.k6e[0].Conf.Id);
    if (void 0 !== e)
      for (const i of this.k6e)
        if (!i.IsLock && i.Conf.DangerType === e) return i.Conf.Id;
    return t;
  }
  J6e() {
    var e,
      t,
      i = this.GetCurrentId();
    i &&
      (i =
        ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(
          i,
        )) &&
      (this.GetItem(13).SetUIActive(i.IsLock),
      (e = this.GetText(12)),
      i.IsLock
        ? (t = i.Conf.LockCon) &&
          ((t = ConditionGroupById_1.configConditionGroupById.GetConfig(t)),
          LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.HintText))
        : (this.Q6e.RootUIComp.SetUIActive(!0),
          i.IsLock ||
            this.X6e ||
            (this.Q6e.SetSelfInteractive(!0), (this.X6e = !0))));
  }
  Tick(e) {
    this.J6e();
  }
  z6e(e, t) {
    var i =
        ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(e),
      r = new Array();
    for (const s of i.keys()) {
      var o = [{ IncId: 0, ItemId: s }, i.get(s)];
      r.push(o);
    }
    this.H3e.RefreshByData(r);
  }
  JumpToTarget(e) {
    let t = 0,
      i = !1;
    for (const r of this.k6e) {
      if (e === r.Conf.Id) {
        this.O6e.DeselectCurrentGridProxy(),
          this.O6e.ScrollToGridIndex(t, !0),
          this.O6e.SelectGridProxy(t),
          (i = !0);
        break;
      }
      t++;
    }
    i ||
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("AdventureGuide", 28, "找不到拾音辑录跳转Target", [
          "target",
          e,
        ]));
  }
}
exports.MonsterDetectView = MonsterDetectView;
//# sourceMappingURL=MonsterDetectView.js.map
