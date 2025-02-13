#ifndef MAPSELECTIONMAPSMENUE_H
#define MAPSELECTIONMAPSMENUE_H

#include <QFileInfo>

#include "3rd_party/oxygine-framework/oxygine/actor/Button.h"

#include "objects/mapselectionview.h"
#include "objects/minimap.h"
#include "objects/coselection.h"
#include "objects/base/panel.h"
#include "objects/base/spinbox.h"
#include "objects/base/dropdownmenu.h"
#include "objects/base/multislider.h"
#include "objects/playerselection.h"
#include "objects/ruleselection.h"

#include "game/campaign.h"

#include "coreengine/LUPDATE_MACROS.h"
#include "menue/basemenu.h"

class GameMap;
class MapSelectionMapsMenue;
using spMapSelectionMapsMenue = oxygine::intrusive_ptr<MapSelectionMapsMenue>;

class MapSelectionMapsMenue : public Basemenu
{
    Q_OBJECT
public:
    ENUM_CLASS MapSelectionStep
    {
        selectMap,
        selectRules,
        selectPlayer
    };

    explicit MapSelectionMapsMenue(spMapSelectionView pMapSelectionView, qint32 heigth = -1);
    virtual ~MapSelectionMapsMenue() = default;
    // functions for swapping between the inputs
    virtual void hideMapSelection();
    virtual void showMapSelection();
    void hideRuleSelection();
    virtual void showRuleSelection();
    void hidePlayerSelection();
    virtual void showPlayerSelection();    
signals:
    void sigButtonBack();
    void sigButtonNext();
    void sigButtonStartGame();
    void sigRandomMap();
    void sigMapFilter();
    void sigShowLoadRules();
    void sigShowSaveRules();
    void sigShowSaveMap();
public slots:
    // slots for changing the map
    void mapSelectionItemClicked(QString item);
    void mapSelectionItemChanged(QString item);
    // general slots
    virtual void buttonBack();
    virtual void buttonNext();
    virtual void exitMenu();
    /**
     * @brief startGame starts a game for a single player mode
     */
    virtual void startGame();
    /**
     * @brief defeatClosedPlayers
     */
    void defeatClosedPlayers();
    /**
     * @brief showRandomMap
     */
    void showRandomMap();
    /**
     * @brief selectRandomMap
     */
    void selectRandomMap(QString mapName, QString author, QString description,
                         qint32 width, qint32 heigth, qint32 playerCount,
                         bool roadSupport, qint32 seed,
                         QVector<std::tuple<QString, float>> terrains,
                         QVector<std::tuple<QString, float>> buildings,
                         QVector<float> ownedBaseSize,
                         float startBaseSize,
                         QVector<std::tuple<QString, float>> units,
                         qint32 unitCount,
                         float startBaseUnitSize,
                         QVector<float> unitDistribution,
                         bool unitsDistributed,
                         bool mirrored);
    void showLoadRules();
    void showSaveRules();
    void loadRules(QString filename);
    void saveRules(QString filename);
    void showSaveMap();
    void saveMap(QString filename);
    void selectMap(QString folder, QString filename);
    PlayerSelection* getPlayerSelection() const;
    void showMapFilter();
protected slots:
    virtual void onEnter() override;
    void ruleSelectionSizeChanged();
protected:

    // buttons
    oxygine::spButton m_pMapFilter;
    oxygine::spButton m_pRandomMap;
    oxygine::spButton m_pButtonNext;
    oxygine::spButton m_pButtonStart;
    oxygine::spButton m_pButtonBack;
    oxygine::spButton m_pButtonSaveMap;
    oxygine::spButton m_pButtonSaveRules;
    oxygine::spButton m_pButtonLoadRules;

    spMapSelectionView m_pMapSelectionView;
    // rule selection
    spPanel m_pRuleSelection;
    spRuleSelection m_pRuleSelectionView;

    spPlayerSelection m_pPlayerSelection;

    MapSelectionStep m_MapSelectionStep{MapSelectionStep::selectMap};
};

Q_DECLARE_INTERFACE(MapSelectionMapsMenue, "MapSelectionMapsMenue");

#endif // MAPSELECTIONMENUE_H

