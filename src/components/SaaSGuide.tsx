import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronRight,
  Upload,
  Eye,
  Settings,
  BarChart3,
  Database,
  Activity,
  Users,
  Sparkles,
  FileText,
  Cpu
} from 'lucide-react';

export function SaaSGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const guideData = [
    {
      id: 'upload',
      title: 'File Upload Zone',
      icon: Upload,
      color: 'text-primary',
      description: 'Upload your datasets (CSV, Excel, JSON, Parquet)',
      features: [
        'Drag & drop support for easy file upload',
        'Progress tracking for upload status',
        'File validation and size limits (up to 100MB)',
        'Multiple file format support',
        'Real-time upload progress indicators'
      ],
      location: 'Left column, top section'
    },
    {
      id: 'preview',
      title: 'Data Preview',
      icon: Eye,
      color: 'text-secondary',
      description: 'Review and inspect your uploaded data',
      features: [
        'Sample data table view with first 5 rows',
        'Column information and data types',
        'Data quality statistics and insights',
        'Missing values and duplicate detection',
        'Interactive tabs for different views'
      ],
      location: 'Appears after successful file upload'
    },
    {
      id: 'preprocessing',
      title: 'Preprocessing Panel',
      icon: Settings,
      color: 'text-accent',
      description: 'Configure data cleaning and transformation',
      features: [
        'Handle missing values with multiple strategies',
        'Remove duplicate rows automatically',
        'Feature scaling and normalization options',
        'Data type conversion and validation',
        'Custom preprocessing pipeline configuration'
      ],
      location: 'Right column, top section'
    },
    {
      id: 'stats',
      title: 'Dashboard Statistics',
      icon: BarChart3,
      color: 'text-success',
      description: 'Key metrics and performance indicators',
      features: [
        'Datasets processed counter',
        'Models trained successfully',
        'Overall accuracy rates',
        'Active projects tracking',
        'Performance trend indicators'
      ],
      location: 'Top of dashboard, grid layout'
    },
    {
      id: 'actions',
      title: 'Quick Actions',
      icon: Sparkles,
      color: 'text-warning',
      description: 'Common tasks and shortcuts',
      features: [
        'Start new analysis workflow',
        'Access previous project results',
        'Browse pre-trained model gallery',
        'Quick data exploration tools',
        'One-click analysis templates'
      ],
      location: 'Left column, below file upload'
    },
    {
      id: 'activity',
      title: 'Recent Activity',
      icon: Activity,
      color: 'text-muted-foreground',
      description: 'Track your recent actions and progress',
      features: [
        'Real-time activity feed',
        'Upload and processing status',
        'Model training notifications',
        'Error and success alerts',
        'Timestamp tracking for all actions'
      ],
      location: 'Right column, bottom section'
    }
  ];

  if (!isOpen) {
    return (
      <Card className="p-4 border-l-4 border-l-accent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <HelpCircle className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h4 className="font-medium text-sm">SaaS Feature Guide</h4>
              <p className="text-xs text-muted-foreground">
                Learn what each component does
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsOpen(true)}
            className="text-xs"
          >
            <HelpCircle className="w-3 h-3 mr-1" />
            Show Guide
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <HelpCircle className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold">SaaS Feature Guide</h3>
            <p className="text-sm text-muted-foreground">
              Understanding your data science platform
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-xs"
        >
          Hide Guide
        </Button>
      </div>

      <div className="space-y-3">
        {guideData.map((section) => {
          const Icon = section.icon;
          const isExpanded = openSections.includes(section.id);
          
          return (
            <Collapsible
              key={section.id}
              open={isExpanded}
              onOpenChange={() => toggleSection(section.id)}
            >
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${section.color}`} />
                    <div>
                      <p className="font-medium text-sm">{section.title}</p>
                      <p className="text-xs text-muted-foreground">{section.description}</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="mt-2 ml-7 p-3 rounded-lg bg-muted/30">
                  <div className="mb-3">
                    <Badge variant="outline" className="text-xs">
                      📍 {section.location}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                      Key Features:
                    </h5>
                    <ul className="space-y-1">
                      {section.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs">
                          <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-gradient-subtle border">
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-4 h-4 text-primary" />
          <h4 className="font-medium text-sm">Workflow Tip</h4>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Recommended flow:</strong> Upload files → Preview data → Configure preprocessing → 
          Monitor activity → Start analysis. Each step builds on the previous one for optimal results.
        </p>
      </div>
    </Card>
  );
}