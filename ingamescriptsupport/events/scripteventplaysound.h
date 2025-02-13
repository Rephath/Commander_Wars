#ifndef SCRIPTEVENTPLAYSOUND_H
#define SCRIPTEVENTPLAYSOUND_H

#include "ingamescriptsupport/events/scripteventgeneric.h"

class ScriptEventPlaySound;
using spScriptEventPlaySound = oxygine::intrusive_ptr<ScriptEventPlaySound>;

class ScriptEventPlaySound : public ScriptEventGeneric
{
    Q_OBJECT
public:
    explicit ScriptEventPlaySound(GameMap* pMap);
};

#endif // SCRIPTEVENTPLAYSOUND_H
