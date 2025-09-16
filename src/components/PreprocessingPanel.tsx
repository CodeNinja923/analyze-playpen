import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  Database, 
  Filter, 
  BarChart3, 
  Zap, 
  CheckCircle,
  ArrowRight 
} from 'lucide-react';

interface PreprocessingOption {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'cleaning' | 'transform' | 'feature';
}

export function PreprocessingPanel() {
  const [options, setOptions] = useState<PreprocessingOption[]>([
    {
      id: 'missing-values',
      name: 'Handle Missing Values',
      description: 'Automatically detect and handle missing data points',
      enabled: true,
      category: 'cleaning'
    },
    {
      id: 'duplicates',
      name: 'Remove Duplicates',
      description: 'Identify and remove duplicate rows',
      enabled: true,
      category: 'cleaning'
    },
    {
      id: 'outliers',
      name: 'Outlier Detection',
      description: 'Detect and handle statistical outliers',
      enabled: false,
      category: 'cleaning'
    },
    {
      id: 'normalization',
      name: 'Data Normalization',
      description: 'Normalize numerical features to standard scale',
      enabled: true,
      category: 'transform'
    },
    {
      id: 'encoding',
      name: 'Categorical Encoding',
      description: 'Convert categorical variables to numerical format',
      enabled: true,
      category: 'transform'
    },
    {
      id: 'feature-selection',
      name: 'Feature Selection',
      description: 'Automatically select most relevant features',
      enabled: false,
      category: 'feature'
    },
    {
      id: 'feature-creation',
      name: 'Feature Engineering',
      description: 'Create new features from existing data',
      enabled: false,
      category: 'feature'
    }
  ]);

  const [isProcessing, setIsProcessing] = useState(false);

  const toggleOption = (id: string) => {
    setOptions(prev => prev.map(opt => 
      opt.id === id ? { ...opt, enabled: !opt.enabled } : opt
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cleaning': return <Database className="w-4 h-4" />;
      case 'transform': return <Filter className="w-4 h-4" />;
      case 'feature': return <BarChart3 className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cleaning': return 'bg-primary/10 text-primary';
      case 'transform': return 'bg-secondary/10 text-secondary';
      case 'feature': return 'bg-accent/10 text-accent';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleStartPreprocessing = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
  };

  const enabledCount = options.filter(opt => opt.enabled).length;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Preprocessing Options
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Configure data preprocessing steps
          </p>
        </div>
        <Badge variant="secondary" className="text-xs">
          {enabledCount} selected
        </Badge>
      </div>

      <div className="space-y-4 mb-6">
        {['cleaning', 'transform', 'feature'].map((category) => {
          const categoryOptions = options.filter(opt => opt.category === category);
          const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
          
          return (
            <div key={category}>
              <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                {getCategoryIcon(category)}
                {categoryName === 'Transform' ? 'Transformation' : categoryName === 'Feature' ? 'Feature Engineering' : 'Data Cleaning'}
              </h4>
              
              <div className="space-y-3">
                {categoryOptions.map((option) => (
                  <div key={option.id} className="flex items-center justify-between p-3 rounded-lg border transition-all hover:bg-muted/50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{option.name}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getCategoryColor(option.category)}`}
                        >
                          {getCategoryIcon(option.category)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                    
                    <Switch
                      checked={option.enabled}
                      onCheckedChange={() => toggleOption(option.id)}
                    />
                  </div>
                ))}
              </div>
              
              {category !== 'feature' && <Separator className="mt-4" />}
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button 
          onClick={handleStartPreprocessing}
          disabled={isProcessing || enabledCount === 0}
          className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Start Preprocessing
            </>
          )}
        </Button>
        
        <Button variant="outline" size="lg" className="px-6">
          Preview
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
}