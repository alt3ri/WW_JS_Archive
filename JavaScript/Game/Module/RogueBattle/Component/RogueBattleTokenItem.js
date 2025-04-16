"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleTokenItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueBattleUtils_1 = require("../RogueBattleUtils"),
  RogueBattleTokenElement_1 = require("./RogueBattleTokenElement");
class RogueBattleTokenItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.GainData = void 0),
      (this.OnClickHandle = void 0),
      (this.Mli = void 0),
      (this.cFe = () => {
        1 === this.GetExtendToggle(5).GetToggleState()
          ? (this.OnSelected(!0), this.OnClickHandle?.(this.GridIndex))
          : (this.OnDeselected(!0), this.OnClickHandle?.());
      }),
      (this.RefreshDescText = () => {
        var e, t;
        this.GainData &&
          ((e = this.GainData.wac),
          (t =
            ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBuffPoolById(
              e.v9n,
            ))
            ? 0 === ModelManager_1.ModelManager.RogueBattleModel.DescMode
              ? LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(4),
                  t.BuffDescSimple,
                )
              : LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(4),
                  t.BuffDesc,
                  ...t.BuffDescParam,
                )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "RogueBattle",
                34,
                "RogueBattleTokenItem.RefreshDescText tokenConfig is null",
                ["ConfigId", e?.v9n],
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
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [7, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[5, this.cFe]]);
  }
  OnStart() {
    this.Mli = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(3),
      () => new RogueBattleTokenElement_1.RogueBattleTokenElement(),
    );
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RogueBattleDescModeChange,
      this.RefreshDescText,
    );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RogueBattleDescModeChange,
      this.RefreshDescText,
    );
  }
  Refresh(t, e, i) {
    var o, s, n;
    t.wac
      ? ((o = (this.GainData = t).wac),
        this.GetItem(6).SetUIActive(o.dws),
        (s =
          ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBuffPoolById(
            o.v9n,
          ))
          ? (this.GetText(2).ShowTextNew(s.BuffName),
            this.SetTextureByPath(s.BuffIcon, this.GetTexture(1)),
            (n =
              ConfigManager_1.ConfigManager.WeeklyRogueConfig?.GetRogueWeeklyQualityConfig(
                s.Quality,
              )) && this.SetTextureByPath(n.TokenBg, this.GetTexture(0)),
            this.GetSprite(7).SetColor(UE.Color.FromHex(n.TokenColor)),
            this.GetItem(8).SetUIActive(6 === s.Quality),
            this.GetItem(9).SetUIActive(5 === s.Quality),
            this.RefreshDescText(),
            (n = new UiAsyncTask_1.UiAsyncTask(
              "RogueBattleTokenItem.Refresh",
              async () => {
                var e =
                  RogueBattleUtils_1.RogueBattleUtils.GetTokenSortElementInfoByCount(
                    t,
                  );
                await this.Mli.RefreshByDataAsync(e);
              },
            )),
            this.RunAsyncTask(n))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RogueBattle",
              34,
              "RogueBattleTokenItem.Refresh tokenConfig is null",
              ["ConfigId", o.v9n],
            ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RogueBattle",
          34,
          "RogueBattleTokenItem.Refresh data.Proto_RogueResToken is null",
        );
  }
  OnSelected(e) {
    (ModelManager_1.ModelManager.RogueBattleModel.SelectGainData =
      this.GainData),
      this.GetExtendToggle(5).SetToggleState(1);
  }
  OnDeselected(e) {
    (ModelManager_1.ModelManager.RogueBattleModel.SelectGainData = void 0),
      this.GetExtendToggle(5).SetToggleState(0);
  }
}
exports.RogueBattleTokenItem = RogueBattleTokenItem;
//# sourceMappingURL=RogueBattleTokenItem.js.map
