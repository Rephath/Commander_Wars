var Constructor = function()
{
    this.canBePerformed = function(action, map)
    {
        var unit = action.getTargetUnit();
        var actionTargetField = action.getActionTarget();
        var targetField = action.getTarget();
        if ((unit.getHasMoved() === true) ||
            (unit.getBaseMovementCosts(actionTargetField.x, actionTargetField.y) <= 0))
        {
            return false;
        }
        if ((actionTargetField.x === targetField.x) && (actionTargetField.y === targetField.y) ||
            (action.getMovementTarget() === null))
        {
            var x = actionTargetField.x + 1;
            var y = actionTargetField.y;
            if (ACTION_SUPPORTALL_RATION.checkUnit(unit, x, y, map))
            {
                return true;
            }
            x = actionTargetField.x - 1;
            if (ACTION_SUPPORTALL_RATION.checkUnit(unit, x, y, map))
            {
                return true;
            }
            x = actionTargetField.x;
            y = actionTargetField.y + 1;
            if (ACTION_SUPPORTALL_RATION.checkUnit(unit, x, y, map))
            {
                return true;
            }
            y = actionTargetField.y - 1;
            if (ACTION_SUPPORTALL_RATION.checkUnit(unit, x, y, map))
            {
                return true;
            }
        }
        return false;
    };
    this.checkUnit = function(unit, x, y, map)
    {
        if (map.onMap(x, y))
        {
            var target = map.getTerrain(x, y).getUnit();
            if (target !== null)
            {
                if (target.getOwner() === unit.getOwner() &&
                    target !== unit)
                {
                    return true;
                }
            }
        }
        return false;
    };
    this.getActionText = function(map)
    {
        return qsTr("Ration");
    };
    this.getIcon = function(map)
    {
        return "ration";
    };
    this.isFinalStep = function(action, map)
    {
        return true;
    };
	this.postAnimationUnit = null;
    this.perform = function(action, map)
    {
        // we need to move the unit to the target position
        ACTION_SUPPORTALL_RATION.postAnimationUnit = action.getTargetUnit();
        var animation = Global[ACTION_SUPPORTALL_RATION.postAnimationUnit.getUnitID()].doWalkingAnimation(action, map);
        animation.setEndOfAnimationCall("ACTION_SUPPORTALL_RATION", "performPostAnimation");
        // move unit to target position
        ACTION_SUPPORTALL_RATION.postAnimationUnit.moveUnitAction(action);
        ACTION_SUPPORTALL_RATION.postAnimationUnit.setHasMoved(true);
    };
    this.performPostAnimation = function(postAnimation, map)
    {
        ACTION_SUPPORTALL_RATION.giveRation(ACTION_SUPPORTALL_RATION.postAnimationUnit, map);
        ACTION_SUPPORTALL_RATION.postAnimationUnit = null;
    };

    this.giveRation = function(unit, map)
    {
        var refillRule = map.getGameRules().getGameRule("GAMERULE_REFILL_MATERIAL");
        var refillMaterial = (typeof refillRule === 'undefined' || refillRule === null); // an existing rule equals it's set
        var x = unit.getX() + 1;
        var y = unit.getY();
        var animation = null;
        var refillUnit= null;
        var width = 0;
        var animationCount = GameAnimationFactory.getAnimationCount();
        var queueAnimation = null;
        if (animationCount > 0)
        {
            queueAnimation = GameAnimationFactory.getAnimation(animationCount - 1);
        }
        if (ACTION_SUPPORTALL_RATION.checkUnit(unit, x, y, map))
        {
            refillUnit = map.getTerrain(x, y).getUnit();
            refillUnit.refill(refillMaterial);
            if (!refillUnit.isStealthed(map.getCurrentViewPlayer()))
            {
                animation = GameAnimationFactory.createAnimation(map, x, y);
                width = animation.addText(qsTr("RATION"), map.getImageSize() / 2 + 25, 2, 1);
                animation.addBox("info", map.getImageSize() / 2, 0, width + 36, map.getImageSize(), 400);
                animation.addSprite("ration", map.getImageSize() / 2 + 4, 4, 400, 2);
                animation.addSound("repair_1.wav");
                if (queueAnimation !== null)
                {
                    queueAnimation.queueAnimation(animation);
                }
            }
        }
        x = unit.getX() - 1;
        if (ACTION_SUPPORTALL_RATION.checkUnit(unit, x, y, map))
        {
            refillUnit = map.getTerrain(x, y).getUnit();
            refillUnit.refill(refillMaterial);
            if (!refillUnit.isStealthed(map.getCurrentViewPlayer()))
            {
                animation = GameAnimationFactory.createAnimation(map, x, y);
                width = animation.addText(qsTr("RATION"), map.getImageSize() / 2 + 25, 2, 1);
                animation.addBox("info", map.getImageSize() / 2, 0, width + 36, map.getImageSize(), 400);
                animation.addSprite("ration", map.getImageSize() / 2 + 4, 4, 400, 2);
                animation.addSound("repair_1.wav");
                if (queueAnimation !== null)
                {
                    queueAnimation.queueAnimation(animation);
                }
            }
        }
        x = unit.getX();
        y = unit.getY() + 1;
        if (ACTION_SUPPORTALL_RATION.checkUnit(unit, x, y, map))
        {
            refillUnit = map.getTerrain(x, y).getUnit();
            refillUnit.refill(refillMaterial);
            if (!refillUnit.isStealthed(map.getCurrentViewPlayer()))
            {
                animation = GameAnimationFactory.createAnimation(map, x, y);
                width = animation.addText(qsTr("RATION"), map.getImageSize() / 2 + 25, 2, 1);
                animation.addBox("info", map.getImageSize() / 2, 0, width + 36, map.getImageSize(), 400);
                animation.addSprite("ration", map.getImageSize() / 2 + 4, 4, 400, 2);
                animation.addSound("repair_1.wav");
                if (queueAnimation !== null)
                {
                    queueAnimation.queueAnimation(animation);
                }
            }
        }
        y = unit.getY() - 1;
        if (ACTION_SUPPORTALL_RATION.checkUnit(unit, x, y, map))
        {
            refillUnit = map.getTerrain(x, y).getUnit();
            refillUnit.refill(refillMaterial);
            if (!refillUnit.isStealthed(map.getCurrentViewPlayer()))
            {
                animation = GameAnimationFactory.createAnimation(map, x, y);
                width = animation.addText(qsTr("RATION"), map.getImageSize() / 2 + 25, 2, 1);
                animation.addBox("info", map.getImageSize() / 2, 0, width + 36, map.getImageSize(), 400);
                animation.addSprite("ration", map.getImageSize() / 2 + 4, 4, 400, 2);
                animation.addSound("repair_1.wav");
                if (queueAnimation !== null)
                {
                    queueAnimation.queueAnimation(animation);
                }
            }
        }
	};
    this.getDescription = function()
    {
        return qsTr("Refills fuel and ammo to all units surrounding this unit.");
    };
}

Constructor.prototype = ACTION;
var ACTION_SUPPORTALL_RATION = new Constructor();
