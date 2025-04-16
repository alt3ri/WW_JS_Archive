"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoDungeonCommandFactory = void 0);
const OpenRacingBetsDungeonResultViewCommand_1 = require("./OpenRacingBetsDungeonResultViewCommand"),
  OpenRacingBetsGamePlayPreviewViewCommand_1 = require("./OpenRacingBetsGamePlayPreviewViewCommand"),
  OpenRacingBetsGamePlayViewCommand_1 = require("./OpenRacingBetsGamePlayViewCommand"),
  RacingBetsChangeDangoCameraBlendCommand_1 = require("./RacingBetsChangeDangoCameraBlendCommand"),
  RacingBetsDangoChangeHighCommand_1 = require("./RacingBetsDangoChangeHighCommand"),
  RacingBetsDangoDestinationCommand_1 = require("./RacingBetsDangoDestinationCommand"),
  RacingBetsDangoMoveCommand_1 = require("./RacingBetsDangoMoveCommand"),
  RacingBetsDangoRankChangeCommand_1 = require("./RacingBetsDangoRankChangeCommand"),
  RacingBetsDangoRoundStartCommand_1 = require("./RacingBetsDangoRoundStartCommand"),
  RacingBetsDiceCommand_1 = require("./RacingBetsDiceCommand"),
  RacingBetsDungeonBeginCommand_1 = require("./RacingBetsDungeonBeginCommand"),
  RacingBetsInitDungeonCommand_1 = require("./RacingBetsInitDungeonCommand"),
  RacingBetsNextRoundRequestCommand_1 = require("./RacingBetsNextRoundRequestCommand"),
  RacingBetsRoundStartCommand_1 = require("./RacingBetsRoundStartCommand"),
  RacingBetsSkillCommand_1 = require("./RacingBetsSkillCommand");
class DangoDungeonCommandFactory {
  static CreateRacingBetsInitDungeonCommand(e, n) {
    var a = new RacingBetsInitDungeonCommand_1.RacingBetsInitDungeonCommand();
    return a.Init(e, n), a;
  }
  static CreateOpenRacingBetsGameplayView() {
    return new OpenRacingBetsGamePlayViewCommand_1.OpenRacingBetsGamePlayViewCommand();
  }
  static CreateOpenRacingBetsGamePlayPreviewView() {
    return new OpenRacingBetsGamePlayPreviewViewCommand_1.OpenRacingBetsGamePlayPreviewViewCommand();
  }
  static CreateRacingBetsDungeonBeginCommand() {
    return new RacingBetsDungeonBeginCommand_1.RacingBetsDungeonBeginCommand();
  }
  static CreateRacingBetsRoundStartCommand() {
    return new RacingBetsRoundStartCommand_1.RacingBetsRoundStartCommand();
  }
  static CreateRacingBetsDangoRoundStartCommand(e) {
    var n =
      new RacingBetsDangoRoundStartCommand_1.RacingBetsDangoRoundStartCommand();
    return n.Init(e), n;
  }
  static CreateRacingBetsDiceCommand(e, n) {
    var a = new RacingBetsDiceCommand_1.RacingBetsDiceCommand();
    return a.Init(e, n), a;
  }
  static CreateRacingBetsSkillCommand(e) {
    var n = new RacingBetsSkillCommand_1.RacingBetsSkillCommand();
    return n.Init(e), n;
  }
  static CreateRacingBetsDangoMoveCommand(e) {
    var n = new RacingBetsDangoMoveCommand_1.RacingBetsDangoMoveCommand();
    return n.Init(e), n;
  }
  static CreateRacingBetsDangoChangeHighCommand(e) {
    var n =
      new RacingBetsDangoChangeHighCommand_1.RacingBetsDangoChangeHighCommand();
    return n.Init(e), n;
  }
  static CreateRacingBetsChangeDangoCameraBlendCommand(e) {
    var n =
      new RacingBetsChangeDangoCameraBlendCommand_1.RacingBetsChangeDangoCameraBlendCommand();
    return n.SetDangoId(e), n;
  }
  static CreateRacingBetsNextRoundRequestCommand(e, n, a) {
    var t =
      new RacingBetsNextRoundRequestCommand_1.RacingBetsNextRoundRequestCommand();
    return t.Init(e, n, a), t;
  }
  static CreateOpenRacingBetsDungeonResultView(e) {
    var n =
      new OpenRacingBetsDungeonResultViewCommand_1.OpenRacingBetsDungeonResultViewCommand();
    return n.Init(e), n;
  }
  static CreateRacingBetsDangoDestinationCommand(e) {
    var n =
      new RacingBetsDangoDestinationCommand_1.RacingBetsDangoDestinationCommand();
    return n.Init(e), n;
  }
  static CreateRacingBetsDangoRankChangeCommand(e) {
    var n =
      new RacingBetsDangoRankChangeCommand_1.RacingBetsDangoRankChangeCommand();
    return n.Init(e), n;
  }
}
exports.DangoDungeonCommandFactory = DangoDungeonCommandFactory;
//# sourceMappingURL=DangoDungeonCommandFactory.js.map
