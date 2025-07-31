import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface MapCardProps {
  map: {
    name: string;
    code: string;
    description: string;
    creator: string;
    tags: string[];
    playerCount: number;
  };
}

export function MapCard({ map }: MapCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{map.name}</CardTitle>
        <div className="text-sm text-muted-foreground font-mono">
          Code: {map.code}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{map.description}</p>
        
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">Creator:</span> {map.creator}
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            <span>{map.playerCount} players</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {map.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}