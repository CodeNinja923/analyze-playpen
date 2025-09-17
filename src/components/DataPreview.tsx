import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  BarChart3, 
  Info, 
  FileText,
  Hash,
  Calendar,
  Type,
  CheckCircle2
} from 'lucide-react';

interface DataPreviewProps {
  fileName: string;
  fileType: string;
}

export function DataPreview({ fileName, fileType }: DataPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock data for preview
  const sampleData = [
    { id: 1, name: 'John Doe', age: 28, salary: 65000, department: 'Engineering', join_date: '2022-01-15' },
    { id: 2, name: 'Jane Smith', age: 32, salary: 75000, department: 'Marketing', join_date: '2021-08-20' },
    { id: 3, name: 'Mike Johnson', age: 29, salary: 58000, department: 'Sales', join_date: '2022-03-10' },
    { id: 4, name: 'Sarah Wilson', age: 35, salary: 82000, department: 'Engineering', join_date: '2020-11-05' },
    { id: 5, name: 'David Brown', age: 31, salary: 69000, department: 'HR', join_date: '2021-12-01' }
  ];

  const columnInfo = [
    { name: 'id', type: 'Integer', icon: Hash, nullCount: 0, uniqueValues: 5 },
    { name: 'name', type: 'String', icon: Type, nullCount: 0, uniqueValues: 5 },
    { name: 'age', type: 'Integer', icon: Hash, nullCount: 0, uniqueValues: 4 },
    { name: 'salary', type: 'Integer', icon: Hash, nullCount: 0, uniqueValues: 5 },
    { name: 'department', type: 'String', icon: Type, nullCount: 0, uniqueValues: 4 },
    { name: 'join_date', type: 'Date', icon: Calendar, nullCount: 0, uniqueValues: 5 }
  ];

  const dataStats = {
    totalRows: 1000,
    totalColumns: 6,
    missingValues: 12,
    duplicateRows: 3,
    dataQuality: 'Good'
  };

  if (!isExpanded) {
    return (
      <Card className="p-4 border-l-4 border-l-primary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Eye className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Data Preview Available</h4>
              <p className="text-xs text-muted-foreground">
                {fileName} - {dataStats.totalRows} rows, {dataStats.totalColumns} columns
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="text-xs"
          >
            <Eye className="w-3 h-3 mr-1" />
            Preview Data
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Data Preview: {fileName}</h3>
            <p className="text-sm text-muted-foreground">
              {dataStats.totalRows} rows × {dataStats.totalColumns} columns
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsExpanded(false)}
          className="text-xs"
        >
          Collapse
        </Button>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preview">Data Preview</TabsTrigger>
          <TabsTrigger value="columns">Column Info</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-4">
          <div className="rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    {Object.keys(sampleData[0]).map((key) => (
                      <th key={key} className="px-4 py-3 text-left font-medium">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((row, index) => (
                    <tr key={index} className="border-t hover:bg-muted/20">
                      {Object.values(row).map((value, colIndex) => (
                        <td key={colIndex} className="px-4 py-3">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-muted/30 border-t text-xs text-muted-foreground text-center">
              Showing first 5 rows of {dataStats.totalRows} total rows
            </div>
          </div>
        </TabsContent>

        <TabsContent value="columns" className="mt-4">
          <div className="space-y-3">
            {columnInfo.map((col, index) => {
              const Icon = col.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{col.name}</p>
                      <p className="text-xs text-muted-foreground">{col.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Unique: {col.uniqueValues}</span>
                    <span>Nulls: {col.nullCount}</span>
                    {col.nullCount === 0 && (
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Clean
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Total Rows</p>
              <p className="text-xl font-semibold">{dataStats.totalRows.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Columns</p>
              <p className="text-xl font-semibold">{dataStats.totalColumns}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Missing Values</p>
              <p className="text-xl font-semibold text-warning">{dataStats.missingValues}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Data Quality</p>
              <Badge variant="secondary" className="mt-1">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                {dataStats.dataQuality}
              </Badge>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-3">Data Quality Insights</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>No duplicate rows detected</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>All columns have consistent data types</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Info className="w-4 h-4 text-warning" />
                <span>12 missing values found across 2 columns</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}