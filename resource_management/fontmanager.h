#ifndef FONTMANAGER_H
#define FONTMANAGER_H

#include <QColor>

#include "resource_management/ressourcemanagement.h"

class FontManager : public QObject, public RessourceManagement<FontManager>
{
    Q_OBJECT
public:
    enum SpecialChars
    {
        unlockChar = 1,
        lockChar = 2
    };
    /**
     * @brief getMainFont16
     * @return
     */
    inline static oxygine::ResFont* getMainFont16()
    {
        return getInstance()->getResFont("main16");
    }
    /**
     * @brief getMainFont24
     * @return
     */
    inline static oxygine::ResFont* getMainFont24()
    {
        return getInstance()->getResFont("main24");
    }
    /**
     * @brief getMainFont48
     * @return
     */
    inline static oxygine::ResFont* getMainFont48()
    {
        return getInstance()->getResFont("main48");
    }
    /**
     * @brief getMainFont48
     * @return
     */
    inline static oxygine::ResFont* getMainFont32()
    {
        return getInstance()->getResFont("main32");
    }
    /**
     * @brief getMainFont72
     * @return
     */
    inline static oxygine::ResFont* getMainFont72()
    {
        return getInstance()->getResFont("main72");
    }
    /**
     * @brief getLogoFont
     * @return
     */
    inline static oxygine::ResFont* getLogoFont()
    {
        return getInstance()->getResFont("logoFont");
    }

public slots:
    /**
     * @brief setFontColor
     * @param color
     */
    static void setFontColor(QColor color);
    /**
     * @brief getFontColor
     * @return
     */
    static QColor getFontColor();
protected:
    friend RessourceManagement<FontManager>;
    FontManager()
        : RessourceManagement<FontManager>("/fonts/fonts.xml", "")
    {
#ifdef GRAPHICSUPPORT
        setObjectName("FontManager");
#endif
    }
private:
    virtual ~FontManager() = default;
    static QColor defaultColor;
};

#endif // FONTMANAGER_H
