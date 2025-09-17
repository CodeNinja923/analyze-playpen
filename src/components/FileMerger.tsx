import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Merge, 
  FileText, 
  Eye, 
  Settings,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Download
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
}

interface FileMergerProps {
  files: UploadedFile[];
}

export function FileMerger({ files }: FileMergerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mergeType, setMergeType] = useState<string>('vertical');
  const [selectedFiles, setSelectedFiles] = useState<string[]>(files.map(f => f.id));

  const completedFiles = files.filter(file => file.status === 'completed');

  if (completedFiles.length < 2) {
    return null;
  }

  // Mock data for different files
  const mockFileData = {
    [completedFiles[0]?.id]: [
      { id: 1, name: 'John Doe', age: 28, department: 'Engineering' },
      { id: 2, name: 'Jane Smith', age: 32, department: 'Marketing' }
    ],
    [completedFiles[1]?.id]: [
      { id: 3, name: 'Mike Johnson', age: 29, department: 'Sales' },
      { id: 4, name: 'Sarah Wilson', age: 35, department: 'Engineering' }
    ]
  };

  const mergedPreview = mergeType === 'vertical' 
    ? [...(mockFileData[completedFiles[0]?.id] || []), ...(mockFileData[completedFiles[1]?.id] || [])]
    : (mockFileData[completedFiles[0]?.id] || []).map((row, index) => ({
        ...row,
        ...(mockFileData[completedFiles[1]?.id]?.[index] || {})
      }));

  const mergeOptions = [
    {
      value: 'vertical',
      label: 'Vertical Merge (Stack Rows)',
      description: 'Combine files by stacking rows on top of each other',
      icon: '📚'
    },
    {
      value: 'horizontal', 
      label: 'Horizontal Merge (Join Columns)',
      description: 'Combine files by joining columns side by side',
      icon: '🔗'
    }
  ];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      {/* Merge Option Card */}
      <Card className="p-4 border-l-4 border-l-secondary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-secondary/10">
              <Merge className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Merge Files Available</h4>
              <p className="text-xs text-muted-foreground">
                {completedFiles.length} files ready to merge
              </p>
            </div>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                <Merge className="w-3 h-3 mr-1" />
                Merge Files
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Merge className="w-5 h-5 text-secondary" />
                  Merge Dataset Files
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="configure" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="configure">Configure</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="configure" className="mt-4">
                  <div className="space-y-6">
                    {/* File Selection */}
                    <div>
                      <h4 className="font-medium mb-3">Select Files to Merge</h4>
                      <div className="space-y-2">
                        {completedFiles.map((file) => (
                          <div key={file.id} className="flex items-center gap-3 p-3 rounded-lg border">
                            <input
                              type="checkbox"
                              checked={selectedFiles.includes(file.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedFiles(prev => [...prev, file.id]);
                                } else {
                                  setSelectedFiles(prev => prev.filter(id => id !== file.id));
                                }
                              }}
                              className="rounded"
                            />
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                              </p>
                            </div>
                            <Badge variant="secondary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Ready
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Merge Type Selection */}
                    <div>
                      <h4 className="font-medium mb-3">Merge Strategy</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mergeOptions.map((option) => (
                          <div
                            key={option.value}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              mergeType === option.value 
                                ? 'border-secondary bg-secondary/5' 
                                : 'hover:border-secondary/50'
                            }`}
                            onClick={() => setMergeType(option.value)}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg">{option.icon}</span>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{option.label}</p>
                                <p className="text-xs text-muted-foreground">
                                  {option.description}
                                </p>
                              </div>
                              {mergeType === option.value && (
                                <CheckCircle2 className="w-4 h-4 text-secondary" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Merge Validation */}
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="font-medium text-sm">Merge Validation</span>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>✓ All selected files have compatible formats</p>
                        <p>✓ No conflicting column names detected</p>
                        <p>✓ Data types are consistent across files</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Merge Preview</h4>
                      <Badge variant="outline">
                        {mergedPreview.length} rows after merge
                      </Badge>
                    </div>

                    <div className="rounded-lg border overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/50">
                            <tr>
                              {Object.keys(mergedPreview[0] || {}).map((key) => (
                                <th key={key} className="px-4 py-3 text-left font-medium">
                                  {key}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {mergedPreview.slice(0, 5).map((row, index) => (
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
                        Showing first 5 rows of {mergedPreview.length} merged rows
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm font-medium">Before Merge</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedFiles.length} files, ~{completedFiles.length * 2} rows each
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <p className="text-sm font-medium">After Merge</p>
                        <p className="text-xs text-muted-foreground">
                          1 merged file, {mergedPreview.length} total rows
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-4">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Merge Settings</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Output File Name</label>
                          <input
                            type="text"
                            className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                            placeholder="merged_dataset.csv"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Handle Duplicate Columns</label>
                          <Select defaultValue="rename">
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rename">Rename with suffix</SelectItem>
                              <SelectItem value="merge">Merge values</SelectItem>
                              <SelectItem value="ignore">Ignore duplicates</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Missing Value Strategy</label>
                          <Select defaultValue="keep">
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="keep">Keep as null</SelectItem>
                              <SelectItem value="fill">Fill with default</SelectItem>
                              <SelectItem value="remove">Remove rows</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border-l-4 border-l-warning bg-warning/5">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-warning mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Important Notes</p>
                          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                            <li>• Merged files will create a new dataset</li>
                            <li>• Original files remain unchanged</li>
                            <li>• Large merges may take additional processing time</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-xs text-muted-foreground">
                  Merging {selectedFiles.length} files using {mergeType} strategy
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-gradient-primary">
                    <Download className="w-4 h-4 mr-2" />
                    Create Merged Dataset
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </>
  );
}