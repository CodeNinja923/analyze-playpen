import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Settings, 
  BarChart3, 
  Brain, 
  Database,
  FileText,
  Zap 
} from 'lucide-react';

interface NavigationStep {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
}

export function NavigationBar() {
  const steps: NavigationStep[] = [
    {
      id: 'upload',
      name: 'Upload Data',
      icon: Upload,
      status: 'current',
      description: 'Import your dataset'
    },
    {
      id: 'preprocess',
      name: 'Preprocessing',
      icon: Settings,
      status: 'upcoming',
      description: 'Clean and prepare data'
    },
    {
      id: 'explore',
      name: 'Data Exploration',
      icon: BarChart3,
      status: 'upcoming',
      description: 'Visualize and analyze'
    },
    {
      id: 'models',
      name: 'ML Models',
      icon: Brain,
      status: 'upcoming',
      description: 'Train and evaluate models'
    },
    {
      id: 'insights',
      name: 'Insights',
      icon: FileText,
      status: 'upcoming',
      description: 'Generate reports'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'current': return 'bg-primary text-primary-foreground';
      case 'upcoming': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="border-b bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary text-primary-foreground">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold">DataLab</h1>
              <p className="text-sm text-muted-foreground">Data Analysis Platform</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs">
              <Zap className="w-3 h-3 mr-1" />
              Ready to process
            </Badge>
            <Button variant="outline" size="sm">
              Help & Docs
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant={step.status === 'current' ? 'default' : 'ghost'}
                  size="sm"
                  className={`flex items-center gap-2 ${
                    step.status === 'current' 
                      ? 'bg-gradient-primary shadow-glow' 
                      : step.status === 'completed'
                      ? 'text-success hover:bg-success/10'
                      : 'text-muted-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{step.name}</span>
                </Button>
                
                {index < steps.length - 1 && (
                  <div className="w-6 h-px bg-border"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}