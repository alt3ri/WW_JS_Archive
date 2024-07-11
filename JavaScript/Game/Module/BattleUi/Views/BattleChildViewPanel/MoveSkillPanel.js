"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoveSkillPanel = void 0);
const UE = require("ue");
const InputEnums_1 = require("../../../../Input/InputEnums");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
const MoveSkillItem_1 = require("../MoveSkillItem");
const actionNameList = [
  InputMappingsDefine_1.actionMappings.向前移动,
  InputMappingsDefine_1.actionMappings.向后移动,
];
class MoveSkillPanel extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments),
      (this.tZe = []),
      (this.bMe = (e, i) => {
        i === 0 &&
          (e === InputMappingsDefine_1.actionMappings.向前移动
            ? this.tZe[0].OnInputAction()
            : e === InputMappingsDefine_1.actionMappings.向后移动 &&
              this.tZe[1].OnInputAction());
      });
  }
  CreateDynamic(e) {
    this.CreateThenShowByResourceIdAsync("UiItem_SkillVisionB", e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    await this.NewAllSkillItems(), this.iZe(), this.Ore();
  }
  async NewAllSkillItems() {
    const e = [this.GetItem(0).GetOwner(), this.GetItem(1).GetOwner()];
    await Promise.all(e.map(async (e, i) => this.oZe(e, i)));
  }
  async oZe(e, i) {
    const t = new MoveSkillItem_1.MoveSkillItem();
    return await t.NewByRootActorAsync(e, i), this.tZe.push(t), t;
  }
  iZe() {
    this.tZe[0].RefreshByMoveType(InputEnums_1.EInputAxis.MoveForward, 1),
      this.tZe[1].RefreshByMoveType(InputEnums_1.EInputAxis.MoveForward, -1),
      this.tZe[0].RefreshKeyByActionName(
        InputMappingsDefine_1.actionMappings.向前移动,
      ),
      this.tZe[1].RefreshKeyByActionName(
        InputMappingsDefine_1.actionMappings.向后移动,
      ),
      this.tZe[0].RefreshSkillIconByResId("SP_IconVision01A"),
      this.tZe[1].RefreshSkillIconByResId("SP_IconVision01B");
  }
  Tick(e) {
    for (const i of this.tZe) i.Tick(e);
  }
  OnBeforeDestroy() {
    for (const e of this.tZe) e.Destroy();
    (this.tZe.length = 0), this.kre();
  }
  Ore() {
    ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
      InputDistributeController_1.InputDistributeController.BindActions(
        actionNameList,
        this.bMe,
      );
  }
  kre() {
    ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
      InputDistributeController_1.InputDistributeController.UnBindActions(
        actionNameList,
        this.bMe,
      );
  }
}
exports.MoveSkillPanel = MoveSkillPanel;
// # sourceMappingURL=MoveSkillPanel.js.map
