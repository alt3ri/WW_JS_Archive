"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SilentAreaView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ConditionGroupById_1 = require("../../../../Core/Define/ConfigQuery/ConditionGroupById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  AdventureDefine_1 = require("../AdventureDefine"),
  AdventureGuideController_1 = require("../AdventureGuideController"),
  SilentAreaItem_1 = require("./SilentAreaItem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  SILENT_HELP = 18;
class SilentAreaView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.DFe = void 0),
      (this.B6e = void 0),
      (this.b6e = 0),
      (this.q6e = void 0),
      (this.IRe = void 0),
      (this.G6e = void 0),
      (this.TVe = void 0),
      (this.LVe = void 0),
      (this.q5e = (e, i, r) => {
        var t = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
        return (
          t.Initialize(i.GetOwner()),
          t.RefreshByConfigId(e.Id, e.Num, e),
          t.SetReceivedVisible(e.Received),
          { Key: r, Value: t }
        );
      }),
      (this.N6e = (e, i) => {
        this.G6e && this.G6e !== i && this.G6e.SetToggleState(0),
          (this.G6e = i),
          (ModelManager_1.ModelManager.AdventureGuideModel.CurrentSilentId = e);
        var i =
            ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(
              e,
            ),
          e = ((this.b6e = e), this.GetText(2)),
          r = this.GetText(1),
          t = i.Conf.Name,
          o = this.GetText(17);
        if (
          (o.SetUIActive(i.IsLock),
          this.GetButton(0).RootUIComp.SetUIActive(!i.IsLock),
          i.IsLock)
        ) {
          LguiUtil_1.LguiUtil.SetLocalText(
            r,
            AdventureGuideController_1.UNKNOWNTEXT,
          );
          var n = i.Conf.LockCon;
          n &&
            ((n = ConditionGroupById_1.configConditionGroupById.GetConfig(n)),
            LguiUtil_1.LguiUtil.SetLocalTextNew(o, n.HintText));
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(r, t);
          let e = 0;
          for (const _ of i.Conf.LevelPlayList) {
            var l =
              ModelManager_1.ModelManager.AdventureGuideModel.GetLevelOfLevelPlay(
                _,
              );
            l > e && (e = l);
          }
        }
        var o =
            ControllerHolder_1.ControllerHolder.AdventureGuideController.GetMarkAreaText(
              i.Conf.MarkId,
            ),
          s =
            ("" === o ? e.SetUIActive(!1) : (e.SetUIActive(!0), e.SetText(o)),
            this.GetItem(7)),
          a =
            (LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(14),
              ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataTextById(
                AdventureGuideController_1.HIGHLEVELTEXTID,
              ),
            ),
            this.GetItem(6)),
          d =
            (LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(15),
              ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataTextById(
                AdventureGuideController_1.MIDLEVELTEXTID,
              ),
            ),
            this.GetItem(5));
        switch (
          (LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(16),
            ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataTextById(
              AdventureGuideController_1.LOWLEVELTEXTID,
            ),
          ),
          i.Conf.DangerType)
        ) {
          case AdventureDefine_1.EDangerType.Low:
            s.SetUIActive(!0), a.SetUIActive(!1), d.SetUIActive(!1);
            break;
          case AdventureDefine_1.EDangerType.Middle:
            s.SetUIActive(!1), a.SetUIActive(!0), d.SetUIActive(!1);
            break;
          case AdventureDefine_1.EDangerType.High:
            s.SetUIActive(!1), a.SetUIActive(!1), d.SetUIActive(!0);
        }
        (n = this.GetTexture(4)),
          (r = this.GetItem(12)),
          (t = this.GetText(13));
        let h = "0";
        i.IsLock
          ? ((h = i.Conf.AttributesDescriptionLock),
            n.SetUIActive(!1),
            r.SetUIActive(!0),
            this.q6e.SetInteractable(!1),
            LguiUtil_1.LguiUtil.SetLocalText(
              t,
              AdventureGuideController_1.UNDISCOVERED,
            ))
          : ((h = i.Conf.AttributesDescriptionUnlock),
            r.SetUIActive(!1),
            n.SetUIActive(!0),
            this.q6e.SetInteractable(!0),
            LguiUtil_1.LguiUtil.SetLocalText(
              t,
              AdventureGuideController_1.DETECT,
            ),
            this.SetTextureByPath(i.Conf.TemporaryIconUnLock, n)),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), h);
        (e = this.GetText(8)),
          e.SetUIActive(!i.IsLock),
          i.IsLock ||
            e.SetText(
              ModelManager_1.ModelManager.AdventureGuideModel.GetCostOfLevelPlay(
                i.Conf.LevelPlayList[0],
              ).toString(),
            ),
          (o = this.GetText(9));
        o.SetUIActive(!1),
          LguiUtil_1.LguiUtil.SetLocalText(
            o,
            AdventureGuideController_1.RECEIVED_COUNT,
            "",
          ),
          this.BuildRewardList(i.Conf.ShowReward);
      }),
      (this.O6e = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ResetToBattleView,
        );
        var e = {
          MarkId: CommonParamById_1.configCommonParamById.GetIntConfig(
            "BoPianExchangeMarkId",
          ),
          MarkType: 8,
          OpenAreaId: 0,
        };
        WorldMapController_1.WorldMapController.OpenView(2, !1, e);
      }),
      (this.FVe = () => {
        var e;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "AdventureGuide",
            5,
            "点击无音区探测按钮 SilentAreaView",
          ),
          ModelManager_1.ModelManager.CreatureModel.GetInstanceId() !==
          AdventureDefine_1.BigWorldID
            ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "DungeonDetection",
              )
            : ((e =
                ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(
                  this.b6e,
                )),
              ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(
                !0,
              ),
              ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(
                Protocol_1.Aki.Protocol.d3n.Proto_SilentArea,
                e.Conf.LevelPlayList,
                this.b6e,
              ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UITexture],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UILoopScrollViewComponent],
      [11, UE.UIScrollViewWithScrollbarComponent],
      [12, UE.UIItem],
      [13, UE.UIText],
      [14, UE.UIText],
      [15, UE.UIText],
      [16, UE.UIText],
      [17, UE.UIText],
      [18, UE.UIButtonComponent],
      [19, UE.UIItem],
      [20, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.FVe],
        [18, this.O6e],
      ]);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.AdventureHelpBtn,
      SILENT_HELP,
    );
  }
  async OnBeforeStartAsync() {
    (this.B6e = new CommonCurrencyItem_1.CommonCurrencyItem()),
      await this.B6e.CreateThenShowByActorAsync(this.GetItem(19).GetOwner());
  }
  OnStart() {
    (this.TVe = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(10),
      this.GetItem(20).GetOwner(),
      () => {
        var e = new SilentAreaItem_1.SilentAreaItem();
        return e.BindCallback(this.N6e), e;
      },
    )),
      (this.DFe = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(11),
        this.q5e,
      )),
      void 0 === this.q6e &&
        (this.q6e = this.GetButton(0)
          .GetOwner()
          .GetComponentByClass(UE.UIInteractionGroup.StaticClass())),
      this.B6e.RefreshTemp(
        CommonParamById_1.configCommonParamById.GetIntConfig("BoPianId"),
      ),
      this.B6e.SetButtonActive(!1);
    var e = this.ExtraParams;
    let i = "DisposableChallengeView" === e[0] ? e[1] : void 0,
      r =
        (ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaConfVaild(
          i,
        ) || (i = void 0),
        void 0);
    (r = i
      ? (ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingSilentAreaConfId(
          i,
        ),
        ControllerHolder_1.ControllerHolder.AdventureGuideController.GetShowSilentAreasList(
          void 0,
          i,
        ))
      : ControllerHolder_1.ControllerHolder.AdventureGuideController.GetShowSilentAreasList(
          0,
        )).sort(
      (e, i) =>
        e.SilentAreaDetectionData.Conf.Id - i.SilentAreaDetectionData.Conf.Id,
    ),
      (ModelManager_1.ModelManager.AdventureGuideModel.CurrentSilentId =
        i ?? r[0].SilentAreaDetectionData.Conf.Id),
      (this.LVe = r),
      this.TVe.ReloadData(r),
      this.JumpToTarget(
        ModelManager_1.ModelManager.AdventureGuideModel.CurrentSilentId,
      );
  }
  OnBeforeDestroy() {
    this.IRe &&
      (TimerSystem_1.TimerSystem.Remove(this.IRe), (this.IRe = void 0)),
      this.DFe && (this.DFe.ClearChildren(), (this.DFe = void 0)),
      this.TVe && (this.TVe.ClearGridProxies(), (this.TVe = void 0)),
      this.B6e && (this.B6e.Destroy(), (this.B6e = void 0));
  }
  BuildRewardList(e) {
    var i =
        ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(e),
      r = new Array();
    for (const o of i.keys()) {
      var t = { Id: o, Num: i.get(o), Received: !1 };
      r.push(t);
    }
    this.DFe.RefreshByData(r);
  }
  JumpToTarget(e) {
    let i = 0;
    for (const r of this.LVe) {
      if (e === r.SilentAreaDetectionData.Conf.Id)
        return (
          this.TVe.DeselectCurrentGridProxy(),
          this.TVe.ScrollToGridIndex(i, !0),
          void this.TVe.SelectGridProxy(i)
        );
      i++;
    }
  }
}
exports.SilentAreaView = SilentAreaView;
//# sourceMappingURL=SilentAreaView.js.map
