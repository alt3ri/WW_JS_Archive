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
  UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController"),
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
          if (this.Hno) for (const o of this.Hno) o.UpdateItem(i.TreeConfigId);
          this.kno &&
            (t = ModelManager_1.ModelManager.QuestNewModel?.GetQuest(
              this.kno,
            )) &&
            t.TreeId === e &&
            this.Xno(this.kno, !1);
        }
      }),
      (this.ab1 = (e) => {
        var t,
          i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
        if (i) {
          if (this.Hno) for (const o of this.Hno) o.UpdateItem(i.Id);
          this.kno &&
            (t = ModelManager_1.ModelManager.QuestNewModel?.GetQuest(
              this.kno,
            )) &&
            t.Id === e &&
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
        var o = this.Vno[e].MainId;
        for (const n of this.Hno) {
          var s = o === ALL_QUEST_TYPE,
            r = n.IsQuestEmpty();
          s
            ? (n.SetActive(!r), r || ((t = !1), (i = i || n)))
            : n.QuestType !== o
              ? n.SetActive(!1)
              : (n.SetActive(!r), (t = r), (i = n));
        }
        this.GetItem(15).SetUIActive(!t),
          this.GetItem(13).SetUIActive(t),
          this.GetItem(13).SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Quest", 18, "任务界面是否为空", ["是否为空", t]),
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
        var e = ModelManager_1.ModelManager.QuestNewModel;
        const r = e.GetQuest(this.kno);
        if (r)
          if (r.LockByLackResource)
            e.IsLackQuestVideoResource
              ? UiManager_1.UiManager.OpenView("ResDownLoadView")
              : QuestController_1.QuestNewController.ConfirmQuestResourceRequest(
                  r.Id,
                  () => {
                    this.ab1(r.Id);
                  },
                );
          else if (this.Fno)
            QuestController_1.QuestNewController.RequestTrackQuest(
              this.kno,
              !1,
              1,
            ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Quest", 49, "取消任务追踪", [
                  "任务Id",
                  this.kno,
                ]),
              this.Zno(),
              this.eso();
          else {
            const t = () => {
              if (r.CanShowTrackExpression()) {
                let e = !1;
                if (
                  (this.Fno ||
                    (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
                      ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
                        .Id !== r.Tree.DungeonId &&
                      (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                        "FollowQuestStepGuide",
                      ),
                      (e = !0))),
                  r?.IsSuspend())
                )
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("Quest", 65, "不允许强制切出", [
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
                    Log_1.Log.Info("Quest", 49, "发送追踪请求至后端", [
                      "任务Id",
                      this.kno,
                    ]),
                    QuestController_1.QuestNewController.RequestTrackQuest(
                      this.kno,
                      !0,
                      1,
                    );
                  var t = r.GetFirstNoHideTrackActiveChildQuestNode();
                  if (t) {
                    var i =
                        GeneralLogicTreeController_1.GeneralLogicTreeController.IsShowNodeTrackDistance(
                          r.TreeId,
                          t.NodeId,
                        ),
                      o = r.GetTrackDistance(t.NodeId),
                      t = r.HasValidTrackTarget(t.NodeId);
                    if (!i || !o) {
                      let e = !1;
                      if (
                        !(e =
                          !o &&
                          t &&
                          ((i = r.GetDungeonId()),
                          (o =
                            ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
                          MapUtil_1.MapUtil.IsDungeonDiffWorld(o, i))
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
                              49,
                              "追踪失败，不满足任务追踪的前置条件",
                              ["任务Id", this.kno],
                            )
                          )
                        );
                    }
                    if (e) this.Zno(), this.eso();
                    else {
                      t =
                        r.GetFirstNoHideTrackActiveChildQuestNode()?.NodeId ??
                        0;
                      const s = {
                        MarkType: 12,
                        MarkId: r.GetDefaultMark(t),
                        IsNotFocusTween: !0,
                        OpenFogId: 0,
                      };
                      UiManager_1.UiManager.GetViewByName("WorldMapView")
                        ? UiManager_1.UiManager.CloseViewAsync(
                            "WorldMapView",
                          ).then(() => {
                            UiManager_1.UiManager.OpenView(
                              "WorldMapView",
                              s,
                              () => {
                                UiManager_1.UiManager.CloseView("QuestView");
                              },
                            );
                          })
                        : UiManager_1.UiManager.OpenView(
                            "WorldMapView",
                            s,
                            () => {
                              UiManager_1.UiManager.CloseView("QuestView");
                            },
                          );
                    }
                  } else
                    this.Zno(),
                      this.eso(),
                      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                        "FollowQuestStepGuide",
                      );
                }
              } else
                ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "FollowQuestStepGuide",
                );
            };
            r.IsSuspend()
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Quest",
                    49,
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
                    49,
                    "bSuspend === false 执行track()",
                    ["任务Id", this.kno],
                  ),
                t());
          }
        else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Quest", 18, "点击追踪按钮时:找不到任务", [
              "任务Id",
              this.kno,
            ]);
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
                for (const o of t) {
                  var i =
                    ModelManager_1.ModelManager.QuestNewModel.GetQuestState(o);
                  if (0 === i) {
                    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "QuestRecommendAccept",
                    );
                    break;
                  }
                  if (3 !== i) {
                    this.Yno(o);
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
          this.$Ma(e);
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
      [27, UE.UIItem],
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
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnQuestRedDotStateChange,
        0,
      ),
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
    this.jno = void 0;
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
      var o,
        s,
        r = n.MainId;
      i.get(r) ||
        (i.set(r, !0),
        (o = this.GetItem(10)),
        (o = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(17), o)),
        (s = new QuestTypeItem_1.QuestTypeItem()).Init(o, r, this.Oei),
        this.Hno.push(s),
        7 === r && s.IsQuestEmpty()) ||
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
          if (i) {
            this.HGn = !0;
            const o = this.GetScrollViewWithScrollbar(18);
            o &&
              o.OnLateUpdate.Bind((e) => {
                TimerSystem_1.TimerSystem.Next(() => {
                  this.HGn &&
                    o?.IsValid() &&
                    (o.ScrollTo(i.GetRootItem()),
                    this.Oei(this.kno),
                    this.Ohl(i.GetTaskToggleItem())),
                    (this.HGn = !1);
                });
              });
          }
        }
      } else this.kno = QuestDefine_1.INVALID_QUEST_ID;
    }
  }
  Ohl(e) {
    TimerSystem_1.TimerSystem.Next(() => {
      UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(
        e,
        !0,
      );
    });
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
      this.GetText(9).OnSelfLanguageChange.Bind(this.QuestDescChangeLang),
      ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(
        this.GetText(9),
        1,
        1,
      );
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
      this.GetText(9).OnSelfLanguageChange.Unbind(),
      ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(
        this.GetText(9),
      );
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
    var e,
      t = ModelManager_1.ModelManager.QuestNewModel,
      i = t.GetQuest(this.kno);
    i &&
      ((e = this.GetText(3)),
      i.LockByLackResource
        ? LguiUtil_1.LguiUtil.SetLocalText(
            e,
            t.IsLackQuestVideoResource ? "GoToDownload" : "GoOnTask",
          )
        : ((this.Fno =
            this.kno ===
            ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id),
          LguiUtil_1.LguiUtil.SetLocalText(
            e,
            this.Fno
              ? "InstanceDungeonEntranceCancelTrack"
              : "InstanceDungeonEntranceTrack",
          )));
  }
  eso() {
    for (const e of this.Hno) e.UpdateListTrackState();
  }
  iso(i) {
    var o = ModelManager_1.ModelManager.QuestNewModel,
      s = o.GetQuest(i);
    if (s) {
      var r = this.GetText(14),
        n = this.GetItem(21),
        e = this.GetItem(27),
        a = this.GetButton(2).GetRootComponent(),
        h = this.GetSprite(20),
        l = this.GetButton(16),
        _ = this.GetSprite(22),
        m = s.IsQuestCanPreShow(),
        u = s.LockByLackResource && o.IsLackQuestVideoResource,
        g = s.IsSuspend() ?? !1,
        f = s.IsQuestHasRecommendPreQuest(),
        C = s.HasRefOccupiedEntity();
      this.Zno();
      let t = void 0;
      if (g) {
        r.SetText(s.GetSuspendText() ?? ""), (t = o.GetQuestLockIconPath(i));
        var g = g && 1 === s.GetSuspendType(),
          d =
            (l.GetRootComponent().SetUIActive(g),
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "SP_ComIconQuestion",
            )),
          d =
            (this.aso(d),
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskUnableStripColor",
            ) ?? "");
        _.SetColor(UE.Color.FromHex(d)),
          a.SetUIActive(g),
          n.SetUIActive(!0),
          e.SetUIActive(g);
      } else {
        if (C) {
          r.SetText(s.GetRefOccupiedEntityText() ?? ""),
            (t = o.GetQuestLockIconPath(i)),
            l.GetRootComponent().SetUIActive(!1);
          (d =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "SP_ComIconQuestion",
            )),
            (g =
              (this.aso(d),
              CommonParamById_1.configCommonParamById.GetStringConfig(
                "TaskUnableStripColor",
              ) ?? ""));
          _.SetColor(UE.Color.FromHex(g)), a.SetUIActive(!1), n.SetUIActive(!0);
        } else if (m) {
          r.SetText(o.GetShowQuestConditionDescribe(i) ?? ""),
            (t = o.GetQuestLockIconPath(i));
          C = o.GetUnlockConditions(i);
          let e = void 0;
          (d =
            void 0 !== (e = C ? C.find((e) => "ExploreLevel" === e.Type) : e)),
            (g =
              (l.GetRootComponent().SetUIActive(d),
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                "SP_ComIconQuestion",
              ))),
            (m =
              (this.aso(g),
              CommonParamById_1.configCommonParamById.GetStringConfig(
                "TaskUnableStripColor",
              ) ?? ""));
          _.SetColor(UE.Color.FromHex(m)), a.SetUIActive(!1), n.SetUIActive(!0);
        } else if (u) {
          (C =
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "DownloadResource",
            ) ?? "DownloadResource"),
            (d =
              (r.SetText(C),
              CommonParamById_1.configCommonParamById.GetStringConfig(
                "TaskUnableStripColor",
              ) ?? ""));
          _.SetColor(UE.Color.FromHex(d)),
            l.GetRootComponent().SetUIActive(!1),
            a.SetUIActive(!0),
            n.SetUIActive(!0);
        } else if (f) {
          g = s.GetRecommendPreQuest();
          let e = "";
          g?.length && (e = o.GetQuest(g[0])?.Name ?? ""),
            LguiUtil_1.LguiUtil.SetLocalText(r, "QuestRecommendTip", e),
            (t = o.GetQuestLockIconPath(i));
          (m =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "SP_IconArrive",
            )),
            (u =
              (this.aso(m),
              CommonParamById_1.configCommonParamById.GetStringConfig(
                "TaskRemindStripColor",
              ) ?? ""));
          _.SetColor(UE.Color.FromHex(u)), a.SetUIActive(!0), n.SetUIActive(!0);
        } else n.SetUIActive(!1), a.SetUIActive(!0);
        e.SetUIActive(!1);
      }
      t && this.SetSpriteByPath(t, h, !0);
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
              Log_1.Log.Error("Quest", 18, "设置Sprite失败，图片加载失败", [
                "图片路径",
                t,
              ]);
        },
        102,
      );
    }
  }
  async oso(e) {
    var t = this.GetItem(6),
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    e && e.HasBehaviorTree()
      ? (t.SetUIActive(!0),
        this.jno ||
          ((this.jno = new QuestViewStep_1.QuestViewStep(0, -1)),
          await this.jno.CreateThenShowByActorAsync(t.GetOwner(), 1)),
        (e = e.Tree?.GetBlackBoard()?.CreateShowData(!1)),
        await this.jno.Update(e),
        this.jno.SetActive(!0))
      : t.SetUIActive(!1);
  }
  rso(e) {
    this.Wno.splice(0, this.Wno.length);
    var e = ModelManager_1.ModelManager.QuestNewModel.GetDisplayRewardInfo(e),
      t = this.GetItem(19);
    if (e && 0 !== e.length) {
      t.SetUIActive(!0), e && (this.Wno = e);
      const s = this.GetItem(4);
      for (const i of this.sOe) i.SetActive(!1);
      this.Wno.forEach((e, t) => {
        let i = void 0;
        var o;
        t > this.sOe.length - 1
          ? ((o = LguiUtil_1.LguiUtil.CopyItem(s, s.GetParentAsUIItem())),
            (i =
              new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()).Initialize(
              o.GetOwner(),
            ),
            this.sOe.push(i))
          : (i = this.sOe[t]),
          i.RefreshByConfigId(e.ItemId, e.ItemCount),
          i.SetActive(!0);
      });
    } else t.SetUIActive(!1);
  }
  $Ma(e) {
    var t,
      i,
      o,
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    e &&
      (t = this.GetItem(24)) &&
      (e.TagId
        ? (i = QuestTagById_1.configQuestTagById.GetConfig(e.TagId))
          ? ((o = this.GetSprite(25)) &&
              (this.SetSpriteByPath(i.BgSpritePath, o, !1), o.SetUIActive(!0)),
            (o = this.GetText(26)) &&
              (LguiUtil_1.LguiUtil.SetLocalTextNew(o, i.Text),
              o.SetUIActive(!0)),
            t.SetUIActive(!0))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Quest",
              18,
              "找不到任务标签配置",
              ["questId", e.Id],
              ["TagId", e.TagId],
            )
        : t.SetUIActive(!1));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (!(1 < e.length || isNaN(Number(e[0])))) {
      var t = Number(e[0]);
      const s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
      if (s) {
        var i = this.Hno.find((e) => e.QuestType === s.Type);
        if (i) {
          var o = i.GetQuestItem(t);
          if (o)
            return (
              this.kno !== QuestDefine_1.INVALID_QUEST_ID && this.kno
                ? i.GetQuestItem(this.kno)?.SetSelected(!1)
                : i.GetDefaultItem().SetSelected(!1),
              i.GetQuestItem(t).SetSelected(!0),
              this.GetScrollViewWithScrollbar(18).ScrollTo(i.GetRootItem()),
              (this.HGn = !1),
              [(t = o.GetTaskToggleItem()), t]
            );
        }
      }
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 53, "聚焦引导configParams项配置有误", [
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
