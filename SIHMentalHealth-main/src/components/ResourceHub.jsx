import React, { useState } from 'react';
import { Search, BookOpen, Video, FileText, Headphones, Filter, Star, Clock, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function ResourceHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', count: 24 },
    { id: 'articles', name: 'Articles', count: 8 },
    { id: 'videos', name: 'Videos', count: 6 },
    { id: 'worksheets', name: 'Worksheets', count: 5 },
    { id: 'podcasts', name: 'Podcasts', count: 3 },
    { id: 'tools', name: 'Self-Help Tools', count: 2 }
  ];

  const resources = [
    {
      id: 1,
      title: "Managing Academic Stress: A Student's Guide",
      description: "Practical strategies for handling exam pressure and coursework deadlines",
      type: 'article',
      category: 'articles',
      duration: '10 min read',
      rating: 4.8,
      views: '2.3k',
      tags: ['stress', 'academic', 'anxiety'],
      difficulty: 'beginner',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: "Deep Breathing for Anxiety Relief",
      description: "Learn effective breathing techniques to calm your mind during stressful moments",
      type: 'video',
      category: 'videos',
      duration: '8 min',
      rating: 4.9,
      views: '5.1k',
      tags: ['anxiety', 'breathing', 'relaxation'],
      difficulty: 'beginner',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: "Mood Tracking Worksheet",
      description: "Daily mood tracker to help identify patterns and triggers",
      type: 'worksheet',
      category: 'worksheets',
      duration: '5 min daily',
      rating: 4.7,
      views: '1.8k',
      tags: ['mood', 'tracking', 'self-awareness'],
      difficulty: 'beginner',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      title: "Sleep Hygiene for Better Mental Health",
      description: "Understanding the connection between sleep and mental wellness",
      type: 'article',
      category: 'articles',
      duration: '12 min read',
      rating: 4.6,
      views: '3.2k',
      tags: ['sleep', 'wellness', 'mental health'],
      difficulty: 'intermediate',
      image: 'https://images.unsplash.com/photo-1520206183501-b80df61043c2?w=300&h=200&fit=crop'
    },
    {
      id: 5,
      title: "Mindfulness Meditation for Students",
      description: "Guided meditation session designed specifically for student life challenges",
      type: 'podcast',
      category: 'podcasts',
      duration: '20 min',
      rating: 4.8,
      views: '4.7k',
      tags: ['mindfulness', 'meditation', 'stress relief'],
      difficulty: 'beginner',
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=300&h=200&fit=crop'
    },
    {
      id: 6,
      title: "Building Healthy Relationships",
      description: "Strategies for maintaining friendships and romantic relationships during college",
      type: 'video',
      category: 'videos',
      duration: '15 min',
      rating: 4.5,
      views: '2.9k',
      tags: ['relationships', 'social skills', 'communication'],
      difficulty: 'intermediate',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return FileText;
      case 'video': return Video;
      case 'worksheet': return BookOpen;
      case 'podcast': return Headphones;
      default: return FileText;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-chart-2/20 text-chart-2';
      case 'intermediate': return 'bg-chart-3/20 text-chart-3';
      case 'advanced': return 'bg-chart-1/20 text-chart-1';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl text-foreground mb-4">Resource Hub</h1>
        <p className="text-muted-foreground">
          Curated mental health resources, tools, and educational content for students
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-full"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-auto grid-cols-2">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {filteredResources.length} results
            </span>
          </div>
        </div>

        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <Card key={resource.id} className="cursor-pointer hover:shadow-lg transition-shadow border-0">
                  <div className="relative">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={getDifficultyColor(resource.difficulty)}>
                        {resource.difficulty}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                        <TypeIcon className="h-3 w-3" />
                        <span>{resource.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{resource.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{resource.views}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{resource.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-chart-1 hover:bg-chart-1/90 text-white rounded-full">
                      Access Resource
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="space-y-4">
            {filteredResources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <Card key={resource.id} className="cursor-pointer hover:shadow-lg transition-shadow border-0">
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <img
                        src={resource.image}
                        alt={resource.title}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg text-foreground truncate">{resource.title}</h3>
                          <div className="flex items-center space-x-2 ml-4">
                            <Badge className={getDifficultyColor(resource.difficulty)}>
                              {resource.difficulty}
                            </Badge>
                            <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                              <TypeIcon className="h-3 w-3" />
                              <span>{resource.type}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{resource.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{resource.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{resource.rating}</span>
                            </div>
                          </div>
                          <Button size="sm" className="bg-chart-1 hover:bg-chart-1/90 text-white rounded-full">
                            Access
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg text-foreground mb-2">No resources found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or browse all categories
          </p>
        </div>
      )}
    </div>
  );
}