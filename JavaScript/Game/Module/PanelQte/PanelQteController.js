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
    var r;
    return this.vNi()
      ? (((r = new PanelQteContext_1.PanelQteContext()).QteId = e),
        (r.PreMessageId = a),
        (r.Source = 0),
        (r.SourceMeshComp = t),
        (r.SourceActor = t.GetOwner()),
        this.MNi(r))
      : -1;
  }
  static StartBuffQte(e, t, a, r, n) {
    var o;
    return this.vNi() && r && r.Id === Global_1.Global.BaseCharacter?.EntityId
      ? (((o = new PanelQteContext_1.PanelQteContext()).QteId = e),
        (o.Source = 1),
        (o.PreMessageId = n),
        (o.SourceBuffId = t),
        (o.SourceBuffHandleId = a),
        (o.SourceActor = r.GetComponent(1)?.Owner),
        (o.SourceEntityHandle =
          ModelManager_1.ModelManager.CharacterModel?.GetHandleByEntity(r)),
        (o.IsInitSourceEntity = !0),
        this.MNi(o))
      : -1;
  }
  static StartLevelSequenceQte(e, t) {
    var a;
    return this.vNi()
      ? (((a = new PanelQteContext_1.PanelQteContext()).QteId = e),
        (a.Source = 2),
        (a.SourceActor = t),
        this.MNi(a))
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
        : (r = a.HideBattleUiChildren) &&
          (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
            6,
            r,
            !0,
          ),
          (a.HideBattleUiChildren = void 0)),
      a.DisableFightInput)
    ) {
      let e = void 0;
      var r = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
      if (
        (e =
          r?.EntityHandle === a.CurRoleEntity
            ? r.GameplayTagComponent
            : a.CurRoleEntity.Entity.GetComponent(185))
      )
        for (const n of disableInputTagIds) e.RemoveTag(n);
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
  static vNi() {
    return !ModelManager_1.ModelManager.PanelQteModel.IsInQte;
  }
  static MNi(e) {
    var t = ModelManager_1.ModelManager.PanelQteModel.GetPanelQteConfig(
      e.QteId,
    );
    if (!t) return -1;
    e.Config = t;
    var a = ModelManager_1.ModelManager.PanelQteModel,
      r = a.StartQte(e),
      n = e.Config.ViewType;
    switch (n) {
      case 0:
        UiManager_1.UiManager.IsViewOpen("FrozenQteView") &&
          UiManager_1.UiManager.CloseView("FrozenQteView"),
          UiManager_1.UiManager.OpenView("FrozenQteView", r);
        break;
      case 1:
        UiManager_1.UiManager.IsViewOpen("InteractQteView") &&
          UiManager_1.UiManager.CloseView("InteractQteView"),
          UiManager_1.UiManager.OpenView("InteractQteView", r),
          (a.DisableFightInput = !0);
        break;
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("PanelQte", 18, "QTE界面类型没有实现", ["", n]);
    }
    if (t.HideAllBattleUi)
      (a.IsHideAllBattleUi = !0),
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
          6,
          [20],
        );
    else {
      a.IsHideAllBattleUi = !1;
      var o = t.HideUIElement.Num();
      if (0 < o) {
        var i = [];
        for (let e = 0; e < o; e++) i.push(t.HideUIElement.Get(e));
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
          6,
          i,
          !1,
        ),
          (a.HideBattleUiChildren = i);
      } else a.HideBattleUiChildren = void 0;
    }
    if (a.DisableFightInput) {
      e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
      if (e) {
        var l = e.EntityHandle,
          _ = e.GameplayTagComponent;
        if (_) {
          for (const s of disableInputTagIds) _.AddTag(s);
          a.CurRoleEntity = l;
        }
      }
    }
    return (
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PanelQteStart, r),
      r
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPlayerDead,
      PanelQteController.XCt,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPlayerDead,
      PanelQteController.XCt,
    );
  }
}
(exports.PanelQteController = PanelQteController).XCt = () => {
  var e = ModelManager_1.ModelManager.PanelQteModel.GetContext();
  e?.QteHandleId && PanelQteController.StopQte(e.QteHandleId, !0);
};
//# sourceMappingURL=PanelQteController.js.map
