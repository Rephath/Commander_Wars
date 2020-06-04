var Constructor = function()
{
    this.gainPowerstar = function(co, fundsDamage, x, y, hpDamage, defender)
    {
		if (CO_PERK.isActive(co))
		{
            var powerGain = CO.getStarGain(co, fundsDamage, x, y, hpDamage, defender);
            co.setPowerFilled(co.getPowerFilled() + powerGain * 0.2);
		}
        return 0;
    };
	// Perk - Intel
    this.getDescription = function()
    {
        return "Power meter fills up more quickly.";
    };
    this.getIcon = function()
    {
        return "starpower";
    };
    this.getName = function()
    {
        return "Star Power";
    };
};

Constructor.prototype = CO_PERK;
var CO_PERK_STAR_POWER = new Constructor();
