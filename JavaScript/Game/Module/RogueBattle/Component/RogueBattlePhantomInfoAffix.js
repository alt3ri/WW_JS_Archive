"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattlePhantomInfoAffix = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RogueBattleTokenElementWithCount_1 = require("./RogueBattleTokenElementWithCount"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  RogueBattleUtils_1 = require("../RogueBattleUtils"),
  UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine");
class RogueBattlePhantomInfoAffix extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.ElementLayout = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.UnlockState = !1),
      (this.jli = () =>
        new RogueBattleTokenElementWithCount_1.RogueBattleTokenElementWithCount()),
      (this.RefreshSelectGainData = () => {
        let i = !0;
        var e = ModelManager_1.ModelManager.RogueBattleModel.SelectGainData;
        if (e) {
          const n = new Map(),
            r =
              (this.Data?.iVc.forEach((e) => {
                n.set(e.aVc, e.m9n);
              }),
              new Map());
          e.wac.iVc.forEach((e) => {
            var t =
              ModelManager_1.ModelManager.RogueBattleModel.GetElementInfoById(
                e.aVc,
              )?.Count ?? 0;
            r.set(e.aVc, e.m9n + t);
          }),
            n.forEach((e, t) => {
              (void 0 === r.get(t) || r.get(t) < e) && (i = !1);
            });
          var e = i && !this.Data?.oVc,
            t = (this.GetItem(2).SetUIActive(e), this.GetText(3));
          t?.SetChangeColor(e, t.changeColor),
            e
              ? (this.LevelSequencePlayer?.PlayLevelSequenceByName("Complete"),
                (this.UnlockState = !0))
              : this.UnlockState &&
                (this.LevelSequencePlayer?.PlayLevelSequenceByName("Disappear"),
                (this.UnlockState = !1));
        } else
          this.UnlockState &&
            (this.LevelSequencePlayer?.PlayLevelSequenceByName("Disappear"),
            (this.UnlockState = !1));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    return (
      (this.ElementLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(0),
        this.jli,
      )),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetRootItem(),
      )),
      Promise.resolve()
    );
  }
  OnBeforeShow() {
    super.OnBeforeShow(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RogueBattleSelectOptionPreview,
        this.RefreshSelectGainData,
      );
  }
  OnBeforeHide() {
    super.OnBeforeHide(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RogueBattleSelectOptionPreview,
        this.RefreshSelectGainData,
      );
  }
  Refresh(e, t, i) {
    this.Data = e;
    var n = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResAffix(
      e.v9n,
    );
    if (void 0 !== n) {
      0 === ModelManager_1.ModelManager.RogueBattleModel.DescMode
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(3),
            n.AffixDescSimple,
          )
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(3),
            n.AffixDesc,
            ...n.AffixDescParam,
          );
      const r =
        RogueBattleUtils_1.RogueBattleUtils.ConvertElementUnitsToElementInfo(
          e.iVc,
        );
      n = new UiAsyncTask_1.UiAsyncTask(
        "RogueBattlePhantomInfoAffix.Refresh",
        async () => {
          await this.ElementLayout?.RefreshByDataAsync(r);
        },
      );
      this.RunAsyncTask(n);
    }
  }
}
exports.RogueBattlePhantomInfoAffix = RogueBattlePhantomInfoAffix;
//# sourceMappingURL=RogueBattlePhantomInfoAffix.js.map
