"use strict";
var ETexture;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getTexturePath = exports.ETexture = void 0),
  (function (e) {
    (e.FileTree = "FileTree"),
      (e.Teleport = "Teleport"),
      (e.SwitchOn = "SwitchOn"),
      (e.SwitchOff = "SwitchOff"),
      (e.Var = "Var"),
      (e.MagicCommand = "MagicCommand"),
      (e.Entity = "Entity"),
      (e.EntityTemplate = "EntityTemplate"),
      (e.Flow = "Flow"),
      (e.LevelPlay = "LevelPlay"),
      (e.Quest = "Quest"),
      (e.Prefab = "Prefab"),
      (e.Csv = "Csv"),
      (e.Selected = "Selected"),
      (e.UnSelected = "UnSelected"),
      (e.MultiSelect = "MultiSelect"),
      (e.Filtered = "Filtered"),
      (e.Unfiltered = "Unfiltered"),
      (e.Refresh = "Refresh"),
      (e.Camera = "Camera"),
      (e.Capture = "Capture"),
      (e.CopyLink = "CopyLink"),
      (e.Copy = "Copy"),
      (e.MagnifierTab = "MagnifierTab"),
      (e.MagnifierButton = "MagnifierButton");
  })((ETexture = exports.ETexture || (exports.ETexture = {})));
const texturePathMap = {
  [ETexture.FileTree]:
    "/Game/Aki/UniverseEditor/Res/Icons/dictionary.dictionary",
  [ETexture.Teleport]:
    "/Game/Aki/UniverseEditor/Res/Icons/T_IconMap_CS_01_UI.T_IconMap_CS_01_UI",
  [ETexture.SwitchOn]: "/Game/Aki/UniverseEditor/Res/Icons/switch_on.switch_on",
  [ETexture.SwitchOff]:
    "/Game/Aki/UniverseEditor/Res/Icons/switch_off.switch_off",
  [ETexture.Var]: "/Game/Aki/UniverseEditor/Res/Icons/var.var",
  [ETexture.MagicCommand]:
    "/Game/Aki/UniverseEditor/Res/Icons/T_IconFunctionOpen_16_UI.T_IconFunctionOpen_16_UI",
  [ETexture.Entity]:
    "/Game/Aki/UniverseEditor/WorldEditor/Texture/Icon/T_IconMap_Mark_06_UI.T_IconMap_Mark_06_UI",
  [ETexture.EntityTemplate]:
    "/Game/Aki/UniverseEditor/Res/Icons/T_EditorIcon_EntityTemplate.T_EditorIcon_EntityTemplate",
  [ETexture.Flow]:
    "/Game/Aki/UniverseEditor/Res/Icons/T_EditorIcon_Flow.T_EditorIcon_Flow",
  [ETexture.LevelPlay]:
    "/Game/Aki/UniverseEditor/Res/Icons/T_EditorIcon_LevelPlay.T_EditorIcon_LevelPlay",
  [ETexture.Quest]:
    "/Game/Aki/UniverseEditor/Res/Icons/T_EditorIcon_Quest.T_EditorIcon_Quest",
  [ETexture.Prefab]:
    "/Game/Aki/UniverseEditor/Res/Icons/T_EditorIcon_Prefab.T_EditorIcon_Prefab",
  [ETexture.Csv]:
    "/Game/Aki/UniverseEditor/Res/Icons/T_EditorIcon_Csv.T_EditorIcon_Csv",
  [ETexture.Selected]: "/Game/Aki/UniverseEditor/Res/Icons/Selected.Selected",
  [ETexture.UnSelected]:
    "/Game/Aki/UniverseEditor/Res/Icons/UnSelected.UnSelected",
  [ETexture.MultiSelect]:
    "/Game/Aki/UniverseEditor/Res/Icons/multiSelect.multiSelect",
  [ETexture.Filtered]: "/Game/Aki/UniverseEditor/Res/Icons/filtered.filtered",
  [ETexture.Unfiltered]:
    "/Game/Aki/UniverseEditor/Res/Icons/unfiltered.unfiltered",
  [ETexture.Refresh]: "/Game/Aki/UniverseEditor/Res/Icons/T_Refresh.T_Refresh",
  [ETexture.Camera]: "/Game/Aki/UniverseEditor/Res/Icons/T_Camera.T_Camera",
  [ETexture.Capture]:
    "/Game/Aki/UniverseEditor/Res/Icons/T_EditorIcon_Capture.T_EditorIcon_Capture",
  [ETexture.CopyLink]:
    "/Game/Aki/UniverseEditor/Res/Icons/T_CopyLink.T_CopyLink",
  [ETexture.Copy]: "/Game/Aki/UniverseEditor/Res/Icons/T_Copy.T_Copy",
  [ETexture.MagnifierTab]:
    "/Game/Aki/UniverseEditor/Res/Icons/T_Magnifier1.T_Magnifier1",
  [ETexture.MagnifierButton]:
    "/Game/Aki/UniverseEditor/Res/Icons/T_Magnifier2.T_Magnifier2",
};
function getTexturePath(e) {
  return texturePathMap[e];
}
exports.getTexturePath = getTexturePath;
//# sourceMappingURL=TextureDefine.js.map
