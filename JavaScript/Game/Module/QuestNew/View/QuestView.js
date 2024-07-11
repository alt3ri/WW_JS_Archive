"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithTitle_1 = require("../../Common/TabComponent/TabComponentWithTitle");
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem");
const CommonTabItemBase_1 = require("../../Common/TabComponent/TabItem/CommonTabItemBase");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const GeneralLogicTreeController_1 = require("../../GeneralLogicTree/GeneralLogicTreeController");
const HelpController_1 = require("../../Help/HelpController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const QuestController_1 = require("../Controller/QuestController");
const QuestDefine_1 = require("../QuestDefine");
const QuestTypeItem_1 = require("./QuestTypeItem");
const QuestViewStep_1 = require("./QuestViewStep");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const ALL_QUEST_TYPE = 0;
const LEVEL_HELP = 49;
class QuestView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Vro = !1),
      (this.Hro = !1),
      (this.jro = 0),
      (this.Wro = !1),
      (this.Kro = []),
      (this.Qro = []),
      (this.Xro = void 0),
      (this.sOe = void 0),
      (this.$ro = void 0),
      (this.cpt = void 0),
      (this.Yro = 0),
      (this.Kwn = !1),
      (this.QuestDescChangeLang = () => {
        let e;
        this.jro &&
          ((e = ModelManager_1.ModelManager.QuestNewModel.GetQuestDetails(
            this.jro,
          )),
          this.GetText(9).SetText(e));
      }),
      (this.OZt = (t) => {
        this.Qro.forEach((e) => {
          e.OnSelect(t);
        });
      }),
      (this.Jro = (e) => {
        let t;
        const i =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
        if (i) {
          if (this.Qro) for (const s of this.Qro) s.UpdateItem(i.TreeConfigId);
          this.jro &&
            (t = ModelManager_1.ModelManager.QuestNewModel?.GetQuest(
              this.jro,
            )) &&
            t.TreeId === e &&
            this.zro(this.jro, !1);
        }
      }),
      (this.Zro = (e) => {
        this.eno(e);
      }),
      (this.Fwn = (e) => {
        if (this.Qro) {
          for (const t of this.Qro) t.UpdateList();
          this.ino(0);
        }
      }),
      (this.tno = () => {
        this.GetItem(1).SetUIActive(!0);
      }),
      (this.OnStartSequenceEvent = () => {
        if (this.Yro) this.eno(this.Yro);
        else {
          const e =
            ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
          if (e) this.jro = e.Id;
          else
            for (const i of this.Qro) {
              const t = i.GetDefaultItem();
              if (t) {
                this.jro = t.QuestId;
                break;
              }
            }
          this.eno(this.jro);
        }
        this.Vro = !0;
      }),
      (this.jmi = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.ino = (e) => {
        let t = !0;
        let i = void 0;
        const s = this.Kro[e].MainId;
        for (const n of this.Qro) {
          const o = s === ALL_QUEST_TYPE;
          const r = n.IsQuestEmpty();
          o
            ? (n.SetActive(!r), r || ((t = !1), (i = i || n)))
            : n.QuestType !== s
              ? n.SetActive(!1)
              : (n.SetActive(!r), (t = r), (i = n));
        }
        this.GetItem(15).SetUIActive(!t),
          this.GetItem(13).SetUIActive(t),
          this.GetItem(13).SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector),
          (this.Hro = !t),
          this.Hro
            ? this.Vro && this.OZt(i.GetDefaultItem()?.QuestId)
            : ((this.Hro = !1),
              this.UiViewSequence.StopSequenceByKey("Sle"),
              this.GetItem(1).SetUIActive(!1));
      }),
      (this.yqe = (e) => {
        var e = this.Kro[e];
        const t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTabIcon(
          e.MainId,
        );
        var e =
          ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
            e.MainId,
          );
        return new CommonTabData_1.CommonTabData(
          t,
          new CommonTabTitleData_1.CommonTabTitleData(e?.MainTypeName ?? ""),
        );
      }),
      (this.X3e = () => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (this.$_t = () => {
        if (this.Wro)
          QuestController_1.QuestNewController.RequestTrackQuest(
            this.jro,
            !1,
            1,
          ),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Quest", 50, "取消任务追踪", ["任务Id", this.jro]),
            this.ono(),
            this.rno();
        else {
          const s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
            this.jro,
          );
          if (s) {
            const t = () => {
              this.Wro ||
                (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
                  ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
                    .Id !== s.Tree.DungeonId &&
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "QuestTargetNotInCurScene",
                  )),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Quest", 50, "发送追踪请求至后端", [
                    "任务Id",
                    this.jro,
                  ]),
                QuestController_1.QuestNewController.RequestTrackQuest(
                  this.jro,
                  !0,
                  1,
                );
              var e = s.GetCurrentActiveChildQuestNode();
              let t =
                GeneralLogicTreeController_1.GeneralLogicTreeController.IsShowNodeTrackDistance(
                  s.TreeId,
                  e.NodeId,
                );
              var e = s.GetTrackDistance(e.NodeId);
              if (t && e) {
                t = s.GetCurrentActiveChildQuestNode()?.NodeId ?? 0;
                const i = {
                  MarkType: 12,
                  MarkId: s.GetDefaultMark(t),
                  IsNotFocusTween: !0,
                  OpenAreaId: 0,
                };
                UiManager_1.UiManager.GetViewByName("WorldMapView")
                  ? UiManager_1.UiManager.CloseViewAsync("WorldMapView").then(
                      () => {
                        UiManager_1.UiManager.CloseAndOpenView(
                          "QuestView",
                          "WorldMapView",
                          i,
                        );
                      },
                    )
                  : UiManager_1.UiManager.CloseAndOpenView(
                      "QuestView",
                      "WorldMapView",
                      i,
                    );
              } else
                this.ono(),
                  this.rno(),
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "FollowQuestStepGuide",
                  ),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Quest",
                      50,
                      "追踪失败，不满足任务追踪的前置条件",
                      ["任务Id", this.jro],
                    );
            };
            let e;
            s.IsSuspend()
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Quest",
                    50,
                    "bSuspend === true 弹出二次确认弹窗 ：",
                    ["任务Id", this.jro],
                  ),
                (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  162,
                )).FunctionMap.set(2, () => {
                  GeneralLogicTreeController_1.GeneralLogicTreeController.RequestForcedOccupation(
                    s.TreeId,
                    t,
                  );
                }),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  e,
                ))
              : (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Quest",
                    50,
                    "bSuspend === false 执行track()",
                    ["任务Id", this.jro],
                  ),
                t());
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Quest", 19, "点击追踪按钮时:找不到任务", [
                "任务Id",
                this.jro,
              ]);
        }
      }),
      (this.nno = () => {
        if (this.jro) {
          const e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
            this.jro,
          );
          if (e)
            if (e.IsSuspend()) {
              var t = e.GetOccupations();
              UiManager_1.UiManager.OpenView("QuestLockPreview", t);
            } else if (e.IsQuestCanPreShow())
              HelpController_1.HelpController.OpenHelpById(LEVEL_HELP);
            else if (e.IsQuestHasRecommendPreQuest()) {
              t = e.GetRecommendPreQuest();
              if (t && t.length !== 0)
                for (const s of t) {
                  const i =
                    ModelManager_1.ModelManager.QuestNewModel.GetQuestState(s);
                  if (i === 0) {
                    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "QuestRecommendAccept",
                    );
                    break;
                  }
                  if (i !== 3) {
                    this.eno(s);
                    break;
                  }
                }
            }
        }
      }),
      (this.zro = (e, t) => {
        QuestController_1.QuestNewController.RedDotRequest(e, 0),
          (this.jro = e),
          this.Vro &&
            t &&
            this.Hro &&
            this.UiViewSequence.PlaySequencePurely("Sle");
        t = ModelManager_1.ModelManager.QuestNewModel;
        this.GetText(7).SetText(t.GetQuestName(e)),
          this.GetText(9).SetText(t.GetQuestDetails(e)),
          this.sno(e),
          this.ano(e),
          this.hno(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIText],
      [13, UE.UIItem],
      [14, UE.UIText],
      [15, UE.UIItem],
      [16, UE.UIButtonComponent],
      [17, UE.UIItem],
      [18, UE.UIScrollViewWithScrollbarComponent],
      [19, UE.UIItem],
      [20, UE.UISprite],
      [21, UE.UIItem],
      [22, UE.UISprite],
      [23, UE.UISprite],
    ]),
      (this.BtnBindInfo = [
        [0, this.X3e],
        [2, this.$_t],
        [16, this.nno],
      ]);
  }
  async OnBeforeStartAsync() {
    this.GetItem(4).SetUIActive(!1),
      this.GetItem(11).SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetText(14).SetUIActive(!0),
      this.GetItem(1).SetUIActive(!1),
      this.GetItem(17).SetUIActive(!1),
      this.UiViewSequence.AddSequenceStartEvent("Sle", this.tno),
      this.UiViewSequence.AddSequenceStartEvent(
        "Start",
        this.OnStartSequenceEvent,
      ),
      this.UiViewSequence.AddSequenceStartEvent(
        "ShowView",
        this.OnStartSequenceEvent,
      ),
      (this.$ro = []),
      (this.sOe = []),
      (this.Yro = this.OpenParam),
      this.lno(),
      await this._no();
  }
  OnBeforeDestroy() {
    if (this.cpt) {
      let e;
      for ([, e] of this.cpt?.GetTabItemMap()) e.Clear();
      this.cpt.Destroy(), (this.cpt = void 0);
    }
    if (((this.Kro = void 0), this.Qro)) {
      for (const t of this.Qro) t.Destroy();
      this.Qro = void 0;
    }
    if (this.sOe) {
      for (const i of this.sOe) i.Destroy();
      this.sOe = void 0;
    }
    this.Xro?.Dispose(), (this.Xro = void 0);
  }
  OnTick(e) {
    if (this.Qro) for (const t of this.Qro) t.OnTick(e);
  }
  lno() {
    const t =
      ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.MapConfigId;
    const e =
      ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeConfigs()?.filter(
        (e) => {
          return (
            !!e.IsShowInQuestPanel ||
            (!!t && void 0 !== e.MapId.find((e) => e === t))
          );
        },
      );
    const i =
      (e.sort((e, t) => {
        (e =
          ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
            e.MainId,
          )),
          (t =
            ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
              t.MainId,
            ));
        return e && t ? e.SortValue - t.SortValue : 0;
      }),
      (this.Kro.length = 0),
      new Map());
    for (const n of e) {
      var s;
      var o;
      const r = n.MainId;
      i.get(r) ||
        (i.set(r, !0),
        (s = this.GetItem(10)),
        (s = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(17), s)),
        (o = new QuestTypeItem_1.QuestTypeItem()).Init(s, r, this.OZt),
        this.Qro.push(o),
        r === 7 && o.IsQuestEmpty()) ||
        this.Kro.push(n);
    }
  }
  eno(e) {
    if (e) {
      const t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
      if (t) {
        this.jro = t.Id;
        e = this.Qro.find((e) => e.QuestType === t.MainTypeId);
        if (e) {
          const i = e.GetQuestItem(t.Id);
          i &&
            ((this.Kwn = !0),
            TimerSystem_1.TimerSystem.Delay(() => {
              this.Kwn &&
                (this.GetScrollViewWithScrollbar(18).ScrollTo(i.GetRootItem()),
                this.OZt(this.jro)),
                (this.Kwn = !1);
            }, 200));
        }
      } else this.jro = QuestDefine_1.INVALID_QUEST_ID;
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateQuestDetails,
      this.zro,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeSuspend,
        this.Jro,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend,
        this.Jro,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnNavigationQuest,
        this.Zro,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActivityQuestCountdownEnd,
        this.Fwn,
      ),
      this.GetText(9).OnSelfLanguageChange.Bind(this.QuestDescChangeLang);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateQuestDetails,
      this.zro,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeSuspend,
        this.Jro,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend,
        this.Jro,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnNavigationQuest,
        this.Zro,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActivityQuestCountdownEnd,
        this.Fwn,
      ),
      this.GetText(9).OnSelfLanguageChange.Unbind();
  }
  async _no() {
    const t = new CommonTabComponentData_1.CommonTabComponentData(
      this.jmi,
      this.ino,
      this.yqe,
    );
    this.cpt = new TabComponentWithTitle_1.TabComponentWithTitle(
      this.GetItem(8),
      t,
    );
    const i = new Array();
    for (let e = 0; e < this.Kro.length; e++) {
      const t = new CommonTabItemBase_1.CommonTabItemData();
      (t.Index = e),
        (t.Data = this.cpt.GetTabComponentData(e)),
        (t.RedDotName = "QuestTab"),
        (t.RedDotUid = this.Kro[e].MainId),
        i.push(t);
    }
    await this.cpt.RefreshTabItemByDataAsync(i),
      this.cpt.SelectToggleByIndex(ALL_QUEST_TYPE);
  }
  ono() {
    (this.Wro =
      this.jro ===
      ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(3),
        this.Wro
          ? "InstanceDungeonEntranceCancelTrack"
          : "InstanceDungeonEntranceTrack",
      );
  }
  rno() {
    for (const e of this.Qro) e.UpdateListTrackState();
  }
  sno(i) {
    const s = ModelManager_1.ModelManager.QuestNewModel;
    const o = s.GetQuest(i);
    if (o) {
      const r = this.GetText(14);
      const n = this.GetItem(21);
      const a = this.GetButton(2).GetRootComponent();
      const e = this.GetSprite(20);
      let h = this.GetButton(16);
      const _ = this.GetSprite(22);
      let l = o.IsQuestCanPreShow();
      var m = o.IsSuspend() ?? !1;
      const u = o.IsQuestHasRecommendPreQuest();
      let f = o.HasRefOccupiedEntity();
      this.ono();
      let t = void 0;
      if (m) {
        r.SetText(o.GetSuspendText() ?? ""), (t = s.GetQuestLockIconPath(i));
        var m = m && o.GetSuspendType() === 1;
        var C =
          (h.GetRootComponent().SetUIActive(m),
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_ComIconQuestion",
          ));
        var C =
          (this.uno(C),
          CommonParamById_1.configCommonParamById.GetStringConfig(
            "TaskUnableStripColor",
          ) ?? "");
        _.SetColor(UE.Color.FromHex(C)), a.SetUIActive(m), n.SetUIActive(!0);
      } else if (f) {
        r.SetText(o.GetRefOccupiedEntityText() ?? ""),
          (t = s.GetQuestLockIconPath(i)),
          h.GetRootComponent().SetUIActive(!1);
        (C =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_ComIconQuestion",
          )),
          (m =
            (this.uno(C),
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskUnableStripColor",
            ) ?? ""));
        _.SetColor(UE.Color.FromHex(m)), a.SetUIActive(!1), n.SetUIActive(!0);
      } else if (l) {
        r.SetText(s.GetShowQuestConditionDescribe(i) ?? ""),
          (t = s.GetQuestLockIconPath(i));
        f = s.GetUnlockConditions(i);
        let e = void 0;
        (C = void 0 !== (e = f ? f.find((e) => e.Type === "ExploreLevel") : e)),
          (m =
            (h.GetRootComponent().SetUIActive(C),
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "SP_ComIconQuestion",
            ))),
          (l =
            (this.uno(m),
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskUnableStripColor",
            ) ?? ""));
        _.SetColor(UE.Color.FromHex(l)), a.SetUIActive(!1), n.SetUIActive(!0);
      } else if (u) {
        f = o.GetRecommendPreQuest();
        let e = "";
        f?.length && (e = s.GetQuest(f[0])?.Name ?? ""),
          LguiUtil_1.LguiUtil.SetLocalText(r, "QuestRecommendTip", e),
          (t = s.GetQuestLockIconPath(i));
        (h =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_IconArrive",
          )),
          (C =
            (this.uno(h),
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskRemindStripColor",
            ) ?? ""));
        _.SetColor(UE.Color.FromHex(C)), a.SetUIActive(!0), n.SetUIActive(!0);
      } else n.SetUIActive(!1), a.SetUIActive(!0);
      t && this.SetSpriteByPath(t, e, !0);
    }
  }
  uno(e) {
    const t = this.GetSprite(23);
    if (t) {
      const i = t
        .GetOwner()
        .GetComponentByClass(UE.UISpriteTransition.StaticClass());
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.LGUISpriteData_BaseObject,
        (e, t) => {
          e && e.IsValid()
            ? i.SetAllTransitionSprite(e)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Quest", 19, "设置Sprite失败，图片加载失败", [
                "图片路径",
                t,
              ]);
        },
        102,
      );
    }
  }
  ano(e) {
    const t = this.GetItem(6);
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    e && e.HasBehaviorTree()
      ? (t.SetUIActive(!0),
        this.Xro ||
          ((this.Xro = new QuestViewStep_1.QuestViewStep()), this.Xro.Init(t)),
        (e = e.Tree?.CreateShowBridge()),
        this.Xro.Update(e?.TreeIncId ?? BigInt(0), e?.TrackTextConfig),
        this.Xro.SetActive(!0))
      : t.SetUIActive(!1);
  }
  hno(e) {
    this.$ro.splice(0, this.$ro.length);
    var e = ModelManager_1.ModelManager.QuestNewModel.GetDisplayRewardInfo(e);
    const t = this.GetItem(19);
    if (e && e.length !== 0) {
      t.SetUIActive(!0), e && (this.$ro = e);
      const o = this.GetItem(4);
      for (const i of this.sOe) i.SetActive(!1);
      this.$ro.forEach((e, t) => {
        let i = void 0;
        let s;
        t > this.sOe.length - 1
          ? ((s = LguiUtil_1.LguiUtil.CopyItem(o, o.GetParentAsUIItem())),
            (i =
              new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()).Initialize(
              s.GetOwner(),
            ),
            this.sOe.push(i))
          : (i = this.sOe[t]),
          i.RefreshByConfigId(e.ItemId, e.ItemCount),
          i.SetActive(!0);
      });
    } else t.SetUIActive(!1);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (!(e.length > 1 || isNaN(Number(e[0])))) {
      let t = Number(e[0]);
      const o = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
      if (o) {
        const i = this.Qro.find((e) => e.QuestType === o.Type);
        if (i) {
          const s = i.GetQuestItem(t);
          if (s)
            return (
              this.jro !== QuestDefine_1.INVALID_QUEST_ID && this.jro
                ? i.GetQuestItem(this.jro)?.SetSelected(!1)
                : i.GetDefaultItem().SetSelected(!1),
              i.GetQuestItem(t).SetSelected(!0),
              this.GetScrollViewWithScrollbar(18).ScrollTo(i.GetRootItem()),
              (this.Kwn = !1),
              [(t = s.GetTaskToggleItem()), t]
            );
        }
      }
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导configParams项配置有误", [
        "configParams",
        e,
      ]);
  }
  GetGuideScrollViewToLock() {
    return this.GetScrollViewWithScrollbar(18);
  }
}
exports.QuestView = QuestView;
// # sourceMappingURL=QuestView.js.map
