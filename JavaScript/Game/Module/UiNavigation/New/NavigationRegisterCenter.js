"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationRegisterCenter = void 0);
const BasePanelHandle_1 = require("./PanelHandle/BasePanelHandle");
const FunctionViewPanelHandle_1 = require("./PanelHandle/FunctionViewPanelHandle");
const InventoryViewPanelHandle_1 = require("./PanelHandle/InventoryViewPanelHandle");
const NavigationPanelHandleCreator_1 = require("./PanelHandle/NavigationPanelHandleCreator");
const RoleResonancePanelHandle_1 = require("./PanelHandle/RoleResonancePanelHandle");
const RoleSkillPanelHandle_1 = require("./PanelHandle/RoleSkillPanelHandle");
const RouletteViewPanelHandle_1 = require("./PanelHandle/RouletteViewPanelHandle");
const VisionChooseMainPanelHandle_1 = require("./PanelHandle/VisionChooseMainPanelHandle");
const NavigationFunctionPageButton_1 = require("./Selectable/FunctionView/NavigationFunctionPageButton");
const NavigationFunctionPageLeftButton_1 = require("./Selectable/FunctionView/NavigationFunctionPageLeftButton");
const NavigationFunctionPageRightButton_1 = require("./Selectable/FunctionView/NavigationFunctionPageRightButton");
const NavigationInventoryDestroyEnterButton_1 = require("./Selectable/InventoryView/NavigationInventoryDestroyEnterButton");
const NavigationInventoryDestroyExitButton_1 = require("./Selectable/InventoryView/NavigationInventoryDestroyExitButton");
const NavigationInventoryItemGridToggle_1 = require("./Selectable/InventoryView/NavigationInventoryItemGridToggle");
const NavigationButton_1 = require("./Selectable/NavigationButton");
const NavigationDragComponent_1 = require("./Selectable/NavigationDragComponent");
const NavigationScrollbar_1 = require("./Selectable/NavigationScrollbar");
const NavigationSelectable_1 = require("./Selectable/NavigationSelectable");
const NavigationSelectableCreator_1 = require("./Selectable/NavigationSelectableCreator");
const NavigationSlider_1 = require("./Selectable/NavigationSlider");
const NavigationToggle_1 = require("./Selectable/NavigationToggle");
const NavigationRoguelikeGridToggle_1 = require("./Selectable/Roguelike/NavigationRoguelikeGridToggle");
const NavigationRoleResonanceExitButton_1 = require("./Selectable/RoleRootView/Resonance/NavigationRoleResonanceExitButton");
const NavigationRoleResonanceToggle_1 = require("./Selectable/RoleRootView/Resonance/NavigationRoleResonanceToggle");
const NavigationRoleSkillTreeExitButton_1 = require("./Selectable/RoleRootView/Skill/NavigationRoleSkillTreeExitButton");
const NavigationRoleSkillTreeToggle_1 = require("./Selectable/RoleRootView/Skill/NavigationRoleSkillTreeToggle");
const NavigationRouletteExitButton_1 = require("./Selectable/Roulette/NavigationRouletteExitButton");
const NavigationVisionTabViewReplaceButton_1 = require("./Selectable/Vision/NavigationVisionTabViewReplaceButton");
const NavigationVisionTabViewToggle_1 = require("./Selectable/Vision/NavigationVisionTabViewToggle");
const NavigationVisionToggle_1 = require("./Selectable/Vision/NavigationVisionToggle");
const selectableCtorMap = {
  Button: NavigationButton_1.NavigationButton,
  Toggle: NavigationToggle_1.NavigationToggle,
  Scrollbar: NavigationScrollbar_1.NavigationScrollbar,
  Slider: NavigationSlider_1.NavigationSlider,
  DragComponent: NavigationDragComponent_1.NavigationDragComponent,
  Selectable: NavigationSelectable_1.NavigationSelectable,
  VisionReplaceViewToggle: NavigationVisionToggle_1.NavigationVisionToggle,
  VisionTabViewToggle:
    NavigationVisionTabViewToggle_1.NavigationVisionTabViewToggle,
  VisionTabViewReplaceButton:
    NavigationVisionTabViewReplaceButton_1.NavigationVisionTabViewReplaceButton,
  FunctionPageButton:
    NavigationFunctionPageButton_1.NavigationFunctionPageButton,
  FunctionPageLeftButton:
    NavigationFunctionPageLeftButton_1.NavigationFunctionPageLeftButton,
  FunctionPageRightButton:
    NavigationFunctionPageRightButton_1.NavigationFunctionPageRightButton,
  RoleSkillTreeToggle:
    NavigationRoleSkillTreeToggle_1.NavigationRoleSkillTreeToggle,
  RoleSkillTreeExitButton:
    NavigationRoleSkillTreeExitButton_1.NavigationRoleSkillTreeExitButton,
  RoleResonanceToggle:
    NavigationRoleResonanceToggle_1.NavigationRoleResonanceToggle,
  RoleResonanceExitButton:
    NavigationRoleResonanceExitButton_1.NavigationRoleResonanceExitButton,
  InventoryDestroyEnterButton:
    NavigationInventoryDestroyEnterButton_1.NavigationInventoryDestroyEnterButton,
  InventoryDestroyExitButton:
    NavigationInventoryDestroyExitButton_1.NavigationInventoryDestroyExitButton,
  InventoryItemGridToggle:
    NavigationInventoryItemGridToggle_1.NavigationInventoryItemGridToggle,
  RouletteExitButton:
    NavigationRouletteExitButton_1.NavigationRouletteExitButton,
  RoguelikeGridToggle:
    NavigationRoguelikeGridToggle_1.NavigationRoguelikeGridToggle,
};
const panelHandleCtorMap = {
  Default: BasePanelHandle_1.BasePanelHandle,
  VisionChooseMain: VisionChooseMainPanelHandle_1.VisionChooseMainPanelHandle,
  MainMenu: FunctionViewPanelHandle_1.FunctionViewPanelHandle,
  RoleSkill: RoleSkillPanelHandle_1.RoleSkillPanelHandle,
  RoleResonance: RoleResonancePanelHandle_1.RoleResonancePanelHandle,
  Inventory: InventoryViewPanelHandle_1.InventoryViewPanelHandle,
  Roulette: RouletteViewPanelHandle_1.RouletteViewPanelHandle,
};
class NavigationRegisterCenter {
  static Init() {
    this.Wxo(), this.Kxo();
  }
  static Wxo() {
    for (const n in selectableCtorMap) {
      const e = n;
      NavigationSelectableCreator_1.NavigationSelectableCreator.RegisterNavigationBehavior(
        e,
        selectableCtorMap[e],
      );
    }
  }
  static Kxo() {
    for (const n in panelHandleCtorMap) {
      const e = n;
      NavigationPanelHandleCreator_1.NavigationPanelHandleCreator.RegisterSpecialPanelHandle(
        e,
        panelHandleCtorMap[e],
      );
    }
  }
}
exports.NavigationRegisterCenter = NavigationRegisterCenter;
// # sourceMappingURL=NavigationRegisterCenter.js.map
