var Constructor = function()
{
    this.getMaxUnitCount = function()
    {
        return 5;
    };

    this.loadStandingAnimation = function(sprite, unit)
    {
        var player = unit.getOwner();
        // get army name
        var armyName = player.getArmy().toLowerCase();
        if (armyName === "bg")
        {
            armyName = "bh"
        }
        if ((armyName !== "yc") &&
            (armyName !== "ge") &&
            (armyName !== "bm") &&
            (armyName !== "bh"))
        {
            armyName = "os";
        }
        sprite.loadSprite("recon+" + armyName,  false,
                          BATTLEANIMATION_RECON.getMaxUnitCount(), Qt.point(-5, 5));
        sprite.loadSprite("recon+" + armyName + "+mask",  true,
                          BATTLEANIMATION_RECON.getMaxUnitCount(), Qt.point(-5, 5));
    };
};

Constructor.prototype = BATTLEANIMATION;
var BATTLEANIMATION_RECON = new Constructor();
