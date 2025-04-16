"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueDungeonDataItem = void 0);
const UE = require("ue"),
  RogueResDungeonConfigById_1 = require("../../../../Core/Define/ConfigQuery/RogueResDungeonConfigById"),
  RogueResThemeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeById"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem"),
  SORT_MAX = 1,
  SORT_EMPTY = 0;
class RogueDungeonDataItem extends AutoAttachItem_1.AutoAttachItem {
  constructor(e) {
    super(),
      (this.Pe = void 0),
      (this.fLt = void 0),
      (this.OnToggleClick = void 0),
      (this.OnSelectCall = void 0),
      (this.CheckToggleCanClick = void 0),
      (this.Xpt = () => {
        this.GetExtendToggle(0)?.SetToggleStateForce(1, !1),
          this.OnToggleClick?.(this);
      }),
      (this.UHl = () =>
        !this.CheckToggleCanClick || this.CheckToggleCanClick(this.Pe)),
      (this.fLt = e.GetComponentByClass(UE.LGUICanvas.StaticClass()));
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Xpt]]);
  }
  OnStart() {
    this.GetExtendToggle(0)?.CanExecuteChange.Bind(this.UHl);
  }
  OnSelect() {
    this.OnSelectCall && this.Pe && this.OnSelectCall(this.Pe),
      this.GetExtendToggle(0)?.SetToggleStateForce(1, !1),
      this.fLt.SetSortOrder(SORT_MAX, !0);
  }
  OnUnSelect() {
    this.GetExtendToggle(0)?.SetToggleStateForce(0, !1),
      this.fLt.SetSortOrder(SORT_EMPTY, !0);
  }
  OnRefreshItem(e) {
    (this.Pe = e), this.T5c(), this._Oe();
  }
  OnMoveItem() {
    this.GetExtendToggle(0)?.SetToggleStateForce(0, !1);
  }
  T5c() {
    var e;
    void 0 === this.Pe
      ? ((e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "T_SelectLevelPixEmpty",
        )),
        this.SetTextureByPath(e, this.GetTexture(1)))
      : (e =
          RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(
            this.Pe,
          )) &&
        ((e =
          0 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender()
            ? e.IconF
            : e.IconM),
        this.SetTextureByPath(e, this.GetTexture(1)));
  }
  _Oe() {
    var e, t;
    void 0 === this.Pe
      ? (this.GetExtendToggle(0).SetSelfInteractive(!1),
        this.GetItem(3)?.SetUIActive(!1),
        this.GetItem(2)?.SetUIActive(!1))
      : (this.GetExtendToggle(0).SetSelfInteractive(!0),
        (e =
          RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(
            this.Pe,
          )) &&
          ((e =
            0 ===
            RogueResThemeById_1.configRogueResThemeById
              .GetConfig(e.SeasonId)
              .Insts.indexOf(this.Pe)),
          (t =
            ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetInstDungeonState(
              this.Pe,
            )),
          this.GetItem(3)?.SetUIActive(!e && 0 === t),
          this.GetItem(2)?.SetUIActive(2 === t)));
  }
  GetData() {
    return this.Pe;
  }
  UnSelectWhenEnter() {
    this.GetExtendToggle(0)?.SetToggleStateForce(0, !1),
      this.fLt.SetSortOrder(SORT_EMPTY, !0);
  }
}
exports.RogueDungeonDataItem = RogueDungeonDataItem;
//# sourceMappingURL=RogueDungeonDataItem.js.map
