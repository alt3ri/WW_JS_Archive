"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConcertoResponseItem = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BattleUiRoleData_1 = require("../BattleUiRoleData"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView");
class ConcertoResponseItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Wst = void 0),
      (this.E0 = void 0),
      (this.Kst = void 0),
      (this.Qst = void 0),
      (this.Xst = void 0),
      (this.hJ = 0),
      (this.o$e = (e) => {
        e === this.E0 && this.vTa();
      }),
      (this.Yst = (e, t, i) => {
        e === this.E0 && this.RefreshVisible();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
    ];
  }
  Initialize(e) {
    super.Initialize(e), this.Ore();
  }
  OnBeforeDestroy() {
    this.Refresh(void 0);
  }
  Reset() {
    this.kre(), super.Reset();
  }
  Refresh(e) {
    e && 2 !== e.RoleConfig?.RoleType
      ? ((this.Wst = e),
        (this.E0 = e?.EntityHandle?.Id),
        (this.Kst = this.Wst.GameplayTagComponent),
        (this.Qst = this.Wst.ElementConfig),
        0 !== this.hJ &&
          (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ),
          (this.hJ = 0)),
        this.Jst(this.Wst.ElementType),
        this.vTa(),
        this.RefreshVisible())
      : ((this.Wst = void 0),
        (this.E0 = void 0),
        (this.Kst = void 0),
        (this.Xst = void 0),
        (this.Qst = void 0),
        this.SetActive(!1));
  }
  GetEntityId() {
    return this.E0;
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiElementEnergyChanged,
      this.o$e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiElementHideTagChanged,
        this.Yst,
      );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiElementEnergyChanged,
      this.o$e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiElementHideTagChanged,
        this.Yst,
      );
  }
  RefreshVisible() {
    if (this.Wst)
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10036)) {
        for (const e of BattleUiRoleData_1.BattleUiRoleData.HideElementTagList)
          if (this.Kst.HasTag(e)) return void this.SetActive(!1);
        this.SetActive(!0);
      } else this.SetActive(!1);
  }
  Jst(e) {
    var t, i, s;
    this.Xst !== e &&
      ((t = this.Qst.Icon5),
      (i = this.GetTexture(1)),
      (s = this.GetSprite(0)),
      this.SetElementIcon(t, i, this.Xst),
      i.SetColor(this.Wst.ElementColor),
      s.SetColor(this.Wst.ElementColor),
      (this.Xst = e));
  }
  vTa() {
    this.GetSprite(0).SetFillAmount(this.GetElementPercent());
  }
  GetElementPercent() {
    return this.Wst ? this.Wst.GetElementAttributePercent() : 0;
  }
}
exports.ConcertoResponseItem = ConcertoResponseItem;
//# sourceMappingURL=ConcertoResponseItem.js.map
