"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ElementPanel = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const ElementItem_1 = require("./ElementItem");
class TipPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  UpdateNum(e) {
    this.GetText(1).SetText(e.toString()),
      e === 0
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(2),
            "Roguelike_Yuansu_Empty",
          )
        : ((e =
            ConfigManager_1.ConfigManager.RoguelikeConfig?.GetElementLevelConfigById(
              e,
            )),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(2),
            e.TextId,
            e.TextIdArgs,
          ));
  }
}
class ElementPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.rao = void 0),
      (this.Mhi = void 0),
      (this.jhi = () => {
        return new ElementItem_1.ElementItem();
      }),
      (this.nao = (e) => {
        switch (e) {
          case 1:
            this.GetExtendToggle(0).SetToggleState(1),
              this.GetItem(4).SetUIActive(!0);
            break;
          case 0:
            this.GetExtendToggle(0).SetToggleState(0),
              this.GetItem(4).SetUIActive(!1);
        }
      }),
      (this.sao = (e) => {
        switch (e) {
          case 1:
            this.GetExtendToggle(5).SetToggleState(1),
              this.GetItem(4).SetUIActive(!0);
            break;
          case 0:
            this.GetExtendToggle(5).SetToggleState(0),
              this.GetItem(4).SetUIActive(!1);
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [
        [5, this.nao],
        [0, this.sao],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.rao = new TipPanel()),
      await this.rao.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
  }
  OnStart() {
    (this.Mhi = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(2),
      this.jhi,
    )),
      this.GetExtendToggle(5).SetToggleState(0, !0),
      this.GetItem(4).SetUIActive(!1);
  }
  Refresh(e = void 0) {
    const i = new Array();
    const [, t] =
      ModelManager_1.ModelManager.RoguelikeModel.GetSortElementInfoArrayMap(
        e?.ElementDict,
      );
    for (const n of RoguelikeDefine_1.sortElementArray) {
      let e = t.get(n);
      (e = e || new RoguelikeDefine_1.ElementInfo(n, 0)), i.push(e);
    }
    this.Mhi.RefreshByData(i);
    let s = 0;
    i.forEach((e) => {
      e.ElementId !== 7 && (s += e.Count);
    }),
      void 0 === e || e.ElementDict.size <= 0
        ? this.GetText(1).SetText(s.toString())
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(1),
            RoguelikeDefine_1.ROGUELIKEVIEW_17_TEXT,
            s.toString(),
          ),
      this.rao.UpdateNum(s);
  }
}
exports.ElementPanel = ElementPanel;
// # sourceMappingURL=ElementPanel.js.map
