"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillTreeView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const RoleController_1 = require("../RoleController");
const RoleSkillDefine_1 = require("./RoleSkillDefine");
const RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem_1 = require("./RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem");
const RoleSkillInnerSkillAndOuterAttributeItem_1 = require("./RoleSkillInnerSkillAndOuterAttributeItem");
const RoleSkillOuterPassiveSkillItem_1 = require("./RoleSkillOuterPassiveSkillItem");
class RoleSkillTreeView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.plo = void 0),
      (this.zke = 0),
      (this.Emo = void 0),
      (this.ymo = void 0),
      (this.Imo = void 0),
      (this.Tmo = void 0),
      (this.Lmo = () => {
        UiManager_1.UiManager.OpenView("RoleSkillInputView", this.zke);
      }),
      (this.Dmo = (e) => {
        e === this.Tmo
          ? this.Tmo.SetToggleState(1)
          : (this.Tmo?.SetToggleState(0),
            (this.Tmo = e),
            this.Tmo.SetToggleState(1),
            this.Rmo());
      }),
      (this.Umo = (e) => {
        this.Amo(e), this.plo.RoleViewState === 1 && this.Pmo();
      }),
      (this.xmo = (e) => {
        const i =
          ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e);
        this.Amo(e),
          this.plo.RoleViewState === 1 &&
            RoleController_1.RoleController.SendRoleSkillViewRequest(
              this.zke,
              i.SkillId,
              this.Pmo,
            );
      }),
      (this.Juo = () => {
        this.UiViewSequence.StopSequenceByKey("MoveLeft"),
          this.UiViewSequence.PlaySequence("MoveLeft"),
          this.Zuo(),
          this.wmo(!0);
      }),
      (this.Bmo = () => {
        this.UiViewSequence.StopSequenceByKey("MoveLeft"),
          this.UiViewSequence.PlaySequence("MoveLeft"),
          this.Zuo(),
          this.wmo(!0);
      }),
      (this.Pmo = () => {
        let e;
        this.Tmo &&
          this.plo.RoleViewState !== 0 &&
          ((e = this.Tmo.GetSkillNodeId()),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UpdateSkillTreeInfoView,
            this.zke,
            e,
          ));
      }),
      (this.bmo = () => {
        let e, i;
        this.Tmo &&
          this.plo.RoleViewState !== 1 &&
          ((e = this.Tmo.GetSkillNodeId()),
          ((i = new RoleSkillDefine_1.RoleSkillTreeInfoViewData()).RoleId =
            this.zke),
          (i.SkillNodeId = e),
          UiManager_1.UiManager.OpenView("RoleSkillTreeInfoView", i),
          this.wmo(!1),
          this.UiViewSequence.StopSequenceByKey("MoveRight"),
          this.UiViewSequence.PlaySequence("MoveRight"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnRoleInternalViewEnter,
          ));
      }),
      (this.Yuo = (e) => {
        this.UiViewSequence.StopSequenceByKey("ChangeRole"),
          this.UiViewSequence.PlaySequence("ChangeRole"),
          this.qmo(e);
      }),
      (this.qmo = (e) => {
        (this.zke = e), this.Refresh();
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
      (this.BtnBindInfo = [[6, this.Lmo]]);
  }
  OnStart() {
    (this.plo = this.ExtraParams),
      void 0 === this.plo
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
            "界面名称",
            "RoleSkillTreeView",
          ])
        : ((this.Emo =
            new RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem_1.RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem()),
          this.Emo.CreateThenShowByActor(this.GetItem(0).GetOwner()),
          (this.Imo =
            new RoleSkillOuterPassiveSkillItem_1.RoleSkillOuterPassiveSkillItem()),
          this.Imo.CreateThenShowByActor(this.GetItem(5).GetOwner()),
          this.Gmo());
  }
  Gmo() {
    const i = [1, 2, 3, 4];
    this.ymo = new Array(i.length);
    for (let e = 0; e < i.length; e++) {
      const t = i[e];
      const s =
        new RoleSkillInnerSkillAndOuterAttributeItem_1.RoleSkillInnerSkillAndOuterAttributeItem();
      s.CreateThenShowByActor(this.GetItem(t).GetOwner()), (this.ymo[e] = s);
    }
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.Yuo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillTreeNodeToggleClick,
        this.Dmo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRoleInternalViewQuit,
        this.Juo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SelectRoleTabOutside,
        this.Bmo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SkillTreeNodeActive,
        this.Umo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SkillTreeNodeLevelUp,
        this.xmo,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.Yuo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillTreeNodeToggleClick,
        this.Dmo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRoleInternalViewQuit,
        this.Juo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SelectRoleTabOutside,
        this.Bmo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SkillTreeNodeActive,
        this.Umo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SkillTreeNodeLevelUp,
        this.xmo,
      );
  }
  OnBeforeShow() {
    RoleController_1.RoleController.PlayRoleMontage(3);
    const e = this.plo.GetCurSelectRoleId();
    this.qmo(e),
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
  Zuo() {
    this.Tmo?.SetToggleState(0), (this.Tmo = void 0);
  }
  Amo(e) {
    this.Emo.OnNodeLevelChange(e);
    for (const i of this.ymo) i.OnNodeLevelChange(e);
    this.Imo.OnNodeLevelChange(e);
  }
  wmo(e) {
    const i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.zke);
    const t = this.GetButton(6).GetRootComponent();
    i.IsTrialRole() ? t.SetUIActive(!1) : t.SetUIActive(e);
  }
  Rmo() {
    if (this.Tmo) {
      const i = this.Tmo.GetRoleId();
      const t = this.Tmo.GetSkillNodeId();
      let e = void 0;
      e = this.plo.RoleViewState === 1 ? this.Pmo : this.bmo;
      let s = this.Tmo.GetType();
      s === 4 || s === 3
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
    const e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.zke);
    this.wmo(!e.IsTrialRole()), this.RefreshRole(e.GetRoleSkillTreeConfig());
  }
  RefreshRole(e) {
    for (const i of e)
      switch (i.NodeType) {
        case 1:
          this.Emo.Update(this.zke, i.Id);
          break;
        case 2:
          i.Coordinate <= this.ymo.length &&
            this.ymo[i.Coordinate - 1]?.Update(this.zke, i.Id);
          break;
        case 4:
          break;
        case 3:
          (void 0 !== i.ParentNodes && i.ParentNodes.length !== 0) ||
            this.Imo?.Update(this.zke, i.Id);
      }
  }
}
exports.RoleSkillTreeView = RoleSkillTreeView;
// # sourceMappingURL=RoleSkillTreeView.js.map
