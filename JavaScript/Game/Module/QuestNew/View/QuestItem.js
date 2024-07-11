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
  LguiUtil_1 = require("../../Util/LguiUtil"),
  TICK_INTERVAL = 1e3;
class QuestItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.QuestId = 0),
      (this.TreeId = BigInt(0)),
      (this.QuestType = 0),
      (this.DGn = !1),
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
        ((this.e8 -= TICK_INTERVAL), this.AGn(this.QuestId, !0)),
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
        this.QCa(e),
        RedDotController_1.RedDotController.BindRedDot(
          "QuestViewItem",
          this.GetItem(6),
          void 0,
          this.QuestId,
        ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Quest", 19, "任务界面任务Item更新时找不到任务", [
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
      i = this.GetText(3);
    e.IsSuspend() ||
    !(t = e.GetCurrentActiveChildQuestNode()) ||
    !GeneralLogicTreeController_1.GeneralLogicTreeController.IsShowNodeTrackDistance(
      e.TreeId,
      t.NodeId,
    ) ||
    ((t = e.GetTrackDistance(t.NodeId)), e.IsInTrackRange()) ||
    !t
      ? i.SetUIActive(!1)
      : (LguiUtil_1.LguiUtil.SetLocalText(i, "Meter", t), i.SetUIActive(!0));
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
    this.DGn = !1;
    var r = i.IsQuestCanPreShow(),
      o = i.IsSuspend() ?? !1,
      s = i.IsQuestHasRecommendPreQuest() ?? !1,
      n = i.HasRefOccupiedEntity() ?? !1,
      a = this.GetText(10),
      _ = ModelManager_1.ModelManager.QuestNewModel.GetQuestBindingActivityId(
        i.Id,
      );
    if (r || o || s || n || _) {
      a.SetUIActive(!0);
      let e = "",
        t = "";
      if (o)
        (e = i.GetSuspendText()?.split("，")[0]),
          a.SetText(e),
          (t =
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskUnableColor",
            ) ?? "");
      else if (n)
        (e = i.GetRefOccupiedEntityText()?.split("，")[0]),
          a.SetText(e),
          (t =
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskUnableColor",
            ) ?? "");
      else if (r)
        (e =
          ModelManager_1.ModelManager.QuestNewModel.GetShowQuestConditionDescribe(
            i.Id,
          )),
          a.SetText(e),
          (t =
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskUnableColor",
            ) ?? "");
      else if (s) {
        _ = i.GetRecommendPreQuest();
        let e = "";
        _?.length &&
          (e =
            ModelManager_1.ModelManager.QuestNewModel.GetQuest(_[0])?.Name ??
            ""),
          LguiUtil_1.LguiUtil.SetLocalText(a, "QuestRecommendTip", e),
          (t =
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskRemindColor",
            ) ?? "");
      } else
        (this.DGn = !0),
          this.AGn(i.Id, !1),
          (t =
            CommonParamById_1.configCommonParamById.GetStringConfig(
              "TaskCountDownColor",
            ) ?? "");
      o = UE.Color.FromHex(t);
      a.SetColor(o);
    } else a.SetUIActive(!1);
  }
  AGn(e, t) {
    var i, r, o, s;
    this.DGn &&
      (ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.QuestId)
        ? ((i = this.GetText(10)),
          (o =
            ModelManager_1.ModelManager.QuestNewModel.GetQuestBindingActivityId(
              e,
            )),
          (o = ModelManager_1.ModelManager.ActivityModel.GetActivityById(o)) &&
          o.LocalConfig?.IfShowQuestLeftTime &&
          (r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "ActivityRemainingTime",
          ))
            ? o.CheckIfInOpenTime()
              ? o.EndOpenTime
                ? ((s = TimeUtil_1.TimeUtil.GetServerTime()),
                  (o = o.EndOpenTime - s),
                  (s =
                    ModelManager_1.ModelManager.QuestNewModel.GetActivityGuideQuestRemainTimeText(
                      o,
                      r,
                    )),
                  i.SetText(s))
                : i.SetUIActive(!1)
              : t &&
                (EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.ActivityQuestCountdownEnd,
                  e,
                ),
                (this.DGn = !1))
            : i.SetUIActive(!1))
        : t &&
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ActivityQuestCountdownEnd,
            e,
          ),
          (this.DGn = !1)));
  }
  QCa(e) {
    var t,
      i,
      r = this.GetItem(11);
    r &&
      (e.TagId
        ? (t = QuestTagById_1.configQuestTagById.GetConfig(e.TagId))
          ? ((i = this.GetSprite(12)) &&
              (this.SetSpriteByPath(t.BgSpritePath, i, !0), i.SetUIActive(!0)),
            (i = this.GetText(13)) &&
              (LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.Text),
              i.SetUIActive(!0)),
            r.SetUIActive(!0))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Quest",
              19,
              "找不到任务标签配置",
              ["questId", e.Id],
              ["TagId", e.TagId],
            )
        : r.SetUIActive(!1));
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
