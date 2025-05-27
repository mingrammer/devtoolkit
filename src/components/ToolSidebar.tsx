import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Code } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { useTools, useCategories } from "@/utils/toolsConfig";
import { useLanguage } from "@/contexts/LanguageContext";
import SponsorSection from "@/components/SponsorSection";
import LanguageSelector from "@/components/LanguageSelector";

export function ToolSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const tools = useTools();
  const categories = useCategories();
  const { t } = useLanguage();

  const filteredToolsByCategory = useMemo(() => {
    const filtered = tools.filter(tool => 
      searchQuery === "" || 
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return categories.reduce((acc, category) => {
      acc[category] = filtered.filter(tool => tool.category === category);
      return acc;
    }, {} as Record<string, typeof tools>);
  }, [searchQuery, tools, categories]);

  const handleToolSelect = (toolId: string) => {
    navigate(`/tools/${toolId}`);
  };

  const currentTool = location.pathname.split('/')[2];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("devToolkit")}
            </h1>
          </div>
        </div>
        
        {/* Language Selector */}
        <div className="mb-4">
          <LanguageSelector />
        </div>
        
        {/* Sponsor Section */}
        <SponsorSection />
        
        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={t("searchTools")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        {categories.map((category) => {
          const categoryTools = filteredToolsByCategory[category];
          if (categoryTools.length === 0) return null;

          return (
            <SidebarGroup key={category}>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-600 mb-2">
                {category}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {categoryTools.map((tool) => {
                    const Icon = tool.icon;
                    const isActive = currentTool === tool.id;
                    
                    return (
                      <SidebarMenuItem key={tool.id}>
                        <SidebarMenuButton
                          isActive={isActive}
                          onClick={() => handleToolSelect(tool.id)}
                          className="w-full justify-start"
                        >
                          <div className={`w-6 h-6 ${tool.color} rounded-md flex items-center justify-center mr-3`}>
                            <Icon className="w-3 h-3 text-white" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium">{tool.title}</div>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
