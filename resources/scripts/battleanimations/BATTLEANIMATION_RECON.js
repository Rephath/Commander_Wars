var Constructor = function()
{
    this.getMaxUnitCount = function()
    {
        return 5;
    };
    this.armyData = [["os", "os"],
                     ["bm", "bm"],
                     ["ge", "ge"],
                     ["yc", "yc"],
                     ["bh", "bh"],
                     ["bg", "bh"],
                     ["ma", "ma"],];

    this.getArmyName = function(unit)
    {
        var player = unit.getOwner();
        // get army name
        return Global.getArmyNameFromPlayerTable(player, BATTLEANIMATION_RECON.armyData);
    };

    this.loadMoveInAnimation = function(sprite, unit, defender, weapon)
    {
        var count = sprite.getUnitCount(BATTLEANIMATION_RECON.getMaxUnitCount());
        var armyName = BATTLEANIMATION_RECON.getArmyName(unit);
        sprite.loadMovingSprite("recon+" + armyName + "+move", false, sprite.getMaxUnitCount(), Qt.point(-70, 5),
                                Qt.point(65, 0), 600, false, 1, 1);
        sprite.loadMovingSpriteV2("recon+" + armyName + "+move+mask", GameEnums.Recoloring_Table, sprite.getMaxUnitCount(), Qt.point(-70, 5),
                                  Qt.point(65, 0), 600, false, 1, 1);
        sprite.loadMovingSprite("vehicle_dust", false, sprite.getMaxUnitCount(), Qt.point(-90, 7),
                                Qt.point(65, 0), 600, false, 1, 1);
        for (var i = 0; i < count; i++)
        {
            sprite.loadSound("recon_move.wav", 5, "resources/sounds/", i * BATTLEANIMATION.defaultFrameDelay);
        }
    };

    this.loadStopAnimation = function(sprite, unit, defender, weapon)
    {
        BATTLEANIMATION_RECON.loadSprite(sprite, unit, defender, weapon, "+stop", 1);
        sprite.loadSprite("vehicle_dust_stop",  false,
                          BATTLEANIMATION_RECON.getMaxUnitCount(), Qt.point(-40, 7), 1);
    };

    this.loadStandingAnimation = function(sprite, unit, defender, weapon)
    {
        BATTLEANIMATION_RECON.loadSprite(sprite, unit, defender, weapon, "", 1);
    };

    this.loadSprite = function(sprite, unit, defender, weapon, ending, count)
    {
        var armyName = BATTLEANIMATION_RECON.getArmyName(unit);
        var offset = Qt.point(-5, 5);
        if (armyName === "ma")
        {
            offset = Qt.point(-15, 5);
        }
        sprite.loadSprite("recon+" + armyName + ending,  false,
                          BATTLEANIMATION_RECON.getMaxUnitCount(), offset, count);
        sprite.loadSpriteV2("recon+" + armyName + ending + "+mask", GameEnums.Recoloring_Table,
                            BATTLEANIMATION_RECON.getMaxUnitCount(), offset, count);
    };


    this.loadFireAnimation = function(sprite, unit, defender, weapon)
    {
        var count = sprite.getUnitCount(BATTLEANIMATION_RECON.getMaxUnitCount());
        var armyName = BATTLEANIMATION_RECON.getArmyName(unit);
        var offset = Qt.point(35, 44);
        if (BATTLEANIMATION.getRelativePosition(unit, defender) > 0)
        {
            BATTLEANIMATION_RECON.loadSprite(sprite, unit, defender, weapon, "+fire_air", 2);
            offset = Qt.point(35, 50);
            if (armyName === "yc")
            {
                offset = Qt.point(29, 47);
            }
            else if (armyName === "ge")
            {
                offset = Qt.point(39, 37);
            }
            else if (armyName === "bm")
            {
                offset = Qt.point(37, 47);
            }
            else if (armyName === "bh")
            {
                offset = Qt.point(39, 37);
            }
            else if (armyName === "ma")
            {
                offset = Qt.point(38, 25);
            }
            sprite.loadSprite("mg_shot_air",  false, sprite.getMaxUnitCount(), offset,
                              1, 1, 0, 0);
        }
        else
        {
            BATTLEANIMATION_RECON.loadSprite(sprite, unit, defender, weapon, "+fire", 2);
            if (armyName === "yc")
            {
                offset = Qt.point(30, 40);
            }
            else if (armyName === "ge")
            {
                offset = Qt.point(39, 30);
            }
            else if (armyName === "bm")
            {
                offset = Qt.point(37, 40);
            }
            else if (armyName === "bh")
            {
                offset = Qt.point(39, 30);
            }
            else if (armyName === "ma")
            {
                offset = Qt.point(38, 20);
            }
            sprite.loadSprite("mg_shot",  false, sprite.getMaxUnitCount(), offset,
                              1, 1, 0, 0);
        }
        for (var i = 0; i < count; i++)
        {
            sprite.loadSound("mg_weapon_fire.wav", 1, "resources/sounds/", i * BATTLEANIMATION.defaultFrameDelay);
            sprite.loadSound("mg_weapon_fire.wav", 1, "resources/sounds/", 200 + i * BATTLEANIMATION.defaultFrameDelay);
            sprite.loadSound("mg_weapon_fire.wav", 1, "resources/sounds/", 400 + i * BATTLEANIMATION.defaultFrameDelay);
        }
    };

    this.hasMoveInAnimation = function()
    {
        // return true if the unit has an implementation for loadMoveInAnimation
        return true;
    };

    this.loadImpactUnitOverlayAnimation = function(sprite, unit, defender, weapon)
    {
        sprite.loadColorOverlayForLastLoadedFrame("#969696", 300, 3, 0);
    };

    this.loadImpactAnimation = function(sprite, unit, defender, weapon)
    {
        var count = sprite.getUnitCount(BATTLEANIMATION_RECON.getMaxUnitCount());
        sprite.loadSprite("mg_hit",  false, sprite.getMaxUnitCount(), Qt.point(0, 22),
                          1, 1.0, 0, 0);
        for (var i = 0; i < count; i++)
        {
            sprite.loadSound("mg_impact.wav", 1, "resources/sounds/", i * BATTLEANIMATION.defaultFrameDelay);
        }
    };
    this.getMoveInDurationMS = function(sprite, unit, defender, weapon)
    {
        // the time will be scaled with animation speed inside the engine
        return 610;
    };

    this.getStopDurationMS = function(sprite, unit, defender, weapon)
    {
        // the time will be scaled with animation speed inside the engine
        return 300 + BATTLEANIMATION.defaultFrameDelay * BATTLEANIMATION_RECON.getMaxUnitCount();
    };

    this.getFireDurationMS = function(sprite, unit, defender, weapon)
    {
        // the time will be scaled with animation speed inside the engine
        return 820 + BATTLEANIMATION.defaultFrameDelay * BATTLEANIMATION_RECON.getMaxUnitCount();
    };
};

Constructor.prototype = BATTLEANIMATION;
var BATTLEANIMATION_RECON = new Constructor();
