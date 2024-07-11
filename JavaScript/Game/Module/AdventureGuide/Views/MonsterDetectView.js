"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterDetectView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const ConditionGroupById_1 = require("../../../../Core/Define/ConfigQuery/ConditionGroupById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const TextById_1 = require("../../../../Core/Define/ConfigQuery/TextById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const HelpController_1 = require("../../Help/HelpController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const AdventureDefine_1 = require("../AdventureDefine");
const AdventureGuideController_1 = require("../AdventureGuideController");
const MonsterDetectItem_1 = require("./MonsterDetectItem");
const MONSTER_HELP = 17;
const LEFT_TIME_HELP = 72;
class MonsterDetectView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.TVe = void 0),
      (this.LVe = void 0),
      (this.DFe = void 0),
      (this.DVe = 0),
      (this.RVe = void 0),
      (this.UVe = void 0),
      (this.AVe = void 0),
      (this.PVe = -1),
      (this.xVe = void 0),
      (this.wVe = void 0),
      (this.BVe = !0),
      (this.cVe = 0),
      (this.bVe = void 0),
      (this.EPe = void 0),
      (this.q5e = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.qVe = () => {
        this.GVe();
      }),
      (this.RefreshByDetectingId = (e, t) => {
        this.UVe && this.UVe !== t && this.UVe.SetToggleState(0),
          this.EPe?.StopCurrentSequence(!1, !0),
          this.EPe?.PlayLevelSequenceByName("Switch"),
          (ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId =
            e),
          (this.UVe = t),
          (this.DVe = e);
        var t =
          ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(
            e,
          );
        const i =
          ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
            t.Conf.MonsterInfoId,
          ).Name;
        var r = {
          Data: [{ IncId: 0, ItemId: t.Conf.MonsterInfoId }, 1],
          Type: 3,
          BottomText: "",
          IsNotFoundVisible: t.IsLock,
          IsSelectedFlag: !1,
          MonsterId: t.Conf.MonsterInfoId,
          IsQualityHidden: !0,
          IconHidden: t.IsLock,
        };
        var r =
          (this.bVe?.Apply(r),
          this.bVe?.SetToggleInteractive(!1),
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            TextById_1.configTextById.GetConfig(
              AdventureGuideController_1.DETECT,
            ).Text,
          ));
        var r =
          (this.AVe.SetText(r),
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
              this.GVe()),
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
            ? (this.GetItem(9).SetUIActive(!0), this.NVe(t.Conf.ShowReward, !1))
            : this.GetItem(9).SetUIActive(!1),
          ControllerHolder_1.ControllerHolder.AdventureGuideController.NormalMonsterManualInfoRequest(
            e,
          );
      }),
      (this.OVe = (e) => {
        const t = new Array();
        for (const i of e) t.push(i);
        this.kVe(t);
      }),
      (this.FVe = () => {
        if (
          !(
            Time_1.Time.Now - this.cVe <=
            TimeUtil_1.TimeUtil.InverseMillisecond
          )
        )
          if (
            ((this.cVe = Time_1.Time.Now),
            ModelManager_1.ModelManager.CreatureModel.GetInstanceId() !==
              AdventureDefine_1.BigWorldID)
          )
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "DungeonDetection",
            );
          else {
            let t =
              ModelManager_1.ModelManager.AdventureGuideModel.GetAllDetectMonsters().get(
                this.DVe,
              );
            let e =
              ControllerHolder_1.ControllerHolder.AdventureGuideController.GetValidMonsterEntityIdsOfDetectConf(
                t.Conf,
              );
            if (!e.length) {
              t = t.Conf.EntityConfigId;
              if (!t)
                return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "NoMonster",
                );
              e = [t];
            }
            t = this.GetCurrentId();
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("AdventureGuide", 5, "手动探测怪物", [
                "探测Id",
                t,
              ]),
              ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(
                !0,
              ),
              ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(
                Protocol_1.Aki.Protocol.d3n.Proto_NormalMonster,
                e,
                this.DVe,
              );
          }
      }),
      (this.VVe = () => {
        HelpController_1.HelpController.OpenHelpById(LEFT_TIME_HELP);
      });
  }
  GetCurrentId() {
    return this.DVe;
  }
  GetCurrentToggle() {
    return this.UVe;
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
        [1, this.FVe],
        [16, this.VVe],
      ]);
  }
  OnStart() {
    (this.TVe = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(7),
      this.GetItem(2).GetOwner(),
      () => {
        const e = new MonsterDetectItem_1.MonsterDetectItem();
        return e.BindCallback(this.RefreshByDetectingId), e;
      },
    )),
      (this.bVe = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      this.bVe.Initialize(this.GetItem(14).GetOwner()),
      (this.LVe = new Array()),
      (this.DFe = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(8),
        this.q5e,
      )),
      (this.RVe = new FilterSortEntrance_1.FilterSortEntrance(
        this.GetItem(0),
        this.OVe,
      )),
      (this.AVe = this.GetText(10)),
      this.AVe.OnSelfLanguageChange.Bind(this.qVe),
      (this.wVe = this.GetButton(1)),
      (this.DVe =
        ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingMonsterConfId()),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
    const e =
      ConfigManager_1.ConfigManager.CalabashConfig.GetIntensifyCaptureGuarantee() -
      ModelManager_1.ModelManager.CalabashModel.GetIdentifyGuaranteeCount();
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(15),
      "UpAbsorptionTimeWithTagText",
      e,
    );
  }
  OnBeforeShow() {
    var e = this.ExtraParams;
    var e = e[0] === "MonsterDetectView" ? e[1] : void 0;
    let t = void 0;
    void 0 !== e && (e > 0 ? (t = Number(e)) : (this.xVe = -Number(e))),
      (this.PVe = t),
      (ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId = t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("AdventureGuide", 28, "当前拾音辑录默认选择怪物", [
          "id",
          t,
        ]),
      this.RVe.UpdateData(
        16,
        Array.from(
          ModelManager_1.ModelManager.AdventureGuideModel.GetAllDetectMonsters().values(),
        ),
      ),
      this.EPe?.StopCurrentSequence(),
      this.EPe?.PlayLevelSequenceByName("Start"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AdventureHelpBtn,
        MONSTER_HELP,
      );
  }
  OnBeforeDestroy() {
    (this.DFe = void 0),
      this.TVe && (this.TVe.ClearGridProxies(), (this.TVe = void 0)),
      this.AVe.OnSelfLanguageChange.Unbind(),
      this.EPe?.Clear(),
      (this.EPe = void 0);
  }
  kVe(e) {
    this.LVe.length = 0;
    for (const t of e)
      this.LVe.push(t),
        this.PVe !== -1 && this.PVe === t.Conf.Id && (this.PVe = -1);
    ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId ||
      ((e = this.HVe()),
      (ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId = e));
    this.TVe.RefreshByData(
      this.LVe,
      !1,
      () => {
        this.JumpToTarget(
          ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId,
        );
      },
      !0,
    );
  }
  HVe() {
    const e = this.xVe;
    const t = ((this.xVe = void 0), this.LVe[0].Conf.Id);
    if (void 0 !== e)
      for (const i of this.LVe)
        if (!i.IsLock && i.Conf.DangerType === e) return i.Conf.Id;
    return t;
  }
  GVe() {
    let e;
    let t;
    let i = this.GetCurrentId();
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
        : (this.wVe.RootUIComp.SetUIActive(!0),
          i.IsLock ||
            this.BVe ||
            (this.wVe.SetSelfInteractive(!0), (this.BVe = !0))));
  }
  Tick(e) {
    this.GVe();
  }
  NVe(e, t) {
    const i =
      ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(e);
    const r = new Array();
    for (const n of i.keys()) {
      const o = [{ IncId: 0, ItemId: n }, i.get(n)];
      r.push(o);
    }
    this.DFe.RefreshByData(r);
  }
  JumpToTarget(e) {
    let t = 0;
    let i = !1;
    for (const r of this.LVe) {
      if (e === r.Conf.Id) {
        this.TVe.DeselectCurrentGridProxy(),
          this.TVe.ScrollToGridIndex(t, !0),
          this.TVe.SelectGridProxy(t),
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
// # sourceMappingURL=MonsterDetectView.js.map
