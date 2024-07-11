"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapExploreToolModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
class MapExploreToolModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.BAi = new Map()),
      (this.bAi = new Map()),
      (this.qAi = new Map()),
      (this.GAi = new Map()),
      (this.NAi = !1),
      (this.OAi = new Map()),
      (this.kAi = (e) => {
        switch (e.MarkType) {
          case 15:
            var o =
              ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(
                e.MarkType,
              ) ?? 0;
            this.SetToolPlaceNum(1010, o, !0);
            break;
          case 17:
            o =
              ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(
                e.MarkType,
              ) ?? 0;
            this.SetToolPlaceNum(1012, o, !0);
        }
      }),
      (this.FAi = (e, o) => {
        switch (e) {
          case 15:
            var t =
              ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(e) ?? 0;
            this.SetToolPlaceNum(1010, t, !1);
            break;
          case 17:
            t =
              ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(e) ?? 0;
            this.SetToolPlaceNum(1012, t, !1);
        }
      });
  }
  OnInit() {
    return (
      this.BAi.set(210015, 1010),
      this.BAi.set(210016, 1011),
      this.BAi.set(210017, 1012),
      this.bAi.set(
        1010,
        new Map([
          [
            Protocol_1.Aki.Protocol.O4n.Proto_ErrPlayerNotInBigWorld,
            "ExplorePositionError",
          ],
          [Protocol_1.Aki.Protocol.O4n.Proto_ErrInFighting, "ExploreFighting"],
          [Protocol_1.Aki.Protocol.O4n.Proto_ErrNotHostPlayer, "OnylHostUse"],
          [
            Protocol_1.Aki.Protocol.O4n.Proto_ErrConsumeNotEnough,
            "ExploreTeleporterItemLack",
          ],
        ]),
      ),
      this.bAi.set(
        1011,
        new Map([
          [
            Protocol_1.Aki.Protocol.O4n.Proto_ErrPlayerNotInBigWorld,
            "ExplorePositionError",
          ],
          [Protocol_1.Aki.Protocol.O4n.Proto_ErrInFighting, "ExploreFighting"],
          [Protocol_1.Aki.Protocol.O4n.Proto_ErrNotHostPlayer, "OnylHostUse"],
          [
            Protocol_1.Aki.Protocol.O4n.Proto_ErrNotHaveCountryAccess,
            "ExploreUnauthorized",
          ],
          [
            Protocol_1.Aki.Protocol.O4n.Proto_ErrSkillIsEffect,
            "ExploreActivating",
          ],
          [
            Protocol_1.Aki.Protocol.O4n.Proto_ErrNoSoundBox,
            "Exolore_ShengXiaNoDetect",
          ],
          [
            Protocol_1.Aki.Protocol.O4n.Proto_SoundBoxExploreFull,
            "ExploreShengXiaCollectAll",
          ],
          [
            Protocol_1.Aki.Protocol.O4n.Proto_ErrConsumeNotEnough,
            "ExploreShengXiaItemLack",
          ],
        ]),
      ),
      this.bAi.set(
        1012,
        new Map([
          [
            Protocol_1.Aki.Protocol.O4n.Proto_ErrPlayerNotInBigWorld,
            "ExplorePositionError",
          ],
          [Protocol_1.Aki.Protocol.O4n.Proto_ErrInFighting, "ExploreFighting"],
          [Protocol_1.Aki.Protocol.O4n.Proto_ErrNotHostPlayer, "OnylHostUse"],
          [
            Protocol_1.Aki.Protocol.O4n.Proto_ErrNotHaveCountryAccess,
            "ExploreUnauthorized",
          ],
        ]),
      ),
      this.qAi.set(
        1011,
        new Set([
          Protocol_1.Aki.Protocol.O4n.NRs,
          Protocol_1.Aki.Protocol.O4n.Proto_ErrSkillIsEffect,
        ]),
      ),
      this.qAi.set(
        1012,
        new Set([
          Protocol_1.Aki.Protocol.O4n.NRs,
          Protocol_1.Aki.Protocol.O4n.Proto_ErrTreasureBoxAllActive,
        ]),
      ),
      this.qAi.set(1010, new Set([Protocol_1.Aki.Protocol.O4n.NRs])),
      this.GAi.set(
        1011,
        new Set([Protocol_1.Aki.Protocol.O4n.Proto_ExploreToolNotConfirm]),
      ),
      this.GAi.set(
        1012,
        new Set([
          Protocol_1.Aki.Protocol.O4n.Proto_ExploreToolNotConfirm,
          Protocol_1.Aki.Protocol.O4n.Proto_ErrTreasureBoxAllActive,
        ]),
      ),
      this.GAi.set(
        1010,
        new Set([Protocol_1.Aki.Protocol.O4n.Proto_ExploreToolNotConfirm]),
      ),
      (this.NAi = !1),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CreateMapMark,
        this.kAi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveMapMark,
        this.FAi,
      ),
      !0
    );
  }
  OnClear() {
    return (
      this.BAi.clear(),
      this.bAi.clear(),
      this.qAi.clear(),
      this.OAi.clear(),
      (this.NAi = !1),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CreateMapMark,
        this.kAi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveMapMark,
        this.FAi,
      ),
      !0
    );
  }
  OnLeaveLevel() {
    return !(this.NAi = !1);
  }
  OnChangeMode() {
    return !0;
  }
  GetPhantomSkillIdBySkillId(e) {
    return this.BAi.get(e);
  }
  GetRespTipsId(e, o) {
    return this.bAi.get(e.PhantomSkillId)?.get(o.hvs);
  }
  GetRespConfirmBoxId(e, o) {
    if (this.IsRespMeanCheckPass(e, o))
      switch (e.PhantomSkillId) {
        case 1010:
          return this.IsToolReachPlaceLimit(e.PhantomSkillId) ? 142 : 141;
        case 1011:
          return 139;
        case 1012:
          return this.IsToolReachPlaceLimit(e.PhantomSkillId) ? 140 : void 0;
      }
  }
  IsRespMeanSuccess(e, o) {
    return this.qAi.get(e.PhantomSkillId)?.has(o.hvs) ?? !1;
  }
  IsRespMeanCheckPass(e, o) {
    return this.GAi.get(e.PhantomSkillId)?.has(o.hvs) ?? !1;
  }
  SetCharExploreSkillBusy(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Phantom",
        40,
        "[MapExploreTool] 设置CharExploreSkillBusy",
        ["OldVal", this.NAi],
        ["NewVal", e],
      ),
      (this.NAi = e);
  }
  GetCharExploreSkillBusy() {
    return this.NAi ?? !1;
  }
  GetToolPlaceLimit(e) {
    switch (e) {
      case 1010:
        return ConfigManager_1.ConfigManager.RouletteConfig?.GetTempTeleporterPlaceLimit();
      case 1012:
        return ConfigManager_1.ConfigManager.RouletteConfig?.GetTreasureBoxDetectorPlaceLimit();
    }
  }
  IsToolHasPlaceLimit(e) {
    return void 0 !== this.GetToolPlaceLimit(e);
  }
  IsToolReachPlaceLimit(e) {
    var o = this.GetToolPlaceLimit(e);
    return void 0 !== o && !!((e = this.GetToolPlaceNum(e)) && o <= e);
  }
  GetToolPlaceNum(e) {
    return this.OAi.get(e);
  }
  SetToolPlaceNum(e, o, t) {
    o !== this.OAi.get(e) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Phantom",
          40,
          "[MapExploreTool] 设置ToolPlaceNum",
          ["PhantomSkillId", e],
          ["PlaceNum", o],
        ),
      this.OAi.set(e, o),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnMapExploreToolPlaceNumUpdated,
        e,
        o,
      ));
  }
}
exports.MapExploreToolModel = MapExploreToolModel;
//# sourceMappingURL=MapExploreToolModel.js.map
