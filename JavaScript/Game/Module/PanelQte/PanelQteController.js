"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PanelQteController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  PanelQteContext_1 = require("./PanelQteContext"),
  disableInputTagIds = [
    -542518289, -541178966, -732810197, 581080458, -1802431900, -469423249,
    766688429, -1752099043, -1697149502,
  ];
class PanelQteController extends UiControllerBase_1.UiControllerBase {
  static StartAnimNotifyQte(e, t, a) {
    var n;
    return this.vOi()
      ? (((n = new PanelQteContext_1.PanelQteContext()).QteId = e),
        (n.PreMessageId = a),
        (n.Source = 0),
        (n.SourceMeshComp = t),
        (n.SourceActor = t.GetOwner()),
        this.MOi(n))
      : -1;
  }
  static StartBuffQte(e, t, a, n, r) {
    var i;
    return this.vOi() && n && n.Id === Global_1.Global.BaseCharacter?.EntityId
      ? (((i = new PanelQteContext_1.PanelQteContext()).QteId = e),
        (i.Source = 1),
        (i.PreMessageId = r),
        (i.SourceBuffId = t),
        (i.SourceBuffHandleId = a),
        (i.SourceActor = n.GetComponent(1)?.Owner),
        (i.SourceEntityHandle =
          ModelManager_1.ModelManager.CharacterModel?.GetHandleByEntity(n)),
        (i.IsInitSourceEntity = !0),
        this.MOi(i))
      : -1;
  }
  static StartLevelSequenceQte(e, t) {
    var a;
    return this.vOi()
      ? (((a = new PanelQteContext_1.PanelQteContext()).QteId = e),
        (a.Source = 2),
        (a.SourceActor = t),
        this.MOi(a))
      : -1;
  }
  static StartLevelEventQte(e) {
    var t;
    return this.vOi()
      ? (((t = new PanelQteContext_1.PanelQteContext()).QteId = e),
        (t.Source = 3),
        this.MOi(t))
      : -1;
  }
  static StopQte(e, t = !1) {
    if (!ModelManager_1.ModelManager.PanelQteModel.StopQte(e)) return !1;
    var a = ModelManager_1.ModelManager.PanelQteModel;
    if (
      (a.IsHideAllBattleUi
        ? (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
            6,
          ),
          (a.IsHideAllBattleUi = !1))
        : (n = a.HideBattleUiChildren) &&
          (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
            6,
            n,
            !0,
          ),
          (a.HideBattleUiChildren = void 0)),
      a.DisableFightInput)
    ) {
      let e = void 0;
      var n = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
      if (
        (e =
          n?.EntityHandle === a.CurRoleEntity
            ? n.GameplayTagComponent
            : a.CurRoleEntity.Entity.GetComponent(190))
      )
        for (const r of disableInputTagIds) e.RemoveTag(r);
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "PanelQte",
            18,
            "界面qte结束时，场上角色已经被销毁了",
          );
      (a.CurRoleEntity = void 0), (a.DisableFightInput = !1);
    }
    return (
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PanelQteEnd,
        e,
        ModelManager_1.ModelManager.PanelQteModel.IsQteSuccess(),
      ),
      t || ModelManager_1.ModelManager.PanelQteModel.HandleResult(),
      !0
    );
  }
  static vOi() {
    return !ModelManager_1.ModelManager.PanelQteModel.IsInQte;
  }
  static MOi(e) {
    var t = ModelManager_1.ModelManager.PanelQteModel.GetPanelQteConfig(
      e.QteId,
    );
    if (!t) return -1;
    e.Config = t;
    var a = ModelManager_1.ModelManager.PanelQteModel,
      n = a.StartQte(e),
      r = e.Config.ViewType;
    switch (r) {
      case 0:
        UiManager_1.UiManager.IsViewOpen("FrozenQteView") &&
          UiManager_1.UiManager.CloseView("FrozenQteView"),
          UiManager_1.UiManager.OpenView("FrozenQteView", n);
        break;
      case 1:
        UiManager_1.UiManager.IsViewOpen("InteractQteView") &&
          UiManager_1.UiManager.CloseView("InteractQteView"),
          UiManager_1.UiManager.OpenView("InteractQteView", n),
          (a.DisableFightInput = !0);
        break;
      case 2:
        (e.BuffIndex = Math.floor(Math.random() * t.MaxSuccessCount)),
          UiManager_1.UiManager.IsViewOpen("YouHuQteView") &&
            UiManager_1.UiManager.CloseView("YouHuQteView"),
          UiManager_1.UiManager.OpenView("YouHuQteView", n);
        break;
      case 3:
        UiManager_1.UiManager.IsViewOpen("FreeRunningQteView") &&
          UiManager_1.UiManager.CloseView("FreeRunningQteView"),
          UiManager_1.UiManager.OpenView("FreeRunningQteView", n),
          (a.DisableFightInput = !0);
        break;
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("PanelQte", 18, "QTE界面类型没有实现", ["", r]);
    }
    if (t.HideAllBattleUi)
      (a.IsHideAllBattleUi = !0),
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
          6,
          [20],
        );
    else {
      a.IsHideAllBattleUi = !1;
      var i = t.HideUIElement.Num();
      if (0 < i) {
        var o = [];
        for (let e = 0; e < i; e++) o.push(t.HideUIElement.Get(e));
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
          6,
          o,
          !1,
        ),
          (a.HideBattleUiChildren = o);
      } else a.HideBattleUiChildren = void 0;
    }
    if (a.DisableFightInput) {
      var l = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
      if (l) {
        var _ = l.EntityHandle,
          s = l.GameplayTagComponent;
        if (s) {
          for (const M of disableInputTagIds) s.AddTag(M);
          a.CurRoleEntity = _;
        }
      }
    }
    return (
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PanelQteStart, n),
      n
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnTeamLivingStateChange,
      PanelQteController.t$s,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnTeamLivingStateChange,
      PanelQteController.t$s,
    );
  }
}
(exports.PanelQteController = PanelQteController).t$s = (e, t, a) => {
  e &&
    1 === t &&
    2 === a &&
    (e = ModelManager_1.ModelManager.PanelQteModel.GetContext())?.QteHandleId &&
    PanelQteController.StopQte(e.QteHandleId, !0);
};
//# sourceMappingURL=PanelQteController.js.map
