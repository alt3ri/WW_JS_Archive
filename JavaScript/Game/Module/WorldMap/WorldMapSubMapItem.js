"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapSubMapItem = void 0);
const UE = require("ue");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../Util/LguiUtil");
class WorldMapSubMapItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.MultiMapConfigId = 0),
      (this.OnToggleStateChange = (e) => {
        e === 1 &&
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.WorldMapSelectMultiMap,
            this.MultiMapConfigId,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.WorldMapSubMapChanged,
            this.GridIndex,
          ));
      });
  }
  Refresh(e, t, i) {
    (this.MultiMapConfigId = e.Id),
      (this.GridIndex = i),
      this.GetExtendToggle(3)?.SetToggleState(t ? 1 : 0, !1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.FloorName);
    (i = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId()),
      (t = ConfigManager_1.ConfigManager.MapConfig?.GetSubMapConfigByAreaId(i));
    if (e.Area.includes(i) || (!e.Area.includes(i) && e.Floor === 0 && !t)) {
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_MultiMapCurrentAreaIcon",
      );
      if (!StringUtils_1.StringUtils.IsEmpty(i)) {
        const r = this.GetSprite(0)
          ?.GetOwner()
          ?.GetComponentByClass(
            UE.UIExtendToggleSpriteTransition.StaticClass(),
          );
        ResourceSystem_1.ResourceSystem.LoadAsync(
          i,
          UE.LGUISpriteData_BaseObject,
          (e) => {
            e && r && r.SetAllStateSprite(e);
          },
        ),
          this.SetSpriteByPath(i, this.GetSprite(1), !1);
      }
    } else if (!StringUtils_1.StringUtils.IsEmpty(e.FloorIcon)) {
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        e.FloorIcon,
      );
      if (!StringUtils_1.StringUtils.IsEmpty(t)) {
        const s = this.GetSprite(0)
          ?.GetOwner()
          ?.GetComponentByClass(
            UE.UIExtendToggleSpriteTransition.StaticClass(),
          );
        ResourceSystem_1.ResourceSystem.LoadAsync(
          t,
          UE.LGUISpriteData_BaseObject,
          (e) => {
            e && s && s.SetAllStateSprite(e);
          },
        ),
          this.SetSpriteByPath(t, this.GetSprite(1), !1);
      }
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIExtendToggle],
    ];
  }
  OnStart() {
    this.GetExtendToggle(3)?.OnStateChange.Add(this.OnToggleStateChange);
  }
  OnSelected(e) {
    this.GetExtendToggle(3)?.SetToggleState(1, e);
  }
  OnDeselected(e) {
    this.GetExtendToggle(3)?.SetToggleState(0, e);
  }
}
exports.WorldMapSubMapItem = WorldMapSubMapItem;
// # sourceMappingURL=WorldMapSubMapItem.js.map
