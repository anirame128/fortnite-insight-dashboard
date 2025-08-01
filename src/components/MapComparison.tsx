'use client';

import { useState, useEffect } from 'react';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { validateMapCode } from '@/lib/validation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, AlertCircle } from 'lucide-react';

interface MapData {
  code: string;
  data: {
    timeline: Array<{
      timestamp: string;
      value: number;
    }>;
    distribution: Array<{
      category: string;
      count: number;
    }>;
  };
}

interface ValidationError {
  code: string;
  message: string;
}

export default function MapComparison() {
  const [map1Code, setMap1Code] = useState('');
  const [map2Code, setMap2Code] = useState('');
  const [map1Data, setMap1Data] = useState<MapData | null>(null);
  const [map2Data, setMap2Data] = useState<MapData | null>(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error1, setError1] = useState<ValidationError | null>(null);
  const [error2, setError2] = useState<ValidationError | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMap1Submit = async () => {
    if (!map1Code.trim()) {
      setError1({ code: 'empty', message: 'Please enter a map code' });
      return;
    }

    setLoading1(true);
    setError1(null);

    try {
      const validation = await validateMapCode(map1Code);
      if (!validation.valid) {
        setError1({ code: 'invalid', message: validation.message || 'Invalid map code' });
        return;
      }

      // Simulate API call - replace with actual API
      const response = await fetch(`/api/maps/${map1Code}`);
      if (!response.ok) throw new Error('Failed to fetch map data');
      
      const data = await response.json();
      setMap1Data(data);
    } catch (error) {
      setError1({ 
        code: 'fetch_error', 
        message: error instanceof Error ? error.message : 'Failed to load map data' 
      });
    } finally {
      setLoading1(false);
    }
  };

  const handleMap2Submit = async () => {
    if (!map2Code.trim()) {
      setError2({ code: 'empty', message: 'Please enter a map code' });
      return;
    }

    setLoading2(true);
    setError2(null);

    try {
      const validation = await validateMapCode(map2Code);
      if (!validation.valid) {
        setError2({ code: 'invalid', message: validation.message || 'Invalid map code' });
        return;
      }

      // Simulate API call - replace with actual API
      const response = await fetch(`/api/maps/${map2Code}`);
      if (!response.ok) throw new Error('Failed to fetch map data');
      
      const data = await response.json();
      setMap2Data(data);
    } catch (error) {
      setError2({ 
        code: 'fetch_error', 
        message: error instanceof Error ? error.message : 'Failed to load map data' 
      });
    } finally {
      setLoading2(false);
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[var(--background)]" />;
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Map Comparison</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map 1 */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Map 1</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={map1Code}
                  onChange={(e) => {
                    setMap1Code(e.target.value);
                    if (error1) setError1(null);
                  }}
                  placeholder="Enter map code"
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleMap1Submit()}
                />
                <Button 
                  onClick={handleMap1Submit} 
                  disabled={loading1}
                  className="min-w-[100px]"
                >
                  {loading1 ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Load'
                  )}
                </Button>
              </div>
              
              {error1 && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>{error1.message}</AlertDescription>
                </Alert>
              )}

              {map1Data && (
                <Tabs defaultValue="timeline" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="distribution">Distribution</TabsTrigger>
                  </TabsList>
                  <TabsContent value="timeline" className="space-y-4">
                    <LineChart
                      data={map1Data.data.timeline}
                      xKey="timestamp"
                      yKey="value"
                      title="Timeline Analysis"
                    />
                  </TabsContent>
                  <TabsContent value="distribution" className="space-y-4">
                    <BarChart
                      data={map1Data.data.distribution}
                      xKey="category"
                      yKey="count"
                      title="Distribution Analysis"
                    />
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </Card>

          {/* Map 2 */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Map 2</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={map2Code}
                  onChange={(e) => {
                    setMap2Code(e.target.value);
                    if (error2) setError2(null);
                  }}
                  placeholder="Enter map code"
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleMap2Submit()}
                />
                <Button 
                  onClick={handleMap2Submit} 
                  disabled={loading2}
                  className="min-w-[100px]"
                >
                  {loading2 ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Load'
                  )}
                </Button>
              </div>
              
              {error2 && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>{error2.message}</AlertDescription>
                </Alert>
              )}

              {map2Data && (
                <Tabs defaultValue="timeline" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="distribution">Distribution</TabsTrigger>
                  </TabsList>
                  <TabsContent value="timeline" className="space-y-4">
                    <LineChart
                      data={map2Data.data.timeline}
                      xKey="timestamp"
                      yKey="value"
                      title="Timeline Analysis"
                    />
                  </TabsContent>
                  <TabsContent value="distribution" className="space-y-4">
                    <BarChart
                      data={map2Data.data.distribution}
                      xKey="category"
                      yKey="count"
                      title="Distribution Analysis"
                    />
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </Card>
        </div>

        {/* Comparison Summary */}
        {map1Data && map2Data && (
          <Card className="mt-6 p-6">
            <h2 className="text-xl font-semibold mb-4">Comparison Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Map 1: {map1Data.code}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Data points: {map1Data.data.timeline.length}
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Map 2: {map2Data.code}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Data points: {map2Data.data.timeline.length}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}