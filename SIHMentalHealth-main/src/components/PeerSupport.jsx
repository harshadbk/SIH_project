import React, { useState } from 'react';
import { MessageCircle, Users, Plus, Search, Heart, MessageSquare, ThumbsUp, Clock, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar } from './ui/avatar';

export function PeerSupport() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    isAnonymous: false
  });

  const categories = [
    { id: 'all', name: 'All Topics', count: 42 },
    { id: 'anxiety', name: 'Anxiety & Stress', count: 12 },
    { id: 'academic', name: 'Academic Pressure', count: 8 },
    { id: 'relationships', name: 'Relationships', count: 7 },
    { id: 'depression', name: 'Depression', count: 6 },
    { id: 'social', name: 'Social Issues', count: 5 },
    { id: 'other', name: 'Other', count: 4 }
  ];

  const posts = [
    {
      id: 1,
      title: "Struggling with midterm anxiety - any tips?",
      content: "I have three midterms next week and I'm feeling overwhelmed. Anyone have strategies that helped them cope with exam stress?",
      author: "Sarah M.",
      isAnonymous: false,
      category: 'anxiety',
      createdAt: '2 hours ago',
      replies: 8,
      likes: 15,
      isHelpful: true,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      title: "Feeling isolated as a transfer student",
      content: "I transferred here this semester and I'm having trouble making friends. It feels like everyone already has their groups. How did you meet people?",
      author: "Anonymous",
      isAnonymous: true,
      category: 'social',
      createdAt: '4 hours ago',
      replies: 12,
      likes: 23,
      isHelpful: true,
      avatar: null
    },
    {
      id: 3,
      title: "Balancing work and studies - burnout help",
      content: "Working 20 hours a week while taking 15 credits. Starting to feel burnt out. How do you all manage your time and energy?",
      author: "Mike_2024",
      isAnonymous: false,
      category: 'academic',
      createdAt: '6 hours ago',
      replies: 5,
      likes: 9,
      isHelpful: false,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 4,
      title: "Breaking up during finals week",
      content: "Just went through a breakup and finals are in two weeks. Having trouble focusing on anything. Any advice for getting through this?",
      author: "Anonymous",
      isAnonymous: true,
      category: 'relationships',
      createdAt: '1 day ago',
      replies: 18,
      likes: 31,
      isHelpful: true,
      avatar: null
    },
    {
      id: 5,
      title: "Imposter syndrome in STEM",
      content: "Third year CS major and I still feel like I don't belong here. Everyone seems so much smarter. Does this feeling ever go away?",
      author: "CodeStuggler",
      isAnonymous: false,
      category: 'academic',
      createdAt: '1 day ago',
      replies: 14,
      likes: 27,
      isHelpful: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNewPost = () => {
    // Handle new post submission
    console.log('New post:', newPost);
    setNewPost({ title: '', content: '', category: '', isAnonymous: false });
  };

  const getCategoryColor = (category) => {
    const colors = {
      anxiety: 'bg-yellow-100 text-yellow-700',
      academic: 'bg-blue-100 text-blue-700',
      relationships: 'bg-pink-100 text-pink-700',
      depression: 'bg-purple-100 text-purple-700',
      social: 'bg-green-100 text-green-700',
      other: 'bg-gray-100 text-gray-700'
    };
    return colors[category] || colors.other;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl text-foreground mb-4">Peer Support Forum</h1>
        <p className="text-muted-foreground">
          Connect with fellow students, share experiences, and support each other
        </p>
      </div>

      {/* Search and Actions */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-chart-1 hover:bg-chart-1/90 text-white rounded-full">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription>
                  Share your thoughts or ask for support from the community
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="What's on your mind?"
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newPost.category}
                    onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat.id !== 'all').map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Share your thoughts, experiences, or ask for advice..."
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    rows={4}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={newPost.isAnonymous}
                    onChange={(e) => setNewPost(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="anonymous" className="text-sm">
                    Post anonymously
                  </Label>
                </div>
                
                <Button
                  onClick={handleNewPost}
                  disabled={!newPost.title || !newPost.content || !newPost.category}
                  className="w-full bg-chart-1 hover:bg-chart-1/90 text-white rounded-full"
                >
                  Create Post
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="cursor-pointer hover:shadow-lg transition-shadow border-0">
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      {post.isAnonymous ? (
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-muted-foreground" />
                        </div>
                      ) : (
                        <Avatar className="w-10 h-10">
                          <img src={post.avatar} alt={post.author} className="rounded-full" />
                        </Avatar>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg text-foreground hover:text-chart-1 transition-colors">
                            {post.title}
                          </h3>
                          {post.isHelpful && (
                            <Badge className="bg-chart-2/20 text-chart-2">
                              <Heart className="h-3 w-3 mr-1" />
                              Helpful
                            </Badge>
                          )}
                        </div>
                        <Badge className={getCategoryColor(post.category)}>
                          {categories.find(c => c.id === post.category)?.name.split(' ')[0]}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {post.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>by {post.author}</span>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.createdAt}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg text-foreground mb-2">No discussions found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse all categories
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-chart-1" />
                <span>Community Guidelines</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="space-y-2">
                <p className="text-muted-foreground">• Be respectful and supportive</p>
                <p className="text-muted-foreground">• No medical advice or diagnosis</p>
                <p className="text-muted-foreground">• Maintain confidentiality</p>
                <p className="text-muted-foreground">• Report concerning content</p>
                <p className="text-muted-foreground">• Use content warnings when needed</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Popular This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-foreground hover:text-chart-1 cursor-pointer">
                    "Coping with seasonal depression"
                  </p>
                  <p className="text-xs text-muted-foreground">32 replies</p>
                </div>
                <div className="text-sm">
                  <p className="text-foreground hover:text-chart-1 cursor-pointer">
                    "Study group anxiety tips"
                  </p>
                  <p className="text-xs text-muted-foreground">28 replies</p>
                </div>
                <div className="text-sm">
                  <p className="text-foreground hover:text-chart-1 cursor-pointer">
                    "Managing homesickness"
                  </p>
                  <p className="text-xs text-muted-foreground">24 replies</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Need Immediate Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full rounded-full text-sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                AI Chat Support
              </Button>
              <Button variant="outline" className="w-full rounded-full text-sm">
                <Users className="h-4 w-4 mr-2" />
                Emergency Contacts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}