"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillTreeView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  RoleController_1 = require("../RoleController"),
  RoleSkillDefine_1 = require("./RoleSkillDefine"),
  RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem_1 = require("./RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem"),
  RoleSkillInnerSkillAndOuterAttributeItem_1 = require("./RoleSkillInnerSkillAndOuterAttributeItem"),
  RoleSkillOuterPassiveSkillItem_1 = require("./RoleSkillOuterPassiveSkillItem");
class RoleSkillTreeView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.d1o = void 0),
      (this.dFe = 0),
      (this.vdo = void 0),
      (this.Mdo = void 0),
      (this.Edo = void 0),
      (this.Sdo = void 0),
      (this.ydo = () => {
        var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe);
        UiManager_1.UiManager.OpenView("RoleSkillInputView", e);
      }),
      (this.Ido = (e) => {
        e === this.Sdo
          ? this.Sdo.SetToggleState(1)
          : (this.Sdo?.SetToggleState(0),
            (this.Sdo = e),
            this.Sdo.SetToggleState(1),
            this.Tdo());
      }),
      (this.Ldo = (e) => {
        this.Ddo(e), 1 === this.d1o.RoleViewState && this.Rdo();
      }),
      (this.Udo = (e) => {
        var i =
          ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e);
        this.Ddo(e),
          1 === this.d1o.RoleViewState &&
            RoleController_1.RoleController.SendRoleSkillViewRequest(
              this.dFe,
              i.SkillId,
              this.Rdo,
            );
      }),
      (this.Qco = () => {
        this.UiViewSequence.StopSequenceByKey("MoveLeft"),
          this.UiViewSequence.PlaySequence("MoveLeft"),
          this.$co(),
          this.Ado(!0);
      }),
      (this.Pdo = () => {
        this.UiViewSequence.StopSequenceByKey("MoveLeft"),
          this.UiViewSequence.PlaySequence("MoveLeft"),
          this.$co(),
          this.Ado(!0);
      }),
      (this.Rdo = () => {
        var e;
        this.Sdo &&
          0 !== this.d1o.RoleViewState &&
          ((e = this.Sdo.GetSkillNodeId()),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UpdateSkillTreeInfoView,
            this.dFe,
            e,
          ));
      }),
      (this.xdo = () => {
        var e, i;
        this.Sdo &&
          1 !== this.d1o.RoleViewState &&
          ((e = this.Sdo.GetSkillNodeId()),
          ((i = new RoleSkillDefine_1.RoleSkillTreeInfoViewData()).RoleId =
            this.dFe),
          (i.SkillNodeId = e),
          UiManager_1.UiManager.OpenView("RoleSkillTreeInfoView", i),
          this.Ado(!1),
          this.UiViewSequence.StopSequenceByKey("MoveRight"),
          this.UiViewSequence.PlaySequence("MoveRight"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnRoleInternalViewEnter,
          ));
      }),
      (this.Kco = (e) => {
        this.UiViewSequence.StopSequenceByKey("ChangeRole"),
          this.UiViewSequence.PlaySequence("ChangeRole"),
          this.wdo(e);
      }),
      (this.wdo = (e) => {
        (this.dFe = e), this.Refresh();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[6, this.ydo]]);
  }
  OnStart() {
    (this.d1o = this.ExtraParams),
      void 0 === this.d1o
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
            "界面名称",
            "RoleSkillTreeView",
          ])
        : ((this.vdo =
            new RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem_1.RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem()),
          this.vdo.CreateThenShowByActor(this.GetItem(0).GetOwner()),
          (this.Edo =
            new RoleSkillOuterPassiveSkillItem_1.RoleSkillOuterPassiveSkillItem()),
          this.Edo.CreateThenShowByActor(this.GetItem(5).GetOwner()),
          this.Bdo());
  }
  Bdo() {
    var i = [1, 2, 3, 4];
    this.Mdo = new Array(i.length);
    for (let e = 0; e < i.length; e++) {
      var t = i[e],
        s =
          new RoleSkillInnerSkillAndOuterAttributeItem_1.RoleSkillInnerSkillAndOuterAttributeItem();
      s.CreateThenShowByActor(this.GetItem(t).GetOwner()), (this.Mdo[e] = s);
    }
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.Kco,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillTreeNodeToggleClick,
        this.Ido,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRoleInternalViewQuit,
        this.Qco,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SelectRoleTabOutside,
        this.Pdo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SkillTreeNodeActive,
        this.Ldo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SkillTreeNodeLevelUp,
        this.Udo,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.Kco,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillTreeNodeToggleClick,
        this.Ido,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRoleInternalViewQuit,
        this.Qco,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SelectRoleTabOutside,
        this.Pdo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SkillTreeNodeActive,
        this.Ldo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SkillTreeNodeLevelUp,
        this.Udo,
      );
  }
  OnBeforeShow() {
    RoleController_1.RoleController.PlayRoleMontage(5);
    var e = this.d1o.GetCurSelectRoleId();
    this.wdo(e),
      UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()
        .Model?.CheckGetComponent(3)
        ?.SetLoadingOpen(!1);
  }
  OnBeforeHide() {
    UiSceneManager_1.UiSceneManager.HasRoleSystemRoleActor() &&
      UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()
        .Model?.CheckGetComponent(3)
        ?.SetLoadingOpen(!0);
  }
  $co() {
    this.Sdo?.SetToggleState(0), (this.Sdo = void 0);
  }
  Ddo(e) {
    this.vdo.OnNodeLevelChange(e);
    for (const i of this.Mdo) i.OnNodeLevelChange(e);
    this.Edo.OnNodeLevelChange(e);
  }
  Ado(e) {
    this.GetButton(6).GetRootComponent().SetUIActive(e);
  }
  Tdo() {
    if (this.Sdo) {
      var i = this.Sdo.GetRoleId(),
        t = this.Sdo.GetSkillNodeId();
      let e = void 0;
      e = 1 === this.d1o.RoleViewState ? this.Rdo : this.xdo;
      var s = this.Sdo.GetType();
      4 === s || 3 === s
        ? e()
        : ((s =
            ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(t)),
          RoleController_1.RoleController.SendRoleSkillViewRequest(
            i,
            s.SkillId,
            e,
          ));
    }
  }
  Refresh() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe);
    this.Ado(!0), this.RefreshRole(e.GetRoleSkillTreeConfig());
  }
  RefreshRole(e) {
    for (const i of e)
      switch (i.NodeType) {
        case 1:
          this.vdo.Update(this.dFe, i.Id);
          break;
        case 2:
          i.Coordinate <= this.Mdo.length &&
            this.Mdo[i.Coordinate - 1]?.Update(this.dFe, i.Id);
          break;
        case 4:
          break;
        case 3:
          (void 0 !== i.ParentNodes && 0 !== i.ParentNodes.length) ||
            this.Edo?.Update(this.dFe, i.Id);
      }
  }
}
exports.RoleSkillTreeView = RoleSkillTreeView;
//# sourceMappingURL=RoleSkillTreeView.js.map
