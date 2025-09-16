import React from 'react';
import { NavigationBar } from '@/components/NavigationBar';
import { FileUploadZone } from '@/components/FileUploadZone';
import { PreprocessingPanel } from '@/components/PreprocessingPanel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  Database, 
  Activity,
  ArrowRight,
  Sparkles 
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      name: 'Datasets Processed',
      value: '12',
      change: '+20%',
      icon: Database,
      color: 'text-primary'
    },
    {
      name: 'Models Trained',
      value: '8',
      change: '+15%',
      icon: Activity,
      color: 'text-secondary'
    },
    {
      name: 'Accuracy Rate',
      value: '94.2%',
      change: '+2.4%',
      icon: TrendingUp,
      color: 'text-success'
    },
    {
      name: 'Active Projects',
      value: '3',
      change: 'New',
      icon: Users,
      color: 'text-accent'
    }
  ];

  const quickActions = [
    {
      title: 'Start New Analysis',
      description: 'Upload data and begin preprocessing',
      icon: Sparkles,
      action: 'primary'
    },
    {
      title: 'View Past Projects',
      description: 'Access your previous analysis results',
      icon: Database,
      action: 'secondary'
    },
    {
      title: 'Model Gallery',
      description: 'Browse pre-trained models',
      icon: Activity,
      action: 'outline'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <NavigationBar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome to your Data Lab</h2>
          <p className="text-muted-foreground">
            Upload your dataset and start exploring insights with automated preprocessing and ML models.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name} className="p-6 hover:shadow-card transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.name}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <Badge variant="secondary" className="text-xs mt-2">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted/50 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - File Upload */}
          <div className="lg:col-span-2 space-y-6">
            <FileUploadZone />
            
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <div key={index} className="p-4 rounded-lg border hover:bg-muted/50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-sm">{action.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{action.description}</p>
                      <Button variant={action.action as any} size="sm" className="w-full text-xs">
                        Get Started
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right Column - Preprocessing Panel */}
          <div className="space-y-6">
            <PreprocessingPanel />
            
            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'Dataset uploaded', time: '2 minutes ago', status: 'success' },
                  { action: 'Model training completed', time: '1 hour ago', status: 'success' },
                  { action: 'Preprocessing started', time: '3 hours ago', status: 'processing' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-success' : 
                      activity.status === 'processing' ? 'bg-warning' : 'bg-muted'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}