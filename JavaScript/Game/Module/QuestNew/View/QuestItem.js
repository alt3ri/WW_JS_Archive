"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  FunctionConditionByFunctionId_1 = require("../../../../Core/Define/ConfigQuery/FunctionConditionByFunctionId"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  QuestTagById_1 = require("../../../../Core/Define/ConfigQuery/QuestTagById"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GeneralLogicTreeController_1 = require("../../GeneralLogicTree/GeneralLogicTreeController"),
  MapUtil_1 = require("../../Map/MapUtil"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  TICK_INTERVAL = 1e3;
class QuestItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.QuestId = 0),
      (this.TreeId = BigInt(0)),
      (this.QuestType = 0),
      (this.qGn = !1),
      (this.e8 = 0),
      (this.Cno = void 0),
      (this.Mno = void 0),
      (this.Cno = e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIExtendToggle],
      [5, UE.UISprite],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [9, UE.UISprite],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UISprite],
      [13, UE.UIText],
    ];
  }
  OnStart() {
    (this.Mno = this.GetItem(7)
      .GetOwner()
      .GetComponentByClass(UE.UIExtendToggleSpriteTransition.StaticClass())),
      this.Mno.SetEnable(!1),
      this.GetItem(7).SetColor(
        this.Mno.TransitionState.CheckedHoverState.Color,
      ),
      this.GetExtendToggle(4)?.SetToggleState(0);
  }
  OnTick(e) {
    this.QuestId &&
      (this.e8 > TICK_INTERVAL &&
        ((this.e8 -= TICK_INTERVAL), this.GGn(this.QuestId, !0)),
      (this.e8 += e));
  }
  UpdateItem(e, t) {
    (this.QuestId = e),
      (this.QuestType = t),
      this.gno(),
      this.UpdateTrackIconActive();
    e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.QuestId);
    e
      ? ((this.TreeId = e.TreeId ?? BigInt(0)),
        this.Eno(e),
        this.Sno(),
        this.yno(e),
        this.lct(e),
        this.Ino(e),
        this.UpdateFunctionIcon(e),
        this.Tno(e),
        this.kfa(e),
        RedDotController_1.RedDotController.BindRedDot(
          "QuestViewItem",
          this.GetItem(6),
          void 0,
          this.QuestId,
        ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Quest", 18, "任务界面任务Item更新时找不到任务", [
          "任务Id",
          this.QuestId,
        ]);
  }
  SetActiveItem(e) {
    this.SetActive(e),
      e || RedDotController_1.RedDotController.UnBindRedDot("QuestViewItem");
  }
  Eno(e) {
    var e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeColor(
        e.Type,
      ),
      t = this.GetSprite(5);
    StringUtils_1.StringUtils.IsEmpty(e)
      ? t.SetUIActive(!1)
      : (t.SetUIActive(!0), t.SetColor(UE.Color.FromHex(e)));
  }
  Sno() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestLockIconPath(
        this.QuestId,
      ),
      t = this.GetSprite(1);
    StringUtils_1.StringUtils.IsEmpty(e) ||
    ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id ===
      this.QuestId
      ? t.SetUIActive(!1)
      : (this.SetSpriteByPath(e, t, !0), t.SetUIActive(!0));
  }
  yno(e) {
    this.SetSpriteByPath(
      ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(
        e.QuestMarkId,
      ),
      this.GetSprite(0),
      !1,
    );
  }
  UpdateTrackIconActive() {
    var e = this.GetExtendToggle(4).ToggleState;
    this.Lno(e),
      this.GetSprite(0).SetUIActive(
        this.QuestId ===
          ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id,
      );
  }
  gno() {
    this.GetExtendToggle(4).OnStateChange.Add((e) => {
      1 === e && this.Cno(this.QuestId);
    });
  }
  lct(e) {
    this.GetText(2).SetText(e.Name);
  }
  Ino(e) {
    var t,
      i,
      o,
      r = this.GetText(3);
    e.IsSuspend() ||
    !(t = e.GetFirstNoHideTrackActiveChildQuestNode()) ||
    !GeneralLogicTreeController_1.GeneralLogicTreeController.IsShowNodeTrackDistance(
      e.TreeId,
      t.NodeId,
    ) ||
    !(i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
      e.TreeId,
    )) ||
    ((o = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
    (i = i.GetNodeDungeonId()),
    MapUtil_1.MapUtil.IsDungeonDiffWorld(o, i)) ||
    ((o = e.GetTrackDistance(t.NodeId)), e.IsInTrackRange()) ||
    !o
      ? r.SetUIActive(!1)
      : (LguiUtil_1.LguiUtil.SetLocalText(r, "Meter", o), r.SetUIActive(!0));
  }
  UpdateFunctionIcon(e) {
    var t = this.GetTexture(8),
      i = this.GetSprite(9);
    (e &&
    7 === e.Type &&
    e.FunctionId &&
    (e =
      FunctionConditionByFunctionId_1.configFunctionConditionByFunctionId.GetConfig(
        e.FunctionId,
      ))
      ? StringUtils_1.StringUtils.IsBlank(e.Icon)
        ? StringUtils_1.StringUtils.IsBlank(e.IconSprite)
          ? (t.SetUIActive(!1), i)
          : (this.SetSpriteByPath(e.IconSprite, i, !1), i.SetUIActive(!0), t)
        : (this.SetTextureByPath(e.Icon, t), t.SetUIActive(!0), i)
      : (t.SetUIActive(!1), i)
    ).SetUIActive(!1);
  }
  Tno(i) {
    var o = ModelManager_1.ModelManager.QuestNewModel,
      r = ((this.qGn = !1), i.IsQuestCanPreShow()),
      o = i.LockByLackResource && o.IsLackQuestVideoResource,
      n = i.IsSuspend() ?? !1,
      a = i.IsQuestHasRecommendPreQuest() ?? !1,
      s = i.HasRefOccupiedEntity() ?? !1,
      l = this.GetText(10),
      _ =
        ModelManager_1.ModelManager.QuestNewModel.GetQuestBindingActivityId(
          i.Id,
        ) + ModelManager_1.ModelManager.QuestNewModel.GetQuestActivityId(i.Id);
    if (r || o || n || a || s || _) {
      l.SetUIActive(!0);
      let e = "",
        t = "";
      if (n)
        (e = i.GetSuspendText()?.split("，")[0]),
          l.SetText(e),
          (t =
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskUnableColor",
            ) ?? "");
      else if (s)
        (e = i.GetRefOccupiedEntityText()?.split("，")[0]),
          l.SetText(e),
          (t =
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskUnableColor",
            ) ?? "");
      else if (r)
        (e =
          ModelManager_1.ModelManager.QuestNewModel.GetShowQuestConditionDescribe(
            i.Id,
          )),
          l.SetText(e),
          (t =
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskUnableColor",
            ) ?? "");
      else if (o)
        (e =
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "DownloadResource",
          ) ?? "DownloadResource"),
          l.SetText(e),
          (t =
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskUnableColor",
            ) ?? "");
      else if (a) {
        _ = i.GetRecommendPreQuest();
        let e = "";
        _?.length &&
          (e =
            ModelManager_1.ModelManager.QuestNewModel.GetQuest(_[0])?.Name ??
            ""),
          LguiUtil_1.LguiUtil.SetLocalText(l, "QuestRecommendTip", e),
          (t =
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskRemindColor",
            ) ?? "");
      } else
        (this.qGn = !0),
          this.GGn(i.Id, !1),
          (t =
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskCountDownColor",
            ) ?? "");
      n = UE.Color.FromHex(t);
      l.SetColor(n);
    } else l.SetUIActive(!1);
  }
  GGn(i, o) {
    if (this.qGn)
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.QuestId)) {
        var r = this.GetText(10);
        let e = 0,
          t = void 0;
        if (
          0 ===
          (e =
            ModelManager_1.ModelManager.QuestNewModel.GetQuestBindingActivityId(
              i,
            ))
        ) {
          if (
            ((e =
              ModelManager_1.ModelManager.QuestNewModel.GetQuestActivityId(i)),
            !(t =
              ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)) ||
              !ModelManager_1.ModelManager.QuestNewModel.GetQuestShowQuestLeftTime(
                i,
              ))
          )
            return void r.SetUIActive(!1);
        } else if (
          !(t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)) ||
          !t.LocalConfig?.IfShowQuestLeftTime
        )
          return void r.SetUIActive(!1);
        var n,
          a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "ActivityRemainingTime",
          );
        a
          ? t.CheckIfInOpenTime()
            ? t.EndOpenTime
              ? ((n = TimeUtil_1.TimeUtil.GetServerTime()),
                (n = t.EndOpenTime - n),
                (n =
                  ModelManager_1.ModelManager.QuestNewModel.GetActivityGuideQuestRemainTimeText(
                    n,
                    a,
                  )),
                r.SetText(n))
              : r.SetUIActive(!1)
            : o &&
              (EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ActivityQuestCountdownEnd,
                i,
              ),
              (this.qGn = !1))
          : r.SetUIActive(!1);
      } else
        o &&
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ActivityQuestCountdownEnd,
            i,
          ),
          (this.qGn = !1));
  }
  kfa(e) {
    var t,
      i,
      o = this.GetItem(11);
    o &&
      (e.TagId
        ? (t = QuestTagById_1.configQuestTagById.GetConfig(e.TagId))
          ? ((i = this.GetSprite(12)) &&
              (this.SetSpriteByPath(t.BgSpritePath, i, !1), i.SetUIActive(!0)),
            (i = this.GetText(13)) &&
              (LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.Text),
              i.SetUIActive(!0)),
            o.SetUIActive(!0))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Quest",
              18,
              "找不到任务标签配置",
              ["questId", e.Id],
              ["TagId", e.TagId],
            )
        : o.SetUIActive(!1));
  }
  SetSelected(e) {
    var t = e ? 1 : 0;
    this.GetExtendToggle(4).SetToggleState(t, !1), e && this.Dno(), this.Lno(t);
  }
  Lno(e) {
    var t = this.GetItem(7);
    1 === e
      ? (this.QuestId !==
        ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id
          ? t.SetUIActive(!0)
          : t.SetUIActive(!1),
        (e = this.GetSprite(1)),
        t?.GetParentAsUIItem()?.SetUIActive(!e.bIsUIActive))
      : t.SetUIActive(!1);
  }
  SetNotAllowNoneSelect() {
    var e = this.GetExtendToggle(4);
    e.RootUIComp.SetRaycastTarget(1 !== e.ToggleState);
  }
  Dno() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.UpdateQuestDetails,
      this.QuestId,
      !0,
    );
  }
  GetTaskToggleItem() {
    return this.GetExtendToggle(4).RootUIComp;
  }
  OnBeforeDestroy() {}
}
exports.QuestItem = QuestItem;
//# sourceMappingURL=QuestItem.js.map
