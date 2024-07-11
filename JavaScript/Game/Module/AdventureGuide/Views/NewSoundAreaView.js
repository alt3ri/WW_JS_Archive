"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewSoundAreaView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityDoubleRewardController_1 = require("../../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown"),
  OneTextDropDownItem_1 = require("../../Common/DropDown/Item/OneText/OneTextDropDownItem"),
  OneTextTitleItem_1 = require("../../Common/DropDown/Item/OneText/OneTextTitleItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  AdventureDefine_1 = require("../AdventureDefine"),
  AdventureGuideController_1 = require("../AdventureGuideController"),
  NewSoundDetectItem_1 = require("./NewSoundDetectItem"),
  NewSoundTypeItem_1 = require("./NewSoundTypeItem");
class NewSoundAreaView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.jVe = void 0),
      (this.WVe = void 0),
      (this.KVe = []),
      (this.QVe = AdventureDefine_1.EDungeonType.Mat),
      (this.UVe = void 0),
      (this.XVe = void 0),
      (this.$Ve = void 0),
      (this.YVe = void 0),
      (this.JVe = 0),
      (this.O3e = 0),
      (this.V5s = 1),
      (this.zVe = (e) => new OneTextTitleItem_1.OneTextTitleItem(e)),
      (this.ZVe = (e) => new OneTextDropDownItem_1.OneTextDropDownItem(e)),
      (this.e6e = (e) => {
        (this.V5s = e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.NewSoundAreaRefreshReward,
            e,
          ),
          this.YVe?.GetCurrentSequence()
            ? this.YVe?.ReplaySequenceByKey("Switch")
            : this.YVe?.PlayLevelSequenceByName("Switch");
      }),
      (this.t6e = (e, i) => {
        this.e6e(i);
      }),
      (this.i6e = (e) => {
        var i =
          e === ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel
            ? "Text_WorldCurrentLevelTag_Text"
            : "Text_WorldLevelTag_Text";
        return new LguiUtil_1.TableTextArgNew(i, e);
      }),
      (this.o6e = () => {
        UiManager_1.UiManager.OpenView("LordGymChallengeRecordView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UILoopScrollViewComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIText],
      [14, UE.UIItem],
      [15, UE.UIButtonComponent],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIText],
      [20, UE.UIItem],
      [21, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[15, this.o6e]]);
  }
  OnBeforeDestroy() {
    this.jVe?.ClearGridProxies(),
      this.WVe?.ClearGridProxies(),
      this.$Ve?.Clear(),
      (this.$Ve = void 0),
      this.YVe?.Clear(),
      (this.YVe = void 0);
  }
  async OnBeforeStartAsync() {
    (this.XVe = new CommonDropDown_1.CommonDropDown(
      this.GetItem(17),
      this.ZVe,
      this.zVe,
    )),
      await this.XVe.Init();
  }
  OnStart() {
    const i = (e, i) => {
        this.QVe = e;
        var t =
            ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(
              e,
            ),
          i =
            (this.GetItem(21)?.SetUIActive(t?.ShowDropDown ?? !1),
            this.UVe?.SetToggleState(0, !1),
            (this.UVe = i),
            this.KVe.indexOf(e)),
          e =
            (0 <= i && this.jVe.SelectGridProxy(i, !1),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.AdventureHelpBtn,
              t.HelpGroupId,
            ),
            (this.O3e = t.HelpGroupId),
            this.RefreshDungeonType(),
            this.r6e(),
            this.e6e(this.V5s),
            this.YVe?.GetCurrentSequence()
              ? this.YVe?.ReplaySequenceByKey("Switch")
              : this.YVe?.PlayLevelSequenceByName("Switch"),
            ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetAdventureUpActivity(
              this.QVe,
            ));
        e
          ? (this.GetItem(18).SetUIActive(!0),
            (i = e.GetNumTxtAndParam()),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(19),
              i[0],
              i[1],
              i[2],
            ))
          : this.GetItem(18).SetUIActive(!1);
      },
      t = (e) => this.QVe !== e;
    (this.jVe = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(1),
      this.GetItem(4).GetOwner(),
      () => {
        var e = new NewSoundTypeItem_1.NewSoundTypeItem();
        return e.BindOnToggleFunc(i), e.BindCanToggleExecuteChange(t), e;
      },
    )),
      (this.WVe = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(3),
        this.GetItem(2).GetOwner(),
        () => new NewSoundDetectItem_1.NewSoundDetectItem(),
      ));
    var r = [];
    for (
      let e = AdventureDefine_1.WORLD_LEVEL_MIN;
      e <= AdventureDefine_1.WORLD_LEVEL_MAX;
      e++
    )
      r.push(e);
    (this.JVe = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel - 1),
      (this.V5s = this.JVe),
      this.XVe.SetOnSelectCall(this.t6e),
      this.XVe.SetShowType(0),
      this.XVe.InitScroll(r, this.i6e, this.JVe);
    var e =
      ModelManager_1.ModelManager.AdventureGuideModel.GetAllCanShowDungeonTypeList();
    (this.KVe = e),
      (this.$Ve = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.YVe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  r6e() {
    var e =
      ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(
        this.QVe,
      );
    e?.length &&
      ((this.QVe !== AdventureDefine_1.EDungeonType.Tutorial &&
        this.QVe !== AdventureDefine_1.EDungeonType.SkillTeach) ||
        e.sort((e, i) => {
          (e = e.Conf.SubDungeonId), (i = i.Conf.SubDungeonId);
          return (
            (ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(e)
              ? 1
              : 0) -
            (ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(i)
              ? 1
              : 0)
          );
        }),
      this.WVe.RefreshByData(e));
  }
  OnBeforeShow() {
    var e = this.ExtraParams,
      e =
        "NewSoundAreaView" === e[0] || "DisposableChallengeView" === e[0]
          ? e[1]
          : void 0;
    let i = 0;
    void 0 !== e && 0 <= (e = this.KVe.indexOf(Number(e))) && (i = e),
      this.jVe.RefreshByData(this.KVe, void 0, () => {
        this.jVe.SelectGridProxy(i, !0),
          this.jVe.UnsafeGetGridProxy(i)?.SetSelectToggle();
      }),
      this.$Ve?.PlayLevelSequenceByName("Start"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AdventureHelpBtn,
        this.O3e,
      );
  }
  RefreshDungeonType() {
    switch (
      (this.GetItem(5).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1),
      this.GetItem(12).SetUIActive(!1),
      this.GetItem(14).SetUIActive(!1),
      this.GetItem(16).SetUIActive(!1),
      this.GetItem(11).SetUIActive(!1),
      this.GetItem(20).SetUIActive(!1),
      this.QVe)
    ) {
      case AdventureDefine_1.EDungeonType.Rouge:
        this.n6e();
        break;
      case AdventureDefine_1.EDungeonType.Tower:
        this.s6e(), this.a6e();
        break;
      case AdventureDefine_1.EDungeonType.Weekly:
        this.s6e();
        break;
      case AdventureDefine_1.EDungeonType.LordGym:
        this.h6e();
        break;
      case AdventureDefine_1.EDungeonType.SkillTeach:
        this.l6e();
        break;
      case AdventureDefine_1.EDungeonType.Tutorial:
        this._6e();
        break;
      case AdventureDefine_1.EDungeonType.NoSoundArea:
      case AdventureDefine_1.EDungeonType.Boss:
      case AdventureDefine_1.EDungeonType.Mat:
    }
  }
  n6e() {
    this.GetItem(5).SetUIActive(!0);
    var e =
        ModelManager_1.ModelManager.InventoryModel?.GetItemCountByConfigId(
          RoguelikeDefine_1.OUTSIDE_CURRENCY_ID,
        ) ?? 0,
      i =
        ModelManager_1.ModelManager.RoguelikeModel?.GetParamConfigBySeasonId();
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(6),
      "Roguelike_ActivityMain_Score",
      e,
      i,
    );
  }
  a6e() {
    this.GetItem(11).SetUIActive(!0), this.GetItem(12).SetUIActive(!0);
    var e = ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty(),
      e =
        ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(
          e,
        );
    this.GetText(13)?.SetText(e);
  }
  h6e() {
    this.GetItem(11).SetUIActive(!0), this.GetItem(14).SetUIActive(!0);
  }
  l6e() {
    this.GetItem(11).SetUIActive(!0), this.GetItem(20).SetUIActive(!0);
  }
  _6e() {
    this.GetItem(11).SetUIActive(!0), this.GetItem(16).SetUIActive(!0);
  }
  s6e() {
    var i = this.GetItem(8),
      t = (i?.SetUIActive(!0), this.GetText(10)),
      r = this.GetText(9);
    if (this.QVe === AdventureDefine_1.EDungeonType.Weekly) {
      r.SetUIActive(!1);
      var n =
        ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(
          this.QVe,
        );
      let e = 0;
      if (1 === n[0].Type) {
        var s = n[0].Conf.MarkId;
        if (!s) return void i.SetUIActive(!1);
        e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(s)?.Reward;
      } else {
        if (!n[0].Conf.DungeonId) return void i.SetUIActive(!1);
        e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          n[0].Conf.SubDungeonId,
        )?.RewardId;
      }
      t.SetUIActive(!0);
      var s =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(
          e,
        )?.SharedId;
      s
        ? ((n =
            ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(
              s,
            )),
          (s =
            ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(
              s,
            )),
          (s = (n = n.MaxCount) - s),
          LguiUtil_1.LguiUtil.SetLocalText(
            t,
            AdventureGuideController_1.RECEIVED_COUNT,
            s + "/" + n,
          ))
        : i.SetUIActive(!1);
    } else
      this.QVe === AdventureDefine_1.EDungeonType.Tower &&
        (t?.SetUIActive(!1),
        r.SetUIActive(!0),
        (s =
          ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData()
            .CountDownText),
        r.SetText(s));
  }
  OnBeforeHide() {
    UiManager_1.UiManager.IsViewShow("PowerView") &&
      UiManager_1.UiManager.CloseView("PowerView");
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (1 !== e.length || isNaN(Number(e[0])))
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
          "configParams",
          e,
        ]);
    else {
      e = Number(e[0]);
      if (0 === e)
        return (i = this.WVe.GetGridByDisplayIndex(0)) ? [i, i] : void 0;
      var i = this.KVe.indexOf(e);
      if (0 <= i) {
        e = this.jVe?.UnsafeGetGridProxy(i);
        if (e) {
          i = e.GetButtonItem();
          if (i) return [i, i];
        }
      }
    }
  }
}
exports.NewSoundAreaView = NewSoundAreaView;
//# sourceMappingURL=NewSoundAreaView.js.map
