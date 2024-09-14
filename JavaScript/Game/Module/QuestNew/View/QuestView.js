"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  QuestTagById_1 = require("../../../../Core/Define/ConfigQuery/QuestTagById"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithTitle_1 = require("../../Common/TabComponent/TabComponentWithTitle"),
  CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
  CommonTabItemBase_1 = require("../../Common/TabComponent/TabItem/CommonTabItemBase"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  GeneralLogicTreeController_1 = require("../../GeneralLogicTree/GeneralLogicTreeController"),
  HelpController_1 = require("../../Help/HelpController"),
  MapUtil_1 = require("../../Map/MapUtil"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  QuestController_1 = require("../Controller/QuestController"),
  QuestDefine_1 = require("../QuestDefine"),
  QuestTypeItem_1 = require("./QuestTypeItem"),
  QuestViewStep_1 = require("./QuestViewStep"),
  ALL_QUEST_TYPE = 0,
  LEVEL_HELP = 49;
class QuestView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Nno = !1),
      (this.Ono = !1),
      (this.kno = 0),
      (this.Fno = !1),
      (this.Vno = []),
      (this.Hno = []),
      (this.jno = void 0),
      (this.sOe = void 0),
      (this.Wno = void 0),
      (this.Ivt = void 0),
      (this.Kno = 0),
      (this.HGn = !1),
      (this.QuestDescChangeLang = () => {
        var e;
        this.kno &&
          ((e = ModelManager_1.ModelManager.QuestNewModel.GetQuestDetails(
            this.kno,
          )),
          this.GetText(9).SetText(e));
      }),
      (this.Oei = (t) => {
        this.Hno.forEach((e) => {
          e.OnSelect(t);
        });
      }),
      (this.Qno = (e) => {
        var t,
          i =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              e,
            );
        if (i) {
          if (this.Hno) for (const s of this.Hno) s.UpdateItem(i.TreeConfigId);
          this.kno &&
            (t = ModelManager_1.ModelManager.QuestNewModel?.GetQuest(
              this.kno,
            )) &&
            t.TreeId === e &&
            this.Xno(this.kno, !1);
        }
      }),
      (this.$no = (e) => {
        this.Yno(e);
      }),
      (this.OGn = (e) => {
        if (this.Hno) {
          for (const t of this.Hno) t.UpdateList();
          this.zno(0);
        }
      }),
      (this.Jno = () => {
        this.GetItem(1).SetUIActive(!0);
      }),
      (this.OnStartSequenceEvent = () => {
        if (this.Kno) this.Yno(this.Kno);
        else {
          var e =
            ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
          if (e) this.kno = e.Id;
          else
            for (const i of this.Hno) {
              var t = i.GetDefaultItem();
              if (t) {
                this.kno = t.QuestId;
                break;
              }
            }
          this.Yno(this.kno);
        }
        this.Nno = !0;
      }),
      (this.jdi = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.zno = (e) => {
        let t = !0,
          i = void 0;
        var s = this.Vno[e].MainId;
        for (const n of this.Hno) {
          var o = s === ALL_QUEST_TYPE,
            r = n.IsQuestEmpty();
          o
            ? (n.SetActive(!r), r || ((t = !1), (i = i || n)))
            : n.QuestType !== s
              ? n.SetActive(!1)
              : (n.SetActive(!r), (t = r), (i = n));
        }
        this.GetItem(15).SetUIActive(!t),
          this.GetItem(13).SetUIActive(t),
          this.GetItem(13).SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Quest", 19, "任务界面是否为空", ["是否为空", t]),
          (this.Ono = !t),
          this.Ono
            ? this.Nno && this.Oei(i.GetDefaultItem()?.QuestId)
            : ((this.Ono = !1),
              this.UiViewSequence.StopSequenceByKey("Sle"),
              this.GetItem(1).SetUIActive(!1));
      }),
      (this.yqe = (e) => {
        var e = this.Vno[e],
          t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTabIcon(
            e.MainId,
          ),
          e =
            ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
              e.MainId,
            );
        return new CommonTabData_1.CommonTabData(
          t,
          new CommonTabTitleData_1.CommonTabTitleData(e?.MainTypeName ?? ""),
        );
      }),
      (this._5e = () => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (this.uct = () => {
        if (this.Fno)
          QuestController_1.QuestNewController.RequestTrackQuest(
            this.kno,
            !1,
            1,
          ),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Quest", 50, "取消任务追踪", ["任务Id", this.kno]),
            this.Zno(),
            this.eso();
        else {
          const r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
            this.kno,
          );
          if (r) {
            const t = () => {
              if (
                (this.Fno ||
                  (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
                    ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
                      .Id !== r.Tree.DungeonId &&
                    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "QuestTargetNotInCurScene",
                    )),
                r?.IsSuspend())
              )
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Quest", 66, "不允许强制切出", [
                    "任务Id",
                    this.kno,
                  ]),
                  (t =
                    MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                      "Task_NoSwitch_Tips",
                    )),
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                    t,
                  );
              else {
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Quest", 50, "发送追踪请求至后端", [
                    "任务Id",
                    this.kno,
                  ]),
                  QuestController_1.QuestNewController.RequestTrackQuest(
                    this.kno,
                    !0,
                    1,
                  );
                var t = r.GetCurrentActiveChildQuestNode();
                if (t) {
                  var i =
                      GeneralLogicTreeController_1.GeneralLogicTreeController.IsShowNodeTrackDistance(
                        r.TreeId,
                        t.NodeId,
                      ),
                    s = r.GetTrackDistance(t.NodeId),
                    o = r.HasValidTrackTarget(t.NodeId);
                  if (!i || !s) {
                    let e = !1;
                    if (
                      !(e =
                        !s &&
                        o &&
                        ((i = r.GetNodeDungeonId(t.NodeId) ?? 0),
                        (s =
                          ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
                        MapUtil_1.MapUtil.IsDungeonDiffWorld(s, i))
                          ? !0
                          : e)
                    )
                      return (
                        this.Zno(),
                        this.eso(),
                        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                          "FollowQuestStepGuide",
                        ),
                        void (
                          Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "Quest",
                            50,
                            "追踪失败，不满足任务追踪的前置条件",
                            ["任务Id", this.kno],
                          )
                        )
                      );
                  }
                  o = r.GetCurrentActiveChildQuestNode()?.NodeId ?? 0;
                  const e = {
                    MarkType: 12,
                    MarkId: r.GetDefaultMark(o),
                    IsNotFocusTween: !0,
                    OpenAreaId: 0,
                  };
                  UiManager_1.UiManager.GetViewByName("WorldMapView")
                    ? UiManager_1.UiManager.CloseViewAsync("WorldMapView").then(
                        () => {
                          UiManager_1.UiManager.OpenView(
                            "WorldMapView",
                            e,
                            () => {
                              UiManager_1.UiManager.CloseView("QuestView");
                            },
                          );
                        },
                      )
                    : UiManager_1.UiManager.OpenView("WorldMapView", e, () => {
                        UiManager_1.UiManager.CloseView("QuestView");
                      });
                } else
                  this.Zno(),
                    this.eso(),
                    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "FollowQuestStepGuide",
                    );
              }
            };
            var e;
            r.IsSuspend()
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Quest",
                    50,
                    "bSuspend === true 弹出二次确认弹窗 ：",
                    ["任务Id", this.kno],
                  ),
                (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  162,
                )).FunctionMap.set(2, () => {
                  GeneralLogicTreeController_1.GeneralLogicTreeController.RequestForcedOccupation(
                    r.TreeId,
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
                    ["任务Id", this.kno],
                  ),
                t());
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Quest", 19, "点击追踪按钮时:找不到任务", [
                "任务Id",
                this.kno,
              ]);
        }
      }),
      (this.tso = () => {
        if (this.kno) {
          var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.kno);
          if (e)
            if (e.IsSuspend()) {
              var t = e.GetOccupations();
              UiManager_1.UiManager.OpenView("QuestLockPreview", t);
            } else if (e.IsQuestCanPreShow())
              HelpController_1.HelpController.OpenHelpById(LEVEL_HELP);
            else if (e.IsQuestHasRecommendPreQuest()) {
              t = e.GetRecommendPreQuest();
              if (t && 0 !== t.length)
                for (const s of t) {
                  var i =
                    ModelManager_1.ModelManager.QuestNewModel.GetQuestState(s);
                  if (0 === i) {
                    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "QuestRecommendAccept",
                    );
                    break;
                  }
                  if (3 !== i) {
                    this.Yno(s);
                    break;
                  }
                }
            }
        }
      }),
      (this.Xno = (e, t) => {
        QuestController_1.QuestNewController.RedDotRequest(e, 0),
          (this.kno = e),
          this.Nno &&
            t &&
            this.Ono &&
            this.UiViewSequence.PlaySequencePurely("Sle");
        t = ModelManager_1.ModelManager.QuestNewModel;
        this.GetText(7).SetText(t.GetQuestName(e)),
          this.GetText(9).SetText(t.GetQuestDetails(e)),
          this.iso(e),
          this.oso(e),
          this.rso(e),
          this.oSa(e);
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
      [24, UE.UIItem],
      [25, UE.UISprite],
      [26, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [0, this._5e],
        [2, this.uct],
        [16, this.tso],
      ]);
  }
  async OnBeforeStartAsync() {
    this.GetItem(4).SetUIActive(!1),
      this.GetItem(11).SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetText(14).SetUIActive(!0),
      this.GetItem(1).SetUIActive(!1),
      this.GetItem(17).SetUIActive(!1),
      this.UiViewSequence.AddSequenceStartEvent("Sle", this.Jno),
      this.UiViewSequence.AddSequenceStartEvent(
        "Start",
        this.OnStartSequenceEvent,
      ),
      this.UiViewSequence.AddSequenceStartEvent(
        "ShowView",
        this.OnStartSequenceEvent,
      ),
      (this.Wno = []),
      (this.sOe = []),
      (this.Kno = this.OpenParam),
      this.nso(),
      await this.sso();
  }
  OnBeforeDestroy() {
    if (this.Ivt) {
      var e;
      for ([, e] of this.Ivt?.GetTabItemMap()) e.Clear();
      this.Ivt.Destroy(), (this.Ivt = void 0);
    }
    if (((this.Vno = void 0), this.Hno)) {
      for (const t of this.Hno) t.Destroy();
      this.Hno = void 0;
    }
    if (this.sOe) {
      for (const i of this.sOe) i.Destroy();
      this.sOe = void 0;
    }
    this.jno?.Dispose(), (this.jno = void 0);
  }
  OnTick(e) {
    if (this.Hno) for (const t of this.Hno) t.OnTick(e);
  }
  nso() {
    const t =
      ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.MapConfigId;
    var e =
        ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeConfigs()?.filter(
          (e) => {
            return (
              !!e.IsShowInQuestPanel ||
              (!!t && void 0 !== e.MapId.find((e) => e === t))
            );
          },
        ),
      i =
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
        (this.Vno.length = 0),
        new Map());
    for (const n of e) {
      var s,
        o,
        r = n.MainId;
      i.get(r) ||
        (i.set(r, !0),
        (s = this.GetItem(10)),
        (s = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(17), s)),
        (o = new QuestTypeItem_1.QuestTypeItem()).Init(s, r, this.Oei),
        this.Hno.push(o),
        7 === r && o.IsQuestEmpty()) ||
        this.Vno.push(n);
    }
  }
  Yno(e) {
    if (e) {
      const t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
      if (t) {
        this.kno = t.Id;
        e = this.Hno.find((e) => e.QuestType === t.MainTypeId);
        if (e) {
          const i = e.GetQuestItem(t.Id);
          i &&
            ((this.HGn = !0),
            TimerSystem_1.TimerSystem.Next(() => {
              this.HGn &&
                (this.GetScrollViewWithScrollbar(18).ScrollTo(i.GetRootItem()),
                this.Oei(this.kno)),
                (this.HGn = !1);
            }));
        }
      } else this.kno = QuestDefine_1.INVALID_QUEST_ID;
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateQuestDetails,
      this.Xno,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeSuspend,
        this.Qno,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend,
        this.Qno,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnNavigationQuest,
        this.$no,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActivityQuestCountdownEnd,
        this.OGn,
      ),
      this.GetText(9).OnSelfLanguageChange.Bind(this.QuestDescChangeLang);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateQuestDetails,
      this.Xno,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeSuspend,
        this.Qno,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend,
        this.Qno,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnNavigationQuest,
        this.$no,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActivityQuestCountdownEnd,
        this.OGn,
      ),
      this.GetText(9).OnSelfLanguageChange.Unbind();
  }
  async sso() {
    const t = new CommonTabComponentData_1.CommonTabComponentData(
      this.jdi,
      this.zno,
      this.yqe,
    );
    this.Ivt = new TabComponentWithTitle_1.TabComponentWithTitle(
      this.GetItem(8),
      t,
    );
    var i = new Array();
    for (let e = 0; e < this.Vno.length; e++) {
      const t = new CommonTabItemBase_1.CommonTabItemData();
      (t.Index = e),
        (t.Data = this.Ivt.GetTabComponentData(e)),
        (t.RedDotName = "QuestTab"),
        (t.RedDotUid = this.Vno[e].MainId),
        i.push(t);
    }
    await this.Ivt.RefreshTabItemByDataAsync(i),
      this.Ivt.SelectToggleByIndex(ALL_QUEST_TYPE);
  }
  Zno() {
    (this.Fno =
      this.kno ===
      ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(3),
        this.Fno
          ? "InstanceDungeonEntranceCancelTrack"
          : "InstanceDungeonEntranceTrack",
      );
  }
  eso() {
    for (const e of this.Hno) e.UpdateListTrackState();
  }
  iso(i) {
    var s = ModelManager_1.ModelManager.QuestNewModel,
      o = s.GetQuest(i);
    if (o) {
      var r = this.GetText(14),
        n = this.GetItem(21),
        a = this.GetButton(2).GetRootComponent(),
        e = this.GetSprite(20),
        h = this.GetButton(16),
        _ = this.GetSprite(22),
        l = o.IsQuestCanPreShow(),
        m = o.IsSuspend() ?? !1,
        u = o.IsQuestHasRecommendPreQuest(),
        g = o.HasRefOccupiedEntity();
      this.Zno();
      let t = void 0;
      if (m) {
        r.SetText(o.GetSuspendText() ?? ""), (t = s.GetQuestLockIconPath(i));
        var m = m && 1 === o.GetSuspendType(),
          f =
            (h.GetRootComponent().SetUIActive(m),
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "SP_ComIconQuestion",
            )),
          f =
            (this.aso(f),
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskUnableStripColor",
            ) ?? "");
        _.SetColor(UE.Color.FromHex(f)), a.SetUIActive(m), n.SetUIActive(!0);
      } else if (g) {
        r.SetText(o.GetRefOccupiedEntityText() ?? ""),
          (t = s.GetQuestLockIconPath(i)),
          h.GetRootComponent().SetUIActive(!1);
        (f =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_ComIconQuestion",
          )),
          (m =
            (this.aso(f),
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskUnableStripColor",
            ) ?? ""));
        _.SetColor(UE.Color.FromHex(m)), a.SetUIActive(!1), n.SetUIActive(!0);
      } else if (l) {
        r.SetText(s.GetShowQuestConditionDescribe(i) ?? ""),
          (t = s.GetQuestLockIconPath(i));
        g = s.GetUnlockConditions(i);
        let e = void 0;
        (f = void 0 !== (e = g ? g.find((e) => "ExploreLevel" === e.Type) : e)),
          (m =
            (h.GetRootComponent().SetUIActive(f),
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "SP_ComIconQuestion",
            ))),
          (l =
            (this.aso(m),
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskUnableStripColor",
            ) ?? ""));
        _.SetColor(UE.Color.FromHex(l)), a.SetUIActive(!1), n.SetUIActive(!0);
      } else if (u) {
        g = o.GetRecommendPreQuest();
        let e = "";
        g?.length && (e = s.GetQuest(g[0])?.Name ?? ""),
          LguiUtil_1.LguiUtil.SetLocalText(r, "QuestRecommendTip", e),
          (t = s.GetQuestLockIconPath(i));
        (h =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_IconArrive",
          )),
          (f =
            (this.aso(h),
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskRemindStripColor",
            ) ?? ""));
        _.SetColor(UE.Color.FromHex(f)), a.SetUIActive(!0), n.SetUIActive(!0);
      } else n.SetUIActive(!1), a.SetUIActive(!0);
      t && this.SetSpriteByPath(t, e, !0);
    }
  }
  aso(e) {
    var t = this.GetSprite(23);
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
  oso(e) {
    var t = this.GetItem(6),
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    e && e.HasBehaviorTree()
      ? (t.SetUIActive(!0),
        this.jno ||
          ((this.jno = new QuestViewStep_1.QuestViewStep()), this.jno.Init(t)),
        (e = e.Tree?.CreateShowBridge()),
        this.jno.Update(e?.TreeIncId ?? BigInt(0), e?.TrackTextConfig),
        this.jno.SetActive(!0))
      : t.SetUIActive(!1);
  }
  rso(e) {
    this.Wno.splice(0, this.Wno.length);
    var e = ModelManager_1.ModelManager.QuestNewModel.GetDisplayRewardInfo(e),
      t = this.GetItem(19);
    if (e && 0 !== e.length) {
      t.SetUIActive(!0), e && (this.Wno = e);
      const o = this.GetItem(4);
      for (const i of this.sOe) i.SetActive(!1);
      this.Wno.forEach((e, t) => {
        let i = void 0;
        var s;
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
  oSa(e) {
    var t,
      i,
      s,
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    e &&
      (t = this.GetItem(24)) &&
      (e.TagId
        ? (i = QuestTagById_1.configQuestTagById.GetConfig(e.TagId))
          ? ((s = this.GetSprite(25)) &&
              (this.SetSpriteByPath(i.BgSpritePath, s, !0), s.SetUIActive(!0)),
            (s = this.GetText(26)) &&
              (LguiUtil_1.LguiUtil.SetLocalTextNew(s, i.Text),
              s.SetUIActive(!0)),
            t.SetUIActive(!0))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Quest",
              19,
              "找不到任务标签配置",
              ["questId", e.Id],
              ["TagId", e.TagId],
            )
        : t.SetUIActive(!1));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (!(1 < e.length || isNaN(Number(e[0])))) {
      var t = Number(e[0]);
      const o = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
      if (o) {
        var i = this.Hno.find((e) => e.QuestType === o.Type);
        if (i) {
          var s = i.GetQuestItem(t);
          if (s)
            return (
              this.kno !== QuestDefine_1.INVALID_QUEST_ID && this.kno
                ? i.GetQuestItem(this.kno)?.SetSelected(!1)
                : i.GetDefaultItem().SetSelected(!1),
              i.GetQuestItem(t).SetSelected(!0),
              this.GetScrollViewWithScrollbar(18).ScrollTo(i.GetRootItem()),
              (this.HGn = !1),
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
//# sourceMappingURL=QuestView.js.map
