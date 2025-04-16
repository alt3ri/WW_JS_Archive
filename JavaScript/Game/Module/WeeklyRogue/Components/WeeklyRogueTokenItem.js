"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueTokenItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class WeeklyRogueTokenItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.Mne = 0),
      (this.OnSelectedChange = void 0),
      (this.eTt = () => {
        var e =
          1 === this.GetExtendToggle(5).GetToggleState()
            ? this.GridIndex
            : void 0;
        this.OnSelectedChange?.(e);
      }),
      (this.iV_ = () => {
        var e;
        0 !== this.Mne &&
          ((e =
            ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(
              this.Mne,
            ))
            ? 0 === ModelManager_1.ModelManager.WeeklyRogueModel?.DescMode
              ? LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(4),
                  e.BuffDescSimple,
                )
              : LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(4),
                  e.BuffDesc,
                  ...e.BuffDescParam,
                )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "WeeklyRogue",
                34,
                "刷新周常肉鸽信物格子失败，找不到对应的配置",
                ["ConfigId", this.Mne],
              ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIText],
      [5, UE.UIExtendToggle],
      [6, UE.UIItem],
      [7, UE.UISprite],
      [8, UE.UIItem],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[5, this.eTt]]);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WeeklyRogueDescModeChange,
      this.iV_,
    );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WeeklyRogueDescModeChange,
      this.iV_,
    );
  }
  Refresh(e, i, t) {
    (this.Pe = e), (this.Mne = e.v9n), this.UpdateByConfigId(e.v9n);
  }
  OnSelected(e) {
    this.GetExtendToggle(5).SetToggleState(1),
      (ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry = this.Pe);
  }
  OnDeselected(e) {
    this.GetExtendToggle(5).SetToggleState(0),
      (ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry = void 0);
  }
  UpdateByConfigId(e) {
    this.Mne = e;
    var i,
      t =
        ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(
          e,
        );
    t
      ? (this.GetItem(6).SetUIActive(!1),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.BuffName),
        0 === ModelManager_1.ModelManager.WeeklyRogueModel?.DescMode
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(4),
              t.BuffDescSimple,
            )
          : LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(4),
              t.BuffDesc,
              ...t.BuffDescParam,
            ),
        this.SetTextureByPath(t.BuffIcon, this.GetTexture(1)),
        (i =
          ConfigManager_1.ConfigManager.WeeklyRogueConfig?.GetRogueWeeklyQualityConfig(
            t.Quality,
          )) && this.SetTextureByPath(i.TokenBg, this.GetTexture(0)),
        this.GetSprite(7).SetColor(UE.Color.FromHex(i.TokenColor)),
        this.GetItem(8).SetUIActive(6 === t.Quality),
        this.GetItem(9).SetUIActive(5 === t.Quality))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "WeeklyRogue",
          34,
          "刷新周常肉鸽信物格子失败，找不到对应的配置",
          ["ConfigId", e],
        );
  }
}
exports.WeeklyRogueTokenItem = WeeklyRogueTokenItem;
//# sourceMappingURL=WeeklyRogueTokenItem.js.map
