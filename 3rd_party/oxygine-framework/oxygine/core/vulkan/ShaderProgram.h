#pragma once
#include "3rd_party/oxygine-framework/oxygine/oxygine-forwards.h"
#include "3rd_party/oxygine-framework/oxygine/core/intrusive_ptr.h"

#include <QVulkanFunctions>

namespace oxygine
{
    class ShaderProgram;
    using spShaderProgram = oxygine::intrusive_ptr<ShaderProgram>;
    class ShaderProgram: public ref_counter
    {
    public:
        explicit ShaderProgram(const QString & vsShader, const QString & fsShader);
        virtual ~ShaderProgram() = default;
    private:
        VkShaderModule createShader(const QString &name);
    private:
        VkShaderModule m_vertexShaderModule;
        VkShaderModule m_fracmentShaderModule;
    };
}
