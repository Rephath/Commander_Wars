#pragma once
#include "3rd_party/oxygine-framework/oxygine/oxygine-forwards.h"
#include "3rd_party/oxygine-framework/oxygine/actor/Actor.h"
#include "3rd_party/oxygine-framework/oxygine/TextStyle.h"
#include "3rd_party/oxygine-framework/oxygine/VisualStyle.h"
#include "3rd_party/oxygine-framework/oxygine/text_utils/Node.h"

namespace oxygine
{
    class TextField;
    using spTextField = intrusive_ptr<TextField>;
    class TextField : public VStyleActor
    {
    public:
        explicit TextField() = default;
        virtual ~TextField() = default;

        /**Returns current text style*/
        const TextStyle& getStyle() const
        {
#ifdef GRAPHICSUPPORT
            return m_style;
#else
            return m_dummyTextStyle;
#endif
        }
        /**Returns text bounds*/
        const Rect& getTextRect() const;
        /**Returns current text*/
        const QString & getText() const;
        const ResFont* getFont() const;
        qint32 getFontSize() const;
        qint32 getLinesOffset() const;
        qint32 getKerning() const;
        TextStyle::VerticalAlign getVAlign() const;
        TextStyle::HorizontalAlign getHAlign() const;
        bool getMultiline() const;
        bool getBreakLongWords() const;
        text::Symbol* getSymbolAt(qint32 pos) const;
        const QColor& getStyleColor() const;
        float getBaselineScale() const;
        size_t getOptions() const;
        virtual bool getBounds(RectF&) const override;
        /**Overwrites TextStyle Vertical align*/
        void setVAlign(TextStyle::VerticalAlign align);
        /**Overwrites TextStyle Horizontal align*/
        void setHAlign(TextStyle::HorizontalAlign align);
        void setAlign(TextStyle::VerticalAlign, TextStyle::HorizontalAlign);
        /**Overwrites TextStyle multiline*/
        void setMultiline(bool multiline);
        /**Overwrites TextStyle breakLongWords*/
        void setBreakLongWords(bool val);
        /**Overwrites TextStyle linesOffset*/
        void setLinesOffset(qint32 offset);
        /**Overwrites TextStyle baselineScale*/
        void setBaselineScale(float scale);
        /**Overwrites TextStyle kerning*/
        void setKerning(qint32 kerning);
        /**Overwrites TextStyle fontSize*/
        void setFontSize(qint32 size);
        /**Overwrites TextStyle color*/
        void setStyleColor(const QColor&);

        /**Overwrites TextStyle font.*/
        void setFont(const ResFont* rs);

        void setStyle(const TextStyle& st);
        /**Changes text utf-8 string*/
        void setText(const QString & str);
        /**Changes text.
        Supports pseudo html style tags:  <br/> - break line,  <div color='FFFFFF'/>colored text </div>, <div c='FFFFFF'/>colored text</div>,
        in pair with oxygine-freetype you may use 'opt': <div opt=123>custom option</div>, <div c='ffffff' opt=123>custom option with color</div>
        example:
        This is <div c='ff0000'/> colored text <div/>supports  <div c='00ff00AA'/>nested tags</div><br/> with broken line.
        */
        void setHtmlText(const QString & str);

        virtual bool isOn(const Vector2& localPosition, float) override;
        virtual void doRender(const RenderState&) override;
        text::Node* getRootNode();

    protected:
        virtual void sizeChanged(const Vector2& size) override;
        virtual void matChanged() override;
        void rebuildText();

    protected:
#ifdef GRAPHICSUPPORT
        QString  m_text;
        TextStyle m_style;

        text::spNode m_root;
        Rect m_textRect{0, 0, 0, 0};
        float m_rtscale{1.0f};
        bool m_htmlText = false;
#else
        static TextStyle m_dummyTextStyle;
        static Rect m_dummyRect;
        static QString m_dummyText;
#endif
    };
}
