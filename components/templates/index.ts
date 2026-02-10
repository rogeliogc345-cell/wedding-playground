import MinimalTemplate from "./MinimalTemplate";
import ModernTemplate from "./ModernTemplate";
import VintageTemplate from "./VintageTemplate";

export const TEMPLATES = {
    modern:ModernTemplate, 
    vintage:VintageTemplate, 
    minimal:MinimalTemplate,
}

export type TemplateType = keyof typeof TEMPLATES;